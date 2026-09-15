import assert from "node:assert/strict";
import { after, before, beforeEach, test, mock } from "node:test";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { NextRequest } from "next/server";
import { proxy } from "../src/proxy";
import { onRequestError } from "../src/instrumentation";
import { reportPortalError } from "../src/lib/portal/diagnostics";
import { inviteModeEnabled, previewModeEnabled, sealSession, unsealSession, makeAdminCookieValue, isValidAdminCookie, checkAdminPassphrase, SESSION_MAX_AGE, sessionCookieOptions } from "../src/lib/portal/auth";
import { createInvite, getActiveInvite, getInvite, listInvites, makeToken, verifyToken, revokeInvite, recordOpen } from "../src/lib/portal/invites";
import { validatePartnerSession } from "../src/lib/portal/authorization";
import { takeAdminLoginAttempt } from "../src/lib/portal/rate-limit";
import { getOrigin } from "../src/lib/portal/origin";
import { contentSecurityPolicy, securityHeaders } from "../src/lib/security-headers";

const originalCwd = process.cwd();
const originalEnv = { ...process.env };
let directory: string;
before(async () => {
  directory = await mkdtemp(path.join(tmpdir(), "portal-security-"));
  process.chdir(directory);
});

beforeEach(async () => {
  mock.restoreAll();
  for (const key of ["PORTAL_PREVIEW_MODE", "NETLIFY", "NETLIFY_BLOBS_CONTEXT", "SITE_ORIGIN", "DEPLOY_PRIME_URL", "URL"]) delete process.env[key];
  Object.assign(process.env, {
    NODE_ENV: "production",
    INVITE_SECRET: "test-only-secret-".repeat(4),
    ADMIN_PASSPHRASE: "test-only-admin-passphrase",
  });
  await rm(path.join(directory, "var"), { recursive: true, force: true });
});

after(async () => {
  mock.restoreAll();
  process.chdir(originalCwd);
  for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key];
  Object.assign(process.env, originalEnv);
  await rm(directory, { recursive: true, force: true });
});

const recipient = { name: "Test Partner", email: "partner@example.test", organization: "Example", days: 7 };
const partnerCookie = (inviteId: string) => sealSession("partner", { inviteId, ndaAcceptedAt: new Date().toISOString() });

test("proxy failures have a matching safe log reference and remain private 503 responses", async () => {
  const logs: string[] = [];
  mock.method(console, "error", (message: string) => logs.push(message));
  const request = new NextRequest("https://partners.example.test/portal?token=private-token");
  mock.method(request.cookies, "get", () => {
    throw new Error("[unenv] fs.readFile is not implemented; private-token");
  });
  const response = await proxy(request);
  assert.equal(response.status, 503);
  assert.equal(logs.length, 1);
  const record = JSON.parse(logs[0].slice("[portal-error] ".length));
  assert.equal(record.errors[0].category, "unsupported-runtime-operation");
  assert.equal(record.stage, "proxy");
  assert.match(record.reference, /^[a-f0-9-]{36}$/);
  assert.equal(response.headers.get("x-portal-error-id"), record.reference);
  assert.equal(await response.text(), `Partner access is temporarily unavailable.\nReference: ${record.reference}`);
  assert.match(response.headers.get("cache-control")!, /no-store/);
  assert.match(response.headers.get("content-security-policy")!, /nonce-/);
  assert.equal(response.headers.get("referrer-policy"), "no-referrer");
  assert.ok(!logs[0].includes("private-token"));
});

test("server instrumentation identifies missing Blobs context without logging request secrets", async () => {
  const logs: string[] = [];
  mock.method(console, "error", (message: string) => logs.push(message));
  process.env.NETLIFY = "true";
  process.env.NETLIFY_BLOBS_CONTEXT = Buffer.from("{}").toString("base64");
  let failure: unknown;
  try { await getActiveInvite("test-id"); } catch (error) { failure = error; }
  assert.ok(failure instanceof Error);
  Object.assign(failure, { digest: "1234567890" });
  await onRequestError(failure, {
    path: "/portal/recipient@example.test?token=private-token", method: "GET",
    headers: { cookie: "portal_session=private-cookie", authorization: "Bearer private-key" },
  }, { routerKind: "App Router", routePath: "/portal/[section]", routeType: "render", revalidateReason: undefined });
  const record = JSON.parse(logs[0].slice("[portal-error] ".length));
  assert.equal(record.reference, "1234567890");
  assert.equal(record.route, "/portal/*");
  assert.equal(record.errors[0].category, "missing-netlify-blobs-context");
  for (const value of ["recipient@example.test", "private-token", "private-cookie", "private-key", process.env.INVITE_SECRET!, process.env.ADMIN_PASSPHRASE!]) {
    assert.ok(!logs.join("").includes(value));
  }
});

test("diagnostics retain safe causes and code locations without raw error contents", () => {
  const logs: string[] = [];
  mock.method(console, "error", (message: string) => logs.push(message));
  const error = new SyntaxError('Unexpected token in {"email":"private@example.test","token":"secret-token"}');
  error.stack = `${error.name}: ${error.message}\n    at read (/Users/private-person/project/src/lib/portal/storage.ts:20:3)`;
  Object.assign(error, { cause: Object.assign(new Error("secret-token"), { code: "ETIMEDOUT" }),
    digest: "private@example.test", request: { headers: { authorization: "secret-token" } } });
  const reference = reportPortalError(error, { stage: "action", route: "/access" });
  const record = JSON.parse(logs[0].slice("[portal-error] ".length));
  assert.match(reference, /^[a-f0-9-]{36}$/);
  assert.equal(record.errors[0].category, "invalid-data-or-syntax");
  assert.deepEqual(record.errors[0].frames, ["src/lib/portal/storage.ts:20:3"]);
  assert.equal(record.errors[1].code, "ETIMEDOUT");
  for (const value of ["private@example.test", "secret-token", "private-person", "Unexpected token"]) assert.ok(!logs[0].includes(value));
});

test("instrumentation ignores normal access redirects and public requests", async () => {
  const logs: string[] = [];
  mock.method(console, "error", (message: string) => logs.push(message));
  const context = { routerKind: "App Router" as const, routePath: "/portal", routeType: "render" as const, revalidateReason: undefined };
  for (const digest of ["NEXT_REDIRECT;replace;/partner-login;307;", "NEXT_HTTP_ERROR_FALLBACK;404"]) {
    await onRequestError(Object.assign(new Error("navigation"), { digest }), { path: "/portal", method: "GET", headers: {} }, context);
  }
  for (const path of ["/", "/about", "/portal-lookalike?token=secret"]) {
    await onRequestError(new Error("public error"), { path, method: "GET", headers: {} }, context);
  }
  assert.equal(logs.length, 0);
});

test("a broken log sink cannot turn an access error into successful access", async () => {
  mock.method(console, "error", () => { throw new Error("log sink unavailable"); });
  const request = new NextRequest("https://partners.example.test/portal");
  mock.method(request.cookies, "get", () => { throw new Error("test failure"); });
  const response = await proxy(request);
  assert.equal(response.status, 503);
  assert.ok(response.headers.get("x-portal-error-id"));
});

test("proxy checks signed sessions without requiring the server's Blobs context", async () => {
  const invite = await createInvite(recipient);
  const cookie = partnerCookie(invite.id);
  process.env.NETLIFY = "true";
  process.env.NETLIFY_BLOBS_CONTEXT = Buffer.from("{}").toString("base64");

  const response = await proxy(new NextRequest("https://partners.example.test/portal", {
    headers: { cookie: `portal_session=${cookie}` },
  }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-middleware-next"), "1");
  assert.equal(response.body, null);
  assert.match(response.headers.get("cache-control")!, /no-store/);

  // The proxy only forwards the request. Server authorization still fails
  // closed when invitation storage is unavailable; it must never grant access.
  await assert.rejects(() => validatePartnerSession(cookie), { name: "MissingBlobsEnvironmentError" });
});


test("proxy rejects invalid, expired, admin, and NDA-free sessions without storage", async () => {
  process.env.NETLIFY = "true";
  process.env.NETLIFY_BLOBS_CONTEXT = Buffer.from("{}").toString("base64");
  const cookie = partnerCookie("valid-test-invite");
  const invalid = [undefined, "", "partner@example.test", "unsigned.fake", makeAdminCookieValue(),
    cookie.slice(0, -1) + (cookie.endsWith("a") ? "b" : "a"),
    sealSession("partner", { inviteId: "valid-test-invite" }),
    sealSession("partner", { inviteId: "valid-test-invite", ndaAcceptedAt: "invalid" }),
    sealSession("partner", { preview: true, email: recipient.email, fullName: recipient.name, ndaAcceptedAt: new Date().toISOString() })];
  for (const value of invalid) {
    const response = await proxy(new NextRequest("https://partners.example.test/portal", {
      headers: value ? { cookie: `portal_session=${value}` } : {},
    }));
    assert.equal(response.status, 307);
    assert.equal(response.headers.get("location"), "https://partners.example.test/partner-login");
  }
  const future = Date.now() + SESSION_MAX_AGE * 1000;
  mock.method(Date, "now", () => future);
  const expired = await proxy(new NextRequest("https://partners.example.test/portal", {
    headers: { cookie: `portal_session=${cookie}` },
  }));
  assert.equal(expired.status, 307);
});

test("server refuses a revoked invitation even when its signed cookie passes the proxy", async () => {
  const invite = await createInvite(recipient);
  const cookie = partnerCookie(invite.id);
  await revokeInvite(invite.id);
  const response = await proxy(new NextRequest("https://partners.example.test/portal", {
    headers: { cookie: `portal_session=${cookie}` },
  }));
  assert.equal(response.headers.get("x-middleware-next"), "1");
  assert.equal(await validatePartnerSession(cookie), null);
});

test("production fails closed with missing/weak secrets, even with preview requested", () => {
  for (const [secret, passphrase] of [["", ""], ["short", "long-admin-passphrase"], ["a".repeat(48), "short"], ["a".repeat(48), ""]]) {
    Object.assign(process.env, { INVITE_SECRET: secret, ADMIN_PASSPHRASE: passphrase, PORTAL_PREVIEW_MODE: "true" });
    assert.equal(inviteModeEnabled(), false);
    assert.equal(previewModeEnabled(), false);
    assert.equal(verifyToken("admin-session.fake"), null);
    assert.equal(isValidAdminCookie("admin-session.fake"), false);
    assert.equal(checkAdminPassphrase(passphrase), false);
  }
});

test("preview requires development, an explicit flag, and a signing secret", () => {
  Object.assign(process.env, { NODE_ENV: "development", ADMIN_PASSPHRASE: "" });
  assert.equal(previewModeEnabled(), false);
  process.env.PORTAL_PREVIEW_MODE = "true";
  assert.equal(previewModeEnabled(), true);
  process.env.INVITE_SECRET = "";
  assert.equal(previewModeEnabled(), false);
});

test("unsigned JSON, legacy email, malformed and tampered cookies cannot authenticate", async () => {
  const invite = await createInvite(recipient);
  const cookie = partnerCookie(invite.id);
  assert.equal((await validatePartnerSession(cookie))?.email, recipient.email);
  const [body, signature] = cookie.split(".");
  const tampered = Buffer.from(JSON.stringify({ data: { inviteId: invite.id, role: "admin" } })).toString("base64url");
  for (const raw of [undefined, "", recipient.email, encodeURIComponent(JSON.stringify({ email: recipient.email, inviteId: invite.id, authenticated: true })), `${tampered}.${signature}`, `${body}.invalid`, "x".repeat(5000), "%.%", makeToken(invite.id), makeAdminCookieValue()]) {
    assert.equal(await validatePartnerSession(raw), null);
  }
  assert.equal(isValidAdminCookie(cookie), false);
});

test("session expiration and future issuance are enforced on the server", () => {
  const now = Date.now();
  const cookie = makeAdminCookieValue();
  assert.equal(isValidAdminCookie(cookie), true);
  mock.method(Date, "now", () => now + SESSION_MAX_AGE * 1000);
  assert.equal(isValidAdminCookie(cookie), false);
  mock.restoreAll();
  mock.method(Date, "now", () => now - 60000);
  assert.equal(isValidAdminCookie(cookie), false);
});

test("rotating either admin credential invalidates admin sessions", () => {
  const cookie = makeAdminCookieValue();
  assert.equal(checkAdminPassphrase(process.env.ADMIN_PASSPHRASE!), true);
  assert.equal(checkAdminPassphrase("incorrect"), false);
  process.env.ADMIN_PASSPHRASE = "different-admin-passphrase";
  assert.equal(isValidAdminCookie(cookie), false);
  const nextCookie = makeAdminCookieValue();
  process.env.INVITE_SECRET = "different-signing-secret-".repeat(3);
  assert.equal(isValidAdminCookie(nextCookie), false);
});

test("old non-expiring admin tokens and invite tokens cannot authenticate as admin", async () => {
  const oldAdmin = `admin-session.${crypto.createHmac("sha256", process.env.INVITE_SECRET!).update("admin-session").digest("base64url")}`;
  assert.equal(isValidAdminCookie(oldAdmin), false);
  assert.equal(verifyToken(oldAdmin), null);
  const invite = await createInvite(recipient);
  assert.equal(isValidAdminCookie(makeToken(invite.id)), false);
  assert.equal(verifyToken(makeToken(invite.id)), invite.id);
  assert.equal(verifyToken(makeAdminCookieValue()), null);
});

test("revocation removes access on the next check and identity is read from the ledger", async () => {
  const invite = await createInvite(recipient);
  const cookie = sealSession("partner", { inviteId: invite.id, ndaAcceptedAt: new Date().toISOString(), email: "forged@example.test" });
  assert.equal((await validatePartnerSession(cookie))?.email, recipient.email);
  await revokeInvite(invite.id);
  assert.equal(await validatePartnerSession(cookie), null);
  assert.equal(await getActiveInvite(invite.id), null);
});

test("expired, malformed-expiry, missing and NDA-free invites cannot grant access", async () => {
  const invite = await createInvite(recipient);
  const cookie = partnerCookie(invite.id);
  assert.equal(await validatePartnerSession(partnerCookie("missing-invite")), null);
  assert.equal(await validatePartnerSession(sealSession("partner", { inviteId: invite.id })), null);
  for (const expiresAt of [new Date(Date.now() - 1000).toISOString(), "invalid-date"]) {
    await writeFile(path.join(directory, "var/invites.json"), JSON.stringify([{ ...invite, expiresAt }]));
    assert.equal(await validatePartnerSession(cookie), null);
  }
});

test("preview sessions stop working when invites are enabled or the server is deployed", async () => {
  Object.assign(process.env, { NODE_ENV: "development", PORTAL_PREVIEW_MODE: "true", ADMIN_PASSPHRASE: "" });
  const cookie = sealSession("partner", { preview: true, email: recipient.email, fullName: recipient.name, ndaAcceptedAt: new Date().toISOString() });
  assert.equal((await validatePartnerSession(cookie))?.email, recipient.email);
  process.env.ADMIN_PASSPHRASE = "long-admin-passphrase";
  assert.equal(await validatePartnerSession(cookie), null);
  Object.assign(process.env, { NODE_ENV: "production", ADMIN_PASSPHRASE: "" });
  assert.equal(await validatePartnerSession(cookie), null);
});

test("concurrent writes retain invites and cannot overwrite revocation", async () => {
  const invites = await Promise.all(Array.from({ length: 8 }, () => createInvite(recipient)));
  assert.equal((await listInvites()).length, 8);
  await Promise.all([recordOpen(invites[0].id), revokeInvite(invites[0].id), ...Array.from({ length: 6 }, () => recordOpen(invites[0].id))]);
  assert.equal((await getInvite(invites[0].id))?.status, "revoked");
});

test("corrupt security storage fails closed and is not silently overwritten", async () => {
  await createInvite(recipient);
  const file = path.join(directory, "var/invites.json");
  await writeFile(file, "corrupted");
  await assert.rejects(() => createInvite(recipient));
  assert.equal(await readFile(file, "utf8"), "corrupted");
});

test("admin login budget is shared by concurrent attempts and resets after 15 minutes", async () => {
  const attempts = await Promise.all(Array.from({ length: 14 }, () => takeAdminLoginAttempt()));
  assert.equal(attempts.filter(Boolean).length, 10);
  assert.equal(await takeAdminLoginAttempt(), false);
  const later = Date.now() + 15 * 60 * 1000;
  mock.method(Date, "now", () => later);
  assert.equal(await takeAdminLoginAttempt(), true);
});

test("admin login is refused if throttle state cannot be read", async () => {
  const logs: string[] = [];
  mock.method(console, "error", (message: string) => logs.push(message));
  assert.equal(await takeAdminLoginAttempt(), true);
  await writeFile(path.join(directory, "var/admin-login.json"), "invalid");
  assert.equal(await takeAdminLoginAttempt(), false);
  const record = JSON.parse(logs[0].slice("[portal-error] ".length));
  assert.equal(record.stage, "admin-login");
  assert.equal(record.errors[0].category, "invalid-data-or-syntax");
});

test("invite validation bounds user input", async () => {
  for (const input of [{ ...recipient, days: -1 }, { ...recipient, name: "x".repeat(151) }, { ...recipient, email: "not-an-email" }, { ...recipient, organization: "x".repeat(201) }]) {
    await assert.rejects(() => createInvite(input));
  }
});

test("invite origins come from trusted HTTPS deployment configuration", async () => {
  process.env.SITE_ORIGIN = "https://partners.example.test";
  assert.equal(await getOrigin(), "https://partners.example.test");
  for (const origin of ["http://partners.example.test", "javascript:alert(1)", "https://user:password@example.test", "https://example.test/steal", "https://example.test/?token=x"]) {
    process.env.SITE_ORIGIN = origin;
    await assert.rejects(() => getOrigin());
  }
});

test("sensitive routes use nonce scripts, no eval, framing protection and secure cookies", () => {
  const csp = contentSecurityPolicy("test-nonce");
  const script = csp.split("; ").find((directive) => directive.startsWith("script-src "))!;
  assert.ok(script.includes("'nonce-test-nonce'"));
  assert.ok(!script.includes("unsafe-inline"));
  assert.ok(!script.includes("unsafe-eval"));
  assert.ok(csp.includes("frame-ancestors 'none'"));
  assert.ok(csp.includes("form-action 'self'"));
  assert.ok(securityHeaders().some((header) => header.key === "Strict-Transport-Security"));
  assert.deepEqual(sessionCookieOptions(), { httpOnly: true, sameSite: "lax", path: "/", maxAge: SESSION_MAX_AGE, secure: true });
  assert.equal(unsealSession("partner", "not-a-session"), null);
});

import "server-only";
import crypto from "node:crypto";

export const PORTAL_SESSION_COOKIE = "portal_session";
export const PORTAL_ADMIN_COOKIE = "portal_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function hasSigningSecret(): boolean {
  return (process.env.INVITE_SECRET?.length ?? 0) >= 32;
}

export function inviteModeEnabled(): boolean {
  return hasSigningSecret() && (process.env.ADMIN_PASSPHRASE?.length ?? 0) >= 16;
}

// An explicit development-only opt-in; deployed builds always fail closed.
export function previewModeEnabled(): boolean {
  return process.env.NODE_ENV === "development" &&
    process.env.PORTAL_PREVIEW_MODE === "true" && hasSigningSecret() &&
    !process.env.ADMIN_PASSPHRASE;
}

function signingKey(purpose: "partner" | "admin"): Buffer {
  if (!hasSigningSecret()) throw new Error("INVITE_SECRET must have at least 32 characters.");
  if (purpose === "admin" && !inviteModeEnabled()) throw new Error("Admin access is not configured.");
  // Changing the admin passphrase also invalidates existing admin sessions.
  return crypto.createHmac("sha256", process.env.INVITE_SECRET!)
    .update(JSON.stringify(["lunasat", purpose, purpose === "admin" ? process.env.ADMIN_PASSPHRASE : ""]))
    .digest();
}

export function sealSession(purpose: "partner" | "admin", data: object): string {
  const issuedAt = Math.floor(Date.now() / 1000);
  const body = Buffer.from(JSON.stringify({ data, issuedAt, expiresAt: issuedAt + SESSION_MAX_AGE })).toString("base64url");
  const signature = crypto.createHmac("sha256", signingKey(purpose)).update(body).digest("base64url");
  return `${body}.${signature}`;
}

export function unsealSession(purpose: "partner" | "admin", raw: string | undefined): Record<string, unknown> | null {
  if (!raw || raw.length > 4096 || !/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]{43}$/.test(raw)) return null;
  try {
    const [body, signature] = raw.split(".");
    const expected = crypto.createHmac("sha256", signingKey(purpose)).update(body).digest("base64url");
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);
    if (!Number.isSafeInteger(payload.issuedAt) || !Number.isSafeInteger(payload.expiresAt) ||
        payload.issuedAt > now || payload.expiresAt <= now ||
        payload.expiresAt - payload.issuedAt !== SESSION_MAX_AGE ||
        !payload.data || typeof payload.data !== "object" || Array.isArray(payload.data)) return null;
    return payload.data;
  } catch {
    return null;
  }
}

export function checkAdminPassphrase(passphrase: string): boolean {
  if (!inviteModeEnabled() || passphrase.length > 1024) return false;
  const digest = (value: string) => crypto.createHash("sha256").update(value).digest();
  return crypto.timingSafeEqual(digest(passphrase), digest(process.env.ADMIN_PASSPHRASE!));
}

export function makeAdminCookieValue(): string {
  return sealSession("admin", { role: "admin" });
}

export function isValidAdminCookie(raw: string | undefined): boolean {
  return inviteModeEnabled() && unsealSession("admin", raw)?.role === "admin";
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  };
}

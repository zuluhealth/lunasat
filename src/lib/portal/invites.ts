import "server-only";
import crypto from "node:crypto";
import { inviteModeEnabled } from "./auth";
import { readStored, updateStored } from "./storage";
export { inviteModeEnabled, PORTAL_ADMIN_COOKIE, checkAdminPassphrase, makeAdminCookieValue, isValidAdminCookie } from "./auth";

export interface Invite {
  id: string;
  name: string;
  email: string;
  organization?: string;
  createdAt: string;
  expiresAt: string;
  status: "active" | "revoked";
  opens: number;
  lastOpenedAt?: string;
}

function sign(id: string): string {
  if (!inviteModeEnabled()) throw new Error("Invite mode is not configured.");
  return crypto.createHmac("sha256", process.env.INVITE_SECRET!).update(id).digest("base64url");
}

export function makeToken(id: string): string {
  if (!/^[A-Za-z0-9_-]{10,64}$/.test(id) || id === "admin-session") throw new Error("Invalid invite id.");
  return `${id}.${sign(id)}`;
}

export function verifyToken(token: string): string | null {
  if (!inviteModeEnabled() || typeof token !== "string" ||
      !/^[A-Za-z0-9_-]{10,64}\.[A-Za-z0-9_-]{43}$/.test(token)) return null;
  const [id, signature] = token.split(".");
  if (id === "admin-session") return null;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(sign(id))) ? id : null;
}

export function makeInviteUrl(id: string, origin: string): string {
  const url = new URL("/access", origin);
  url.searchParams.set("token", makeToken(id));
  return url.toString();
}

export async function createInvite(input: { name: string; email: string; organization?: string; days: number }): Promise<Invite> {
  if (!inviteModeEnabled()) throw new Error("Invite mode is not configured.");
  if (!input.name || input.name.length > 150 || input.email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) ||
      (input.organization?.length ?? 0) > 200 || ![7, 14, 30, 90].includes(input.days)) {
    throw new Error("Invalid invite details.");
  }
  const now = new Date();
  const invite: Invite = {
    id: crypto.randomBytes(16).toString("base64url"),
    name: input.name,
    email: input.email,
    organization: input.organization || undefined,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + input.days * 86400000).toISOString(),
    status: "active",
    opens: 0,
  };
  await updateStored<Invite[], void>("ledger", [], (invites) => { invites.push(invite); });
  return invite;
}

export async function listInvites(): Promise<Invite[]> {
  return (await readStored<Invite[]>("ledger", [])).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getInvite(id: string): Promise<Invite | null> {
  return (await readStored<Invite[]>("ledger", [])).find((invite) => invite.id === id) ?? null;
}

async function mutateInvite(id: string, mutate: (invite: Invite) => void): Promise<void> {
  await updateStored<Invite[], void>("ledger", [], (invites) => {
    const invite = invites.find((entry) => entry.id === id);
    if (invite) mutate(invite);
  });
}

export async function revokeInvite(id: string): Promise<void> {
  await mutateInvite(id, (invite) => { invite.status = "revoked"; });
}

export async function reactivateInvite(id: string): Promise<void> {
  await mutateInvite(id, (invite) => { invite.status = "active"; });
}

export async function recordOpen(id: string): Promise<void> {
  await mutateInvite(id, (invite) => {
    if (invite.status !== "active" || !(Date.parse(invite.expiresAt) > Date.now())) return;
    invite.opens += 1;
    invite.lastOpenedAt = new Date().toISOString();
  });
}

export async function getActiveInvite(id: string): Promise<Invite | null> {
  if (!inviteModeEnabled()) return null;
  const invite = await getInvite(id);
  return invite?.status === "active" && Date.parse(invite.expiresAt) > Date.now() ? invite : null;
}

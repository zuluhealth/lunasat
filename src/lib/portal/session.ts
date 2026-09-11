import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PORTAL_SESSION_COOKIE } from "./auth";
import { validatePartnerSession } from "./authorization";
import type { PartnerSession } from "./types";
export { PORTAL_SESSION_COOKIE } from "./auth";

export async function getPartnerSession(): Promise<PartnerSession | null> {
  return validatePartnerSession((await cookies()).get(PORTAL_SESSION_COOKIE)?.value);
}

export async function requirePartnerSession(): Promise<PartnerSession> {
  const session = await getPartnerSession();
  if (!session) redirect("/partner-login");
  return session;
}

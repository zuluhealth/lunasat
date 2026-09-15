import "server-only";
import { getPartnerSessionClaims } from "./session-claims";
import { getActiveInvite } from "./invites";
import type { PartnerSession } from "./types";

// Authoritative check for server components/actions. Keep storage access out of
// the proxy: Netlify runs it separately from the application server.
export async function validatePartnerSession(raw: string | undefined): Promise<PartnerSession | null> {
  const claims = getPartnerSessionClaims(raw);
  if (!claims) return null;
  if ("inviteId" in claims) {
    const invite = await getActiveInvite(claims.inviteId);
    if (!invite) return null;
    // Identity comes from the current server ledger, never from client claims.
    return {
      email: invite.email, fullName: invite.name, organizationName: invite.organization,
      inviteId: invite.id, ndaAcceptedAt: claims.ndaAcceptedAt, authenticated: true,
    };
  }
  return {
    email: claims.email, fullName: claims.fullName,
    organizationName: claims.organizationName,
    ndaAcceptedAt: claims.ndaAcceptedAt, authenticated: true,
  };
}

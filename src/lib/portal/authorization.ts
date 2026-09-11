import "server-only";
import { inviteModeEnabled, previewModeEnabled, unsealSession } from "./auth";
import { getActiveInvite } from "./invites";
import type { PartnerSession } from "./types";

// Used both at the route boundary and by server components/actions.
export async function validatePartnerSession(raw: string | undefined): Promise<PartnerSession | null> {
  if (!inviteModeEnabled() && !previewModeEnabled()) return null;
  const data = unsealSession("partner", raw);
  if (!data || typeof data.ndaAcceptedAt !== "string" || !Number.isFinite(Date.parse(data.ndaAcceptedAt))) return null;
  if (inviteModeEnabled()) {
    if (typeof data.inviteId !== "string") return null;
    const invite = await getActiveInvite(data.inviteId);
    if (!invite) return null;
    // Identity comes from the current server ledger, never from client claims.
    return {
      email: invite.email, fullName: invite.name, organizationName: invite.organization,
      inviteId: invite.id, ndaAcceptedAt: data.ndaAcceptedAt, authenticated: true,
    };
  }
  if (data.preview !== true || typeof data.email !== "string" || typeof data.fullName !== "string") return null;
  return {
    email: data.email, fullName: data.fullName,
    organizationName: typeof data.organizationName === "string" ? data.organizationName : undefined,
    ndaAcceptedAt: data.ndaAcceptedAt, authenticated: true,
  };
}

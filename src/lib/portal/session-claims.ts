import "server-only";
import { inviteModeEnabled, previewModeEnabled, unsealSession } from "./auth";

type PartnerSessionClaims =
  | { inviteId: string; ndaAcceptedAt: string }
  | { preview: true; email: string; fullName: string; organizationName?: string; ndaAcceptedAt: string };

// A storage-free check for the proxy. These signed claims are not authorization:
// server pages/actions must still check the current invite via validatePartnerSession.
export function getPartnerSessionClaims(raw: string | undefined): PartnerSessionClaims | null {
  const invitations = inviteModeEnabled();
  if (!invitations && !previewModeEnabled()) return null;
  const data = unsealSession("partner", raw);
  if (!data || typeof data.ndaAcceptedAt !== "string" || !Number.isFinite(Date.parse(data.ndaAcceptedAt))) return null;
  if (invitations) {
    if (typeof data.inviteId !== "string" || !data.inviteId) return null;
    return { inviteId: data.inviteId, ndaAcceptedAt: data.ndaAcceptedAt };
  }
  if (data.preview !== true || typeof data.email !== "string" || typeof data.fullName !== "string") return null;
  return {
    preview: true, email: data.email, fullName: data.fullName,
    organizationName: typeof data.organizationName === "string" ? data.organizationName : undefined,
    ndaAcceptedAt: data.ndaAcceptedAt,
  };
}

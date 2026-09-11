import type { Metadata } from "next";
import { requirePartnerSession } from "@/lib/portal/session";
import PortalShell from "@/components/portal/PortalShell";

export const metadata: Metadata = {
  title: "Partner Portal",
  description: "Secure operating portal for Lunasat partners and clients.",
  robots: { index: false, follow: false },
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requirePartnerSession();

  return <PortalShell email={session.email}>{children}</PortalShell>;
}

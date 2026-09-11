export interface NavItem {
  label: string;
  href: string;
  index?: string;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

// The portal reads as a single page: every nav item points at a section anchor
// on /portal rather than a separate route. Hrefs stay absolute so the sidebar
// still works from nested routes (e.g. the airports deck).
export const portalNav: NavGroup[] = [
  {
    label: "Briefing",
    items: [
      { index: "00", label: "Hub", href: "/portal#top" },
      { index: "01", label: "Overview", href: "/portal#overview" },
      { index: "02", label: "Why Lunasat", href: "/portal#why-lunasat" },
    ],
  },
  {
    label: "Capabilities",
    items: [
      {
        index: "03",
        label: "Secured Communications",
        href: "/portal#capability-secured-communications",
      },
      {
        index: "03",
        label: "Intelligence",
        href: "/portal#capability-intelligence",
      },
      {
        index: "03",
        label: "Security & Surveillance",
        href: "/portal#capability-security-surveillance",
      },
      {
        index: "03",
        label: "Telecommunications",
        href: "/portal#capability-telecommunications",
      },
      {
        index: "03",
        label: "Airspace & Control",
        href: "/portal#capability-airspace-control",
      },
    ],
  },
  {
    label: "Proof",
    items: [
      { index: "04", label: "Proven Delivery", href: "/portal#proven-delivery" },
      { index: "05", label: "Programs", href: "/portal#programs" },
      {
        index: "07",
        label: "Technology Partners",
        href: "/portal#technology-partners",
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        index: "08",
        label: "Compliance & Governance",
        href: "/portal#compliance",
      },
      {
        index: "09",
        label: "Support & Sustainment",
        href: "/portal#support-sustainment",
      },
      {
        index: "10",
        label: "Vertical Solutions",
        href: "/portal#vertical-solutions",
      },
    ],
  },
];

/** Section ids in page order, derived from the nav (hash part of each href). */
export const portalSectionIds: string[] = portalNav
  .flatMap((group) => group.items)
  .map((item) => item.href.split("#")[1])
  .filter((id): id is string => Boolean(id));

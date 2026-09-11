export interface PortalCapability {
  slug:
    | "secured-communications"
    | "security-surveillance"
    | "telecommunications"
    | "airspace-control";
  title: string;
  shortDescription: string;
  approach: string;
  referenceArchitecture: { title: string; description: string }[];
  vendorIds: string[];
}

export interface PartnerVendor {
  id: string;
  name: string;
  logo: string;
  website?: string;
  blurb: string;
  applicableTo: { capabilitySlug: PortalCapability["slug"]; scope: string }[];
}

export interface PartnerProduct {
  id: string;
  vendorId: string;
  productLine: string;
  description: string;
  capabilityTags: string[];
  datasheetUrl: string;
  authorizationScope: string;
  appliesToCapability: PortalCapability["slug"][];
}

export interface PartnerSession {
  email: string;
  fullName?: string;
  organizationName?: string;
  ndaAcceptedAt?: string;
  inviteId?: string;
  authenticated: true;
}

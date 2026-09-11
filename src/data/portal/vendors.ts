import "server-only";
import type { PartnerVendor } from "@/lib/portal/types";

export const vendors: PartnerVendor[] = [
  {
    id: "l3harris",
    name: "L3Harris",
    logo: "/images/partners/l3harris.svg",
    website: "https://www.l3harris.com",
    blurb:
      "Tactical radios, resilient SATCOM and integrated tactical communication systems fielded by defense forces and government operators worldwide.",
    applicableTo: [
      {
        capabilitySlug: "secured-communications",
        scope:
          "MENA region: authorized integration, delivery and lifecycle support for tactical radios, SATCOM terminals and integrated tactical communication systems.",
      },
    ],
  },
  {
    id: "flir",
    name: "FLIR",
    logo: "/images/partners/flir.svg",
    website: "https://www.flir.com",
    blurb:
      "Thermal imaging, radar, multi-spectral situational awareness and counter-UAS systems for defense, critical infrastructure and public safety.",
    applicableTo: [
      {
        capabilitySlug: "security-surveillance",
        scope:
          "MENA region: authorized distribution, integration and field commissioning for thermal cameras, radars, counter-UAS systems and Cameleon C2.",
      },
    ],
  },
  {
    id: "rohde-schwarz",
    name: "Rohde & Schwarz",
    logo: "/images/partners/rohde-schwarz.svg",
    website: "https://www.rohde-schwarz.com",
    blurb:
      "Test, measurement, secure communications and air traffic control technology trusted by defense forces, civil aviation authorities and regulators worldwide.",
    applicableTo: [
      {
        capabilitySlug: "telecommunications",
        scope:
          "MENA region: RF test & measurement, spectrum monitoring, microwave links and signal analysis.",
      },
      {
        capabilitySlug: "airspace-control",
        scope:
          "MENA region: ground-to-air voice communications systems and ATC radios for civil ANSPs and military air traffic services.",
      },
    ],
  },
  {
    id: "frequentis",
    name: "Frequentis",
    logo: "/images/partners/frequentis.svg",
    website: "https://www.frequentis.com",
    blurb:
      "Mission-critical voice communications and control center solutions for air traffic management, defense and public safety operations.",
    applicableTo: [
      {
        capabilitySlug: "airspace-control",
        scope:
          "MENA region: authorized integration, commissioning and 24x7 support for voice communications systems, recording and tower automation across civil ANSPs and military ATC.",
      },
    ],
  },
  {
    id: "nokia",
    name: "Nokia",
    logo: "/images/partners/nokia.svg",
    website: "https://www.nokia.com",
    blurb:
      "Carrier-grade mobile core, private wireless and optical transport powering national operators, industrial sites and defense networks.",
    applicableTo: [
      {
        capabilitySlug: "telecommunications",
        scope:
          "MENA region: design, integration and managed lifecycle services for private LTE/5G, mobile core, microwave backhaul and optical transport.",
      },
    ],
  },
  {
    id: "cisco",
    name: "Cisco",
    logo: "/images/partners/cisco.svg",
    website: "https://www.cisco.com",
    blurb:
      "Enterprise networking, cybersecurity and collaboration backbone engineered for mission-critical environments and zero-trust operating models.",
    applicableTo: [
      {
        capabilitySlug: "telecommunications",
        scope:
          "MENA region: distribution, integration and lifecycle support for routing, switching, SD-WAN and zero-trust security.",
      },
    ],
  },
  {
    id: "microchip",
    name: "Microchip",
    logo: "/images/partners/microchip.png",
    website: "https://www.microchip.com",
    blurb:
      "Atomic clocks, PTP grandmasters and synchronization management holding operator networks to nanosecond accuracy.",
    applicableTo: [
      {
        capabilitySlug: "telecommunications",
        scope:
          "MENA region: authorized integration, commissioning and support for network synchronization — atomic clock references and PTP grandmaster deployment.",
      },
    ],
  },
  {
    id: "genasys",
    name: "Genasys",
    logo: "/images/partners/genasys.png",
    website: "https://www.genasys.com",
    blurb:
      "Long-range acoustic devices, multi-channel mass notification and protective communications engineered for critical events and crowd safety.",
    applicableTo: [
      {
        capabilitySlug: "security-surveillance",
        scope:
          "MENA region: distribution, deployment, training and lifecycle support for LRAD acoustic systems and mass notification platforms.",
      },
    ],
  },
  {
    id: "leidos",
    name: "Leidos",
    logo: "/images/partners/leidos.png",
    website: "https://www.leidos.com",
    blurb:
      "Leidos is a science and technology company providing defense, intelligence, civil and security solutions to government and commercial customers worldwide.",
    applicableTo: [
      {
        capabilitySlug: "secured-communications",
        scope: "MENA region: partner ecosystem member.",
      },
    ],
  },
  {
    id: "teledyne",
    name: "Teledyne",
    logo: "/images/partners/teledyne.png",
    website: "https://www.teledyne.com",
    blurb:
      "Teledyne Technologies designs and manufactures imaging sensors, instrumentation and surveillance systems for defense, industrial and scientific applications.",
    applicableTo: [
      {
        capabilitySlug: "security-surveillance",
        scope: "MENA region: partner ecosystem member.",
      },
    ],
  },
  {
    id: "aads",
    name: "AADS",
    logo: "/images/partners/aads.svg",
    website: "https://www.aads-gib.com",
    blurb:
      "Authorised special distributor for defence by Stellantis — customised military vehicles, specialised platforms and lifecycle support for government, defence and security organisations.",
    applicableTo: [],
  },
];

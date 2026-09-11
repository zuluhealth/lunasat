import "server-only";
// Curated, anonymized program clusters.
//
// CURATION ONLY: every card below traces to an existing entry in
// `src/data/portal/case-studies.ts` or a `deploymentProfiles` item inside
// `src/data/portal/capabilities.ts`. Wording is shortened/generalized for
// anonymization; no scope, metrics, technologies or programs are invented.
// The `source:` comment on each card records the originating entry.

export interface ProgramCluster {
  id: string;
  title: string;
  summary: string;
  cards: { title: string; scope: string; stack: string }[]; // 2–3 cards per cluster
}

export const programClusters: ProgramCluster[] = [
  {
    id: "communications-c2",
    title: "Communications & C2",
    summary:
      "Encrypted tactical and inter-ministry communications, from the field edge into the command center.",
    cards: [
      {
        // source: case-studies.ts → cs-tactical-comms-brigade
        title: "Brigade Communications Refresh",
        scope:
          "Brigade-level tactical communications refresh across 400 nodes — manpack and vehicular SDR radios, crypto key management, vehicle integration and a field operations center.",
        stack: "R&S M3xR SDR · R&S Secure Voice · R&S SITLine",
      },
      {
        // source: capabilities.ts → sc-government-secure-net (Government Secure Network)
        title: "Government Secure Network",
        scope:
          "Inter-ministry encrypted voice and data backbone connecting capital and regional sites across 10–50 locations.",
        stack:
          "Layer-2 encryptors · Secure voice gateways · Identity & access management",
      },
      {
        // source: case-studies.ts → cs-sd-wan-government (Multi-Site SD-WAN Backbone)
        title: "Multi-Site SD-WAN Backbone",
        scope:
          "SD-WAN backbone across 120 ministry sites with carrier-integrated transport, zero-trust segmentation and centralized telemetry, replacing a legacy MPLS architecture.",
        stack: "Cisco Catalyst 8000 · Cisco ISE · Cisco Meraki MX",
      },
    ],
  },
  {
    id: "special-operations-tactical",
    title: "Special Operations & Tactical",
    summary:
      "Resilient field communications and mission-critical interoperability for dispersed and time-sensitive operations.",
    cards: [
      {
        // source: capabilities.ts → sc-tactical-brigade (Tactical Brigade Communications)
        title: "Tactical Brigade Communications",
        scope:
          "Resilient field communications for mobile land forces across a dispersed area of operation, spanning 200–500 nodes.",
        stack:
          "SDR tactical radios · Crypto key distribution · Field operations center & gateways",
      },
      {
        // source: capabilities.ts → sc-public-safety (Public Safety Mission-Critical)
        title: "Public Safety Mission-Critical",
        scope:
          "Citywide police, EMS and civil-defense interoperability with shared situational awareness for 1,000+ users.",
        stack:
          "Mission-critical push-to-talk · Dispatch & geo-fencing · Cross-agency interop gateways",
      },
    ],
  },
  {
    id: "infrastructure-sustainment",
    title: "Infrastructure & Sustainment",
    summary:
      "Carrier-grade transport and private wireless engineered for capacity that ages well and stays serviceable.",
    cards: [
      {
        // source: case-studies.ts → cs-microwave-backbone (Long-Haul Microwave Backbone)
        title: "Long-Haul Microwave Backbone",
        scope:
          "600 km microwave backbone with MPLS transport, NMS integration and continuous spectrum monitoring across remote terrain, supported by locally based field teams.",
        stack: "Nokia Wavence · Nokia 7750 SR · R&S Spectrum",
      },
      {
        // source: capabilities.ts → tc-enterprise-sd-wan (Enterprise SD-WAN Backbone)
        title: "Enterprise SD-WAN Backbone",
        scope:
          "Resilient, policy-driven WAN connectivity for a multi-site enterprise or government tenant across 50–500 sites.",
        stack:
          "SD-WAN edge appliances · Cloud security & SASE · Centralized policy & telemetry",
      },
      {
        // source: capabilities.ts → tc-private-5g-industrial (Private 5G for Industrial Site)
        title: "Private 5G for Industrial Site",
        scope:
          "Deterministic operational connectivity for ports, mining and energy production sites, with on-site edge core and coverage assurance.",
        stack:
          "5G radio access · On-site edge core · Operational SIM provisioning",
      },
    ],
  },
  {
    id: "government-critical-infrastructure",
    title: "Government & Critical Infrastructure",
    summary:
      "Layered protection and notification for national energy operators, government campuses and urban populations.",
    cards: [
      {
        // source: case-studies.ts → cs-energy-perimeter (Perimeter Protection for a National Energy Operator)
        title: "National Energy Perimeter Protection",
        scope:
          "Long-range thermal surveillance, ground surveillance radar and acoustic deterrents fused into a unified situational-awareness platform across multiple production sites, with hardened OT segmentation.",
        stack: "FLIR Triton PT · Genasys LRAD · Cisco Secure",
      },
      {
        // source: capabilities.ts → ss-government-campus (Government Campus Protection)
        title: "Government Campus Protection",
        scope:
          "Layered access control, surveillance and notification for sensitive government and diplomatic compounds across a 1–5 ha campus.",
        stack:
          "Access control & visitor management · Indoor/outdoor video surveillance · Mass notification",
      },
      {
        // source: case-studies.ts → cs-mass-notification-public-safety (Citywide Mass Notification)
        title: "Citywide Mass Notification",
        scope:
          "Citywide mass notification integrating long-range acoustic devices, SMS and mobile alert channels with a centralized command console and rehearsal protocols.",
        stack: "Genasys LRAD 1000X · Genasys EMNet · Cisco Network",
      },
    ],
  },
  {
    id: "security-surveillance",
    title: "Security & Surveillance",
    summary:
      "Integrated detect–assess–respond coverage for perimeters, coastlines and high-value port operations.",
    cards: [
      {
        // source: capabilities.ts → ss-critical-infra-perimeter (Critical Infrastructure Perimeter)
        title: "Critical Infrastructure Perimeter",
        scope:
          "Long-range outdoor surveillance and deterrence for energy, water and transportation hubs across a 5–20 km perimeter.",
        stack:
          "Long-range thermal PTZ · Ground surveillance radar · LRAD acoustic deterrents",
      },
      {
        // source: capabilities.ts → ss-port-coastal (Port & Coastal Surveillance)
        title: "Port & Coastal Surveillance",
        scope:
          "Waterside and landside intrusion detection for a port authority across a multi-kilometer coastal frontage.",
        stack:
          "Coastal surveillance radar · Fixed long-range thermal cameras · Vessel tracking",
      },
      {
        // source: case-studies.ts → cs-private-5g-port (Private 5G for Container Port Operations)
        title: "Private 5G for Port Operations",
        scope:
          "Greenfield private 5G supporting automated crane control, terminal vehicles and operational handhelds across a 4 km² container terminal, with on-site edge core.",
        stack: "Nokia AirScale · Cisco Core · R&S Spectrum",
      },
    ],
  },
  {
    id: "tactical-integration-training",
    title: "Tactical Integration & Training",
    summary:
      "Safety-of-life air traffic environments delivered with acceptance testing, controller training and lifecycle support.",
    cards: [
      {
        // source: case-studies.ts → cs-military-atc-base (Military Air Traffic Services Modernization)
        title: "Military Air Traffic Services",
        scope:
          "Hardened VCS, ATC radio refresh, surveillance integration and a field-deployable shelter package for a strategic air base, with lifecycle support across a 12-year horizon.",
        stack: "Frequentis VCS3020X · R&S Series4200 · R&S ARGUS",
      },
      {
        // source: capabilities.ts → ac-en-route-center (En-Route Control Center)
        title: "En-Route Control Center",
        scope:
          "Upper-airspace management for a civil ANSP across a national or regional FIR, integrating voice, recording/replay and surveillance into controller working positions.",
        stack:
          "Voice communications system · Recording & replay · Surveillance integration",
      },
      {
        // source: capabilities.ts → ac-tower-modernization (Tower Modernization)
        title: "Tower Modernization",
        scope:
          "Airport tower and approach-control upgrade replacing legacy analog VCS with a full IP architecture, including electronic flight strips and training simulators.",
        stack:
          "IP voice communications · Electronic flight strips · Training simulators & curriculum",
      },
    ],
  },
];

import "server-only";
import type { PartnerProduct } from "@/lib/portal/types";

export const products: PartnerProduct[] = [
  // ---------------------------------------------------------------
  // L3HARRIS — Secured Communications
  // ---------------------------------------------------------------
  {
    id: "l3h-rf-7850m-hh",
    vendorId: "l3harris",
    productLine: "RF-7850M-HH Multiband Networking Handheld",
    description:
      "Wideband multiband handheld radio forming self-forming, self-healing MANET networks at the tactical edge, interoperable with the AN/PRC-158, AN/PRC-163 and AN/PRC-167.",
    capabilityTags: ["MANET", "HANDHELD", "WIDEBAND"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, delivery & lifecycle support — L3Harris tactical radio portfolio.",
    appliesToCapability: ["secured-communications"],
  },
  {
    id: "l3h-rf-7850m-v51x",
    vendorId: "l3harris",
    productLine: "RF-7850M-V51x Vehicular / Base Radio System",
    description:
      "Vehicular and base-station multiband radio system that extends handheld and manpack networks onto mobile platforms and fixed command sites.",
    capabilityTags: ["VEHICULAR", "MULTIBAND", "SDR"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, delivery & lifecycle support — L3Harris tactical radio portfolio.",
    appliesToCapability: ["secured-communications"],
  },
  {
    id: "l3h-rf-7850s-spr",
    vendorId: "l3harris",
    productLine: "RF-7850S SPR Secure Personal Radio",
    description:
      "Advanced wideband secure personal radio for dismounted teams that need low-profile networked voice and data inside the same tactical network.",
    capabilityTags: ["SPR", "WIDEBAND", "DISMOUNTED"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, delivery & lifecycle support — L3Harris tactical radio portfolio.",
    appliesToCapability: ["secured-communications"],
  },
  {
    id: "l3h-rf-7850d",
    vendorId: "l3harris",
    productLine: "RF-7850D Multi-Channel Modular System",
    description:
      "Multi-channel modular radio system for command posts and platforms that must run several simultaneous networks from a single footprint.",
    capabilityTags: ["MULTI-CHANNEL", "MODULAR", "COMMAND POST"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, delivery & lifecycle support — L3Harris tactical radio portfolio.",
    appliesToCapability: ["secured-communications"],
  },
  {
    id: "l3h-rf-9820s",
    vendorId: "l3harris",
    productLine: "RF-9820S Compact Team Radio (AN/PRC-171)",
    description:
      "Single-channel wideband MANET team radio with narrowband voice and position location information, SWaP-optimized for dismounted teams and interoperable with the Falcon family.",
    capabilityTags: ["MANET", "TEAM RADIO", "SWAP-OPTIMIZED"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, delivery & lifecycle support — L3Harris tactical radio portfolio.",
    appliesToCapability: ["secured-communications"],
  },
  {
    id: "l3h-hawkeye-iii-lite",
    vendorId: "l3harris",
    productLine: "Hawkeye III Lite VSAT Terminal",
    description:
      "Man-portable 1.2 m VSAT terminal delivering high-speed SATCOM connectivity for expeditionary command posts and remote detachments.",
    capabilityTags: ["SATCOM", "VSAT", "MAN-PORTABLE"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, delivery & lifecycle support — L3Harris tactical SATCOM terminals.",
    appliesToCapability: ["secured-communications"],
  },
  {
    id: "l3h-hawkeye-4-lite",
    vendorId: "l3harris",
    productLine: "Hawkeye 4 Lite 1.3 m Flyaway VSAT",
    description:
      "Case-portable flyaway VSAT engineered for rapid deployment and manoeuvre, carrying high-speed data, C5ISR and video for mobile teams and high-throughput command posts.",
    capabilityTags: ["SATCOM", "FLYAWAY", "HIGH-THROUGHPUT"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, delivery & lifecycle support — L3Harris tactical SATCOM terminals.",
    appliesToCapability: ["secured-communications"],
  },
  {
    id: "l3h-itcs-c2",
    vendorId: "l3harris",
    productLine: "Integrated Tactical Communication Systems — C2",
    description:
      "Command and control solution that connects all echelons. As part of the L3Harris Integrated Tactical Communication Systems family, the C2 streamlines network access through an easy-to-use interface.",
    capabilityTags: ["C2", "ITCS", "NETWORK MANAGEMENT"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, delivery & lifecycle support — L3Harris integrated tactical communication systems.",
    appliesToCapability: ["secured-communications"],
  },

  // ---------------------------------------------------------------
  // FLIR — Security & Surveillance
  // ---------------------------------------------------------------
  {
    id: "flir-triton-pt-series",
    vendorId: "flir",
    productLine: "Triton PT-Series Thermal PTZ",
    description:
      "Long-range multi-sensor thermal and visible PTZ cameras designed for wide-area perimeter surveillance in harsh outdoor environments.",
    capabilityTags: ["THERMAL", "PTZ", "LONG-RANGE"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized distribution, integration & field commissioning — long-range thermal surveillance.",
    appliesToCapability: ["security-surveillance"],
  },
  {
    id: "flir-elara-fb-series",
    vendorId: "flir",
    productLine: "Elara FB-Series Fixed Thermal",
    description:
      "Fixed thermal bullet cameras for fenceline, coastal and waterway surveillance, providing continuous detection day and night.",
    capabilityTags: ["THERMAL", "FIXED", "PERIMETER"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized distribution & commissioning — fixed thermal portfolio.",
    appliesToCapability: ["security-surveillance"],
  },
  {
    id: "flir-saros-dh-390",
    vendorId: "flir",
    productLine: "Saros DH-390 Outdoor Perimeter",
    description:
      "All-in-one thermal and 4K visible camera with on-board analytics for outdoor perimeter intrusion detection at sensitive sites.",
    capabilityTags: ["THERMAL", "ANALYTICS", "OUTDOOR"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized distribution & deployment — outdoor perimeter cameras.",
    appliesToCapability: ["security-surveillance"],
  },
  {
    id: "flir-ranger-r-series",
    vendorId: "flir",
    productLine: "Ranger R-Series Surveillance Radar",
    description:
      "Ground and coastal surveillance radars — including the R20SS and R8-3DX — with automatic detection and tracking across wide areas and drone-threat airspace.",
    capabilityTags: ["RADAR", "DETECTION", "TRACKING"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration & lifecycle support — surveillance radar portfolio.",
    appliesToCapability: ["security-surveillance"],
  },
  {
    id: "flir-cuas-soft-defeat",
    vendorId: "flir",
    productLine: "Cerberus XL C-UAS Soft-Defeat System",
    description:
      "Rugged integrated counter-UAS system pairing long-range radar, EO/IR and RF detection with soft-defeat mitigation, operated from a single console.",
    capabilityTags: ["C-UAS", "SOFT DEFEAT", "RF SENSING"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, deployment & training — counter-UAS systems.",
    appliesToCapability: ["security-surveillance"],
  },
  {
    id: "flir-cameleon-c2",
    vendorId: "flir",
    productLine: "Cameleon C2",
    description:
      "Command and control software that fuses radar, EO/IR, RF and mitigation data into one graphical operator picture, compressing a congested sensor feed into a single decision surface.",
    capabilityTags: ["C2", "SENSOR FUSION", "OPERATOR"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, deployment & operator training — Cameleon C2 platform.",
    appliesToCapability: ["security-surveillance"],
  },

  // ---------------------------------------------------------------
  // NOKIA — Telecommunications
  // ---------------------------------------------------------------
  {
    id: "nokia-airscale-baseband",
    vendorId: "nokia",
    productLine: "AirScale Baseband",
    description:
      "Modular baseband family supporting LTE and 5G NR for macro, micro and private wireless deployments.",
    capabilityTags: ["LTE", "5G", "BASEBAND"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized design, deployment & managed lifecycle services — radio access portfolio.",
    appliesToCapability: ["telecommunications"],
  },
  {
    id: "nokia-airscale-private",
    vendorId: "nokia",
    productLine: "AirScale Private Wireless (DAC/MX)",
    description:
      "Industrial-grade private LTE/5G with on-site core for high-availability operational networks in ports, energy and mining.",
    capabilityTags: ["PRIVATE-5G", "INDUSTRIAL", "EDGE"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized design, deployment & managed lifecycle services — private wireless.",
    appliesToCapability: ["telecommunications"],
  },
  {
    id: "nokia-7750-sr",
    vendorId: "nokia",
    productLine: "7750 Service Router",
    description:
      "Carrier-grade service router platform for MPLS, segment routing and high-capacity IP transport backbones.",
    capabilityTags: ["IP/MPLS", "ROUTING", "BACKBONE"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, professional services & support — IP transport portfolio.",
    appliesToCapability: ["telecommunications"],
  },
  {
    id: "nokia-1830-pss",
    vendorId: "nokia",
    productLine: "1830 Photonic Service Switch",
    description:
      "DWDM optical transport platform for high-capacity, low-latency long-haul and metro networks.",
    capabilityTags: ["DWDM", "OPTICAL", "TRANSPORT"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration & lifecycle support — optical transport portfolio.",
    appliesToCapability: ["telecommunications"],
  },
  {
    id: "nokia-wavence",
    vendorId: "nokia",
    productLine: "Wavence Microwave Backhaul",
    description:
      "High-capacity microwave radios for mobile backhaul, government backbones and remote-site connectivity.",
    capabilityTags: ["MICROWAVE", "BACKHAUL", "WIRELESS"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration & field services — microwave backhaul portfolio.",
    appliesToCapability: ["telecommunications"],
  },

  // ---------------------------------------------------------------
  // CISCO — Telecommunications
  // ---------------------------------------------------------------
  {
    id: "cisco-catalyst-9000",
    vendorId: "cisco",
    productLine: "Catalyst 9000 Series Switches",
    description:
      "Modular enterprise switching for converged campus and data center backbones with MACsec encryption and policy enforcement.",
    capabilityTags: ["LAN", "MACSEC", "ZERO-TRUST"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, professional services & lifecycle support — enterprise switching.",
    appliesToCapability: ["telecommunications"],
  },
  {
    id: "cisco-catalyst-8000",
    vendorId: "cisco",
    productLine: "Catalyst 8000 Edge Routers",
    description:
      "WAN edge platform for SD-WAN, encrypted overlays and high-performance multi-link routing for distributed sites.",
    capabilityTags: ["SD-WAN", "WAN", "ROUTING"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized distribution & deployment — SD-WAN and edge routing.",
    appliesToCapability: ["telecommunications"],
  },
  {
    id: "cisco-firepower-3100",
    vendorId: "cisco",
    productLine: "Secure Firewall 3100 Series",
    description:
      "Threat-focused next-gen firewall hardened for high-throughput inspection in sensitive enterprise and operational networks.",
    capabilityTags: ["NGFW", "IPS", "VPN"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized distribution, deployment & managed security services — NGFW portfolio.",
    appliesToCapability: ["telecommunications"],
  },
  {
    id: "cisco-meraki-mx",
    vendorId: "cisco",
    productLine: "Meraki MX Security Appliances",
    description:
      "Cloud-managed security and SD-WAN appliances for branch sites with integrated threat protection.",
    capabilityTags: ["BRANCH", "CLOUD-MANAGED", "SD-WAN"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized distribution & deployment — branch security & SD-WAN.",
    appliesToCapability: ["telecommunications"],
  },

  // ---------------------------------------------------------------
  // MICROCHIP — Telecommunications (synchronization & timing)
  // ---------------------------------------------------------------
  {
    id: "microchip-timeprovider-4100",
    vendorId: "microchip",
    productLine: "TimeProvider 4100 PTP Grandmaster",
    description:
      "IEEE 1588v2 grandmaster distributing PTP and SyncE across the operator network, with GNSS resilience, holdover and ePRTC-grade time accuracy.",
    capabilityTags: ["PTP", "GRANDMASTER", "SYNC"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, commissioning & support — network synchronization portfolio.",
    appliesToCapability: ["telecommunications"],
  },
  {
    id: "microchip-timecesium-4400",
    vendorId: "microchip",
    productLine: "TimeCesium 4400 / 4500 Atomic Clock",
    description:
      "Cesium atomic clock reference paired with grandmasters to hold network timing through extended GNSS outages.",
    capabilityTags: ["ATOMIC CLOCK", "CESIUM", "HOLDOVER"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, commissioning & support — atomic clock references.",
    appliesToCapability: ["telecommunications"],
  },
  {
    id: "microchip-5071a",
    vendorId: "microchip",
    productLine: "5071A Cesium Primary Time & Frequency Standard",
    description:
      "High-performance cesium primary standard delivering long-term frequency accuracy for networks that must stay traceable without GNSS.",
    capabilityTags: ["PRIMARY STANDARD", "CESIUM", "TRACEABLE"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, commissioning & support — primary time & frequency standards.",
    appliesToCapability: ["telecommunications"],
  },

  // ---------------------------------------------------------------
  // ROHDE & SCHWARZ — Telecommunications (RF test & measurement)
  // ---------------------------------------------------------------
  {
    id: "rs-nrp-series",
    vendorId: "rohde-schwarz",
    productLine: "NRP Series Power Sensors",
    description:
      "Three-path diode power sensors for RF and microwave measurements across radio site commissioning and lab characterization.",
    capabilityTags: ["TEST", "MEASUREMENT", "RF"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized distribution & lifecycle support — RF test & measurement portfolio.",
    appliesToCapability: ["telecommunications"],
  },
  {
    id: "rs-spectrum-rider",
    vendorId: "rohde-schwarz",
    productLine: "Spectrum Rider FPH Handheld Analyzer",
    description:
      "Rugged handheld spectrum analyzer for field RF coverage validation, interference hunting and microwave link verification.",
    capabilityTags: ["SPECTRUM", "FIELD", "HANDHELD"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized distribution, training & service — field test instrumentation.",
    appliesToCapability: ["telecommunications"],
  },
  {
    id: "rs-tsme6-scanner",
    vendorId: "rohde-schwarz",
    productLine: "TSME6 Ultra-Compact Drive Test Scanner",
    description:
      "Network scanner for LTE, 5G NR and Wi-Fi drive-test measurements, RF planning verification and benchmarking.",
    capabilityTags: ["5G", "DRIVE-TEST", "RF PLANNING"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration & support — mobile network test & monitoring.",
    appliesToCapability: ["telecommunications"],
  },

  // ---------------------------------------------------------------
  // ROHDE & SCHWARZ — Airspace & Control
  // ---------------------------------------------------------------
  {
    id: "rs-series4200-atc",
    vendorId: "rohde-schwarz",
    productLine: "Series4200 ATC Radios",
    description:
      "VHF and UHF ground-to-air radios for civil and military air traffic services with built-in redundancy and remote management.",
    capabilityTags: ["ATC", "VHF/UHF", "G/A"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized distribution, integration & operational support — ATC radio portfolio.",
    appliesToCapability: ["airspace-control"],
  },
  {
    id: "rs-vcs-4g",
    vendorId: "rohde-schwarz",
    productLine: "VCS-4G Voice Communications System",
    description:
      "IP-based mission-critical voice control for tower, approach and en-route ATC positions with sub-second failover.",
    capabilityTags: ["VCS", "VOIP", "REDUNDANT"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized distribution, integration & operational support — ATC voice systems.",
    appliesToCapability: ["airspace-control"],
  },
  {
    id: "rs-coverage-monitoring",
    vendorId: "rohde-schwarz",
    productLine: "ARGUS Coverage Monitoring",
    description:
      "Automated coverage and signal-quality monitoring for civil aviation VHF networks with continuous reporting and alerting.",
    capabilityTags: ["MONITORING", "AVIATION", "ASSURANCE"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration & support — aviation coverage assurance.",
    appliesToCapability: ["airspace-control"],
  },

  // ---------------------------------------------------------------
  // FREQUENTIS — Airspace & Control
  // ---------------------------------------------------------------
  {
    id: "frequentis-vcs3020x",
    vendorId: "frequentis",
    productLine: "VCS3020X Voice Communications System",
    description:
      "Reference VCS platform for civil ATC, military operations and approach centers with proven safety-of-life redundancy.",
    capabilityTags: ["VCS", "ATC", "SAFETY-CRITICAL"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, commissioning & 24x7 support — ATC voice systems.",
    appliesToCapability: ["airspace-control"],
  },
  {
    id: "frequentis-icp",
    vendorId: "frequentis",
    productLine: "iCP IP-Based Communications Platform",
    description:
      "Fully IP-based voice control system for civil ATC, military operations and public safety control centers.",
    capabilityTags: ["VOIP", "ATC", "MISSION-CRITICAL"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration, commissioning & 24x7 support — IP voice platform.",
    appliesToCapability: ["airspace-control"],
  },
  {
    id: "frequentis-smartstrips",
    vendorId: "frequentis",
    productLine: "smartSTRIPS Electronic Flight Strips",
    description:
      "Electronic flight strip system for tower controllers with integrated coordination and clearance workflows.",
    capabilityTags: ["TOWER", "EFS", "AUTOMATION"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration & lifecycle support — tower automation portfolio.",
    appliesToCapability: ["airspace-control"],
  },
  {
    id: "frequentis-recording",
    vendorId: "frequentis",
    productLine: "Mission-Critical Voice Recording",
    description:
      "Safety-of-life voice and data recording for ATC, military and public safety with compliant replay and audit.",
    capabilityTags: ["RECORDING", "REPLAY", "COMPLIANT"],
    datasheetUrl: "#",
    authorizationScope:
      "MENA region: authorized integration & support — voice & data recording systems.",
    appliesToCapability: ["airspace-control"],
  },
];

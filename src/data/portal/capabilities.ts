import "server-only";
import type { PortalCapability } from "@/lib/portal/types";

export const capabilities: PortalCapability[] = [
  {
    slug: "secured-communications",
    title: "Secured Communications",
    shortDescription:
      "Tactical, encrypted and resilient communications for defense, public safety and government operators in the Levant.",
    approach:
      "Lunasat designs secured communications programs as an end-to-end chain — from the tactical edge through hardened transport into the command center — with every layer validated against the operational threat model. Programs are built based on the customer's needs coupled with best-in-class experience in the latest tech. We offer all kinds of software-defined radios, crypto-grade waveforms and network encryption that match the operating environment rather than the marketing brochure.\n\nIntegration is owned end-to-end. Our engineers handle waveform and link budget planning, network design based on geographic constraints, gateway interoperability and acceptance testing alongside specialists from L3Harris. Every deployment is met with operations training, maintenance training and spare parts, because a secured communications network is only as resilient as the people maintaining and operating it.",
    referenceArchitecture: [
      {
        title: "Tactical edge",
        description:
          "V/UHF software-defined radios with mission-specific waveforms, secure key management and crypto-zeroize procedures across manpack, vehicular and shelter form factors.",
      },
      {
        title: "Backhaul & transport",
        description:
          "AES-256 encryption over microwave, fiber and SATCOM links with redundant routing, deterministic latency and quality-of-service for voice and data overlays.",
      },
      {
        title: "Command & control",
        description:
          "Command and Control solution that connects all echelons. As part of the L3Harris Integrated Tactical Communication Systems family, the C2 streamlines network access through an easy-to-use interface.",
      },
      {
        title: "Cross-domain & interoperability",
        description:
          "Allied force interoperability and inter-agency connectivity for joint and coalition operations.",
      },
    ],
    vendorIds: ["l3harris"],
  },
  {
    slug: "security-surveillance",
    title: "Security & Surveillance",
    shortDescription:
      "Integrated perimeter and situational awareness for critical infrastructure and sensitive sites.",
    approach:
      "Security & surveillance projects fail when sensors, analytics and response fail to communicate. Lunasat builds a single integrated picture from radar, thermal imaging and RF sensors, fuses it into the operations center, and ties response procedures into the same workflow. The detect–assess–respond loop is engineered as one system rather than three silos.",
    referenceArchitecture: [
      {
        title: "Detect",
        description:
          "Thermal PTZ cameras, radars and RF sensors providing long-range perimeter coverage day and night, integrated into a unified sensor fabric.",
      },
      {
        title: "Identify",
        description:
          "AI-assisted algorithms identify threats based on cross-sensor data.",
      },
      {
        title: "Assess",
        description:
          "Centralized C2 situational awareness platform with cross-sensor correlation, AI-assisted classification and operator workflows for rapid threat assessment.",
      },
      {
        title: "Respond",
        description:
          "Structured response procedures integrated with soft and hard kill effectors.",
      },
    ],
    vendorIds: ["flir"],
  },
  {
    slug: "telecommunications",
    title: "Telecommunications",
    shortDescription:
      "Carrier-grade transport, synchronization and network assurance for mobile operators, government and industrial sites.",
    approach:
      "We work with Mobile Network Operators across timing, transmission and testing. As a Microchip partner, we deliver synchronization projects using atomic clocks and PTP grandmaster clocks to hold networks to nanosecond accuracy — and we analyze, install, commission and service the microwave links that carry the traffic, with 2,000+ links deployed to date. We also build out VSAT backhaul for remote sites, fiber and structured cabling, data center infrastructure, and mobile network testing programs. With a team that's over 90% engineers, we stay on site long after handover — preventive maintenance, field support and operator training are how our clients succeed.",
    referenceArchitecture: [
      {
        title: "Access",
        description:
          "Private LTE/5G, Wi-Fi 6E and fixed access for operator, industrial, government and enterprise sites — engineered for coverage, capacity and deterministic latency.",
      },
      {
        title: "Transport & backhaul",
        description:
          "Licensed microwave, DWDM optical, fiber and structured cabling, with VSAT backhaul where terrestrial routes don't reach — path-planned, commissioned and performance-monitored end to end.",
      },
      {
        title: "Synchronization & timing",
        description:
          "Atomic clock references and PTP grandmasters with GNSS resilience and holdover — nanosecond-accurate timing distributed across the network and monitored for drift.",
      },
      {
        title: "Spectrum, test & assurance",
        description:
          "Spectrum monitoring, interference hunting and regulatory spectrum management alongside RF coverage validation, drive testing and continuous network health reporting in every lifecycle program.",
      },
    ],
    vendorIds: ["nokia", "cisco", "microchip", "rohde-schwarz"],
  },
  {
    slug: "airspace-control",
    title: "Airspace & Control",
    shortDescription:
      "Air traffic management, voice communications and navigation aids for civil air navigation service providers and military authorities.",
    approach:
      "Airspace & control is a safety-of-life domain. Lunasat delivers complete ATC environments — from VHF ground-to-air voice infrastructure and CNS navigation aids including DME, DVOR and ILS, through tower automation and coverage assurance — designed against ICAO Annex 10 and EUROCAE standards.\n\nWe integrate voice communications platforms with ATC radios, navaids and coverage monitoring, deployed in dual-site redundant architectures with remote control and monitoring across every site. Every commissioning includes navaid ground calibration and flight-inspection support, formal site acceptance testing, controller training and a 24/7 support agreement.",
    referenceArchitecture: [
      {
        title: "Voice infrastructure",
        description:
          "Ground-to-air and ground-to-ground voice communications built to ED-137, with dual-site redundancy, recording and replay across tower, approach and en-route positions.",
      },
      {
        title: "Navigation aids",
        description:
          "DME, DVOR and ILS installed and commissioned to ICAO Annex 10, with remote control and monitoring, ground calibration and flight-inspection support.",
      },
      {
        title: "Surveillance & operations",
        description:
          "Surveillance feeds and flight data processing integrated into tower automation and the controller working position — electronic flight strips, recording and training simulators.",
      },
      {
        title: "Assurance & sustainment",
        description:
          "Automated VHF coverage and signal-quality monitoring with continuous reporting and proactive alerting, backed by formal site acceptance testing, controller training and 24×7 locally based engineers.",
      },
    ],
    vendorIds: ["frequentis", "rohde-schwarz"],
  },
];

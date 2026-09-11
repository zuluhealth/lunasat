import { requirePartnerSession } from "@/lib/portal/session";
import React from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import PillarHeader from "@/components/portal/PillarHeader";
import { capabilities } from "@/data/portal/capabilities";
import type { PortalCapability } from "@/lib/portal/types";

type ReferenceArchitecture = PortalCapability["referenceArchitecture"][number];

// Airport-relevant capability items, pulled ONLY from existing capabilities
// data. Each entry names the source capability + reference-architecture layer
// so descriptions are never invented — they are read verbatim from the deck.
interface IntegrationSelector {
  capabilitySlug: PortalCapability["slug"];
  layerTitle: string;
}

const AIRPORT_INTEGRATIONS: IntegrationSelector[] = [
  // ATC voice / VCS + tower systems
  { capabilitySlug: "airspace-control", layerTitle: "Voice infrastructure" },
  { capabilitySlug: "airspace-control", layerTitle: "Surveillance & operations" },
  // Perimeter / PTZ surveillance
  { capabilitySlug: "security-surveillance", layerTitle: "Detect" },
  // Trunked radio / private LTE
  { capabilitySlug: "telecommunications", layerTitle: "Access" },
];

interface ResolvedIntegration {
  id: string;
  capabilityTitle: string;
  capabilityHref: string;
  layer: ReferenceArchitecture;
}

const capabilityHref: Record<PortalCapability["slug"], string> = {
  "secured-communications": "/portal#capability-secured-communications",
  "security-surveillance": "/portal#capability-security-surveillance",
  telecommunications: "/portal#capability-telecommunications",
  "airspace-control": "/portal#capability-airspace-control",
};

function resolveIntegrations(): ResolvedIntegration[] {
  return AIRPORT_INTEGRATIONS.map((selector, idx) => {
    const capability = capabilities.find(
      (c) => c.slug === selector.capabilitySlug,
    );
    const layer = capability?.referenceArchitecture.find(
      (l) => l.title === selector.layerTitle,
    );
    if (!capability || !layer) return null;
    return {
      id: `AIR-${String(idx + 1).padStart(2, "0")}`,
      capabilityTitle: capability.title,
      capabilityHref: capabilityHref[capability.slug],
      layer,
    };
  }).filter((r): r is ResolvedIntegration => r !== null);
}

const operationalLayers = [
  {
    id: "OPS-01",
    title: "Airside & tower",
    body: "Ground-to-air and ground-to-ground voice, tower automation and controller working positions run as a safety-of-life environment where every layer has a documented failure mode.",
  },
  {
    id: "OPS-02",
    title: "Perimeter & landside",
    body: "The fence line, apron and terminal edge form a continuous surveillance envelope — long-range thermal and PTZ coverage feeding a single operations picture, day and night.",
  },
  {
    id: "OPS-03",
    title: "Connectivity fabric",
    body: "Operational teams, apron vehicles and fixed systems ride a private wireless and radio layer engineered for coverage, capacity and deterministic latency across the whole site.",
  },
];

const deliverySteps = ["Design", "Supply", "Install", "Train", "Maintain"];

export default async function AirportsSectorPage() {
  await requirePartnerSession();
  const integrations = resolveIntegrations();

  return (
    <div className={styles.page}>
      <p className={styles.templateNote}>
        [ TEMPLATE PAGE — AWAITING AIRPORT SOLUTIONS DECK CONTENT ]
      </p>

      <PillarHeader
        eyebrow="SECTOR // AIRPORTS"
        title="Airports"
        description="An airport is a layered security and communications environment: safety-critical air traffic voice in the tower, a continuous surveillance perimeter around the airfield, and a private connectivity fabric under everything. Lunasat integrates these layers as one system."
        meta="SECTOR: AIRPORTS // STATUS: LIVE"
      />

      {/* Operational picture */}
      <section className={styles.section} aria-labelledby="ops-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>// 01</span>
          <h2 id="ops-heading" className={styles.sectionTitle}>
            Operational picture
          </h2>
        </div>
        <div className={styles.opsGrid}>
          {operationalLayers.map((layer) => (
            <article key={layer.id} className={styles.opsCard}>
              <span className={styles.opsId}>{layer.id}</span>
              <h3 className={styles.opsTitle}>{layer.title}</h3>
              <p className={styles.opsBody}>{layer.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* What Lunasat integrates */}
      <section className={styles.section} aria-labelledby="integrates-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>// 02</span>
          <h2 id="integrates-heading" className={styles.sectionTitle}>
            What Lunasat integrates
          </h2>
        </div>
        <div className={styles.integrationStack}>
          {integrations.map((item) => (
            <article key={item.id} className={styles.integrationRow}>
              <div className={styles.integrationMeta}>
                <span className={styles.integrationId}>{item.id}</span>
                <Link
                  href={item.capabilityHref}
                  className={styles.integrationSource}
                >
                  {item.capabilityTitle} &rarr;
                </Link>
              </div>
              <div className={styles.integrationBody}>
                <h3 className={styles.integrationTitle}>{item.layer.title}</h3>
                <p className={styles.integrationDescription}>
                  {item.layer.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Delivery model */}
      <section className={styles.section} aria-labelledby="delivery-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>// 03</span>
          <h2 id="delivery-heading" className={styles.sectionTitle}>
            Delivery model
          </h2>
        </div>
        <div className={styles.deliveryBlock}>
          <ol className={styles.deliveryLine}>
            {deliverySteps.map((step, idx) => (
              <li key={step} className={styles.deliveryStep}>
                <span className={styles.deliveryStepLabel}>{step}</span>
                {idx < deliverySteps.length - 1 && (
                  <span className={styles.deliveryArrow} aria-hidden="true">
                    &rarr;
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className={styles.deliveryProse}>
            Lunasat owns the airport program across its full lifecycle — from
            design and supply through installation, operator training and
            long-term maintenance — with locally based engineers accountable at
            every gate.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta} aria-labelledby="cta-heading">
        <div className={styles.ctaBody}>
          <span className={styles.ctaEyebrow}>// NEXT STEP</span>
          <h2 id="cta-heading" className={styles.ctaTitle}>
            Bring an airport program to Lunasat
          </h2>
          <p className={styles.ctaText}>
            Open a conversation to scope air traffic voice, surveillance and
            private connectivity for a specific airfield.
          </p>
        </div>
        <Link href="/#contact" className={styles.ctaLink}>
          [ GET IN TOUCH &rarr; ]
        </Link>
      </section>
    </div>
  );
}

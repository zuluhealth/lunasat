import React from "react";
import Image from "next/image";
import styles from "./TechnologyPartnersSection.module.scss";
import PillarHeader from "@/components/portal/PillarHeader";
import { vendors } from "@/data/portal/vendors";
import type { PartnerVendor, PortalCapability } from "@/lib/portal/types";

const DOMAIN_LABELS: Record<PortalCapability["slug"], string> = {
  "secured-communications": "Secured Comms",
  "security-surveillance": "Security & Surveillance",
  telecommunications: "Telecom",
  "airspace-control": "Airspace & Control",
};

function domainSlugs(vendor: PartnerVendor): PortalCapability["slug"][] {
  const seen = new Set<PortalCapability["slug"]>();
  const ordered: PortalCapability["slug"][] = [];
  for (const entry of vendor.applicableTo) {
    if (!seen.has(entry.capabilitySlug)) {
      seen.add(entry.capabilitySlug);
      ordered.push(entry.capabilitySlug);
    }
  }
  return ordered;
}

export default function TechnologyPartnersSection() {
  return (
    <div className={styles.page}>
      <PillarHeader
        as="h2"
        eyebrow="PROOF // TECHNOLOGY PARTNERS"
        title="Technology Partners"
        description="The OEM ecosystem of technology partners we've worked with already — across secured communications, surveillance, telecommunications and airspace control. Select a partner to open their site."
        meta={`PARTNERS: ${String(vendors.length).padStart(2, "0")}`}
      />

      <section className={styles.section} aria-labelledby="partners-ecosystem">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>// 07</span>
          <h3 id="partners-ecosystem" className={styles.sectionTitle}>
            You&apos;d be in good company.
          </h3>
        </div>

        <div className={styles.grid}>
          {vendors.map((vendor) => {
            const slugs = domainSlugs(vendor);
            const inner = (
              <>
                <div className={styles.logoWrap}>
                  {vendor.logo ? (
                    <Image
                      className={styles.logo}
                      src={vendor.logo}
                      alt={vendor.name}
                      fill
                      sizes="140px"
                      loading="lazy"
                      // Match the public partner grid: serve the bundled logo directly.
                      unoptimized
                    />
                  ) : (
                    <span className={styles.logoFallback}>{vendor.name}</span>
                  )}
                </div>
                <span className={styles.vendorName}>{vendor.name}</span>
                <div className={styles.chips}>
                  {slugs.map((slug) => (
                    <span key={slug} className={styles.chip}>
                      {DOMAIN_LABELS[slug]}
                    </span>
                  ))}
                </div>
              </>
            );

            return vendor.website ? (
              <a
                key={vendor.id}
                className={`${styles.card} ${styles.cardLink}`}
                href={vendor.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${vendor.name} — open website`}
              >
                {inner}
                <span className={styles.cardCta} aria-hidden="true">
                  [ VISIT SITE &rarr; ]
                </span>
              </a>
            ) : (
              <article key={vendor.id} className={styles.card}>
                {inner}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

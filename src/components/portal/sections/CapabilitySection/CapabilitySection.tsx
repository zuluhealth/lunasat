import React from "react";
import styles from "./CapabilitySection.module.scss";
import PillarHeader from "@/components/portal/PillarHeader";
import PartnerProductCard from "@/components/portal/PartnerProductCard";
import { capabilities } from "@/data/portal/capabilities";
import { products } from "@/data/portal/products";
import { vendors } from "@/data/portal/vendors";
import type { PortalCapability } from "@/lib/portal/types";

interface CapabilitySectionProps {
  slug: PortalCapability["slug"];
  /** Capability number shown in the eyebrow, e.g. "03". */
  number: string;
}

function makeRefId(index: number): string {
  return `REF-A${String(index + 1).padStart(2, "0")}`;
}

const CapabilitySection: React.FC<CapabilitySectionProps> = ({
  slug,
  number,
}) => {
  const capability = capabilities.find((c) => c.slug === slug);

  if (!capability) {
    return null;
  }

  const capabilityProducts = products.filter((p) =>
    p.appliesToCapability.includes(capability.slug),
  );

  // Group by vendor while preserving capability vendor ordering
  const groupedByVendor = capability.vendorIds
    .map((vendorId) => {
      const vendor = vendors.find((v) => v.id === vendorId);
      if (!vendor) return null;
      const vendorProducts = capabilityProducts.filter(
        (p) => p.vendorId === vendorId,
      );
      if (vendorProducts.length === 0) return null;
      const scopeForCapability =
        vendor.applicableTo.find((a) => a.capabilitySlug === capability.slug)
          ?.scope ?? "";
      return { vendor, products: vendorProducts, scope: scopeForCapability };
    })
    .filter((g): g is NonNullable<typeof g> => g !== null);

  const partnerCount = groupedByVendor.length;
  const productCount = capabilityProducts.length;
  const meta = `AUTHORIZED PARTNERS: ${String(partnerCount).padStart(2, "0")} // PRODUCT LINES: ${String(productCount).padStart(2, "0")}`;

  const approachParagraphs = capability.approach.split(/\n\n+/);

  return (
    <div className={styles.page}>
      <PillarHeader
        as="h2"
        eyebrow={`CAPABILITY // ${number}`}
        title={capability.title}
        description={capability.shortDescription}
        meta={meta}
      />

      {/* Integration approach */}
      <section
        className={styles.section}
        aria-labelledby={`${slug}-approach`}
      >
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>// 01</span>
          <h3 id={`${slug}-approach`} className={styles.sectionTitle}>
            Integration Approach
          </h3>
        </div>
        <div className={styles.approach}>
          <div className={styles.approachAccent} aria-hidden="true" />
          <div className={styles.approachBody}>
            {approachParagraphs.map((paragraph, idx) => (
              <p key={idx} className={styles.approachParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.divider} aria-hidden="true">
        <span>// SECTION BREAK</span>
      </div>

      {/* Reference architectures */}
      <section className={styles.section} aria-labelledby={`${slug}-ref`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>// 02</span>
          <h3 id={`${slug}-ref`} className={styles.sectionTitle}>
            Reference Architectures
          </h3>
        </div>
        <div className={styles.refGrid}>
          {capability.referenceArchitecture.map((ref, idx) => (
            <article key={ref.title} className={styles.refCard}>
              <span className={styles.refId}>{makeRefId(idx)}</span>
              <h4 className={styles.refTitle}>{ref.title}</h4>
              <p className={styles.refDescription}>{ref.description}</p>
            </article>
          ))}
        </div>
      </section>

      <div className={styles.divider} aria-hidden="true">
        <span>// SECTION BREAK</span>
      </div>

      {/* Partners & products */}
      <section className={styles.section} aria-labelledby={`${slug}-partners`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>// 03</span>
          <h3 id={`${slug}-partners`} className={styles.sectionTitle}>
            Authorized Partners &amp; Products
          </h3>
        </div>
        <div className={styles.partnersGroups}>
          {groupedByVendor.map(({ vendor, products: vendorProducts, scope }) => (
            <div key={vendor.id} className={styles.vendorGroup}>
              <div className={styles.vendorHeader}>
                <span className={styles.vendorHeaderName}>{vendor.name}</span>
                {scope && (
                  <span className={styles.vendorHeaderScope}>{scope}</span>
                )}
              </div>
              <div className={styles.productGrid}>
                {vendorProducts.map((product) => (
                  <PartnerProductCard
                    key={product.id}
                    product={product}
                    vendor={vendor}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CapabilitySection;

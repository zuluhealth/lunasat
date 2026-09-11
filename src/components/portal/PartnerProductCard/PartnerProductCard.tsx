import React from "react";
import styles from "./PartnerProductCard.module.scss";
import TextReveal from "@/components/TextReveal/TextReveal";
import type { PartnerProduct, PartnerVendor } from "@/lib/portal/types";

interface PartnerProductCardProps {
  product: PartnerProduct;
  vendor: PartnerVendor;
}

function vendorInitials(name: string): string {
  const stripped = name.replace(/&/g, "");
  const parts = stripped
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

const PartnerProductCard: React.FC<PartnerProductCardProps> = ({
  product,
  vendor,
}) => {
  // Brochures are hosted per product; until a real file is wired up the card
  // states that the datasheet is available on request rather than offering a
  // link that goes nowhere.
  const hasDatasheet =
    Boolean(product.datasheetUrl) && product.datasheetUrl !== "#";

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div className={styles.vendor}>
          <div className={styles.vendorLogo} aria-hidden="true">
            <span className={styles.vendorLogoGlyph}>
              {vendorInitials(vendor.name)}
            </span>
          </div>
          <span className={styles.vendorName}>
            <TextReveal text={vendor.name.toUpperCase()} />
          </span>
        </div>
        <span className={styles.idTag}>{product.id}</span>
      </header>

      <h3 className={styles.title}>{product.productLine}</h3>
      <p className={styles.description}>{product.description}</p>

      {product.capabilityTags.length > 0 && (
        <ul className={styles.tags} aria-label="Capability tags">
          {product.capabilityTags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.authorization}>
        <span className={styles.authorizationLabel}>AUTHORIZED:</span>
        <span className={styles.authorizationScope}>
          {product.authorizationScope}
        </span>
      </div>

      {hasDatasheet ? (
        <a
          href={product.datasheetUrl}
          className={styles.datasheet}
          target="_blank"
          rel="noopener noreferrer"
        >
          [ DOWNLOAD DATASHEET <span aria-hidden="true">&rarr;</span> ]
        </a>
      ) : (
        <span className={styles.datasheetPending}>
          [ BROCHURE ON REQUEST ]
        </span>
      )}
    </article>
  );
};

export default PartnerProductCard;

import React from "react";
import styles from "./OverviewSection.module.scss";
import PillarHeader from "@/components/portal/PillarHeader";

interface FactTile {
  id: string;
  value: string;
  label: string;
}

const factTiles: FactTile[] = [
  { id: "OVR-01", value: "23", label: "YEARS OF EXCELLENCE" },
  { id: "OVR-02", value: "90%", label: "ENGINEERS" },
  { id: "OVR-03", value: "PROVEN", label: "INTEGRATOR" },
  { id: "OVR-04", value: "TRUSTED", label: "BY CLIENTS" },
];

export default function OverviewSection() {
  return (
    <div className={styles.page}>
      <PillarHeader
        as="h2"
        eyebrow="BRIEFING // 01"
        title="The local-partner thesis"
        description="Lunasat is your regional partner, not a vendor. Top companies appoint Lunasat to carry its product line into the region as a certified integrator. We work on large scale programs with our clients, and integrate the right product into the program."
        meta="23 YRS OF EXCELLENCE // 90% ENGINEERS // CERTIFIED INTEGRATOR"
      />

      <section className={styles.section} aria-labelledby="overview-thesis">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>// 01</span>
          <h3 id="overview-thesis" className={styles.sectionTitle}>
            What a principal gets
          </h3>
        </div>
        <div className={styles.proseGrid}>
          <p className={styles.prose}>
            A principal appointing Lunasat does not hire a reseller. It plugs
            its product line into an established operator program. The people
            who design the work, deliver and sustain it for the clients are the
            best positioned to recommend the best products.
          </p>
          <p className={styles.prose}>
            Lunasat designs full programs for our clients depending on their
            needs. Over 23 years we&apos;ve gained our clients&apos; trust by
            delivering complex products in all our sectors, and our
            engineers&apos; daily presence and support positions Lunasat
            excellently to introduce the right products — and the right
            combinations of products — for each program. Our engineers are very
            strong technically as well.
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="overview-facts">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>// 02</span>
          <h3 id="overview-facts" className={styles.sectionTitle}>
            The integrator, in brief
          </h3>
        </div>
        <div className={styles.tileGrid}>
          {factTiles.map((tile) => (
            <article key={tile.id} className={styles.tile}>
              <span className={styles.tileId}>{tile.id}</span>
              <span className={styles.tileValue}>{tile.value}</span>
              <span className={styles.tileLabel}>{tile.label}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

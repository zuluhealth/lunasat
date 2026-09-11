import React from "react";
import styles from "./ProvenDeliverySection.module.scss";
import PillarHeader from "@/components/portal/PillarHeader";

interface DeliveryStat {
  value: string;
  label: string;
}

const deliveryStats: DeliveryStat[] = [
  { value: "57,000+", label: "Radios delivered" },
  { value: "6,000+", label: "VSAT terminals" },
  { value: "2,000+", label: "Microwave links" },
  { value: "200+", label: "Projects delivered" },
  { value: "5,800+", label: "Personnel trained" },
];

interface DepthCapability {
  title: string;
  detail: string;
}

const inCountryDepth: DepthCapability[] = [
  {
    title: "Forward-deployed FSR teams",
    detail:
      "Field service representatives positioned in-theatre, embedded alongside operators rather than dispatched from abroad.",
  },
  {
    title: "In-country testing",
    detail:
      "Local calibration and integration expertise that keep fault isolation, repair and acceptance testing inside the country of operation.",
  },
  {
    title: "Level 3+ maintenance",
    detail:
      "Depot-grade repair capability beyond swap-and-replace — board-level diagnosis, overhaul and return-to-service under sovereign control.",
  },
  {
    title: "24/7 support posture",
    detail:
      "Round-the-clock coverage aligned to mission-critical availability, with escalation paths that never leave the operator waiting on a distant time zone.",
  },
];

export default function ProvenDeliverySection() {
  return (
    <div className={styles.page}>
      <PillarHeader
        as="h2"
        eyebrow="TRACK RECORD // PROVEN DELIVERY"
        title="Proven Delivery"
        description="23 years of delivered volume across radios, satellite and terrestrial backhaul, building nationwide networks and secure routes for critical customers, sustained by in-country engineering depth. The numbers below reflect fielded systems in operational service across MENA."
        meta={`STATS: ${String(deliveryStats.length).padStart(2, "0")} // REGION: MENA // FIELDED`}
      />

      <section className={styles.section} aria-labelledby="delivery-stats">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>// 04</span>
          <h3 id="delivery-stats" className={styles.sectionTitle}>
            Delivery At Scale
          </h3>
        </div>
        <div className={styles.statWall}>
          {deliveryStats.map((stat, idx) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statId}>
                [ {String(idx + 1).padStart(2, "0")} ]
              </span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="delivery-depth">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>// 04.1</span>
          <h3 id="delivery-depth" className={styles.sectionTitle}>
            In-Country Depth
          </h3>
        </div>
        <div className={styles.depthGrid}>
          {inCountryDepth.map((capability, idx) => (
            <article key={capability.title} className={styles.depthCard}>
              <span className={styles.depthId}>
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h4 className={styles.depthTitle}>{capability.title}</h4>
              <p className={styles.depthDetail}>{capability.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

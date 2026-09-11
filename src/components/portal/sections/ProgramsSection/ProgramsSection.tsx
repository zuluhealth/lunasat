import React from "react";
import styles from "./ProgramsSection.module.scss";
import PillarHeader from "@/components/portal/PillarHeader";
import { programClusters } from "@/data/portal/programs";

function makeCardId(prefix: string, idx: number): string {
  return `${prefix}-${String(idx + 1).padStart(2, "0")}`;
}

export default function ProgramsSection() {
  const totalCards = programClusters.reduce(
    (sum, cluster) => sum + cluster.cards.length,
    0,
  );

  return (
    <div className={styles.page}>
      <PillarHeader
        as="h2"
        eyebrow="PROGRAM // PROGRAMS"
        title="Program Clusters"
        description="Six program clusters, anonymized — proof, not a data dump."
        meta={`CLUSTERS: ${String(programClusters.length).padStart(2, "0")} // PROGRAMS: ${String(totalCards).padStart(2, "0")} // ANONYMIZED`}
      />

      {programClusters.map((cluster, clusterIdx) => {
        const number = String(clusterIdx + 1).padStart(2, "0");
        const idPrefix = cluster.id.toUpperCase();
        return (
          <section
            key={cluster.id}
            className={styles.section}
            aria-labelledby={`cluster-${cluster.id}`}
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>// {number}</span>
              <h3 id={`cluster-${cluster.id}`} className={styles.sectionTitle}>
                {cluster.title}
              </h3>
            </div>
            <p className={styles.sectionSummary}>{cluster.summary}</p>
            <div className={styles.grid}>
              {cluster.cards.map((card, idx) => (
                <article key={card.title} className={styles.card}>
                  <span className={styles.cardId}>
                    {makeCardId(idPrefix, idx)}
                  </span>
                  <h4 className={styles.cardTitle}>{card.title}</h4>
                  <p className={styles.cardScope}>{card.scope}</p>
                  <div className={styles.cardStack}>
                    <span className={styles.cardStackLabel}>STACK</span>
                    <span className={styles.cardStackValue}>{card.stack}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

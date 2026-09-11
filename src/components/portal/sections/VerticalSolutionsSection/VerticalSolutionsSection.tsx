import React from "react";
import Link from "next/link";
import styles from "./VerticalSolutionsSection.module.scss";
import PillarHeader from "@/components/portal/PillarHeader";
import TextReveal from "@/components/TextReveal/TextReveal";

interface SectorCard {
  id: string;
  name: string;
  summary: string;
  href?: string;
  status: "live" | "in-production";
}

const sectors: SectorCard[] = [
  {
    id: "SEC-01",
    name: "Airports",
    summary:
      "The airport as a layered security and communications environment — air traffic voice, tower systems, perimeter surveillance and private wireless integrated end to end.",
    href: "/portal/sectors/airports",
    status: "live",
  },
  {
    id: "SEC-02",
    name: "Ports",
    summary:
      "Landside and waterside protection, operational connectivity and command integration for port authorities and terminal operators.",
    status: "in-production",
  },
  {
    id: "SEC-03",
    name: "Borders",
    summary:
      "Wide-area detection, response and secured communications across long frontier and coastal boundaries.",
    status: "in-production",
  },
  {
    id: "SEC-04",
    name: "Energy",
    summary:
      "Critical-infrastructure surveillance, private wireless and hardened networks for generation, transmission and production sites.",
    status: "in-production",
  },
  {
    id: "SEC-05",
    name: "Telecom",
    summary:
      "Carrier-grade transport, private wireless and network security for national and industrial operators.",
    status: "in-production",
  },
];

export default function VerticalSolutionsSection() {
  const liveCount = sectors.filter((s) => s.status === "live").length;
  const inProductionCount = sectors.filter(
    (s) => s.status === "in-production",
  ).length;

  return (
    <div className={styles.page}>
      <PillarHeader
        as="h2"
        eyebrow="SOLUTIONS // 10"
        title="Vertical solutions"
        description="Our standard vertical solutions. Lunasat's capabilities recombine differently for each operating environment — these views map air traffic voice, surveillance, secured communications and private wireless onto the mission of a specific vertical, starting with airports."
        meta={`LIVE: ${String(liveCount).padStart(2, "0")} // IN PRODUCTION: ${String(inProductionCount).padStart(2, "0")}`}
      />

      <section className={styles.grid} aria-label="Sectors">
        {sectors.map((sector) =>
          sector.status === "live" && sector.href ? (
            <Link key={sector.id} href={sector.href} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.cardId}>{sector.id}</span>
                <span className={styles.cardChipLive} aria-hidden="true">
                  [ LIVE ]
                </span>
              </div>
              <h3 className={styles.cardTitle}>
                <TextReveal text={sector.name} />
              </h3>
              <p className={styles.cardSummary}>{sector.summary}</p>
              <span className={styles.cardCta} aria-hidden="true">
                [ ENTER &rarr; ]
              </span>
            </Link>
          ) : (
            <article
              key={sector.id}
              className={`${styles.card} ${styles.cardDimmed}`}
            >
              <div className={styles.cardHead}>
                <span className={styles.cardId}>{sector.id}</span>
                <span className={styles.cardChip} aria-hidden="true">
                  [ IN PRODUCTION ]
                </span>
              </div>
              <h3 className={styles.cardTitle}>{sector.name}</h3>
              <p className={styles.cardSummary}>{sector.summary}</p>
            </article>
          ),
        )}
      </section>
    </div>
  );
}

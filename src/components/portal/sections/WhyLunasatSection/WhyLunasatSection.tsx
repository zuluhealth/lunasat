import React from "react";
import styles from "./WhyLunasatSection.module.scss";
import PillarHeader from "@/components/portal/PillarHeader";

interface ProofBlock {
  id: string;
  title: string;
  body: string;
}

const proofBlocks: ProofBlock[] = [
  {
    id: "WHY-01",
    title: "In-country since 2007",
    body: "Offices in Lebanon and Iraq since 2007. Response and sustainment run through people who already live in the market, not engineers flown in per incident.",
  },
  {
    id: "WHY-02",
    title: "Government relationships",
    body: "Established relationships with the government and end-user authorities that gate procurement. A principal enters through high levels of trust and mutual respect.",
  },
  {
    id: "WHY-03",
    title: "10+ Centers of Excellence",
    body: "More than 10 Centers of Excellence across the region provide training, maintenance and integration capacity to the customer.",
  },
  {
    id: "WHY-04",
    title: "Level 3+ local maintenance",
    body: "Local maintenance capability to Level 3 and above. Deep repair and sustainment happen in-country, with rare back and forth with the principal.",
  },
  {
    id: "WHY-05",
    title: "ITAR / FCPA / UKBA / TRACE compliance",
    body: "Operating under ITAR, FCPA, UKBA and TRACE compliance regimes. A principal's export-control and anti-bribery exposure is carried by a partner already governed to those standards.",
  },
  {
    id: "WHY-06",
    title: "Emergency delivery in active environments",
    body: "Proven emergency delivery in active operational environments, ensuring readiness in active warzones and contested conditions.",
  },
];

export default function WhyLunasatSection() {
  return (
    <div className={styles.page}>
      <PillarHeader
        as="h2"
        eyebrow="BRIEFING // 02"
        title="Why partner with Lunasat"
        description="For a principal, the region is a market-entry risk before it is a revenue opportunity. Lunasat de-risks that entry: the relationships, compliance posture and in-region infrastructure that make a reachable market already exist."
        meta="IN-COUNTRY SINCE 2007 // 10+ CENTERS OF EXCELLENCE // ITAR / FCPA / UKBA / TRACE"
      />

      <section className={styles.section} aria-labelledby="why-proof">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>// 01</span>
          <h3 id="why-proof" className={styles.sectionTitle}>
            How Lunasat de-risks market entry
          </h3>
        </div>
        <div className={styles.grid}>
          {proofBlocks.map((block) => (
            <article key={block.id} className={styles.card}>
              <span className={styles.cardId}>{block.id}</span>
              <h4 className={styles.cardTitle}>{block.title}</h4>
              <p className={styles.cardBody}>{block.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.banner} aria-label="Closing statement">
        <span className={styles.bannerMark}>//</span>
        <p className={styles.bannerText}>
          You don&apos;t build a region. You plug into one that already exists.
        </p>
      </section>
    </div>
  );
}

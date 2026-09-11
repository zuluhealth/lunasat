import React from "react";
import styles from "./ComplianceSection.module.scss";
import PillarHeader from "@/components/portal/PillarHeader";
import TextReveal from "@/components/TextReveal/TextReveal";

interface RegimeTile {
  id: string;
  code: string;
  name: string;
  jurisdiction: string;
  summary: string;
}

const regimes: RegimeTile[] = [
  {
    id: "regime-itar",
    code: "ITAR",
    name: "Trade & Export Controls",
    jurisdiction: "US",
    summary:
      "US trade and export control framework governing defense articles, technical data and controlled technology transfers.",
  },
  {
    id: "regime-fcpa",
    code: "FCPA",
    name: "Anti-Bribery",
    jurisdiction: "US",
    summary:
      "US anti-bribery statute prohibiting improper payments to foreign officials to obtain or retain business.",
  },
  {
    id: "regime-ukba",
    code: "UKBA",
    name: "Anti-Bribery",
    jurisdiction: "UK",
    summary:
      "UK anti-bribery legislation imposing strict liability for failure to prevent bribery across the organization.",
  },
  {
    id: "regime-trace",
    code: "TRACE",
    name: "Due-Diligence Membership",
    jurisdiction: "GLOBAL",
    summary:
      "TRACE anti-bribery due-diligence membership, providing verified compliance vetting of the partner and its counterparties.",
  },
  {
    id: "regime-cmmc",
    code: "CMMC",
    name: "Cybersecurity Standard",
    jurisdiction: "US",
    summary:
      "US Department of Defense cybersecurity maturity model governing how controlled unclassified information is stored, handled and transmitted.",
  },
];

export default function ComplianceSection() {
  return (
    <div className={styles.page}>
      <PillarHeader
        as="h2"
        eyebrow="OPERATIONS // COMPLIANCE & GOVERNANCE"
        title="Compliance & Governance"
        description="When it comes to handling sensitive and export-controlled data, Lunasat takes security and governance very seriously. Protocols and guidelines are held to the highest of standards, with strict adoption among team members."
        meta={`REGIMES: ${String(regimes.length).padStart(2, "0")} // EXPORT CONTROL // ANTI-BRIBERY // CYBERSECURITY`}
      />

      <section className={styles.section} aria-labelledby="governance-regimes">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>// 01</span>
          <h3 id="governance-regimes" className={styles.sectionTitle}>
            Governance Framework
          </h3>
        </div>

        <div className={styles.regimeGrid}>
          {regimes.map((regime) => (
            <article key={regime.id} className={styles.regimeTile}>
              <div className={styles.regimeEyebrow}>
                <span className={styles.regimeJurisdiction}>
                  {regime.jurisdiction}
                </span>
                <span className={styles.regimeName}>{regime.name}</span>
              </div>
              <h4 className={styles.regimeCode}>
                <TextReveal text={regime.code} />
              </h4>
              <p className={styles.regimeSummary}>{regime.summary}</p>
            </article>
          ))}
        </div>

        <div className={styles.postureBlock}>
          <span className={styles.postureLabel}>
            // EXPORT-CONTROL POSTURE
          </span>
          <p className={styles.postureParagraph}>
            Lunasat operates under the principal export-control regimes that
            govern the defense, communications and surveillance technologies it
            integrates. Every engagement is anchored in end-use and end-user
            documentation discipline — controlled articles and technical data
            move only against verified end-use certificates, and re-export and
            retransfer obligations are tracked through the lifecycle of each
            deployment. All transactions, counterparties and beneficial owners
            are screened against sanctions, denied-party and politically-exposed
            lists before commitment, and re-screened when relationships
            materially change. Where a transaction cannot be documented and
            cleared, we do not proceed.
          </p>
        </div>
      </section>
    </div>
  );
}

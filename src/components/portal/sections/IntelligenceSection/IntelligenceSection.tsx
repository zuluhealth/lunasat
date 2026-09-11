import React from "react";
import styles from "./IntelligenceSection.module.scss";
import PillarHeader from "@/components/portal/PillarHeader";
import PendingBlock from "@/components/portal/PendingBlock";

export default function IntelligenceSection() {
  return (
    <div className={styles.page}>
      <PillarHeader
        as="h2"
        eyebrow="CAPABILITY // 02"
        title="Intelligence"
        description="A fifth capability pillar alongside secured communications, security & surveillance, telecommunications and airspace & control."
        meta="POSITIONING // REFERENCE ARCHITECTURES // PARTNERS — PENDING"
      />

      <PendingBlock label="CONTENT PENDING — CAPABILITY BRIEF">
        Positioning statement, integration approach, reference architectures and
        authorized partners for the Intelligence pillar are still to be supplied
        by Lunasat. The section is in place so it can be filled without
        restructuring the briefing.
      </PendingBlock>
    </div>
  );
}

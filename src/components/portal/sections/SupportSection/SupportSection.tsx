import React from "react";
import styles from "./SupportSection.module.scss";
import PillarHeader from "@/components/portal/PillarHeader";
import PendingBlock from "@/components/portal/PendingBlock";

export default function SupportSection() {
  return (
    <div className={styles.page}>
      <PillarHeader
        as="h2"
        eyebrow="OPERATIONS // SUPPORT & SUSTAINMENT"
        title="Support & Sustainment"
        description="Mission-critical infrastructure is not delivered and abandoned. We sustain what we deploy across the full lifecycle with engineers on the ground, preventive operations and training that lasts."
        meta="PREVENTIVE MAINTENANCE // INSTALLATION // TRAINING // 24x7"
      />

      <PendingBlock label="CONTENT PENDING — REAL SUPPORT CASES">
        This section will carry real examples of support Lunasat has delivered
        in the field — with photography from the sites themselves.
      </PendingBlock>
    </div>
  );
}

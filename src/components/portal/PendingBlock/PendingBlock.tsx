import React from "react";
import styles from "./PendingBlock.module.scss";

interface PendingBlockProps {
  label: string;
  children: React.ReactNode;
}

/**
 * Marks a section whose copy is still owned by Lunasat — visible in the portal
 * so the gap is explicit rather than silently missing.
 */
const PendingBlock: React.FC<PendingBlockProps> = ({ label, children }) => (
  <div className={styles.pendingBlock}>
    <span className={styles.pendingLabel}>[ {label} ]</span>
    <p className={styles.pendingText}>{children}</p>
  </div>
);

export default PendingBlock;

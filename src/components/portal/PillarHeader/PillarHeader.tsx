import React from "react";
import styles from "./PillarHeader.module.scss";
import TextReveal from "@/components/TextReveal/TextReveal";

interface PillarHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
  /**
   * Heading level for the title. The portal reads as one page, so sections
   * render an h2 and only the hub cover keeps the h1.
   */
  as?: "h1" | "h2";
}

const PillarHeader: React.FC<PillarHeaderProps> = ({
  eyebrow,
  title,
  description,
  meta,
  as: Heading = "h1",
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.eyebrow}>
        <span className={styles.eyebrowMark}>//</span>
        <span className={styles.eyebrowText}>{eyebrow}</span>
      </div>
      <Heading className={styles.title}>
        <TextReveal text={title} />
      </Heading>
      <p className={styles.description}>{description}</p>
      {meta && (
        <div className={styles.meta}>
          <span className={styles.metaText}>{meta}</span>
        </div>
      )}
    </header>
  );
};

export default PillarHeader;

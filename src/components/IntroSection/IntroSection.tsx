import React from 'react';
import TextReveal from '../TextReveal/TextReveal';
import styles from './IntroSection.module.scss';

interface IntroSectionProps {
  title: string;
  description: string | string[];
}

const IntroSection: React.FC<IntroSectionProps> = ({ title, description }) => {
  const descriptions = Array.isArray(description) ? description : [description];

  return (
    <section className={styles.section}>
      <div className={styles.gridOverlay} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <TextReveal text={title} trigger="inView" />
          </h2>
          <div className={styles.descriptions}>
            {descriptions.map((desc, index) => (
              <p key={index} className={styles.description}>{desc}</p>
            ))}
          </div>
          <div className={styles.line} />
        </div>
        <div className={styles.decorative}>
           <div className={styles.marker}>01</div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;

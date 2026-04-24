import React from 'react';
import styles from './StatsSection.module.scss';
import TextReveal from '../TextReveal/TextReveal';

interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.stat}>
              <div className={styles.value}>
                <TextReveal text={stat.value} trigger="inView" delay={index * 200} />
              </div>
              <div className={styles.label}>
                 <TextReveal text={stat.label} trigger="inView" delay={index * 200 + 400} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

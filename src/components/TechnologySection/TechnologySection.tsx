import React from 'react';
import TitleDescription from '../TitleDescription/TitleDescription';
import ValueCard from '../ValueCard/ValueCard';
import styles from './TechnologySection.module.scss';

interface TechnologyItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TechnologySectionProps {
  title: string;
  description: string;
  subtitle?: string;
  items: TechnologyItem[];
}

const TechnologySection: React.FC<TechnologySectionProps> = ({ 
  title, 
  description, 
  subtitle,
  items 
}) => {
  return (
    <section className={styles.section} id="technology">
      <div className={styles.container}>
        <div className={styles.header}>
          <TitleDescription
            title={title}
            description={description}
          />

          {subtitle && (
            <p className={styles.subtitle}>{subtitle}</p>
          )}
        </div>
        
        <div className={styles.grid}>
          {items.map((item, index) => (
            <ValueCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;


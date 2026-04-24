import React from 'react';
import TitleDescription from '../TitleDescription/TitleDescription';
import ValueCard from '../ValueCard/ValueCard';
import styles from './ValuesSection.module.scss';

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ValuesSectionProps {
  title: string;
  description: string;
  values: Value[];
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ title, description, values }) => {
  return (
    <section className={styles.section} id="values">
      <div className={styles.container}>
        <TitleDescription 
          title={title} 
          description={description}
        />
        
        <div className={styles.grid}>
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;


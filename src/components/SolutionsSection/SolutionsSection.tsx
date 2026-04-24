import React from 'react';
import TitleDescription from '../TitleDescription/TitleDescription';
import SolutionCard from '../SolutionCard/SolutionCard';
import styles from './SolutionsSection.module.scss';

interface Solution {
  icon: React.ReactNode;
  title: string;
  description?: string;
  items: string[];
  footer?: string;
}

interface SolutionsSectionProps {
  title: string;
  description: string;
  solutions: Solution[];
}

const SolutionsSection: React.FC<SolutionsSectionProps> = ({ title, description, solutions }) => {
  return (
    <section className={styles.section} id="solutions">
      <div className={styles.container}>
        <TitleDescription 
          title={title} 
          description={description}
          className={styles.header}
        />
        
        <div className={styles.grid}>
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
              items={solution.items}
              footer={solution.footer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;


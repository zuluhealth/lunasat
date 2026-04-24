import React from 'react';
import styles from './TitleDescription.module.scss';
import TextReveal from '../TextReveal/TextReveal';

interface TitleDescriptionProps {
  title: string;
  description: string;
  showLine?: boolean;
  className?: string;
}

const TitleDescription: React.FC<TitleDescriptionProps> = ({ 
  title, 
  description, 
  showLine = false,
  className = ''
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <h2 className={styles.title}>
        <TextReveal text={title} trigger="inView" />
      </h2>
      {description && <p className={styles.description}>{description}</p>}
      {showLine && <div className={styles.line} />}
    </div>
  );
};

export default TitleDescription;

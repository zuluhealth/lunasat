import React from 'react';
import Image from 'next/image';
import styles from './DitherBackground.module.scss';

interface DitherBackgroundProps {
  src: string;
  alt?: string;
  opacity?: number;
}

const DitherBackground: React.FC<DitherBackgroundProps> = ({ 
  src, 
  alt = 'Background',
  opacity = 0.6 
}) => {
  return (
    <div className={styles.container}>
      <Image
        src={src}
        alt={alt}
        fill
        className={styles.image}
        priority
      />
      <div className={styles.noise} />
      <div className={styles.grid} />
      <div className={styles.vignette} />
      <div className={styles.overlay} style={{ opacity: 1 - opacity }} />
    </div>
  );
};

export default DitherBackground;


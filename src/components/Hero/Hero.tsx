"use client";

import React from 'react';
import styles from './Hero.module.scss';
import TextReveal from '../TextReveal/TextReveal';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaHref?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, ctaHref }) => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.techOverlay}>
        <div className={styles.crosshair} style={{ top: '10%', left: '10%' }}>+</div>
        <div className={styles.crosshair} style={{ top: '10%', right: '10%' }}>+</div>
        <div className={styles.crosshair} style={{ bottom: '10%', left: '10%' }}>+</div>
        <div className={styles.crosshair} style={{ bottom: '10%', right: '10%' }}>+</div>

        <div className={styles.scrollIndicator}>
          <TextReveal text="SCROLL TO EXPLORE" trigger="load" delay={2000} />
          <div className={styles.line} />
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>
            <TextReveal 
              text={title.toUpperCase()} 
              trigger="load" 
              delay={500}
              className={styles.titleText}
            />
          </h1>
          {subtitle && (
            <p className={styles.subtitle}>
              <TextReveal
                text={subtitle}
                trigger="load"
                delay={1500}
              />
            </p>
          )}
          {ctaText && ctaHref && (
            <a href={ctaHref} className={styles.cta}>
              <TextReveal text={ctaText} trigger="load" delay={2000} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;

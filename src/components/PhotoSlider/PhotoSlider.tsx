'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import TitleDescription from '../TitleDescription/TitleDescription';
import styles from './PhotoSlider.module.scss';

const slides = [
  {
    id: 1,
    image: '/images/464A5890.JPG',
  },
  {
    id: 2,
    image: '/images/464A5916.JPG',
  },
  {
    id: 3,
    image: '/images/464A6028.JPG',
  },
  {
    id: 4,
    image: '/images/464A6035.JPG',
  },
];

interface PhotoSliderProps {
  title: string;
  description: string;
}

export default function PhotoSlider({ title, description }: PhotoSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isMobile) {
        setIsTransitioning(true);

        setTimeout(() => {
          setActiveIndex((prev) => (prev + 1) % slides.length);
          setIsTransitioning(false);
        }, 300);
      } else {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className={styles.photoSlider}>
        <div className={styles.container}>
          <TitleDescription title={title} description={description} />

          <div className={styles.slidesMobile}>
            <div
              className={`${styles.slideMobile} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}
            >
              <div className={styles.imageWrapperMobile}>
                <Image
                  src={slides[activeIndex].image}
                  alt={`Slide ${activeIndex + 1}`}
                  fill
                  className={styles.imageMobile}
                  sizes="(max-width: 768px) 90vw, 600px"
                  priority
                />
              </div>
            </div>
          </div>

          <div className={styles.indicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === activeIndex ? styles.indicatorActive : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.photoSlider}>
      <div className={styles.container}>
        <TitleDescription title={title} description={description} />

        <div className={styles.slides}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${styles.slide} ${index === activeIndex ? styles.active : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 600px"
                  className={styles.image}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.indicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === activeIndex ? styles.indicatorActive : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

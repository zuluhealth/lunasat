'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import TitleDescription from '../TitleDescription/TitleDescription';
import styles from './PhotoSlider.module.scss';

const slides = [
  {
    id: 1,
    image: '/images/gallery/lunasat-field-system.webp',
    alt: 'Lunasat field communications system',
  },
  {
    id: 2,
    image: '/images/gallery/lunasat-command-console.webp',
    alt: 'Mission-critical command console in operation',
  },
  {
    id: 3,
    image: '/images/gallery/lunasat-engineering-lab.webp',
    alt: 'Lunasat engineering and systems integration lab',
  },
  {
    id: 4,
    image: '/images/gallery/lunasat-radio-workbench.webp',
    alt: 'Radio systems testing workbench',
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
                  alt={slides[activeIndex].alt}
                  fill
                  className={styles.imageMobile}
                  sizes="(max-width: 768px) 90vw, 600px"
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
                  alt={slide.alt}
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

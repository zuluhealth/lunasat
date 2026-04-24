'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './SolutionCard.module.scss';

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  items: string[];
  footer?: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ icon, title, description, items, footer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, items]);

  return (
    <div className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`}>
      <button className={styles.cardHeader} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.header}>
          <div className={styles.icon}>{icon}</div>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      <div
        className={styles.dropdown}
        style={{ maxHeight: isOpen ? `${contentHeight}px` : '0px' }}
      >
        <div ref={contentRef} className={styles.dropdownContent}>
          {description && (
            <p className={styles.description}>{description}</p>
          )}

          <div className={styles.divider} />

          <ul className={styles.list}>
            {items.map((item, index) => (
              <li key={index} className={styles.listItem}>
                <svg
                  className={styles.arrow}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {footer && (
            <p className={styles.footer}>{footer}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolutionCard;

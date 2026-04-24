"use client";

import React from 'react';
import styles from './TextReveal.module.scss';

interface TextRevealProps {
  text: string;
  className?: string;
  trigger?: 'hover' | 'load' | 'inView';
  delay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
}) => {
  return (
    <span className={`${styles.textReveal} ${className}`}>
      {text}
    </span>
  );
};

export default TextReveal;

"use client";

import React from 'react';
import GlobalWaveBackground from '../GlobalWaveBackground';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <>
      <GlobalWaveBackground
        lineCount={40}
        lineColor="rgba(255, 255, 255, 0.35)"
        mouseInfluenceRadius={300}
        mouseInfluenceStrength={80}
      />
      {children}
    </>
  );
};

export default LayoutWrapper;

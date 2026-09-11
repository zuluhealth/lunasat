"use client";

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import styles from './GlobalWaveBackground.module.scss';

interface GlobalWaveBackgroundProps {
  lineCount?: number;
  lineColor?: string;
  lineOpacity?: number;
  mouseInfluenceRadius?: number;
  mouseInfluenceStrength?: number;
}

// Seeded random for consistent per-line randomness
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

interface LineParams {
  freq1: number;
  freq2: number;
  freq3: number;
  amp1: number;
  amp2: number;
  amp3: number;
  phase1: number;
  phase2: number;
  phase3: number;
  speed1: number;
  speed2: number;
  speed3: number;
}

const GlobalWaveBackground: React.FC<GlobalWaveBackgroundProps> = ({
  lineCount = 40,
  lineColor = 'rgba(255, 255, 255, 0.35)',
  lineOpacity = 1,
  mouseInfluenceRadius = 300,
  mouseInfluenceStrength = 80,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const drawRef = useRef<() => void>(() => undefined);
  const shouldAnimateRef = useRef(true);
  const timeRef = useRef(0);

  // Generate unique random parameters for each line
  const lineParams = useMemo(() => {
    const params: LineParams[] = [];
    for (let i = 0; i < lineCount; i++) {
      const seed = i * 137.5; // Golden angle for better distribution
      params.push({
        freq1: 0.003 + seededRandom(seed) * 0.004,
        freq2: 0.006 + seededRandom(seed + 1) * 0.006,
        freq3: 0.001 + seededRandom(seed + 2) * 0.002,
        amp1: 20 + seededRandom(seed + 3) * 25,
        amp2: 10 + seededRandom(seed + 4) * 15,
        amp3: 30 + seededRandom(seed + 5) * 20,
        phase1: seededRandom(seed + 6) * Math.PI * 2,
        phase2: seededRandom(seed + 7) * Math.PI * 2,
        phase3: seededRandom(seed + 8) * Math.PI * 2,
        speed1: 0.2 + seededRandom(seed + 9) * 0.4,
        speed2: 0.15 + seededRandom(seed + 10) * 0.3,
        speed3: 0.05 + seededRandom(seed + 11) * 0.1,
      });
    }
    return params;
  }, [lineCount]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw in CSS pixels. The backing store may use a capped DPR, but mixing
    // that capped value with the device's full DPR compresses the artwork into
    // the upper-left portion of high-density displays.
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const mouse = mouseRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate line spacing based on viewport height
    const lineSpacing = height / (lineCount + 1);

    // Draw wave lines
    for (let i = 1; i <= lineCount; i++) {
      const baseY = i * lineSpacing;
      const params = lineParams[i - 1];

      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = lineOpacity;

      // Control points for bezier curves
      const controlPoints = 24;
      const points: { x: number; y: number }[] = [];

      // Calculate points along the curve
      for (let j = 0; j <= controlPoints; j++) {
        const x = (j / controlPoints) * width;
        const time = timeRef.current;

        // Multiple wave harmonics with unique parameters per line
        const wave1 = Math.sin(x * params.freq1 + time * params.speed1 + params.phase1) * params.amp1;
        const wave2 = Math.sin(x * params.freq2 + time * params.speed2 + params.phase2) * params.amp2;
        const wave3 = Math.sin(x * params.freq3 + time * params.speed3 + params.phase3) * params.amp3;

        // Mouse influence - creates a repelling effect that pushes lines away
        let mouseOffset = 0;
        const dx = x - mouse.x;
        const dy = baseY - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInfluenceRadius) {
          const influence = 1 - (distance / mouseInfluenceRadius);
          const eased = influence * influence; // Quadratic easing for snappier response
          // Push lines away from cursor based on their relative position
          const direction = dy < 0 ? -1 : 1;
          const pushStrength = Math.abs(dy) < 50 ? mouseInfluenceStrength * 1.5 : mouseInfluenceStrength;
          mouseOffset = direction * eased * pushStrength * (1 + influence * 0.5);
        }

        const y = baseY + wave1 + wave2 + wave3 + mouseOffset;
        points.push({ x, y });
      }

      // Draw smooth curve through points using quadratic bezier
      ctx.moveTo(points[0].x, points[0].y);

      for (let j = 0; j < points.length - 1; j++) {
        const current = points[j];
        const next = points[j + 1];

        // Calculate control point as midpoint for smooth curves
        const cpX = (current.x + next.x) / 2;
        const cpY = (current.y + next.y) / 2;

        if (j === 0) {
          ctx.lineTo(cpX, cpY);
        } else {
          ctx.quadraticCurveTo(current.x, current.y, cpX, cpY);
        }
      }

      // Draw final segment
      const lastPoint = points[points.length - 1];
      ctx.lineTo(lastPoint.x, lastPoint.y);

      ctx.stroke();
    }

    // Update time
    timeRef.current += 0.016;

    // Continue only on capable, visible devices. The ref avoids a recursive
    // callback dependency and lets the visibility handler stop the loop.
    if (shouldAnimateRef.current) {
      animationRef.current = requestAnimationFrame(() => drawRef.current());
    }
  }, [lineCount, lineColor, lineOpacity, mouseInfluenceRadius, mouseInfluenceStrength, lineParams]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    drawRef.current = draw;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isSmallScreen = window.matchMedia('(max-width: 767px)').matches;
    const canAnimate = !prefersReducedMotion && !isSmallScreen;
    shouldAnimateRef.current = canAnimate && !document.hidden;

    // Set canvas size to viewport while limiting the number of physical pixels
    // redrawn each frame on high-density displays.
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    // Handle mouse movement - use viewport coordinates since we're fixed
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleVisibilityChange = () => {
      shouldAnimateRef.current = canAnimate && !document.hidden;

      if (shouldAnimateRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(() => drawRef.current());
      }
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (canAnimate) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    // Draw once on small/reduced-motion screens; otherwise start the loop.
    animationRef.current = requestAnimationFrame(() => drawRef.current());

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      shouldAnimateRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.vignette} />
    </div>
  );
};

export default GlobalWaveBackground;

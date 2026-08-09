'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export function CustomCursor() {
  const { cursorMode } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Outer follower ring spring
  const ringX = useSpring(rawX, { damping: 28, stiffness: 350, mass: 0.5 });
  const ringY = useSpring(rawY, { damping: 28, stiffness: 350, mass: 0.5 });

  // Center dot & target reticle spring
  const dotX = useSpring(rawX, { damping: 35, stiffness: 500, mass: 0.1 });
  const dotY = useSpring(rawY, { damping: 35, stiffness: 500, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, rawX, rawY]);

  if (!isVisible) return null;

  // Mode 1: Target Reticle Cursor over 3D Cube (0ms event sync!)
  if (cursorMode === 'target') {
    return (
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:flex items-center justify-center"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          scale: 1.15,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_6px_rgba(153,0,0,0.8)]"
        >
          <line x1="16" y1="0" x2="16" y2="10" stroke="#990000" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="22" x2="16" y2="32" stroke="#990000" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="0" y1="16" x2="10" y2="16" stroke="#990000" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="22" y1="16" x2="32" y2="16" stroke="#990000" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2.5" fill="#990000" />
        </svg>
      </motion.div>
    );
  }

  // Mode 2: Hide custom cursor over HTML UI buttons/links
  if (cursorMode === 'interactive') return null;

  // Mode 3: Clean Follower Ring
  return (
    <>
      {/* Standard Outer Spring Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-[#B85C3B]/50 backdrop-blur-[2px] shadow-lg hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 36,
          height: 36,
          backgroundColor: 'rgba(244, 240, 232, 0.15)',
          opacity: 0.85,
        }}
      />

      {/* Inner Precision Center Point Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-[#B85C3B] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          opacity: 0.9,
        }}
      />
    </>
  );
}

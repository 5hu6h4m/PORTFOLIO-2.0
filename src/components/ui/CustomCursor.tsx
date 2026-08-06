'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export function CustomCursor() {
  const { x, y, cursorMode } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    setIsVisible(true);

    return () => {
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Hide on touch/mobile or before initial mousemove
  if (!isVisible || x < 0 || y < 0) return null;

  // Mode 1: Target Reticle Cursor over 3D Cube (0ms event sync!)
  if (cursorMode === 'target') {
    return (
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:flex items-center justify-center"
        animate={{
          x: x - 16,
          y: y - 16,
          scale: 1.15,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 500,
          mass: 0.1,
        }}
      >
        {/* Precision 32x32 SVG Dark Red Sniper Scope Reticle with 100% Identical 6px Gaps */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_6px_rgba(153,0,0,0.8)]"
        >
          {/* Top Crosshair Line */}
          <line x1="16" y1="0" x2="16" y2="10" stroke="#990000" strokeWidth="2.5" strokeLinecap="round" />

          {/* Bottom Crosshair Line */}
          <line x1="16" y1="22" x2="16" y2="32" stroke="#990000" strokeWidth="2.5" strokeLinecap="round" />

          {/* Left Crosshair Line */}
          <line x1="0" y1="16" x2="10" y2="16" stroke="#990000" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right Crosshair Line */}
          <line x1="22" y1="16" x2="32" y2="16" stroke="#990000" strokeWidth="2.5" strokeLinecap="round" />

          {/* Precision Center Target Dot */}
          <circle cx="16" cy="16" r="2.5" fill="#990000" />
        </svg>
      </motion.div>
    );
  }

  // Mode 2: Hide custom cursor over HTML UI buttons/links
  if (cursorMode === 'interactive') return null;

  // 9 Facelet colors for authentic 3x3 Rubik's Cube Cursor
  const RUBIK_FACELETS = [
    'bg-[#B55D3D]', 'bg-[#25231F]', 'bg-[#B55D3D]',
    'bg-[#25231F]', 'bg-[#FAF8F3]', 'bg-[#8A2E2B]',
    'bg-[#B55D3D]', 'bg-[#25231F]', 'bg-[#B55D3D]',
  ];

  // Mode 3: Mini 3x3 Rubik's Cube Cursor (Circle Ring removed per user request)
  return (
    <>
      {/* ── MINI 3x3 RUBIK'S CUBE CURSOR FOLLOWER (REPLACES CIRCLE RING) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-9 h-9 p-0.5 rounded-lg bg-[#25231F]/90 border border-[#B55D3D]/60 shadow-[0_8px_25px_rgba(181,93,61,0.35)] backdrop-blur-md hidden md:flex flex-col justify-between"
        animate={{
          x: x - 18,
          y: y - 18,
          rotate: [0, 90, 180, 270, 360],
          scale: 1,
        }}
        transition={{
          x: { type: 'spring', damping: 28, stiffness: 350, mass: 0.4 },
          y: { type: 'spring', damping: 28, stiffness: 350, mass: 0.4 },
          rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
        }}
      >
        <div className="grid grid-cols-3 gap-0.5 w-full h-full">
          {RUBIK_FACELETS.map((bg, idx) => (
            <div
              key={idx}
              className={`w-full h-full rounded-[1.5px] ${bg} border border-[#25231F]/40 shadow-2xs`}
            />
          ))}
        </div>
      </motion.div>

      {/* Inner Precision Center Point Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-[#B55D3D] hidden md:block shadow-sm"
        animate={{
          x: x - 3,
          y: y - 3,
          width: 6,
          height: 6,
          opacity: 0.95,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 500,
          mass: 0.1,
        }}
      />

      {/* ── 3 TRAILING FLOATING MICRO-CUBES BEHIND MOUSE ── */}
      {/* Trailing Micro-Cube 1 (Nearest Terracotta Red Cube) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 w-3 h-3 rounded-xs bg-[#B55D3D] border border-[#B55D3D]/80 shadow-md hidden md:block"
        animate={{
          x: x + 14,
          y: y + 16,
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          x: { type: 'spring', damping: 22, stiffness: 300, mass: 0.3 },
          y: { type: 'spring', damping: 22, stiffness: 300, mass: 0.3 },
          rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* Trailing Micro-Cube 2 (Middle Dark Charcoal Cube) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 w-2.5 h-2.5 rounded-xs bg-[#25231F] border border-[#FAF8F3]/60 shadow-sm hidden md:block opacity-90"
        animate={{
          x: x - 16,
          y: y + 20,
          rotate: [360, 270, 180, 90, 0],
        }}
        transition={{
          x: { type: 'spring', damping: 20, stiffness: 240, mass: 0.5 },
          y: { type: 'spring', damping: 20, stiffness: 240, mass: 0.5 },
          rotate: { duration: 5, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* Trailing Micro-Cube 3 (Farthest Micro Cube) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 w-2 h-2 rounded-xs bg-[#B55D3D]/80 border border-[#B55D3D]/40 shadow-xs hidden md:block opacity-75"
        animate={{
          x: x + 20,
          y: y - 12,
          rotate: [0, 180, 360],
        }}
        transition={{
          x: { type: 'spring', damping: 18, stiffness: 180, mass: 0.7 },
          y: { type: 'spring', damping: 18, stiffness: 180, mass: 0.7 },
          rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
        }}
      />
    </>
  );
}

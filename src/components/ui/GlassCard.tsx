'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export function GlassCard({ children, className = '', hoverEffect = true, onClick, onMouseEnter }: GlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      whileHover={hoverEffect ? { y: -6, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`relative rounded-2xl bg-[#FAF8F3]/85 backdrop-blur-xl border border-[#E2DCD2] p-6 shadow-[0_15px_35px_-10px_rgba(37,35,31,0.04)] overflow-hidden transition-all duration-300 ${
        hoverEffect ? 'hover:border-[#B85C3B]/40 hover:shadow-[0_25px_50px_-12px_rgba(184,92,59,0.1)]' : ''
      } ${className}`}
    >
      {/* Specular lighting gradient shimmer overlay */}
      <div className="pointer-events-none absolute -inset-px bg-gradient-to-br from-white/50 via-transparent to-[#B85C3B]/5 opacity-80" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

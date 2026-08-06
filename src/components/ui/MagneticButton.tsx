'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  href?: string;
  download?: boolean;
}

export function MagneticButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  href,
  download
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary: 'bg-[#25231F] text-[#FAF8F3] hover:bg-[#B85C3B] hover:text-white shadow-lg border-2 border-[#25231F] hover:border-[#B85C3B]',
    secondary: 'bg-[#B85C3B] text-white hover:bg-[#A04D2E] shadow-lg border-2 border-[#B85C3B]',
    outline: 'bg-transparent text-[#25231F] border-2 border-[#25231F] hover:border-[#B85C3B] hover:text-[#B85C3B]',
    glass: 'bg-[#FAF8F3] text-[#25231F] border-2 border-[#25231F] hover:border-[#B85C3B] hover:text-[#B85C3B] shadow-md font-bold'
  };

  const Content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.5 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-block`}
    >
      <div
        className={`relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${variantStyles[variant]} ${className}`}
      >
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} download={download} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {Content}
      </a>
    );
  }

  return <div onClick={onClick}>{Content}</div>;
}

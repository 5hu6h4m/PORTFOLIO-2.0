import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollTypeQuoteProps {
  quote: string;
  subtext?: string;
  badge?: string;
  className?: string;
}

// ── SCROLL-TYPED QUOTE BANNER COMPONENT ──────────────────────────────────────
export function ScrollTypeQuote({ quote, subtext, badge, className = '' }: ScrollTypeQuoteProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw scroll progress target
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.95', 'center 0.20'],
  });

  // Responsive spring for instant character typing reaction
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    mass: 0.2,
  });

  const characters = quote.split('');

  return (
    <div ref={containerRef} className={`py-20 md:py-28 select-none relative overflow-hidden ${className}`}>
      {/* Soft warm ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-gradient-to-r from-transparent via-[#B55D3D]/12 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B55D3D]/12 text-[#B55D3D] border border-[#B55D3D]/30 text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] font-extrabold mb-6 shadow-xs">
            <span>{badge}</span>
          </div>
        )}

        <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold leading-[1.24] tracking-tight text-[#1F1C18]">
          <span className="text-[#B55D3D]/40 font-serif mr-1">&ldquo;</span>
          {characters.map((char, index) => {
            const start = index / characters.length;
            const end = (index + 1) / characters.length;
            const opacity = useTransform(smoothProgress, [start, end], [0.18, 1]);
            const color = useTransform(smoothProgress, [start, end], ['#D8D1C5', '#1F1C18']);

            return (
              <motion.span key={index} style={{ opacity, color }}>
                {char}
              </motion.span>
            );
          })}
          <span className="text-[#B55D3D]/40 font-serif ml-1">&rdquo;</span>
        </h3>

        {subtext && (
          <p className="mt-5 text-xs md:text-sm font-mono text-[#8A8175] tracking-[0.2em] uppercase font-bold">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}

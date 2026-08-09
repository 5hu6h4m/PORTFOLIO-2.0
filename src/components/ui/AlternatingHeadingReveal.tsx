'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AlternatingHeadingRevealProps {
  category?: string;
  lines: string[];
  accentIndex?: number; // Index of line that gets terracotta italic accent
  className?: string;
  lineClassName?: string;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AlternatingHeadingReveal({
  category,
  lines,
  accentIndex,
  className = '',
  lineClassName = '',
}: AlternatingHeadingRevealProps) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: false, margin: '-40px' });

  return (
    <div ref={containerRef} className={`select-none ${className}`}>
      {category && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#B85C3B]" />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.22em]">
            {category}
          </span>
        </div>
      )}

      <div className="flex flex-col items-start overflow-hidden">
        {lines.map((line, idx) => {
          const isEven = idx % 2 === 0;
          const initialX = isEven ? -80 : 80;
          const isAccent = accentIndex !== undefined ? idx === accentIndex : false;

          return (
            <div key={idx} className="overflow-hidden py-0.5">
              <motion.div
                initial={{ opacity: 0, x: initialX }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: initialX }}
                transition={{ duration: 0.85, delay: 0.1 + idx * 0.14, ease: EASE }}
                className={`${
                  isAccent ? 'italic font-normal text-[#B85C3B]' : 'text-[#25231F]'
                } ${lineClassName}`}
              >
                {line}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

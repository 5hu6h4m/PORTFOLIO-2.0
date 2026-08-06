'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface LeadershipSectionProps {
  playHover: () => void;
}

const PANEL_ACCENTS = ['#B85C3B', '#8E9A78', '#4A6FA5'];

interface RowProps {
  item: typeof PORTFOLIO_DATA.leadership[0];
  index: number;
  accent: string;
  playHover: () => void;
}

function LeadershipRow({ item, index, accent, playHover }: RowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group border-t border-[#E2DCD2] overflow-hidden"
      onMouseEnter={playHover}
    >
      {/* Primary row — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-6 md:gap-10 py-8 text-left cursor-pointer"
      >
        {/* Index number */}
        <span
          className="text-[10px] font-mono shrink-0 transition-colors duration-300"
          style={{ color: expanded ? accent : '#9A948C' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Role + org */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl md:text-3xl font-serif font-bold text-[#25231F] leading-tight mb-1 transition-colors duration-300">
            {item.role}
          </h3>
          <div className="text-xs font-mono text-[#9A948C] uppercase tracking-wider">
            {item.organization}
          </div>
        </div>

        {/* Period */}
        <span className="text-xs font-mono text-[#9A948C] shrink-0 hidden md:block">
          {item.period}
        </span>

        {/* Badge pill */}
        <span
          className="shrink-0 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border transition-all duration-300 hidden md:block"
          style={{
            borderColor: expanded ? accent : '#E2DCD2',
            color: expanded ? accent : '#9A948C',
          }}
        >
          {item.badge}
        </span>

        {/* Expand/collapse indicator */}
        <motion.span
          className="shrink-0 text-[#9A948C] font-mono text-sm select-none"
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          +
        </motion.span>
      </button>

      {/* Expanded detail — animates open */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div className="pb-10 pl-10 md:pl-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Tagline + description */}
          <div className="md:col-span-5">
            <p className="text-sm font-mono italic mb-4" style={{ color: accent }}>
              &ldquo;{item.tagline}&rdquo;
            </p>
            <p className="text-sm text-[#787268] font-light leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Impact list */}
          <div className="md:col-span-7">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#9A948C] mb-4">
              Key Impact
            </div>
            <ul className="space-y-3">
              {item.impact.map((point, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -10 }}
                  animate={expanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.1 + j * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 text-sm text-[#25231F]"
                >
                  <span className="shrink-0 mt-2.5 w-4 h-px" style={{ background: accent }} />
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function LeadershipSection({ playHover }: LeadershipSectionProps) {
  const { leadership } = PORTFOLIO_DATA;
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="leadership" className="py-24 px-6 md:px-12 bg-[#FAF8F3] relative overflow-hidden">
      {/* Background watermark number */}
      <div
        className="absolute right-[-2vw] top-1/2 -translate-y-1/2 text-[28vw] font-serif font-bold leading-none select-none pointer-events-none"
        style={{ color: '#F4F0E8', letterSpacing: '-0.04em' }}
        aria-hidden
      >
        05
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-20"
        >
          <div className="text-[10px] font-mono tracking-[0.3em] text-[#B85C3B] mb-4">
            05 / COMMAND HISTORY
          </div>
          <h2
            className="text-5xl md:text-7xl font-serif font-bold text-[#25231F] leading-none"
            style={{ letterSpacing: '-0.03em' }}
          >
            LED.<br />
            <span className="italic text-[#B85C3B]">BUILT.</span><br />
            WON.
          </h2>
        </motion.div>

        {/* Accordion rows */}
        <div className="border-b border-[#E2DCD2]">
          {leadership.map((item, i) => (
            <LeadershipRow
              key={item.id}
              item={item}
              index={i}
              accent={PANEL_ACCENTS[i % PANEL_ACCENTS.length]}
              playHover={playHover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

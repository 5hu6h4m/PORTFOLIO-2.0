'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Users, Zap, Award, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface LeadershipSectionProps {
  playHover: () => void;
}

const PANEL_ACCENTS = ['#B85C3B', '#8E9A78', '#4A6FA5'];

const STATS = [
  { value: '30+', label: 'Team Members Led', icon: Users },
  { value: '500+', label: 'Summit Participants', icon: Trophy },
  { value: '4+', label: 'Workshops Shipped', icon: Zap },
];

interface RowProps {
  item: typeof PORTFOLIO_DATA.leadership[0];
  index: number;
  accent: string;
  playHover: () => void;
}

function LeadershipRow({ item, index, accent, playHover }: RowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });
  const [expanded, setExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group border-t border-[#E2DCD2] relative overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: hovering ? '#F4F0E8' : 'transparent' }}
      onMouseEnter={() => { setHovering(true); playHover(); }}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Animated accent left indicator bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: accent }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovering || expanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Primary row — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-6 md:gap-10 py-8 px-4 md:px-6 text-left cursor-pointer select-none"
      >
        {/* Index number */}
        <span
          className="text-xs font-mono shrink-0 font-bold transition-colors duration-300"
          style={{ color: expanded || hovering ? accent : '#9A948C' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Role + org */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
            <h3
              className="text-xl md:text-3xl font-serif font-bold text-[#25231F] leading-tight transition-colors duration-300"
              style={{ color: hovering || expanded ? accent : '#25231F' }}
            >
              {item.role}
            </h3>
          </div>
          <div className="text-xs font-mono text-[#9A948C] uppercase tracking-wider font-semibold pl-4">
            {item.organization}
          </div>
        </div>

        {/* Period */}
        <span className="text-xs font-mono text-[#787268] font-bold shrink-0 hidden md:block">
          {item.period}
        </span>

        {/* Badge pill with pulse highlight */}
        <span
          className="shrink-0 px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all duration-300 hidden md:inline-flex items-center gap-1.5 font-bold shadow-2xs"
          style={{
            borderColor: expanded || hovering ? accent : '#E2DCD2',
            color: expanded || hovering ? accent : '#787268',
            backgroundColor: expanded || hovering ? `${accent}15` : '#FAF8F3',
          }}
        >
          <Award className="w-3 h-3" style={{ color: accent }} />
          <span>{item.badge}</span>
        </span>

        {/* Expand/collapse animated toggle button */}
        <motion.div
          className="shrink-0 w-8 h-8 rounded-full border border-[#E2DCD2] flex items-center justify-center text-[#25231F] bg-[#FAF8F3] transition-colors"
          style={{
            borderColor: expanded ? accent : '#E2DCD2',
            backgroundColor: expanded ? accent : '#FAF8F3',
            color: expanded ? '#FAF8F3' : '#25231F',
          }}
          animate={{ rotate: expanded ? 135 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-mono text-base leading-none font-bold">+</span>
        </motion.div>
      </button>

      {/* Expanded detail panel with staggered bullet reveals */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div className="pb-10 pl-10 md:pl-16 pr-6 grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
          {/* Tagline + description */}
          <div className="md:col-span-5 space-y-3">
            <p className="text-sm font-serif italic font-semibold" style={{ color: accent }}>
              &ldquo;{item.tagline}&rdquo;
            </p>
            <p className="text-sm text-[#787268] font-light leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Impact list with kinetic check indicators */}
          <div className="md:col-span-7">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B85C3B] mb-4 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Key Operations &amp; Impact</span>
            </div>
            <ul className="space-y-3">
              {item.impact.map((point, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -15 }}
                  animate={expanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                  transition={{ delay: 0.08 + j * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 text-sm text-[#25231F] font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                  <span className="leading-relaxed">{point}</span>
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
  const headerInView = useInView(headerRef, { once: false, margin: '-100px' });

  return (
    <section
      id="leadership"
      className="py-24 px-6 md:px-12 bg-[#FAF8F3] relative overflow-hidden border-t border-[#E2DCD2]/60"
    >
      {/* Background watermark kinetic 04 */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={headerInView ? { opacity: 0.04, x: 0 } : { opacity: 0, x: 40 }}
        transition={{ duration: 1.2 }}
        className="absolute right-[-2vw] top-1/2 -translate-y-1/2 text-[30vw] font-serif font-bold leading-none select-none pointer-events-none text-[#25231F]"
        aria-hidden
      >
        04
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ── SECTION HEADER WITH KINETIC ANIMATIONS ─────────────────────────── */}
        <div ref={headerRef} className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, x: -90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#B85C3B] mb-4 font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04 / COMMAND HISTORY &amp; CONTRIBUTIONS</span>
            </div>

            <h2
              className="text-5xl md:text-7xl font-serif font-bold text-[#25231F] leading-none tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              LED.<br />
              <motion.span
                className="italic inline-block text-[#B85C3B]"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                BUILT.
              </motion.span><br />
              WON.
            </h2>
          </motion.div>

          {/* Right — Animated Impact Stat Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-3 gap-3"
          >
            {STATS.map((st, i) => {
              const IconComp = st.icon;
              return (
                <motion.div
                  key={st.label}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DCD2] text-center space-y-1 shadow-xs transition-all duration-300"
                >
                  <IconComp className="w-4 h-4 mx-auto text-[#B85C3B]" />
                  <div className="text-xl md:text-2xl font-serif font-bold text-[#25231F]">{st.value}</div>
                  <div className="text-[9px] font-mono text-[#787268] uppercase tracking-widest font-semibold">{st.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── ACCORDION ROWS ─────────────────────────────────────────────────── */}
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

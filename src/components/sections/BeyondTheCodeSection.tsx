'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Compass, Heart, Feather, BookOpen, Music, Shield, Rocket } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface BeyondTheCodeSectionProps {
  playHover: () => void;
}

const INTERESTS = [
  {
    icon: '🏎️',
    title: 'F1 & Telemetry Engineering',
    category: 'High Performance',
    description: 'Fascinated by aerodynamic telemetry, sub-second pit strategy, and mechanical precision under extreme constraints.',
  },
  {
    icon: '☕',
    title: 'Specialty Coffee Brewing',
    category: 'Daily Ritual',
    description: 'Exploring V60 pour-over extraction variables, single-origin bean roasts, and precision brewing ratios.',
  },
  {
    icon: '🎧',
    title: 'Ambient & Deep Focus Audio',
    category: 'Flow State',
    description: 'Curating atmospheric lo-fi and cinematic soundscapes for deep focus architecture and uninterrupted coding sessions.',
  },
  {
    icon: '📚',
    title: 'Design Systems & Typography',
    category: 'Craft & Aesthetic',
    description: 'Studying Swiss grid systems, Bauhaus typography, and modern digital design tokens.',
  },
  {
    icon: '♟️',
    title: 'Tactical Chess & Logic',
    category: 'Strategy',
    description: 'Positional maneuvering, rapid tactical calculation, and pattern recognition under time controls.',
  },
  {
    icon: '🌌',
    title: 'Astrophysics & Cosmos',
    category: 'Curiosity',
    description: 'Following deep-space exploration milestones, orbital mechanics, and quantum system principles.',
  },
  {
    icon: '🏃',
    title: 'Endurance & Athletic Conditioning',
    category: 'Discipline',
    description: 'Maintaining daily physical discipline, stamina building, and cognitive energy optimization.',
  },
  {
    icon: '📷',
    title: 'Minimalist Architecture Photography',
    category: 'Perspective',
    description: 'Capturing geometric urban shadows, structural lines, and natural light contrast in raw spaces.',
  },
];

export function BeyondTheCodeSection({ playHover }: BeyondTheCodeSectionProps) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="beyond" className="py-24 px-6 md:px-12 bg-[#F4F0E8] relative overflow-hidden border-t border-[#E2DCD2]">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-radial from-[#B85C3B]/8 via-[#8E9A78]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: -60 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center flex flex-col items-center justify-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-mono tracking-[0.35em] uppercase text-[#B85C3B] mb-3 font-bold bg-[#B85C3B]/10 px-3.5 py-1 rounded-full border border-[#B85C3B]/20">
            <Compass className="w-3.5 h-3.5" />
            <span>06 / BEYOND THE CODE — PERSONAL PHILOSOPHY & PURSUITS</span>
          </div>

          <h2
            className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-[#25231F] leading-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            BEYOND THE <span className="italic font-normal text-[#B85C3B] font-serif">CODE</span>
          </h2>

          <p className="text-xs md:text-sm text-[#787268] font-light max-w-lg mt-3 leading-relaxed">
            Great software is not built in isolation — it is inspired by design, curiosity, endurance, and strategic thinking outside the IDE.
          </p>
        </motion.div>

        {/* ── PHILOSOPHY BANNER ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 p-8 md:p-10 rounded-3xl bg-[#FAF8F3] border border-[#B85C3B]/30 shadow-xl relative overflow-hidden text-center max-w-4xl mx-auto"
        >
          <div className="text-[10px] font-mono tracking-widest text-[#B85C3B] uppercase mb-3 font-bold flex items-center justify-center gap-2">
            <Feather className="w-3.5 h-3.5" />
            <span>CORE ENGINEERING CREED</span>
          </div>
          <p className="text-lg md:text-2xl font-serif italic text-[#25231F] leading-relaxed max-w-3xl mx-auto">
            &ldquo;Software architecture is an art form. When technical precision meets human-centered design, digital products become memorable experiences.&rdquo;
          </p>
          <div className="mt-4 text-xs font-mono text-[#9A948C] uppercase tracking-widest">
            — {PORTFOLIO_DATA.personal.name} · Full Stack Engineer
          </div>
        </motion.div>

        {/* ── 8 INTERESTS & PURSUITS GRID ──────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INTERESTS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onMouseEnter={playHover}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-3xl bg-[#FAF8F3] border border-[#E2DCD2] hover:border-[#B85C3B] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-[#25231F]/5 text-[#25231F] border border-[#E2DCD2] font-bold group-hover:border-[#B85C3B]/40 transition-colors">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#25231F] group-hover:text-[#B85C3B] transition-colors mb-2 leading-tight">
                  {item.title}
                </h3>

                <p className="text-xs text-[#787268] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E2DCD2]/60 flex items-center justify-between text-[9px] font-mono text-[#9A948C] uppercase tracking-widest font-bold">
                <span>0{i + 1}</span>
                <span className="text-[#B85C3B] opacity-0 group-hover:opacity-100 transition-opacity">EXPLORE ✦</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Sparkles, Layers, Cpu, Database, Server, Terminal, Compass, CheckCircle2 } from 'lucide-react';
import { BAND_1_TECH, BAND_2_TECH, ALL_TECH_ITEMS, TechItem } from '@/data/techStackData';

interface SkillsSectionProps {
  playClick: () => void;
  playHover: () => void;
}

const CATEGORY_RADAR = [
  { id: 'all', label: 'All Stack', icon: Cpu },
  { id: 'frontend', label: '01 / Frontend', icon: Layers },
  { id: 'backend', label: '02 / Backend', icon: Server },
  { id: 'database', label: '03 / Databases', icon: Database },
  { id: 'devops', label: '04 / DevOps', icon: Terminal },
];

export function SkillsSection({ playClick, playHover }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(ALL_TECH_ITEMS[0]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });

  const scrollToProjects = () => {
    playClick();
    const projEl = document.getElementById('projects');
    if (projEl) {
      projEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderTechPill = (item: TechItem) => {
    const isCategoryMatched = activeCategory === 'all' || item.category === activeCategory;
    const isHovered = hoveredTech?.id === item.id;

    return (
      <button
        key={`${item.id}-${item.name}`}
        onMouseEnter={() => {
          playHover();
          setHoveredTech(item);
        }}
        onClick={() => {
          playClick();
          setHoveredTech(item);
        }}
        className={`px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border flex items-center gap-2.5 cursor-pointer whitespace-nowrap select-none ${
          isHovered
            ? 'bg-[#B85C3B] text-[#FAF8F3] border-[#B85C3B] shadow-md scale-105 z-10'
            : isCategoryMatched
            ? 'bg-[#FAF8F3] text-[#25231F] border-[#E2DCD2] hover:border-[#B85C3B] hover:scale-105 shadow-sm'
            : 'bg-[#FAF8F3]/50 text-[#25231F]/40 border-[#E2DCD2]/50 opacity-50'
        }`}
      >
        <span className="text-sm font-bold flex-shrink-0">{item.symbol}</span>
        <span className="font-bold">{item.name}</span>
      </button>
    );
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-16 md:py-20 px-6 md:px-12 bg-[#F4F0E8] text-[#25231F] overflow-hidden select-none border-t border-[#E2DCD2] min-h-[85vh] flex flex-col justify-center"
    >
      {/* Volumetric warm background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#B85C3B]/8 via-[#8E9A78]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">

        {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#B85C3B] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 / TECHNICAL ARSENAL</span>
            </div>
            <h2
              className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-[#25231F]"
              style={{ letterSpacing: '-0.03em' }}
            >
              TECH STACK
            </h2>
          </div>

          <p className="text-sm text-[#787268] font-light max-w-md leading-relaxed">
            Essential tools, languages, and frameworks engineered for production performance. Hover any pill to spotlight metrics.
          </p>
        </motion.div>

        {/* ── DOMAIN RADAR CATEGORY FILTERS ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-8"
        >
          {CATEGORY_RADAR.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playClick();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={playHover}
                className={`px-4 py-2 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 border cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#25231F] text-[#FAF8F3] border-[#25231F] shadow-md scale-105'
                    : 'bg-[#FAF8F3]/90 text-[#25231F]/80 border-[#E2DCD2] hover:border-[#25231F]/40 shadow-sm'
                }`}
              >
                <Icon className={`w-3 h-3 ${isSelected ? 'text-[#B85C3B]' : 'text-[#9A948C]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ── DUAL INFINITE KINETIC MARQUEE BANDS ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="space-y-4 mb-8 relative py-4 overflow-hidden rounded-3xl bg-[#FAF8F3]/60 backdrop-blur-md border border-[#E2DCD2]"
        >
          {/* Gradient Edge Fades */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#F4F0E8] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#F4F0E8] to-transparent z-10 pointer-events-none" />

          {/* Marquee Row 1 (Moving Left-to-Right) */}
          <div className="flex overflow-hidden group">
            <div className="flex gap-3 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
              {BAND_1_TECH.map(renderTechPill)}
              {BAND_1_TECH.map((item) => renderTechPill({ ...item, id: `${item.id}-dup1` }))}
              {BAND_1_TECH.map((item) => renderTechPill({ ...item, id: `${item.id}-dup2` }))}
            </div>
          </div>

          {/* Marquee Row 2 (Moving Right-to-Left) */}
          <div className="flex overflow-hidden group">
            <div className="flex gap-3 animate-marquee-reverse whitespace-nowrap group-hover:[animation-play-state:paused]">
              {BAND_2_TECH.map(renderTechPill)}
              {BAND_2_TECH.map((item) => renderTechPill({ ...item, id: `${item.id}-dup1` }))}
              {BAND_2_TECH.map((item) => renderTechPill({ ...item, id: `${item.id}-dup2` }))}
            </div>
          </div>
        </motion.div>

        {/* ── SLEEK MICRO SPOTLIGHT BANNER ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="px-6 py-4 rounded-2xl bg-[#FAF8F3]/90 backdrop-blur-md border border-[#B85C3B]/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <AnimatePresence mode="wait">
            {hoveredTech && (
              <motion.div
                key={hoveredTech.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 flex-wrap"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-mono">{hoveredTech.symbol}</span>
                  <span className="text-xl font-serif font-bold text-[#25231F]">
                    {hoveredTech.name}
                  </span>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20">
                  {hoveredTech.categoryLabel}
                </span>

                <div className="flex items-center gap-2 text-xs font-mono text-[#787268]">
                  <span>{hoveredTech.experienceYears}+ Yrs Exp</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    {hoveredTech.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#F4F0E8] text-[#25231F] text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={scrollToProjects}
            onMouseEnter={playHover}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B85C3B] text-[#FAF8F3] text-[11px] font-mono tracking-widest uppercase hover:bg-[#25231F] transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap group"
          >
            <span>View Shipped Projects</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}

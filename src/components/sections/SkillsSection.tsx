'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Code2, Sparkles, CheckCircle2, Layers, Cpu, Database, Server, Terminal } from 'lucide-react';
import { TECH_STACK_DATA, TechItem } from '@/data/techStackData';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface SkillsSectionProps {
  playClick: () => void;
  playHover: () => void;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Stack', icon: Cpu },
  { id: 'frontend', label: '01 / Frontend', icon: Layers },
  { id: 'backend', label: '02 / Backend', icon: Server },
  { id: 'database', label: '03 / Databases', icon: Database },
  { id: 'devops', label: '04 / DevOps', icon: Terminal },
];

export function SkillsSection({ playClick, playHover }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });

  const filteredItems = activeCategory === 'all'
    ? TECH_STACK_DATA
    : TECH_STACK_DATA.filter((item) => item.category === activeCategory);

  const scrollToProjects = () => {
    playClick();
    const projEl = document.getElementById('projects');
    if (projEl) {
      projEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative pt-28 pb-24 px-6 md:px-12 bg-[#F4F0E8] text-[#25231F] overflow-hidden select-none border-t border-[#E2DCD2]"
    >
      {/* Volumetric warm background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-radial from-[#B85C3B]/10 via-[#8E9A78]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#B85C3B] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 / TECHNICAL ARSENAL</span>
            </div>
            <h2
              className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-[#25231F]"
              style={{ letterSpacing: '-0.03em' }}
            >
              ENGINEERING STACK
            </h2>
          </div>

          <p className="text-base text-[#787268] font-light max-w-md leading-relaxed">
            Architectural tools, frameworks, and cloud systems engineered for sub-second web vitals and high-scale production resilience.
          </p>
        </motion.div>

        {/* ── CATEGORY PILLAR TABS ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-10"
        >
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClick();
                  setActiveCategory(tab.id);
                }}
                onMouseEnter={playHover}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#25231F] text-[#FAF8F3] border-[#25231F] shadow-lg scale-105'
                    : 'bg-[#FAF8F3]/90 text-[#25231F]/80 border-[#E2DCD2] hover:border-[#25231F]/40 shadow-sm'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B85C3B]' : 'text-[#9A948C]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ── BENTO GRID OF TECH CARDS ────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setSelectedTech(item);
                }}
                className={`group p-7 rounded-3xl bg-[#FAF8F3]/90 backdrop-blur-xl border border-[#E2DCD2] hover:border-[#B85C3B]/50 transition-all duration-300 cursor-pointer shadow-md hover:shadow-2xl flex flex-col justify-between relative overflow-hidden ${
                  item.featured ? 'md:col-span-2 lg:col-span-1 border-l-4 border-l-[#B85C3B]' : ''
                }`}
              >
                {/* Top Badge & Proficiency */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20">
                      {item.categoryLabel}
                    </span>
                    <span className="text-[10px] font-mono text-[#9A948C] tracking-widest uppercase">
                      {item.proficiency}% Proficiency
                    </span>
                  </div>

                  {/* Header Title + Emblem */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-mono font-bold text-[#B85C3B] flex-shrink-0">
                      {item.symbol}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#25231F] group-hover:text-[#B85C3B] transition-colors leading-tight">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#787268] font-light leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Animated Proficiency Bar */}
                  <div className="w-full bg-[#F4F0E8] h-1.5 rounded-full overflow-hidden mb-6 border border-[#E2DCD2]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.proficiency}%` }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.03 }}
                      className="h-full bg-gradient-to-r from-[#B85C3B] to-[#8E9A78] rounded-full"
                    />
                  </div>

                  {/* Capabilities List */}
                  <div className="space-y-1.5 mb-6">
                    {item.capabilities.slice(0, 3).map((cap, capIdx) => (
                      <div key={capIdx} className="flex items-center gap-2 text-[11px] font-mono text-[#25231F]/80">
                        <CheckCircle2 className="w-3 h-3 text-[#B85C3B] flex-shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer Line */}
                <div className="pt-4 border-t border-[#E2DCD2] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[9px] font-mono text-[#9A948C] uppercase tracking-widest block">Exp</span>
                      <span className="text-xs font-mono font-bold text-[#25231F]">{item.experienceYears}+ Yrs</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-[#9A948C] uppercase tracking-widest block">Builds</span>
                      <span className="text-xs font-mono font-bold text-[#25231F]">{item.projectsCount}+ MVPs</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-full border border-[#E2DCD2] text-[#9A948C] group-hover:text-[#B85C3B] group-hover:border-[#B85C3B] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── BOTTOM MASTERY METRICS BAR ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-3xl bg-[#FAF8F3]/90 backdrop-blur-xl border border-[#E2DCD2] shadow-lg"
        >
          <div>
            <div className="text-3xl font-serif font-bold text-[#B85C3B] mb-1">98+</div>
            <div className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest">Lighthouse Web Vitals</div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#25231F] mb-1">4.0+ Yrs</div>
            <div className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest">Enterprise Architecture</div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#B85C3B] mb-1">25+</div>
            <div className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest">Shipped Applications</div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#25231F] mb-1">100%</div>
            <div className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest">Strict Type Safety</div>
          </div>
        </motion.div>

      </div>

      {/* ── EXPANDABLE TECH DETAIL MODAL ────────────────────────────────── */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#161412]/60 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedTech(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full p-8 md:p-10 rounded-3xl bg-[#FAF8F3] border border-[#B85C3B]/30 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20">
                  {selectedTech.categoryLabel}
                </span>
                <button
                  onClick={() => setSelectedTech(null)}
                  className="w-8 h-8 rounded-full border border-[#E2DCD2] flex items-center justify-center text-xs font-mono text-[#25231F] hover:bg-[#25231F] hover:text-[#FAF8F3] transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-mono font-bold text-[#B85C3B]">{selectedTech.symbol}</span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#25231F]">
                  {selectedTech.name}
                </h3>
              </div>

              <p className="text-sm text-[#787268] font-light leading-relaxed mb-6">
                {selectedTech.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DCD2]">
                <div>
                  <div className="text-2xl font-serif font-bold text-[#B85C3B]">{selectedTech.experienceYears}+ Yrs</div>
                  <div className="text-[9px] font-mono text-[#9A948C] uppercase tracking-widest">Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#25231F]">{selectedTech.projectsCount}+ MVPs</div>
                  <div className="text-[9px] font-mono text-[#9A948C] uppercase tracking-widest">Production Builds</div>
                </div>
              </div>

              <div className="mb-8">
                <div className="text-[10px] font-mono tracking-widest text-[#9A948C] uppercase mb-3">
                  Core Architectural Capabilities
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedTech.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-[#25231F]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B85C3B] flex-shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-[#E2DCD2]">
                <button
                  onClick={scrollToProjects}
                  onMouseEnter={playHover}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#B85C3B] text-[#FAF8F3] text-xs font-mono tracking-widest uppercase hover:bg-[#25231F] transition-all duration-300 shadow-md cursor-pointer group"
                >
                  <span>View Projects Using {selectedTech.name}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="p-3.5 rounded-full border border-[#E2DCD2] text-[#25231F] hover:bg-[#25231F] hover:text-[#FAF8F3] transition-all duration-300"
                  title="View GitHub Code"
                >
                  <Code2 className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

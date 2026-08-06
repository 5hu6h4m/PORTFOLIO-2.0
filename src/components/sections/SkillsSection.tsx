'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Code2, Sparkles, CheckCircle2, Layers, Compass, Cpu, Database, Server, Terminal, Share2 } from 'lucide-react';
import { CONSTELLATION_TECHS, ConstellationTech } from '@/data/constellationData';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface SkillsSectionProps {
  playClick: () => void;
  playHover: () => void;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Architecture', icon: Cpu },
  { id: 'frontend', label: '01 / Frontend', icon: Layers },
  { id: 'backend', label: '02 / Backend', icon: Server },
  { id: 'database', label: '03 / Databases', icon: Database },
  { id: 'devops', label: '04 / DevOps & Motion', icon: Terminal },
];

export function SkillsSection({ playClick, playHover }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<ConstellationTech>(CONSTELLATION_TECHS[0]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: '-15%' });

  const activeTech = CONSTELLATION_TECHS.find((t) => t.id === hoveredTechId) || selectedTech;

  // Filtered items based on active category
  const filteredItems = activeCategory === 'all'
    ? CONSTELLATION_TECHS
    : CONSTELLATION_TECHS.filter((item) => item.category === activeCategory);

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
      className="relative pt-24 pb-20 px-6 md:px-12 bg-[#F7F3EC] text-[#23201C] overflow-hidden select-none border-t border-[#E2DCD2] min-h-screen flex flex-col justify-center"
    >
      {/* Volumetric warm background glow */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[750px] h-[750px] bg-radial from-[#B85C3B]/10 via-[#8E9A78]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full pt-4">

        {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#B85C3B] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 / TECHNICAL ARSENAL — KINETIC CONSTELLATION</span>
            </div>
            <h2
              className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-[#232320]"
              style={{ letterSpacing: '-0.03em' }}
            >
              TECH STACK
            </h2>
          </div>

          <p className="text-sm text-[#787268] font-light max-w-md leading-relaxed">
            Architectural frameworks & systems. Hover any technology to highlight inter-connected dependency threads.
          </p>
        </motion.div>

        {/* ── CATEGORY PILLAR TABS ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-8"
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
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#23201C] text-[#FCFAF6] border-[#23201C] shadow-md scale-105'
                    : 'bg-[#FCFAF6]/90 text-[#23201C]/80 border-[#E2DCD2] hover:border-[#B85C3B]/40 shadow-sm'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B85C3B]' : 'text-[#9A948C]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ── MAIN DUAL COLUMN LAYOUT (LEFT CONSTELLATION GRID + RIGHT INSPECTOR) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[480px]">

          {/* ── LEFT COLUMN (7 COLS): INTERACTIVE CONSTELLATION MATRIX ───────── */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-3xl bg-[#FCFAF6]/70 backdrop-blur-md border border-[#E2DCD2] shadow-lg relative overflow-hidden"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((tech) => {
                  const isHovered = hoveredTechId === tech.id;
                  const isSelected = selectedTech.id === tech.id;
                  const isConnected = hoveredTechId
                    ? activeTech.connections.includes(tech.id) || tech.connections.includes(activeTech.id)
                    : false;

                  return (
                    <motion.button
                      key={tech.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => {
                        playClick();
                        setSelectedTech(tech);
                      }}
                      onMouseEnter={() => {
                        playHover();
                        setHoveredTechId(tech.id);
                      }}
                      onMouseLeave={() => setHoveredTechId(null)}
                      className={`p-4 rounded-2xl transition-all duration-300 border text-left cursor-pointer relative overflow-hidden flex flex-col justify-between h-[100px] select-none ${
                        isHovered || isSelected
                          ? 'bg-[#23201C] text-[#FCFAF6] border-[#23201C] shadow-lg scale-105 z-10'
                          : isConnected
                          ? 'bg-[#B85C3B]/10 text-[#23201C] border-[#B85C3B] shadow-md scale-102'
                          : 'bg-[#FCFAF6] text-[#23201C] border-[#E2DCD2] hover:border-[#B85C3B]/50 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-mono font-bold">{tech.symbol}</span>
                        {isConnected && (
                          <span className="flex items-center gap-1 text-[8px] font-mono text-[#B85C3B] uppercase font-bold">
                            <Share2 className="w-2.5 h-2.5" />
                            <span>Linked</span>
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-sm font-serif font-bold tracking-tight leading-none mb-1">
                          {tech.name}
                        </div>
                        <div className={`text-[9px] font-mono uppercase tracking-widest ${isHovered || isSelected ? 'text-[#B85C3B]' : 'text-[#9A948C]'}`}>
                          {tech.proficiency}% Mastery
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN (5 COLS): REAL-TIME MASTERY INSPECTOR PANEL ────── */}
          <div className="lg:col-span-5 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTech.id}
                initial={{ opacity: 0, x: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 md:p-8 rounded-3xl bg-[#FCFAF6]/95 backdrop-blur-xl border border-[#B85C3B]/25 shadow-xl relative overflow-hidden flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20">
                      {activeTech.categoryLabel}
                    </span>
                    <span className="text-[9px] font-mono text-[#9A948C] tracking-widest uppercase">
                      Verified System
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-mono font-bold text-[#B85C3B]">{activeTech.symbol}</span>
                    <h3 className="text-3xl font-serif font-bold text-[#23201C]">
                      {activeTech.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#787268] font-light leading-relaxed mb-4">
                    {activeTech.description}
                  </p>

                  {/* Animated Proficiency Bar */}
                  <div className="mb-4 p-3 rounded-xl bg-[#F7F3EC] border border-[#E2DCD2]">
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                      <span className="text-[#23201C] font-bold uppercase tracking-wider">Proficiency Score</span>
                      <span className="text-[#B85C3B] font-bold">{activeTech.proficiency}%</span>
                    </div>
                    <div className="w-full bg-[#E2DCD2] h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeTech.proficiency}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-[#B85C3B] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-[#F7F3EC] border border-[#E2DCD2]">
                    <div>
                      <div className="text-lg font-serif font-bold text-[#B85C3B]">{activeTech.experienceYears}+ Yrs</div>
                      <div className="text-[8px] font-mono text-[#9A948C] uppercase tracking-widest">Experience</div>
                    </div>
                    <div>
                      <div className="text-lg font-serif font-bold text-[#23201C]">{activeTech.projectsCount}+ MVPs</div>
                      <div className="text-[8px] font-mono text-[#9A948C] uppercase tracking-widest">Production Builds</div>
                    </div>
                  </div>

                  {/* Capabilities List */}
                  <div className="mb-6">
                    <div className="text-[9px] font-mono tracking-widest text-[#9A948C] uppercase mb-2 flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-[#B85C3B]" />
                      <span>Architectural Capabilities</span>
                    </div>
                    <div className="space-y-1">
                      {activeTech.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] font-mono text-[#23201C]">
                          <CheckCircle2 className="w-3 h-3 text-[#B85C3B] flex-shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-[#E2DCD2]">
                  <button
                    onClick={scrollToProjects}
                    onMouseEnter={playHover}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#B85C3B] text-[#FCFAF6] text-[11px] font-mono tracking-widest uppercase hover:bg-[#232320] transition-all duration-300 shadow-sm cursor-pointer group"
                  >
                    <span>View Shipped Projects</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <a
                    href={PORTFOLIO_DATA.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="p-2.5 rounded-full border border-[#E2DCD2] text-[#23201C] hover:bg-[#23201C] hover:text-[#FCFAF6] transition-all duration-300"
                    title="View GitHub Code"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ── BOTTOM MASTERY METRICS BAR ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 mt-8 rounded-3xl bg-[#FCFAF6]/90 backdrop-blur-xl border border-[#E2DCD2] shadow-md"
        >
          <div>
            <div className="text-2xl font-serif font-bold text-[#B85C3B]">98+</div>
            <div className="text-[9px] font-mono text-[#9A948C] uppercase tracking-widest">Lighthouse Web Vitals</div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-[#23201C]">4.0+ Yrs</div>
            <div className="text-[9px] font-mono text-[#9A948C] uppercase tracking-widest">Enterprise Architecture</div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-[#B85C3B]">25+</div>
            <div className="text-[9px] font-mono text-[#9A948C] uppercase tracking-widest">Shipped Production MVPs</div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-[#23201C]">100%</div>
            <div className="text-[9px] font-mono text-[#9A948C] uppercase tracking-widest">Strict Type Safety</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

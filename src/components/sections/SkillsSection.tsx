'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Code2, Sparkles, Building2, CheckCircle2, RotateCcw, Layers } from 'lucide-react';
import { TECH_CITY_BUILDINGS, CityBuilding } from '@/data/techCityData';
import { TechCityCanvas } from '@/components/3d/TechCityCanvas';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface SkillsSectionProps {
  playClick: () => void;
  playHover: () => void;
}

export function SkillsSection({ playClick, playHover }: SkillsSectionProps) {
  const [activeBuilding, setActiveBuilding] = useState<CityBuilding>(TECH_CITY_BUILDINGS[0]);
  const [hoveredBuilding, setHoveredBuilding] = useState<CityBuilding | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: '-15%' });

  // Mouse move listener for smooth mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = -(e.clientY / innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentDisplayBuilding = hoveredBuilding || activeBuilding;

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
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[800px] h-[800px] bg-radial from-[#B85C3B]/10 via-[#8A2E2B]/5 to-transparent blur-3xl pointer-events-none" />

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
              <span>02 / TECHNICAL ECOSYSTEM — KINETIC CUBE CITY</span>
            </div>
            <h2
              className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-[#23201C]"
              style={{ letterSpacing: '-0.03em' }}
            >
              TECH CITY
            </h2>
          </div>

          <p className="text-sm text-[#787268] font-light max-w-md leading-relaxed">
            Six architectural towers constructed from floating cube particles. Hover or select any building to inspect technology systems.
          </p>
        </motion.div>

        {/* ── BUILDING SELECTOR PILLS ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6"
        >
          {TECH_CITY_BUILDINGS.map((building) => {
            const isSelected = currentDisplayBuilding.id === building.id;
            return (
              <button
                key={building.id}
                onClick={() => {
                  playClick();
                  setActiveBuilding(building);
                }}
                onMouseEnter={() => {
                  playHover();
                  setHoveredBuilding(building);
                }}
                onMouseLeave={() => setHoveredBuilding(null)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#23201C] text-[#FCFAF6] border-[#23201C] shadow-md scale-105'
                    : 'bg-[#FCFAF6]/90 text-[#23201C]/80 border-[#E2DCD2] hover:border-[#B85C3B]/50'
                }`}
              >
                <Building2 className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B85C3B]' : 'text-[#9A948C]'}`} />
                <span>{building.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ── MAIN DUAL COLUMN LAYOUT (LEFT 3D CITY + RIGHT GLASS INSPECTOR) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px]">

          {/* ── LEFT COLUMN (7 COLS): 3D KINETIC CUBE TECH CITY ─────────────── */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="w-full h-[460px] md:h-[520px] rounded-3xl bg-[#FCFAF6]/70 backdrop-blur-md border border-[#E2DCD2] shadow-xl relative overflow-hidden flex items-center justify-center pointer-events-auto"
            >
              <TechCityCanvas
                activeBuildingId={currentDisplayBuilding.id}
                onHoverBuilding={(b) => setHoveredBuilding(b)}
                onSelectBuilding={(b) => setActiveBuilding(b)}
                inView={inView}
                mousePos={mousePos}
                playHover={playHover}
                playClick={playClick}
              />
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN (5 COLS): FLOATING GLASS INSPECTOR PANEL ────────── */}
          <div className="lg:col-span-5 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDisplayBuilding.id}
                initial={{ opacity: 0, x: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 md:p-8 rounded-3xl bg-[#FCFAF6]/95 backdrop-blur-xl border border-[#B85C3B]/25 shadow-xl relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20">
                      {currentDisplayBuilding.subtitle}
                    </span>
                    <span className="text-[9px] font-mono text-[#9A948C] tracking-widest uppercase">
                      Verified Ecosystem
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#23201C] mb-2">
                    {currentDisplayBuilding.title}
                  </h3>

                  <p className="text-xs text-[#787268] font-light leading-relaxed mb-4">
                    {currentDisplayBuilding.description}
                  </p>

                  {/* Architecture Focus Tags */}
                  <div className="mb-4">
                    <div className="text-[9px] font-mono tracking-widest text-[#9A948C] uppercase mb-2 flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-[#B85C3B]" />
                      <span>Architectural Pillars</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {currentDisplayBuilding.architectureFocus.map((focus, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#23201C]/5 text-[#23201C] border border-[#E2DCD2]"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Building Technologies Grid */}
                  <div className="mb-6">
                    <div className="text-[9px] font-mono tracking-widest text-[#9A948C] uppercase mb-2">
                      Technologies & Libraries
                    </div>
                    <div className="space-y-2">
                      {currentDisplayBuilding.technologies.map((tech) => (
                        <div
                          key={tech.id}
                          className="p-2.5 rounded-xl bg-[#F7F3EC] border border-[#E2DCD2] flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base font-mono">{tech.symbol}</span>
                            <div>
                              <div className="text-xs font-mono font-bold text-[#23201C]">{tech.name}</div>
                              <div className="text-[9px] text-[#787268] font-light">{tech.description}</div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-[10px] font-mono font-bold text-[#B85C3B]">{tech.experienceYears}+ Yrs</div>
                            <div className="text-[8px] font-mono text-[#9A948C] uppercase">{tech.projectsCount}+ Builds</div>
                          </div>
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
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#B85C3B] text-[#FCFAF6] text-[11px] font-mono tracking-widest uppercase hover:bg-[#23201C] transition-all duration-300 shadow-sm cursor-pointer group"
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
                    title="View GitHub Repository"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

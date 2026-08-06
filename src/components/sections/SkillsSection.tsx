'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Code2, ExternalLink, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { TECH_STACK, TechItem } from '@/data/techStackData';
import { KnowledgeSphereCanvas } from '@/components/3d/KnowledgeSphereCanvas';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface SkillsSectionProps {
  playClick: () => void;
  playHover: () => void;
}

export function SkillsSection({ playClick, playHover }: SkillsSectionProps) {
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(TECH_STACK[0]); // Default select React
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });

  const activeTech = hoveredTech || selectedTech || TECH_STACK[0];

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
      className="relative min-h-screen py-28 px-6 md:px-12 bg-[#F7F3EC] text-[#23201C] overflow-hidden select-none"
    >
      {/* Volumetric warm background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-radial from-[#B55D3D]/10 via-[#8A2E2B]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#B55D3D] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Knowledge System</span>
            </div>
            <h2
              className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-[#23201C]"
              style={{ letterSpacing: '-0.03em' }}
            >
              TECH STACK
            </h2>
          </div>

          <p className="text-base text-[#23201C]/70 font-light max-w-md leading-relaxed">
            The technologies I use to design, engineer, and ship modern digital experiences — rendered from a dynamic knowledge sphere.
          </p>
        </motion.div>

        {/* ── TECH SELECTOR PILLS GRID ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-12"
        >
          {TECH_STACK.map((tech) => {
            const isSelected = selectedTech?.id === tech.id;
            const isHovered = hoveredTech?.id === tech.id;

            return (
              <button
                key={tech.id}
                onClick={() => {
                  playClick();
                  setSelectedTech(tech);
                }}
                onMouseEnter={() => {
                  playHover();
                  setHoveredTech(tech);
                }}
                onMouseLeave={() => setHoveredTech(null)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#23201C] text-[#FCFAF6] border-[#23201C] shadow-lg scale-105'
                    : isHovered
                    ? 'bg-[#FCFAF6] text-[#B55D3D] border-[#B55D3D]/50 shadow-md scale-102'
                    : 'bg-[#FCFAF6]/70 text-[#23201C]/70 border-[#23201C]/15 hover:border-[#23201C]/40'
                }`}
              >
                {tech.name}
              </button>
            );
          })}
        </motion.div>

        {/* ── MAIN INTERACTIVE EXPERIENCE (CANVAS + GLASS DETAIL PANEL) ────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[550px]">

          {/* LEFT / CENTER — 3D KNOWLEDGE SPHERE CANVAS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7 h-[480px] md:h-[580px] rounded-3xl bg-[#FCFAF6]/60 backdrop-blur-md border border-[#23201C]/10 shadow-xl relative overflow-hidden flex items-center justify-center"
          >
            {/* Ambient Label watermark */}
            <div className="absolute top-6 left-6 text-[10px] font-mono tracking-[0.25em] text-[#23201C]/40 uppercase pointer-events-none">
              Knowledge Sphere // Instanced Cubes
            </div>

            {/* 3D R3F Canvas */}
            <KnowledgeSphereCanvas selectedTech={selectedTech} hoveredTech={hoveredTech} />

            {/* Micro instruction hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#23201C]/50 tracking-widest uppercase pointer-events-none bg-[#FCFAF6]/80 px-4 py-1.5 rounded-full border border-[#23201C]/10">
              Hover technology to converge knowledge cubes
            </div>
          </motion.div>

          {/* RIGHT — PREMIUM FLOATING GLASS DETAIL PANEL */}
          <div className="lg:col-span-5 h-full">
            <AnimatePresence mode="wait">
              {activeTech && (
                <motion.div
                  key={activeTech.id}
                  initial={{ opacity: 0, x: 25, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -25, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="p-8 md:p-10 rounded-3xl bg-[#FCFAF6]/80 backdrop-blur-xl border border-[#B55D3D]/25 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Top Badge & Category */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B55D3D]/10 text-[#B55D3D] border border-[#B55D3D]/20">
                        {activeTech.category}
                      </span>
                      <span className="text-[10px] font-mono text-[#23201C]/50 tracking-widest uppercase">
                        {activeTech.confidence}% Proficiency
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#23201C] mb-3">
                      {activeTech.name}
                    </h3>

                    <p className="text-sm text-[#23201C]/80 font-light leading-relaxed mb-6">
                      {activeTech.description}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#F7F3EC]/80 border border-[#23201C]/10">
                      <div>
                        <div className="text-xl font-serif font-bold text-[#B55D3D]">
                          {activeTech.experienceYears}+ Yrs
                        </div>
                        <div className="text-[9px] font-mono text-[#23201C]/60 uppercase tracking-widest">
                          Experience
                        </div>
                      </div>
                      <div>
                        <div className="text-xl font-serif font-bold text-[#23201C]">
                          {activeTech.projectsCount}+ Builds
                        </div>
                        <div className="text-[9px] font-mono text-[#23201C]/60 uppercase tracking-widest">
                          Production Apps
                        </div>
                      </div>
                    </div>

                    {/* Key Features List */}
                    <div className="mb-6">
                      <div className="text-[10px] font-mono tracking-widest text-[#23201C]/50 uppercase mb-3 flex items-center gap-1.5">
                        <Layers className="w-3 h-3 text-[#B55D3D]" />
                        <span>Core Architecture</span>
                      </div>
                      <div className="space-y-2">
                        {activeTech.keyFeatures.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-mono text-[#23201C]/90">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B55D3D] flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Projects using this tech */}
                    {activeTech.projectsUsing.length > 0 && (
                      <div className="mb-8 pt-4 border-t border-[#23201C]/10">
                        <div className="text-[10px] font-mono tracking-widest text-[#23201C]/50 uppercase mb-2">
                          Applied In Projects
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {activeTech.projectsUsing.map((p, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 rounded text-[9px] font-mono bg-[#23201C]/5 text-[#23201C]/80 border border-[#23201C]/10"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#23201C]/10">
                    <button
                      onClick={scrollToProjects}
                      onMouseEnter={playHover}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#B55D3D] text-[#FCFAF6] text-xs font-mono tracking-widest uppercase hover:bg-[#8A2E2B] transition-all duration-300 shadow-md cursor-pointer group"
                    >
                      <span>View Projects</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>

                    <a
                      href={PORTFOLIO_DATA.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      onMouseEnter={playHover}
                      className="p-3 rounded-full border border-[#23201C]/20 text-[#23201C] hover:bg-[#23201C] hover:text-[#FCFAF6] transition-all duration-300"
                      title="View Code on GitHub"
                    >
                      <Code2 className="w-4 h-4" />
                    </a>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

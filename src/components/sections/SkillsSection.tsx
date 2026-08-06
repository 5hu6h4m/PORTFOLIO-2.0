'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Code2, Sparkles, CheckCircle2, Layers, Compass, RotateCcw } from 'lucide-react';
import { DOMAIN_FACES, DomainFace, PYRAMID_CUBE_ITEMS, PyramidCubeItem } from '@/data/pyramidTechData';
import { PyramidTechCanvas } from '@/components/3d/PyramidTechCanvas';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface SkillsSectionProps {
  playClick: () => void;
  playHover: () => void;
}

export function SkillsSection({ playClick, playHover }: SkillsSectionProps) {
  const [activeDomain, setActiveDomain] = useState<DomainFace>(DOMAIN_FACES[0]); // Front / Frontend
  const [activeCube, setActiveCube] = useState<PyramidCubeItem | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: '-15%' }); // Repeatable formation physics!

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
      className="relative min-h-screen py-28 px-6 md:px-12 bg-[#F4F0E8] text-[#25231F] overflow-hidden select-none border-t border-[#E2DCD2]"
    >
      {/* Volumetric warm background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-radial from-[#B85C3B]/10 via-[#8E9A78]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── 1. SECTION HEADER & SUBTITLE ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#B85C3B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 / KNOWLEDGE STRUCTURE — 4-DOMAIN 3D PYRAMID</span>
          </div>
          <h2
            className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-[#25231F] mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            TECH STACK
          </h2>
          <p className="text-base text-[#787268] font-light max-w-xl text-center leading-relaxed">
            30 knowledge blocks assembling into an interactive 4-layer 3D pyramid. Select any domain face below to rotate the pyramid and inspect architectural capabilities.
          </p>
        </motion.div>

        {/* ── 2. DOMAIN FACE ROTATION CONTROL BAR ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-8"
        >
          {DOMAIN_FACES.map((domain) => {
            const isSelected = activeDomain.id === domain.id && !activeCube;
            return (
              <button
                key={domain.id}
                onClick={() => {
                  playClick();
                  setActiveDomain(domain);
                  setActiveCube(null);
                }}
                onMouseEnter={playHover}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#25231F] text-[#FAF8F3] border-[#25231F] shadow-lg scale-105'
                    : 'bg-[#FAF8F3]/90 text-[#25231F]/80 border-[#E2DCD2] hover:border-[#25231F]/40 shadow-sm'
                }`}
              >
                <Compass className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B85C3B]' : 'text-[#9A948C]'}`} />
                <span>{domain.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ── 3. GRAND UNCONSTRAINED CENTER 3D PYRAMID STAGE ────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full h-[520px] md:h-[640px] relative flex items-center justify-center mb-8 pointer-events-auto"
        >
          {/* Subtle Instruction Badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#9A948C] tracking-widest uppercase pointer-events-none bg-[#FAF8F3]/90 px-5 py-1.5 rounded-full border border-[#E2DCD2] shadow-sm z-20">
            {activeDomain.subtitle} // Click domain buttons or drag to rotate
          </div>

          {/* 3D R3F Pyramid Canvas */}
          <PyramidTechCanvas
            activeDomain={activeDomain}
            activeCube={activeCube}
            onSelectCube={(cube) => {
              setActiveCube(cube);
              const foundDomain = DOMAIN_FACES.find((d) => d.id === cube.domainId);
              if (foundDomain) setActiveDomain(foundDomain);
            }}
            inView={inView}
            playHover={playHover}
            playClick={playClick}
          />
        </motion.div>

        {/* ── 4. DETAILS INSPECTOR CARD (POSITIONED BELOW THE PYRAMID) ──────── */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeCube ? (
              /* CUBE INSPECTOR CARD BELOW PYRAMID */
              <motion.div
                key={activeCube.id}
                initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -25, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 md:p-10 rounded-3xl bg-[#FAF8F3]/95 backdrop-blur-xl border border-[#B85C3B]/30 shadow-2xl relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20">
                        {activeCube.layerName}
                      </span>
                      <span className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest">
                        Cube ID: #{activeCube.id}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#25231F]">
                      {activeCube.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => setActiveCube(null)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono text-[#25231F] border border-[#E2DCD2] hover:bg-[#25231F] hover:text-[#FAF8F3] transition-colors cursor-pointer self-start md:self-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Domain</span>
                  </button>
                </div>

                <p className="text-base text-[#787268] font-light leading-relaxed mb-8 max-w-2xl">
                  {activeCube.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-[#E2DCD2]">
                  <button
                    onClick={scrollToProjects}
                    onMouseEnter={playHover}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#B85C3B] text-[#FAF8F3] text-xs font-mono tracking-widest uppercase hover:bg-[#25231F] transition-all duration-300 shadow-md cursor-pointer group"
                  >
                    <span>View Related Projects</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <a
                    href={PORTFOLIO_DATA.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#E2DCD2] text-[#25231F] text-xs font-mono tracking-widest uppercase hover:bg-[#25231F] hover:text-[#FAF8F3] transition-all duration-300"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>View Code on GitHub</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              /* DOMAIN OVERVIEW CARD BELOW PYRAMID */
              <motion.div
                key={activeDomain.id}
                initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -25, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 md:p-10 rounded-3xl bg-[#FAF8F3]/95 backdrop-blur-xl border border-[#B85C3B]/30 shadow-2xl relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20 inline-block mb-3">
                      {activeDomain.subtitle}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#25231F]">
                      {activeDomain.title}
                    </h3>
                  </div>

                  <div className="text-xs font-mono text-[#9A948C] tracking-widest uppercase">
                    Domain Overview
                  </div>
                </div>

                <p className="text-base text-[#787268] font-light leading-relaxed mb-8 max-w-2xl">
                  {activeDomain.description}
                </p>

                {/* Domain Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#F4F0E8] border border-[#E2DCD2] mb-8">
                  {activeDomain.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="text-2xl font-serif font-bold text-[#B85C3B] mb-0.5">
                        {m.value}
                      </div>
                      <div className="text-[9px] font-mono text-[#9A948C] uppercase tracking-widest">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Domain Technologies Pills */}
                <div className="mb-8">
                  <div className="text-[10px] font-mono tracking-widest text-[#9A948C] uppercase mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#B85C3B]" />
                    <span>Core Technologies in Domain</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeDomain.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1 rounded-full text-xs font-mono bg-[#25231F]/5 text-[#25231F] border border-[#E2DCD2]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-[#E2DCD2]">
                  <button
                    onClick={scrollToProjects}
                    onMouseEnter={playHover}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#B85C3B] text-[#FAF8F3] text-xs font-mono tracking-widest uppercase hover:bg-[#25231F] transition-all duration-300 shadow-md cursor-pointer group"
                  >
                    <span>View Related Projects</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <a
                    href={PORTFOLIO_DATA.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#E2DCD2] text-[#25231F] text-xs font-mono tracking-widest uppercase hover:bg-[#25231F] hover:text-[#FAF8F3] transition-all duration-300"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>View Code on GitHub</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

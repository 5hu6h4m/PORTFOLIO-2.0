'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Code2, Sparkles, CheckCircle2, Layers, Compass, Box, Cpu } from 'lucide-react';
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
  const inView = useInView(sectionRef, { once: false, margin: '-15%' }); // Repeatable formation on scroll!

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
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-radial from-[#B85C3B]/10 via-[#8E9A78]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#B85C3B] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 / KNOWLEDGE STRUCTURE — 4-DOMAIN 3D PYRAMID</span>
            </div>
            <h2
              className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-[#25231F]"
              style={{ letterSpacing: '-0.03em' }}
            >
              TECH STACK
            </h2>
          </div>

          <p className="text-base text-[#787268] font-light max-w-md leading-relaxed">
            30 knowledge blocks assembling into a 4-layer 3D pyramid. Select any face to rotate &amp; view technology domain systems.
          </p>
        </motion.div>

        {/* ── 4 DOMAIN FACES SELECTOR BAR ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-10"
        >
          {DOMAIN_FACES.map((domain) => {
            const isSelected = activeDomain.id === domain.id;
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
                    : 'bg-[#FAF8F3]/80 text-[#25231F]/80 border-[#E2DCD2] hover:border-[#25231F]/40'
                }`}
              >
                <Compass className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B85C3B]' : 'text-[#9A948C]'}`} />
                <span>{domain.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ── MAIN INTERACTIVE EXPERIENCE (3D PYRAMID + SIDE INSPECTOR CARD) ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[560px]">

          {/* LEFT / CENTER — 3D 4-DOMAIN PYRAMID CANVAS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7 h-[500px] md:h-[600px] rounded-3xl bg-[#FAF8F3]/70 backdrop-blur-md border border-[#E2DCD2] shadow-xl relative overflow-hidden flex items-center justify-center group"
          >
            {/* Ambient Watermark Label */}
            <div className="absolute top-6 left-6 text-[10px] font-mono tracking-[0.25em] text-[#9A948C] uppercase pointer-events-none flex items-center gap-2">
              <Box className="w-3.5 h-3.5 text-[#B85C3B]" />
              <span>{activeDomain.subtitle} // 3D Pyramid</span>
            </div>

            {/* 3D R3F Pyramid Canvas */}
            <PyramidTechCanvas
              activeDomain={activeDomain}
              activeCube={activeCube}
              onSelectCube={(cube) => {
                setActiveCube(cube);
                // Also auto-switch activeDomain if cube belongs to another domain
                const foundDomain = DOMAIN_FACES.find((d) => d.id === cube.domainId);
                if (foundDomain) setActiveDomain(foundDomain);
              }}
              inView={inView}
              playHover={playHover}
              playClick={playClick}
            />

            {/* Instruction Hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#9A948C] tracking-widest uppercase pointer-events-none bg-[#FAF8F3]/90 px-4 py-1.5 rounded-full border border-[#E2DCD2] shadow-sm">
              Click face buttons to rotate pyramid to each technology domain
            </div>
          </motion.div>

          {/* RIGHT — PREMIUM FLOATING GLASS INSPECTOR PANEL */}
          <div className="lg:col-span-5 h-full">
            <AnimatePresence mode="wait">
              {activeCube ? (
                /* CUBE INSPECTOR CARD */
                <motion.div
                  key={activeCube.id}
                  initial={{ opacity: 0, x: 25, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -25, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="p-8 md:p-10 rounded-3xl bg-[#FAF8F3]/90 backdrop-blur-xl border border-[#B85C3B]/25 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20">
                        {activeCube.layerName}
                      </span>
                      <button
                        onClick={() => setActiveCube(null)}
                        className="text-[10px] font-mono text-[#9A948C] hover:text-[#25231F] uppercase tracking-widest cursor-pointer"
                      >
                        Reset to Domain
                      </button>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#25231F] mb-3">
                      {activeCube.name}
                    </h3>

                    <p className="text-sm text-[#787268] font-light leading-relaxed mb-6">
                      {activeCube.description}
                    </p>

                    <div className="p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DCD2] mb-6">
                      <div className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest mb-1">
                        Selected Cube Target
                      </div>
                      <div className="text-sm font-mono text-[#25231F] font-bold">
                        {activeCube.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-[#E2DCD2]">
                    <button
                      onClick={scrollToProjects}
                      onMouseEnter={playHover}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#B85C3B] text-[#FAF8F3] text-xs font-mono tracking-widest uppercase hover:bg-[#25231F] transition-all duration-300 shadow-md cursor-pointer group"
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
                      className="p-3 rounded-full border border-[#E2DCD2] text-[#25231F] hover:bg-[#25231F] hover:text-[#FAF8F3] transition-all duration-300"
                      title="View Code on GitHub"
                    >
                      <Code2 className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* DOMAIN OVERVIEW CARD */
                <motion.div
                  key={activeDomain.id}
                  initial={{ opacity: 0, x: 25, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -25, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="p-8 md:p-10 rounded-3xl bg-[#FAF8F3]/90 backdrop-blur-xl border border-[#B85C3B]/25 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20">
                        {activeDomain.subtitle}
                      </span>
                      <span className="text-[10px] font-mono text-[#9A948C] tracking-widest uppercase">
                        Domain Verified
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#25231F] mb-3">
                      {activeDomain.title}
                    </h3>

                    <p className="text-sm text-[#787268] font-light leading-relaxed mb-6">
                      {activeDomain.description}
                    </p>

                    {/* Domain Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DCD2]">
                      {activeDomain.metrics.map((m, i) => (
                        <div key={i}>
                          <div className="text-xl font-serif font-bold text-[#B85C3B]">
                            {m.value}
                          </div>
                          <div className="text-[9px] font-mono text-[#9A948C] uppercase tracking-widest">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies List */}
                    <div className="mb-8">
                      <div className="text-[10px] font-mono tracking-widest text-[#9A948C] uppercase mb-3 flex items-center gap-1.5">
                        <Layers className="w-3 h-3 text-[#B85C3B]" />
                        <span>Domain Technologies</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeDomain.technologies.map((t, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-[10px] font-mono bg-[#25231F]/5 text-[#25231F] border border-[#E2DCD2]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#E2DCD2]">
                    <button
                      onClick={scrollToProjects}
                      onMouseEnter={playHover}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#B85C3B] text-[#FAF8F3] text-xs font-mono tracking-widest uppercase hover:bg-[#25231F] transition-all duration-300 shadow-md cursor-pointer group"
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
                      className="p-3 rounded-full border border-[#E2DCD2] text-[#25231F] hover:bg-[#25231F] hover:text-[#FAF8F3] transition-all duration-300"
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

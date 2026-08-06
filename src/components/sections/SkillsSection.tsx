'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Code2, Sparkles, CheckCircle2, Layers, Compass, RotateCcw, Sliders } from 'lucide-react';
import { DOMAIN_FACES, DomainFace, PyramidCubeItem } from '@/data/pyramidTechData';
import { PyramidTechCanvas } from '@/components/3d/PyramidTechCanvas';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface SkillsSectionProps {
  playClick: () => void;
  playHover: () => void;
}

export function SkillsSection({ playClick, playHover }: SkillsSectionProps) {
  const [rotationDeg, setRotationDeg] = useState<number>(0); // 0° to 360°
  const [activeCube, setActiveCube] = useState<PyramidCubeItem | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: '-15%' });

  // Map current rotation degree to active domain face
  const activeDomainIndex = Math.floor(((rotationDeg % 360 + 45) % 360) / 90);
  const activeDomain = DOMAIN_FACES[activeDomainIndex % 4];

  const handleDomainSelect = (domain: DomainFace) => {
    playClick();
    const targetDeg = Math.round((domain.angle * 180) / Math.PI);
    setRotationDeg(targetDeg);
    setActiveCube(null);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setRotationDeg(val);
  };

  const scrollToProjects = () => {
    playClick();
    const projEl = document.getElementById('projects');
    if (projEl) {
      projEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const rotationRad = (rotationDeg * Math.PI) / 180;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-16 md:py-20 px-6 md:px-12 bg-[#F4F0E8] text-[#25231F] overflow-hidden select-none border-t border-[#E2DCD2] min-h-screen flex flex-col justify-center"
    >
      {/* Volumetric warm background glow */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[700px] h-[700px] bg-radial from-[#B85C3B]/10 via-[#8E9A78]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">

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
              <span>02 / KNOWLEDGE STRUCTURE — 4-DOMAIN 3D PYRAMID</span>
            </div>
            <h2
              className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-[#25231F]"
              style={{ letterSpacing: '-0.03em' }}
            >
              TECH STACK
            </h2>
          </div>

          <p className="text-sm text-[#787268] font-light max-w-md leading-relaxed">
            30 knowledge blocks forming a 3D pyramid. Use the rotation slider or domain face buttons to inspect technical capabilities.
          </p>
        </motion.div>

        {/* ── MAIN DUAL COLUMN LAYOUT (LEFT 3D PYRAMID + RIGHT DETAILS CARD) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">

          {/* ── LEFT COLUMN (7 COLS): 3D PYRAMID (TOP) + ROTATION SLIDER (UNDERNEATH) ── */}
          <div className="lg:col-span-7 flex flex-col items-center">

            {/* 1. 3D PYRAMID CANVAS CONTAINER (MOVED TO TOP) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="w-full h-[340px] md:h-[380px] rounded-2xl bg-[#FAF8F3]/70 backdrop-blur-md border border-[#E2DCD2] shadow-lg relative overflow-hidden flex items-center justify-center mb-3 pointer-events-auto"
            >
              <PyramidTechCanvas
                rotationRad={rotationRad}
                activeCube={activeCube}
                onSelectCube={(cube) => {
                  setActiveCube(cube);
                  const foundDomain = DOMAIN_FACES.find((d) => d.id === cube.domainId);
                  if (foundDomain) handleDomainSelect(foundDomain);
                }}
                inView={inView}
                playHover={playHover}
                playClick={playClick}
              />
            </motion.div>

            {/* 2. SLEEK MINIMAL ROTATION SLIDER CONTROL (DIRECTLY UNDERNEATH PYRAMID) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3]/80 border border-[#E2DCD2] flex flex-col gap-1.5 mb-3"
            >
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#25231F] font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <Sliders className="w-3 h-3 text-[#B85C3B]" />
                  <span>Pyramid Rotation Dial</span>
                </span>
                <span className="text-[#B85C3B] font-bold tracking-widest text-[10px]">
                  {rotationDeg}° // {activeDomain.title.toUpperCase()}
                </span>
              </div>

              {/* Minimal Line Slider */}
              <input
                type="range"
                min={0}
                max={360}
                value={rotationDeg}
                onChange={handleSliderChange}
                className="w-full h-1 bg-[#E2DCD2] rounded-lg appearance-none cursor-pointer accent-[#B85C3B] transition-all"
              />
            </motion.div>

            {/* 3. DOMAIN FACE SELECTOR BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="flex flex-wrap items-center justify-center gap-1.5 w-full"
            >
              {DOMAIN_FACES.map((domain) => {
                const isSelected = activeDomain.id === domain.id && !activeCube;
                return (
                  <button
                    key={domain.id}
                    onClick={() => handleDomainSelect(domain)}
                    onMouseEnter={playHover}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 border cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#25231F] text-[#FAF8F3] border-[#25231F] shadow-sm scale-105'
                        : 'bg-[#FAF8F3]/90 text-[#25231F]/80 border-[#E2DCD2] hover:border-[#25231F]/40'
                    }`}
                  >
                    <Compass className={`w-3 h-3 ${isSelected ? 'text-[#B85C3B]' : 'text-[#9A948C]'}`} />
                    <span>{domain.title}</span>
                  </button>
                );
              })}
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN (5 COLS): FLOATING GLASS INSPECTOR PANEL ────────── */}
          <div className="lg:col-span-5 h-full">
            <AnimatePresence mode="wait">
              {activeCube ? (
                /* CUBE INSPECTOR CARD */
                <motion.div
                  key={activeCube.id}
                  initial={{ opacity: 0, x: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 md:p-8 rounded-3xl bg-[#FAF8F3]/90 backdrop-blur-xl border border-[#B85C3B]/25 shadow-xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20">
                        {activeCube.layerName}
                      </span>
                      <button
                        onClick={() => setActiveCube(null)}
                        className="inline-flex items-center gap-1 text-[9px] font-mono text-[#9A948C] hover:text-[#25231F] uppercase tracking-widest cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Domain View</span>
                      </button>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#25231F] mb-2">
                      {activeCube.name}
                    </h3>

                    <p className="text-xs text-[#787268] font-light leading-relaxed mb-4">
                      {activeCube.description}
                    </p>

                    <div className="p-3 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] mb-4">
                      <div className="text-[9px] font-mono text-[#9A948C] uppercase tracking-widest mb-0.5">
                        Selected Knowledge Block
                      </div>
                      <div className="text-xs font-mono text-[#25231F] font-bold">
                        {activeCube.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#E2DCD2]">
                    <button
                      onClick={scrollToProjects}
                      onMouseEnter={playHover}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#B85C3B] text-[#FAF8F3] text-[11px] font-mono tracking-widest uppercase hover:bg-[#25231F] transition-all duration-300 shadow-sm cursor-pointer group"
                    >
                      <span>View Projects</span>
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>

                    <a
                      href={PORTFOLIO_DATA.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      onMouseEnter={playHover}
                      className="p-2.5 rounded-full border border-[#E2DCD2] text-[#25231F] hover:bg-[#25231F] hover:text-[#FAF8F3] transition-all duration-300"
                      title="View Code on GitHub"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* DOMAIN OVERVIEW CARD */
                <motion.div
                  key={activeDomain.id}
                  initial={{ opacity: 0, x: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 md:p-8 rounded-3xl bg-[#FAF8F3]/90 backdrop-blur-xl border border-[#B85C3B]/25 shadow-xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20">
                        {activeDomain.subtitle}
                      </span>
                      <span className="text-[9px] font-mono text-[#9A948C] tracking-widest uppercase">
                        Verified
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#25231F] mb-2">
                      {activeDomain.title}
                    </h3>

                    <p className="text-xs text-[#787268] font-light leading-relaxed mb-4">
                      {activeDomain.description}
                    </p>

                    {/* Domain Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2]">
                      {activeDomain.metrics.map((m, i) => (
                        <div key={i}>
                          <div className="text-lg font-serif font-bold text-[#B85C3B]">
                            {m.value}
                          </div>
                          <div className="text-[8px] font-mono text-[#9A948C] uppercase tracking-widest">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Domain Technologies List */}
                    <div className="mb-6">
                      <div className="text-[9px] font-mono tracking-widest text-[#9A948C] uppercase mb-2 flex items-center gap-1.5">
                        <Layers className="w-3 h-3 text-[#B85C3B]" />
                        <span>Core Domain Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {activeDomain.technologies.map((t, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#25231F]/5 text-[#25231F] border border-[#E2DCD2]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[#E2DCD2]">
                    <button
                      onClick={scrollToProjects}
                      onMouseEnter={playHover}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#B85C3B] text-[#FAF8F3] text-[11px] font-mono tracking-widest uppercase hover:bg-[#25231F] transition-all duration-300 shadow-sm cursor-pointer group"
                    >
                      <span>View Projects</span>
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>

                    <a
                      href={PORTFOLIO_DATA.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      onMouseEnter={playHover}
                      className="p-2.5 rounded-full border border-[#E2DCD2] text-[#25231F] hover:bg-[#25231F] hover:text-[#FAF8F3] transition-all duration-300"
                      title="View Code on GitHub"
                    >
                      <Code2 className="w-3.5 h-3.5" />
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

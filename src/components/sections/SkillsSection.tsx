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
      className="relative min-h-screen py-28 px-6 md:px-12 bg-[#F4F0E8] text-[#25231F] overflow-hidden select-none border-t border-[#E2DCD2]"
    >
      {/* Volumetric warm background glow */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[750px] h-[750px] bg-radial from-[#B85C3B]/10 via-[#8E9A78]/5 to-transparent blur-3xl pointer-events-none" />

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
            30 knowledge blocks assembling into a 4-layer 3D pyramid. Use the 360° rotation slider or domain face buttons to rotate and inspect technology systems.
          </p>
        </motion.div>

        {/* ── MAIN DUAL COLUMN LAYOUT (LEFT 3D PYRAMID + RIGHT DETAILS CARD) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start min-h-[580px]">

          {/* ── LEFT COLUMN (7 COLS): 3D PYRAMID + 360° ROTATION SLIDER ────── */}
          <div className="lg:col-span-7 flex flex-col items-center">

            {/* DOMAIN FACE SELECTOR BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-4 w-full"
            >
              {DOMAIN_FACES.map((domain) => {
                const isSelected = activeDomain.id === domain.id && !activeCube;
                return (
                  <button
                    key={domain.id}
                    onClick={() => handleDomainSelect(domain)}
                    onMouseEnter={playHover}
                    className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#25231F] text-[#FAF8F3] border-[#25231F] shadow-md scale-105'
                        : 'bg-[#FAF8F3]/90 text-[#25231F]/80 border-[#E2DCD2] hover:border-[#25231F]/40 shadow-sm'
                    }`}
                  >
                    <Compass className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B85C3B]' : 'text-[#9A948C]'}`} />
                    <span>{domain.title}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* 3D PYRAMID CANVAS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full h-[440px] md:h-[500px] rounded-3xl bg-[#FAF8F3]/70 backdrop-blur-md border border-[#E2DCD2] shadow-xl relative overflow-hidden flex items-center justify-center mb-6 pointer-events-auto"
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

            {/* ── 360° ROTATION SLIDER CONTROL DIRECTLY BELOW PYRAMID ────────── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="w-full p-4 md:p-5 rounded-2xl bg-[#FAF8F3]/90 backdrop-blur-md border border-[#E2DCD2] shadow-md flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[#25231F] font-bold tracking-widest uppercase">
                  <Sliders className="w-3.5 h-3.5 text-[#B85C3B]" />
                  <span>360° Pyramid Rotation Control</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20 text-xs font-mono font-bold tracking-wider">
                  {rotationDeg}° // {activeDomain.title.toUpperCase()}
                </div>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min={0}
                max={360}
                value={rotationDeg}
                onChange={handleSliderChange}
                className="w-full h-2 bg-[#E2DCD2] rounded-lg appearance-none cursor-pointer accent-[#B85C3B] transition-all"
              />

              {/* Angle Tick Markers */}
              <div className="flex justify-between text-[9px] font-mono text-[#9A948C] tracking-widest uppercase px-1">
                <span className={rotationDeg >= 0 && rotationDeg < 45 ? 'text-[#B85C3B] font-bold' : ''}>0° FRONT</span>
                <span className={rotationDeg >= 45 && rotationDeg < 135 ? 'text-[#B85C3B] font-bold' : ''}>90° RIGHT</span>
                <span className={rotationDeg >= 135 && rotationDeg < 225 ? 'text-[#B85C3B] font-bold' : ''}>180° BACK</span>
                <span className={rotationDeg >= 225 && rotationDeg < 315 ? 'text-[#B85C3B] font-bold' : ''}>270° LEFT</span>
                <span className={rotationDeg >= 315 ? 'text-[#B85C3B] font-bold' : ''}>360°</span>
              </div>
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN (5 COLS): FLOATING GLASS INSPECTOR PANEL ────────── */}
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
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-[#9A948C] hover:text-[#25231F] uppercase tracking-widest cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Domain View</span>
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
                        Active Selected Cube
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

                    {/* Domain Technologies List */}
                    <div className="mb-8">
                      <div className="text-[10px] font-mono tracking-widest text-[#9A948C] uppercase mb-3 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#B85C3B]" />
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

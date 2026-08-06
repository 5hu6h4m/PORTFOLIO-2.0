'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, X, Cpu, CheckCircle } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';

interface ProjectsChapterProps {
  onClose: () => void;
  playClick: () => void;
  playHover: () => void;
}

export function ProjectsChapter({ onClose, playClick, playHover }: ProjectsChapterProps) {
  const { projects } = PORTFOLIO_DATA;
  const [index, setIndex] = useState(0);
  const activeProj = projects[index];

  const handleNext = () => {
    playClick();
    setIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    playClick();
    setIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="min-h-screen w-full bg-[#161412] text-[#FAF8F3] relative flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none">
      
      {/* Dynamic Colored Background Ambient Glow based on active project */}
      <div className="absolute inset-0 transition-all duration-1000 pointer-events-none" style={{ opacity: 0.12 }}>
        <div 
          className="absolute inset-0 transition-colors duration-1000"
          style={{ backgroundColor: activeProj.accentColor }} 
        />
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#FAF8F3]/10 pb-4 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 text-xs font-mono text-[#FAF8F3]/80 hover:text-[#B85C3B] hover:border-[#B85C3B]/40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>EXIT ARCHIVE</span>
          </button>
          <span className="text-[10px] font-mono text-[#FAF8F3]/40 tracking-wider hidden sm:inline-block">
            CHAPTER 04 // CINEMATIC PRODUCTION MATRIX
          </span>
        </div>

        <div className="text-xs font-mono text-[#FAF8F3]/70">
          PROJ {index + 1} OF {projects.length}
        </div>
      </div>

      {/* Main Cinematic Showcase */}
      <div className="my-auto max-w-7xl mx-auto w-full py-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Product Specs & Details */}
        <div className="lg:col-span-6 xl:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProj.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 text-[9px] font-mono text-[#B85C3B] uppercase tracking-wider">
                  {activeProj.category}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAF8F3]/20" />
                <span className="text-[10px] font-mono text-[#FAF8F3]/50">LAUNCH // {activeProj.year}</span>
              </div>

              <h2 className="text-4xl md:text-5xl xl:text-6xl font-serif font-bold leading-tight tracking-tight">
                {activeProj.title}
              </h2>

              <p className="text-sm md:text-base text-[#FAF8F3]/75 font-light leading-relaxed">
                {activeProj.description}
              </p>

              {/* Specs & Architecture Blocks */}
              <div className="space-y-3 border-y border-[#FAF8F3]/10 py-5">
                <div className="flex items-start gap-3">
                  <Cpu className="w-4 h-4 text-[#B85C3B] mt-0.5" />
                  <div>
                    <div className="text-[9px] font-mono text-[#FAF8F3]/40 uppercase tracking-widest">ARCHITECTURE</div>
                    <div className="text-xs text-[#FAF8F3]/80">{activeProj.caseStudy.architecture.join(' · ')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#B85C3B] mt-0.5" />
                  <div>
                    <div className="text-[9px] font-mono text-[#FAF8F3]/40 uppercase tracking-widest">IMPACT ACHIEVED</div>
                    <div className="text-xs text-[#FAF8F3]/80">{activeProj.caseStudy.metrics.map(m => `${m.value} ${m.label}`).join(' // ')}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={activeProj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#B85C3B] text-white text-xs font-mono uppercase font-bold shadow-md hover:bg-[#A04D2E] transition-colors"
                >
                  <span>Launch Live App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={activeProj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 text-white text-xs font-mono uppercase font-bold hover:bg-[#FAF8F3]/10 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Product Showcase / Image Canvas */}
        <div className="lg:col-span-6 xl:col-span-7 flex justify-center items-center relative">
          
          {/* Subtle spinning background grid lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[500px] h-[500px] border border-[#FAF8F3]/10 rounded-full" />
            <div className="absolute w-[350px] h-[350px] border border-[#FAF8F3]/10 rounded-full border-dashed" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProj.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full max-w-lg aspect-video rounded-2xl bg-[#1E1C1A] border border-[#FAF8F3]/15 overflow-hidden shadow-2xl flex items-center justify-center p-2"
            >
              {/* Device browser chrome bar */}
              <div className="absolute top-0 inset-x-0 h-6 bg-[#252321] border-b border-[#FAF8F3]/5 flex items-center gap-1.5 px-3">
                <span className="w-2 h-2 rounded-full bg-[#FAF8F3]/20" />
                <span className="w-2 h-2 rounded-full bg-[#FAF8F3]/20" />
                <span className="w-2 h-2 rounded-full bg-[#FAF8F3]/20" />
                <span className="text-[7px] font-mono text-[#FAF8F3]/30 mx-auto select-none uppercase tracking-widest">
                  HTTPS://SHUBHAM.DEV/{activeProj.id}
                </span>
              </div>

              {/* Big project preview content */}
              <div className="w-full h-full pt-4 overflow-hidden rounded-lg bg-[#161412] flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-[#B85C3B]/5 pointer-events-none z-10" />
                {/* Tech tags floating overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 z-20">
                  {activeProj.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-[#161412]/80 backdrop-blur-md border border-[#FAF8F3]/10 text-[8px] font-mono text-[#FAF8F3]/70 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
                
                {/* Simulated product graphics placeholder (aesthetic design) */}
                <div className="p-8 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 flex items-center justify-center mx-auto text-[#B85C3B] text-xl font-bold font-mono">
                    {activeProj.title[0]}
                  </div>
                  <div className="text-xl font-serif text-[#FAF8F3]/80 italic">{activeProj.subtitle}</div>
                  <div className="text-[9px] font-mono text-[#FAF8F3]/40 tracking-widest uppercase">
                    PROD ENGINE ON-STAGE PREVIEW
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons / Footer */}
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full border-t border-[#FAF8F3]/10 pt-4 relative z-10">
        <div className="text-[10px] font-mono text-[#FAF8F3]/30 tracking-wider">
          SJ-ENGINE // STABLE BUILD PROD_04
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            onMouseEnter={playHover}
            className="p-3 rounded-full bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 text-[#FAF8F3]/80 hover:text-[#B85C3B] hover:border-[#B85C3B]/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            onMouseEnter={playHover}
            className="p-3 rounded-full bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 text-[#FAF8F3]/80 hover:text-[#B85C3B] hover:border-[#B85C3B]/40 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

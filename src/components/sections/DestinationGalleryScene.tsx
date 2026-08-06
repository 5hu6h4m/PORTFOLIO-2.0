'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, Terminal, FolderKanban, Briefcase, Mail, Compass, Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface DestinationGallerySceneProps {
  isOpen: boolean;
  onClose: () => void;
  playClick: () => void;
  playHover: () => void;
}

export function DestinationGalleryScene({
  isOpen,
  onClose,
  playClick,
  playHover,
}: DestinationGallerySceneProps) {
  const { personal } = PORTFOLIO_DATA;
  const [activeDestination, setActiveDestination] = useState<number>(0);

  const destinations = [
    {
      num: '01',
      code: 'DESTINATION_ABOUT',
      name: 'THE ARCHITECT',
      subtitle: 'Engineering Philosophy & Narrative',
      href: '#about',
      icon: Sparkles,
      accent: '#B85C3B',
      previewText: 'Full Stack Engineer & President @ E-Cell MET BKC. Focused on React 19 architecture, performance optimization, and sub-second Lighthouse speeds.',
    },
    {
      num: '02',
      code: 'DESTINATION_SKILLS',
      name: 'THE MATRIX',
      subtitle: 'Technical Proficiency & Stack',
      href: '#skills',
      icon: Terminal,
      accent: '#8E9A78',
      previewText: 'Production mastery across React 19, Next.js 15 App Router, TypeScript, Node.js, Express, PostgreSQL, Prisma, WebGL, and Three.js canvas shaders.',
    },
    {
      num: '03',
      code: 'DESTINATION_PROJECTS',
      name: 'THE VAULT',
      subtitle: 'Production Work & SaaS Apps',
      href: '#projects',
      icon: FolderKanban,
      accent: '#B85C3B',
      previewText: 'Featured production SaaS products including Nexus Metrics Telemetry, Spatial 3D Configurator, and SyncSpace Collaborative Editor.',
    },
    {
      num: '04',
      code: 'DESTINATION_EXPERIENCE',
      name: 'THE TIMELINE',
      subtitle: 'Career Journey & Achievements',
      href: '#experience',
      icon: Briefcase,
      accent: '#787268',
      previewText: 'Full-stack development internships, project leadership at MET Digital Studio, and 30+ team coordination as E-Cell President.',
    },
    {
      num: '05',
      code: 'DESTINATION_CONTACT',
      name: 'THE NEXUS',
      subtitle: 'Direct Portal & Opportunities',
      href: '#contact',
      icon: Mail,
      accent: '#B85C3B',
      previewText: 'Initiate direct engineering opportunities, project collaborations, or technical consultation via direct email.',
    },
  ];

  if (!isOpen) return null;

  const currentDest = destinations[activeDestination];

  const handleTravelToDestination = (href: string) => {
    playClick();

    // 1. INSTANTLY close overlay so 3D Canvas is 100% uncovered and visible!
    onClose();

    // 2. Dispatch 3D Sub-Cube Equally-Spread Page Construction Event
    window.dispatchEvent(
      new CustomEvent('shatter-travel-destination', {
        detail: { href },
      })
    );

    // 3. Smooth scroll to target section while sub-cubes assemble the page!
    setTimeout(() => {
      window.location.hash = href;
    }, 200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-[#F4F0E8]/96 backdrop-blur-3xl text-[#25231F] flex flex-col justify-between p-6 md:p-14 overflow-hidden pointer-events-auto select-none"
      >
        {/* Top Control Bar */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-10 border-b border-[#E2DCD2] pb-6">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-[#B85C3B] animate-spin" style={{ animationDuration: '12s' }} />
            <span className="text-xs font-mono uppercase tracking-widest text-[#787268]">
              DESTINATION GALLERY · EQUALLY SPREAD 3D PAGE ASSEMBLY
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-block text-xs font-mono text-[#787268]">
              {personal.name} · PORTFOLIO 2026
            </span>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FAF8F3] border border-[#E2DCD2] text-xs font-mono uppercase font-bold text-[#25231F] hover:bg-[#25231F] hover:text-[#FAF8F3] transition-colors cursor-pointer shadow-xs"
            >
              <span>EXIT GALLERY</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Warm Editorial Destination Scene */}
        <div className="max-w-7xl mx-auto w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          {/* Left Destination Selection Matrix */}
          <div className="lg:col-span-7 space-y-3">
            {destinations.map((dest, idx) => {
              const isSelected = activeDestination === idx;
              return (
                <motion.div
                  key={dest.num}
                  onMouseEnter={() => {
                    playHover();
                    setActiveDestination(idx);
                  }}
                  onClick={() => handleTravelToDestination(dest.href)}
                  className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FAF8F3] border-[#B85C3B] shadow-xl translate-x-3'
                      : 'bg-transparent border-[#E2DCD2]/60 hover:bg-[#FAF8F3]/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className="text-sm font-mono font-bold text-[#B85C3B]">{dest.num}</span>
                      <div>
                        <div className="text-xs font-mono text-[#787268] uppercase tracking-wider mb-0.5">
                          {dest.code}
                        </div>
                        <div className="text-2xl md:text-4xl font-serif font-bold tracking-tight text-[#25231F] group-hover:text-[#B85C3B] transition-colors">
                          {dest.name}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden md:inline-block text-xs font-mono text-[#787268] uppercase">
                        {dest.subtitle}
                      </span>
                      <div className={`p-3 rounded-full transition-colors ${isSelected ? 'bg-[#B85C3B] text-white' : 'bg-[#F4F0E8] text-[#25231F]'}`}>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Holographic Preview Chamber Panel */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              key={currentDest.num}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="p-10 rounded-3xl bg-[#FAF8F3] border border-[#E2DCD2] shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#F4F0E8] text-[#B85C3B] flex items-center justify-center border border-[#E2DCD2]">
                  <currentDest.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-[#B85C3B] uppercase tracking-widest font-bold">
                  CHAMBER {currentDest.num}
                </span>
              </div>

              <div>
                <div className="text-xs font-mono text-[#787268] uppercase mb-1">
                  {currentDest.subtitle}
                </div>
                <h3 className="text-3xl font-serif font-bold text-[#25231F] mb-4">
                  {currentDest.name}
                </h3>
                <p className="text-sm text-[#787268] font-light leading-relaxed">
                  {currentDest.previewText}
                </p>
              </div>

              <div className="pt-6 border-t border-[#E2DCD2]">
                <button
                  onClick={() => handleTravelToDestination(currentDest.href)}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-[#25231F] text-[#FAF8F3] text-xs font-mono font-bold uppercase hover:bg-[#B85C3B] transition-all shadow-md cursor-pointer"
                >
                  <span>CONSTRUCT PAGE WITH 3D PIECES</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Destination Meta Bar */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-t border-[#E2DCD2] pt-6 text-xs font-mono text-[#787268] z-10">
          <div className="flex items-center gap-3">
            <Layers className="w-4 h-4 text-[#B85C3B]" />
            <span>3D EQUALLY-SPREAD PAGE RECONSTRUCTION MODE · {currentDest.code}</span>
          </div>
          <div>SELECT DESTINATION TO SPREAD PIECES & FORM PAGE</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

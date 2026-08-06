'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Folder, FolderOpen, Monitor, Terminal, Cpu } from 'lucide-react';
import { ProjectsChapter } from './ProjectsChapter';
import { SkillsUniverse } from './SkillsUniverse';
import { MissionControlDashboard } from './MissionControlDashboard';
import { ExperienceRoadmap } from './ExperienceRoadmap';
const TrophyRoom = ({ onClose }: { onClose: () => void; playClick: () => void; playHover: () => void }) => null;
const ContactSunset = ({ onClose }: { onClose: () => void; playClick: () => void; playHover: () => void; playSuccess?: () => void }) => null;

interface WorkspaceChapterProps {
  playClick: () => void;
  playHover: () => void;
  playSuccess?: () => void;
}

export type ActiveSubChapter = 'projects' | 'skills' | 'leadership' | 'experience' | 'achievements' | 'contact' | null;

export function WorkspaceChapter({ playClick, playHover, playSuccess }: WorkspaceChapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bootStep, setBootStep] = useState(0); // 0 = off, 1 = loading, 2 = loading items, 3 = ready
  const [activeSub, setActiveSub] = useState<ActiveSubChapter>(null);
  
  // Track scroll progress for the continuous zoom effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth scroll progress using spring physics
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Map scroll progress to scale and offset coordinates (centering on the ultrawide monitor screen)
  const scale = useTransform(smoothProgress, [0, 0.45, 0.75], [1, 5, 12]);
  const translateX = useTransform(smoothProgress, [0, 0.45, 0.75], ['0%', '-5%', '-10%']);
  const translateY = useTransform(smoothProgress, [0, 0.45, 0.75], ['0%', '12%', '32%']);
  
  // Opacity transitions
  const deskOpacity = useTransform(smoothProgress, [0.65, 0.82], [1, 0]);
  const monitorScreenOpacity = useTransform(smoothProgress, [0.45, 0.75], [0, 1]);

  // Handle boot animation triggers based on scroll progress
  useEffect(() => {
    return scrollYProgress.on('change', (val) => {
      if (val > 0.15 && val <= 0.35) {
        setBootStep(1); // Boot logo & loading
      } else if (val > 0.35 && val <= 0.6) {
        setBootStep(2); // Loading modules
      } else if (val > 0.6) {
        setBootStep(3); // Ready
      } else {
        setBootStep(0); // Off
      }
    });
  }, [scrollYProgress]);

  const folders = [
    { id: 'projects', label: 'Projects', desc: 'Featured production builds', icon: Folder },
    { id: 'skills', label: 'Skills', desc: 'Floating tech universe', icon: Folder },
    { id: 'leadership', label: 'Leadership', desc: 'E-Cell & Community boards', icon: Folder },
    { id: 'experience', label: 'Experience', desc: 'Cinematic career roadmap', icon: Folder },
    { id: 'achievements', label: 'Achievements', desc: 'Earned trophies & credentials', icon: Folder },
    { id: 'contact', label: 'Contact', desc: 'Desk workspace sunset', icon: Folder },
  ] as const;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '240vh' }}>
      {/* Sticky viewport for zoom animation */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#161412] flex items-center justify-center">
        
        {/* Dynamic ambient backlights */}
        <div className="absolute inset-0 bg-[#B85C3B]/2 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#B85C3B]/5 rounded-full blur-[140px] pointer-events-none" />

        {/* 1. Zoomable Desk & PC Container */}
        <motion.div
          style={{
            scale,
            x: translateX,
            y: translateY,
            opacity: deskOpacity,
          }}
          className="relative w-full max-w-4xl flex items-center justify-center pointer-events-none"
        >
          {/* Desk shadow & glow */}
          <div className="absolute w-[520px] h-[340px] bg-gradient-to-tr from-[#B85C3B]/10 via-[#B85C3B]/5 to-transparent blur-3xl opacity-70" />

          {/* PC Workspace setup PNG */}
          <img
            src="/pc1.png"
            alt="Workspace Monitor Zoom"
            className="w-full h-auto max-h-[460px] object-contain"
            style={{
              filter: 'drop-shadow(0 25px 45px rgba(0,0,0,0.45))',
            }}
          />

          {/* Simulated Monitor Screen Overlaid precisely in the center of /pc1.png */}
          <motion.div
            style={{ opacity: monitorScreenOpacity }}
            className="absolute top-[28%] left-[29.8%] w-[40.4%] h-[27.6%] bg-[#1E1C1A] border border-[#2D2A26] shadow-inner overflow-hidden flex flex-col justify-between p-3 select-none text-[8px] font-mono text-[#FAF8F3]/90"
          >
            {/* Boot / loading sequences inside monitor */}
            {bootStep === 1 && (
              <div className="flex flex-col justify-between h-full w-full">
                <div className="flex items-center gap-1 text-[#B85C3B] text-[7px] border-b border-[#FAF8F3]/10 pb-1">
                  <Monitor className="w-2.5 h-2.5 animate-pulse" />
                  <span>SJ-OS v2.0.26 // BOOTING INITIALIZED</span>
                </div>
                <div className="space-y-1 my-auto text-[6px]">
                  <p className="animate-pulse">Loading Kernel Modules...</p>
                  <p className="text-[#9A948C]">Core parameters: OK</p>
                </div>
                <div className="w-full bg-[#FAF8F3]/5 h-1 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="h-full bg-[#B85C3B] w-[40%]"
                  />
                </div>
              </div>
            )}

            {bootStep === 2 && (
              <div className="flex flex-col justify-between h-full w-full text-[6px]">
                <div className="flex items-center justify-between text-[#B85C3B]">
                  <span>INITIALIZING FRAMEWORKS</span>
                  <Cpu className="w-2 h-2 animate-spin" />
                </div>
                <div className="space-y-0.5 my-auto">
                  <div className="flex justify-between">
                    <span>Projects Engine</span> <span className="text-[#8E9A78]">LOADED ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Skills Matrix</span> <span className="text-[#8E9A78]">LOADED ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Leadership Log</span> <span className="text-[#8E9A78]">LOADED ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experience DB</span> <span className="text-[#8E9A78]">LOADED ✓</span>
                  </div>
                </div>
                <div className="text-[#B85C3B] text-[5px] text-right font-bold tracking-widest animate-pulse">
                  PREPARING COMMAND CENTER...
                </div>
              </div>
            )}

            {bootStep >= 3 && (
              <div className="flex flex-col items-center justify-center h-full w-full space-y-1">
                <Terminal className="w-4 h-4 text-[#B85C3B] animate-pulse" />
                <span className="text-[7px] text-[#8E9A78] tracking-widest font-bold">SYSTEM ACTIVE</span>
                <span className="text-[5px] text-[#FAF8F3]/40">SCROLL DOWN TO ACCESS COMMANDS</span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* 2. Fullscreen Interactive Command Center (Fades in over monitor Zoom) */}
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0.72, 0.88], [0, 1]),
            pointerEvents: useTransform(smoothProgress, (v) => (v > 0.82 ? 'auto' : 'none')),
          }}
          className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 md:p-16 z-10"
        >
          {/* Header Command Strip */}
          <div className="flex items-center justify-between border-b border-[#FAF8F3]/10 pb-4 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-[#B85C3B]" />
              <div className="font-mono text-xs uppercase tracking-wider text-[#FAF8F3]/90">
                SJ-OS // INTERACTIVE COMMAND CENTER
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 text-[10px] font-mono text-[#FAF8F3]/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E9A78] animate-pulse" />
              <span>ALL COMPONENT RUNNING STABLE</span>
            </div>
          </div>

          {/* Luxury Folder Grid */}
          <div className="my-auto max-w-4xl mx-auto w-full grid grid-cols-2 md:grid-cols-3 gap-6 py-8">
            {folders.map((folder, idx) => {
              const FolderIcon = folder.icon;
              return (
                <div
                  key={folder.id}
                  onClick={() => {
                    playClick();
                    setActiveSub(folder.id);
                  }}
                  onMouseEnter={playHover}
                  className="group relative p-6 rounded-2xl bg-[#1A1816] border border-[#FAF8F3]/10 hover:border-[#B85C3B]/60 transition-all duration-500 cursor-pointer shadow-lg overflow-hidden"
                >
                  {/* Glowing hover card effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#B85C3B]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className="p-3 rounded-xl bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 text-[#FAF8F3]/80 group-hover:text-[#B85C3B] group-hover:border-[#B85C3B]/30 transition-all duration-300">
                      <FolderIcon className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <span className="font-mono text-xs text-[#B85C3B]/70 tracking-widest">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1.5 relative z-10">
                    <h3 className="text-xl font-serif font-medium text-[#FAF8F3] group-hover:text-[#B85C3B] transition-colors duration-300">
                      {folder.label}
                    </h3>
                    <p className="text-xs text-[#FAF8F3]/40 group-hover:text-[#FAF8F3]/60 transition-colors">
                      {folder.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive footer line */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#FAF8F3]/30 border-t border-[#FAF8F3]/10 pt-4 max-w-7xl mx-auto w-full">
            <span>READY STATE // CLICK ANY NODE TO ENTER CHAPTER</span>
            <span>SHUBHAM JADHAV © 2026</span>
          </div>
        </motion.div>
      </div>

      {/* 3. Sub-Chapter Fullscreen Overlays */}
      <AnimatePresence>
        {activeSub && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-50 bg-[#161412] overflow-y-auto pointer-events-auto"
          >
            {activeSub === 'projects' && (
              <ProjectsChapter
                onClose={() => {
                  playClick();
                  setActiveSub(null);
                }}
                playClick={playClick}
                playHover={playHover}
              />
            )}
            {activeSub === 'skills' && (
              <SkillsUniverse
                onClose={() => {
                  playClick();
                  setActiveSub(null);
                }}
                playClick={playClick}
                playHover={playHover}
              />
            )}
            {activeSub === 'leadership' && (
              <MissionControlDashboard
                onClose={() => {
                  playClick();
                  setActiveSub(null);
                }}
                playClick={playClick}
                playHover={playHover}
              />
            )}
            {activeSub === 'experience' && (
              <ExperienceRoadmap
                onClose={() => {
                  playClick();
                  setActiveSub(null);
                }}
                playClick={playClick}
                playHover={playHover}
              />
            )}
            {activeSub === 'achievements' && (
              <TrophyRoom
                onClose={() => {
                  playClick();
                  setActiveSub(null);
                }}
                playClick={playClick}
                playHover={playHover}
              />
            )}
            {activeSub === 'contact' && (
              <ContactSunset
                onClose={() => {
                  playClick();
                  setActiveSub(null);
                }}
                playClick={playClick}
                playHover={playHover}
                playSuccess={playSuccess}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

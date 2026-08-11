'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles, FolderGit2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import { CaseStudyModal } from './CaseStudyModal';

interface ProjectsSectionProps {
  playClick: () => void;
  playHover: () => void;
}

const CHAPTER_ACCENTS = ['#B85C3B', '#8E9A78', '#4A6FA5', '#9B5DE5', '#D4A373'];

// ── BORDERLESS LUXURY AESTHETIC PROJECT CARD ────────────────────────────────
function SingleProjectCard({
  project,
  index,
  accent,
  onOpenCase,
  playClick,
  playHover,
}: {
  project: Project;
  index: number;
  accent: string;
  onOpenCase: (p: Project) => void;
  playClick: () => void;
  playHover: () => void;
}) {
  return (
    <div
      onMouseEnter={playHover}
      className="w-[92vw] max-w-6xl h-[78vh] sm:h-[80vh] max-h-[720px] rounded-[2.5rem] bg-[#FCFAF6] shadow-[0_25px_70px_rgba(0,0,0,0.08)] hover:shadow-[0_35px_90px_rgba(184,92,59,0.14)] transition-all duration-500 p-6 sm:p-10 md:p-12 flex flex-col justify-between group relative overflow-hidden select-none"
    >
      {/* Soft Ambient Radial Sheen - NO BORDER */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-700"
        style={{ background: `radial-gradient(circle, ${accent}25 0%, transparent 70%)` }}
      />

      <div className="space-y-6 overflow-y-auto pr-1 scrollbar-none flex-1 z-10">
        {/* Header Metadata Ribbon */}
        <div className="flex items-center justify-between border-b border-[#E2DCD2]/70 pb-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-[0.2em] bg-[#B85C3B]/10 text-[#B85C3B]">
              PROJECT // 0{index + 1}
            </span>
            <span className="text-xs font-mono tracking-[0.2em] text-[#787268] uppercase font-bold">
              YEAR {project.year}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#8E9A78] animate-pulse" />
            <span className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold bg-[#FAF8F3] text-[#25231F] shadow-xs">
              {project.category}
            </span>
          </div>
        </div>

        {/* Hero Title & Subtitle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-1">
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono text-[#B85C3B] uppercase tracking-[0.25em] font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B85C3B]" />
              <span>{project.subtitle}</span>
            </div>
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#25231F] group-hover:text-[#B85C3B] transition-colors leading-[1.06] tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-base text-[#787268] font-light leading-relaxed pt-1">
              {project.description}
            </p>
          </div>

          {/* Metrics Bento Grid — NO TEXT CLIPPING */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {project.caseStudy.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#E2DCD2]/50 space-y-1 overflow-hidden"
              >
                <div
                  className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight truncate"
                  style={{ color: idx === 0 ? accent : '#25231F' }}
                  title={m.value}
                >
                  {m.value}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#787268] font-semibold truncate">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture & Tech Stack Band */}
        <div className="space-y-2.5 pt-5 border-t border-[#E2DCD2]/70">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#787268] font-bold flex items-center justify-between">
            <span>CORE TECH STACK &amp; ARCHITECTURE</span>
            <span className="text-[#B85C3B]">VERIFIED</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold bg-[#FAF8F3] text-[#25231F] border border-[#E2DCD2]/60 hover:border-[#B85C3B]/40 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-2 border-t border-[#E2DCD2]/70 flex items-center justify-between z-10">
        <button
          onClick={() => { playClick(); onOpenCase(project); }}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider border border-[#B85C3B] text-[#B85C3B] bg-transparent hover:bg-[#B85C3B] hover:text-[#FCFAF6] transition-all duration-300 cursor-pointer shadow-xs font-bold"
        >
          <span>Explore Case Study</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            className="p-3 rounded-full border border-[#E2DCD2] bg-[#FAF8F3] text-[#787268] hover:text-[#25231F] hover:border-[#25231F] transition-all shadow-2xs"
            title="Live Application"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            className="p-3 rounded-full border border-[#E2DCD2] bg-[#FAF8F3] text-[#787268] hover:text-[#25231F] hover:border-[#25231F] transition-all shadow-2xs"
            title="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ── MAIN PROJECTS SECTION COMPONENT ──────────────────────────────────────────
export function ProjectsSection({ playClick, playHover }: ProjectsSectionProps) {
  const { projects } = PORTFOLIO_DATA;
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: false });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Responsive spring physics for instant horizontal scroll translation
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 32,
    stiffness: 280,
    mass: 0.2,
  });

  // 600vh track translation bounds: Cards start strictly at Card 01 (0vw) -> -100vw -> -200vw -> -300vw -> -400vw -> -500vw
  const trackX = useTransform(
    smoothProgress,
    [0.00, 0.16, 0.32, 0.48, 0.64, 0.80, 1.00],
    ['0vw', '0vw', '-100vw', '-200vw', '-300vw', '-400vw', '-500vw']
  );

  return (
    <div id="projects" className="relative bg-transparent border-t border-[#E2DCD2]">
      {/* SECTION HEADING — SCROLLS UP NATURALLY OFF-SCREEN */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, x: -90 }}
        animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -90 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-28 pb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-[#E2DCD2]"
      >
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-[#B85C3B] mb-2 font-bold">
            <Sparkles className="w-4 h-4 text-[#B85C3B]" />
            <span>02 / FEATURED PROJECTS ARCHIVE — 5 CASE FILES</span>
          </div>
          <h2
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#25231F]"
            style={{ letterSpacing: '-0.03em' }}
          >
            FEATURED <span className="italic font-normal text-[#B85C3B]">PROJECTS</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-[#787268] mt-4 md:mt-0 font-bold">
          <span className="text-[#B85C3B] uppercase tracking-widest font-bold">SCROLL RIGHT</span>
          <span className="text-[#25231F]">PROJECTS 01 → 05</span>
        </div>
      </motion.div>

      {/* STICKY 100VH HORIZONTAL SLIDER WITH TOP CLEARANCE FOR NAVBAR */}
      <div ref={containerRef} className="relative w-full" style={{ height: '600vh' }}>
        <motion.div
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#FAF8F3] select-none z-20 pointer-events-none pt-24 sm:pt-28 pb-6"
        >
          {/* Volumetric background ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-radial from-[#B85C3B]/10 via-[#8E9A78]/6 to-transparent blur-3xl pointer-events-none" />

          {/* ── 6-SLIDE FULL-HEIGHT HORIZONTAL TRACK (600vw WIDE) ── */}
          <motion.div
            style={{ x: trackX }}
            className="flex h-full w-[600vw] items-center pointer-events-auto"
          >
            {/* 5 Project Cards (Strict 01 -> 05 Sequence) */}
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className="w-screen h-full shrink-0 flex items-center justify-center p-4 sm:p-6 relative"
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Background Watermark Number */}
                <div className="absolute top-1/2 right-12 -translate-y-1/2 text-[24vw] font-serif font-bold text-[#B85C3B]/5 select-none pointer-events-none leading-none">
                  0{i + 1}
                </div>

                <SingleProjectCard
                  project={project}
                  index={i}
                  accent={CHAPTER_ACCENTS[i % CHAPTER_ACCENTS.length]}
                  onOpenCase={setActiveCaseStudy}
                  playClick={playClick}
                  playHover={playHover}
                />
              </motion.div>
            ))}

            {/* Slide 6: Dark Archive Final Slide */}
            <motion.div 
              className="w-screen h-full shrink-0 flex items-center justify-center p-4 sm:p-6 relative"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-[92vw] max-w-6xl h-[78vh] sm:h-[80vh] max-h-[720px] rounded-[2.5rem] bg-[#161412] text-[#FAF8F3] p-8 sm:p-12 md:p-14 shadow-2xl border border-white/10 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-[0.25em] font-bold flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-[#B85C3B]" />
                    <span>FULL PROJECT REPOSITORY</span>
                  </div>
                  <h3 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold leading-none tracking-tight">
                    EXPLORE MORE ON <br />
                    <span className="text-[#B85C3B] italic font-light">GITHUB.</span>
                  </h3>
                  <p className="text-base sm:text-lg text-[#FAF8F3]/60 font-light leading-relaxed max-w-xl">
                    Beyond the featured builds — access open-source tools, code repositories, experimental prototypes, and full-stack deployment scripts.
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="text-xs sm:text-sm font-mono text-[#FAF8F3]/70">
                    Open Source &amp; Engineering Contributions
                  </div>
                  <a
                    href={PORTFOLIO_DATA.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FAF8F3] text-[#161412] text-xs sm:text-sm font-mono tracking-widest uppercase hover:bg-[#B85C3B] hover:text-[#FAF8F3] transition-all duration-300 font-bold shadow-xl"
                  >
                    <GithubIcon className="w-4.5 h-4.5" />
                    <span>VIEW ALL REPOS ON GITHUB</span>
                    <ArrowUpRight className="w-4.5 h-4.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        playClick={playClick}
      />
    </div>
  );
}

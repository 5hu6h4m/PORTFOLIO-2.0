'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import { CaseStudyModal } from './CaseStudyModal';

interface ProjectsSectionProps {
  playClick: () => void;
  playHover: () => void;
}

// Accent colors per project
const CHAPTER_ACCENTS = ['#B85C3B', '#8E9A78', '#4A6FA5', '#9B5DE5'];

interface ChapterProps {
  project: Project;
  index: number;
  accent: string;
  onOpenCase: (p: Project) => void;
  playClick: () => void;
  playHover: () => void;
}

function ProjectChapter({ project, index, accent, onOpenCase, playClick, playHover }: ChapterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' });
  const [hovering, setHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const numY = useTransform(scrollYProgress, [0, 1], ['20px', '-20px']);
  const lineW = useTransform(scrollYProgress, [0.2, 0.6], ['0%', '100%']);

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center border-t border-[#E2DCD2] overflow-hidden group"
      style={{ background: hovering ? `${accent}06` : 'transparent' }}
      onMouseEnter={() => { setHovering(true); playHover(); }}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Animated reveal line */}
      <motion.div
        className="absolute top-0 left-0 h-px"
        style={{ width: lineW, backgroundColor: accent }}
      />

      {/* Chapter content */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left — Chapter number + title */}
        <div className="lg:col-span-6 xl:col-span-5">
          <motion.div
            style={{ color: `${accent}18`, y: numY }}
            className="text-[22vw] lg:text-[14vw] font-serif font-bold leading-none select-none pointer-events-none"
          >
            {String(index + 1).padStart(2, '0')}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="-mt-8 md:-mt-16 relative z-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: accent }}>
                {project.year}
              </span>
              <div className="flex-1 h-px max-w-[40px]" style={{ backgroundColor: accent }} />
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#9A948C] uppercase">
                {project.category}
              </span>
            </div>

            <h3
              className="text-4xl md:text-5xl xl:text-6xl font-serif font-bold text-[#25231F] leading-tight mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              {project.title}
            </h3>

            <p className="text-base text-[#787268] font-light leading-relaxed mb-8 max-w-sm">
              {project.description}
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => { playClick(); onOpenCase(project); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-300 cursor-pointer hover:scale-105"
                style={{ borderColor: accent, color: accent, backgroundColor: 'transparent' }}
              >
                <span>Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                className="p-2 rounded-full border border-[#E2DCD2] text-[#9A948C] hover:text-[#25231F] hover:border-[#25231F] transition-colors"
                title="Live Site"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                className="p-2 rounded-full border border-[#E2DCD2] text-[#9A948C] hover:text-[#25231F] hover:border-[#25231F] transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right — Technical metadata panel */}
        <motion.div
          className="lg:col-span-6 xl:col-span-7"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Project subtitle */}
          <div className="text-xs font-mono text-[#9A948C] uppercase tracking-widest mb-6">
            {project.subtitle}
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-px bg-[#E2DCD2] rounded-2xl overflow-hidden mb-6">
            {project.caseStudy.metrics.map((m, i) => (
              <div key={i} className="bg-[#FAF8F3] p-5">
                <div
                  className="text-2xl md:text-3xl font-serif font-bold text-[#25231F] mb-1"
                  style={{ color: i === 0 ? accent : '#25231F' }}
                >
                  {m.value}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#9A948C]">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border"
                style={{ borderColor: `${accent}40`, color: accent }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Role line */}
          <div className="mt-6 pt-5 border-t border-[#E2DCD2] flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest mb-1">Role</div>
              <div className="text-sm font-mono text-[#25231F]">{project.role}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest mb-1">Client</div>
              <div className="text-sm font-mono text-[#25231F]">{project.client}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── VIEW MORE — DARK FINAL CHAPTER ───────────────────────────────────────────
function ViewMoreChapter({
  extraProjects,
  totalCount,
  playHover,
  playClick,
  onOpenCase,
}: {
  extraProjects: Project[];
  totalCount: number;
  playHover: () => void;
  playClick: () => void;
  onOpenCase: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineW = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%']);
  const github = PORTFOLIO_DATA.personal.github;
  const extra = totalCount - 4;

  return (
    <div
      ref={ref}
      className="relative border-t border-[#E2DCD2] bg-[#161412] text-[#FAF8F3] overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Scroll-progress accent line */}
      <motion.div
        className="absolute top-0 left-0 h-px bg-[#B85C3B]"
        style={{ width: lineW }}
      />

      {/* Ghost big number */}
      <div
        className="absolute top-0 right-[-2vw] text-[22vw] font-serif font-bold select-none pointer-events-none leading-none opacity-[0.07] text-[#B85C3B]"
        style={{ transform: 'translateY(-12%)' }}
      >
        +{extra > 0 ? extra : 'all'}
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="text-[10px] font-mono tracking-[0.3em] text-[#B85C3B] mb-4 uppercase">
            {extra > 0 ? `+ ${extra} More Projects` : 'Full Archive'}
          </div>
          <h3
            className="text-5xl md:text-7xl font-serif font-bold text-[#FAF8F3] leading-none mb-6"
            style={{ letterSpacing: '-0.03em' }}
          >
            {"THERE'S"}<br />MORE.
          </h3>
          <p className="text-base text-[#FAF8F3]/60 font-light max-w-lg leading-relaxed">
            Beyond the featured case files — the full archive of experiments, open-source tools, and production builds lives on GitHub.
          </p>
        </motion.div>

        {/* Extra project mini-cards */}
        {extraProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
          >
            {extraProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                className="group p-6 rounded-2xl border border-[#FAF8F3]/10 bg-[#FAF8F3]/5 hover:bg-[#FAF8F3]/10 hover:border-[#B85C3B]/40 transition-all duration-300 cursor-pointer"
                onClick={() => { playClick(); onOpenCase(project); }}
                onMouseEnter={playHover}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-[10px] font-mono text-[#B85C3B] tracking-widest uppercase mb-1">
                      {project.year}
                    </div>
                    <h4 className="text-lg font-serif font-bold text-[#FAF8F3] group-hover:text-[#B85C3B] transition-colors leading-tight">
                      {project.title}
                    </h4>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5 text-[#B85C3B]" />
                  </div>
                </div>
                <p className="text-xs text-[#FAF8F3]/50 font-light leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[9px] font-mono border border-[#FAF8F3]/15 text-[#FAF8F3]/50"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono border border-[#FAF8F3]/15 text-[#FAF8F3]/30">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: extraProjects.length > 0 ? 0.35 : 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-10 border-t border-[#FAF8F3]/10"
        >
          <div>
            <div className="text-xs font-mono text-[#FAF8F3]/40 mb-1 uppercase tracking-widest">
              Full Project Archive
            </div>
            <div className="text-sm font-mono text-[#FAF8F3]/80">
              All experiments, open-source tools &amp; production builds
            </div>
          </div>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FAF8F3] text-[#161412] text-xs font-mono tracking-widest uppercase hover:bg-[#B85C3B] hover:text-[#FAF8F3] transition-all duration-300 shadow-lg"
          >
            <GithubIcon className="w-4 h-4" />
            <span>VIEW ALL ON GITHUB</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </div>
  );
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
export function ProjectsSection({ playClick, playHover }: ProjectsSectionProps) {
  const { projects } = PORTFOLIO_DATA;
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  // First 4 = featured chapters; extras go into ViewMoreChapter mini-cards
  const FEATURED_COUNT = 4;
  const featuredProjects = projects.slice(0, FEATURED_COUNT);
  const extraProjects = projects.slice(FEATURED_COUNT);

  return (
    <section id="projects" className="bg-[#FAF8F3] relative">
      {/* Section Header */}
      <div ref={headerRef} className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between"
        >
          <div>
            <div className="text-[10px] font-mono tracking-[0.3em] text-[#B85C3B] mb-4">
              03 / FIELD WORK
            </div>
            <h2
              className="text-5xl md:text-7xl font-serif font-bold text-[#25231F] leading-none"
              style={{ letterSpacing: '-0.03em' }}
            >
              CASE<br />FILES
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest mb-1">Operations</div>
            <div className="text-xs font-mono text-[#25231F]">{projects.length} Filed</div>
          </div>
        </motion.div>
      </div>

      {/* Featured project chapters (max 4 full-screen) */}
      {featuredProjects.map((project, i) => (
        <ProjectChapter
          key={project.id}
          project={project}
          index={i}
          accent={CHAPTER_ACCENTS[i % CHAPTER_ACCENTS.length]}
          onOpenCase={setActiveCaseStudy}
          playClick={playClick}
          playHover={playHover}
        />
      ))}

      {/* Dark "View More / GitHub" final chapter — always present */}
      <ViewMoreChapter
        extraProjects={extraProjects}
        totalCount={projects.length}
        playHover={playHover}
        playClick={playClick}
        onOpenCase={setActiveCaseStudy}
      />

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        playClick={playClick}
      />
    </section>
  );
}

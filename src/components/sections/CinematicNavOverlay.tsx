'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, Terminal, FolderKanban, Briefcase, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '@/data/portfolioData';

export type RoomEnvironment = 'about' | 'skills' | 'projects' | 'experience' | 'contact' | null;

interface CinematicNavOverlayProps {
  activeRoom: RoomEnvironment;
  onClose: () => void;
  playClick: () => void;
  playHover: () => void;
}

export function CinematicNavOverlay({
  activeRoom,
  onClose,
  playClick,
  playHover,
}: CinematicNavOverlayProps) {
  const { personal, skillsCategories, projects, experience } = PORTFOLIO_DATA;

  if (!activeRoom) return null;

  const roomVariants = {
    hidden: { opacity: 0, scale: 0.98, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] as const },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      filter: 'blur(8px)',
      transition: { duration: 0.3, ease: 'easeIn' as const },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeRoom}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={roomVariants}
        className="fixed inset-0 z-30 min-h-screen w-full bg-[#F4F0E8]/96 backdrop-blur-3xl pt-28 pb-12 px-6 md:px-16 flex flex-col justify-between overflow-y-auto pointer-events-auto select-none"
      >
        {/* ROOM 1: ABOUT ENVIRONMENT */}
        {activeRoom === 'about' && (
          <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[#B85C3B]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#B85C3B] font-semibold">
                  01 / ABOUT ROOM · PORTRAIT & NARRATIVE
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F] leading-tight">
                Engineering fast, interactive & visually refined products.
              </h2>
              <p className="text-base md:text-lg text-[#787268] font-light leading-relaxed">
                Frontend & Full Stack Developer focused on software performance, React 19 architecture, and sub-second Lighthouse scores. Leadership experience as President of E-Cell MET BKC.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="#about"
                  onClick={() => {
                    playClick();
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25231F] text-[#FAF8F3] text-xs font-mono uppercase font-semibold hover:bg-[#B85C3B] transition-colors"
                >
                  <span>Enter Full About Room</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-3xl bg-[#FAF8F3] border border-[#E2DCD2] shadow-2xl space-y-6">
              <div className="flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-[#B85C3B]" />
                <div>
                  <div className="text-lg font-serif font-bold text-[#25231F]">{personal.name}</div>
                  <div className="text-xs font-mono text-[#787268]">{personal.title}</div>
                </div>
              </div>
              <div className="space-y-3 pt-3 border-t border-[#E2DCD2] text-xs font-mono text-[#25231F]">
                <div className="flex justify-between py-1.5 border-b border-[#E2DCD2]">
                  <span className="text-[#787268]">Location</span>
                  <span>{personal.location}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E2DCD2]">
                  <span className="text-[#787268]">Leadership</span>
                  <span>President @ E-Cell MET BKC</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#787268]">Status</span>
                  <span className="text-[#B85C3B] font-semibold">{personal.statusPill}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROOM 2: SKILLS ENVIRONMENT */}
        {activeRoom === 'skills' && (
          <div className="max-w-7xl mx-auto w-full my-auto space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#B85C3B]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#B85C3B] font-semibold">
                02 / SKILLS ROOM · FLOATING TECH CARDS
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F]">
              MODERN TECHNICAL STACK
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillsCategories.map((cat: SkillCategory) => (
                <div key={cat.title} className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#E2DCD2] shadow-xl space-y-4">
                  <div className="text-xs font-mono font-bold text-[#B85C3B] uppercase">
                    {cat.title}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <span key={s.name} className="px-3 py-1 rounded-md bg-[#F4F0E8] text-xs font-mono text-[#25231F] border border-[#E2DCD2]">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#skills"
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#25231F] hover:text-[#B85C3B] transition-colors"
              >
                <span>Explore Interactive Skill Matrix</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* ROOM 3: PROJECTS ENVIRONMENT */}
        {activeRoom === 'projects' && (
          <div className="max-w-7xl mx-auto w-full my-auto space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#B85C3B]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#B85C3B] font-semibold">
                03 / PROJECTS ROOM · CINEMATIC PREVIEW
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F]">
              FEATURED PRODUCTION WORK
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.slice(0, 2).map((p) => (
                <div key={p.id} className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#E2DCD2] shadow-2xl space-y-4">
                  <div className="flex justify-between text-xs font-mono text-[#787268]">
                    <span className="text-[#B85C3B] font-semibold">{p.category}</span>
                    <span>{p.year}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#25231F]">{p.title}</h3>
                  <p className="text-sm text-[#787268] font-light">{p.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-[#F4F0E8] text-[11px] font-mono text-[#787268]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#projects"
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25231F] text-[#FAF8F3] text-xs font-mono uppercase font-semibold hover:bg-[#B85C3B] transition-colors"
              >
                <span>View All Production Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* ROOM 4: EXPERIENCE ENVIRONMENT */}
        {activeRoom === 'experience' && (
          <div className="max-w-7xl mx-auto w-full my-auto space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#B85C3B]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#B85C3B] font-semibold">
                04 / EXPERIENCE ROOM · PARALLAX TIMELINE
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F]">
              ENGINEERING HISTORY & WINS
            </h2>

            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#E2DCD2] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="text-xl font-serif font-bold text-[#25231F]">{exp.role}</div>
                    <div className="text-sm font-mono text-[#B85C3B]">{exp.company}</div>
                  </div>
                  <div className="text-xs font-mono text-[#787268]">{exp.period}</div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#experience"
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#25231F] hover:text-[#B85C3B] transition-colors"
              >
                <span>Explore Full Engineering Timeline</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* ROOM 5: CONTACT ENVIRONMENT */}
        {activeRoom === 'contact' && (
          <div className="max-w-7xl mx-auto w-full my-auto space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#B85C3B]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#B85C3B] font-semibold">
                05 / CONTACT ROOM · ELEGANT SCENE
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F]">
              INITIATE DIRECT CONTACT
            </h2>

            <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#E2DCD2] max-w-xl space-y-4">
              <div className="text-xs font-mono text-[#787268] uppercase">DIRECT EMAIL</div>
              <div className="text-2xl font-serif font-bold text-[#25231F]">{personal.email}</div>
              <div className="text-xs font-mono text-[#B85C3B]">{personal.statusPill}</div>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25231F] text-[#FAF8F3] text-xs font-mono uppercase font-semibold hover:bg-[#B85C3B] transition-colors"
              >
                <span>Send Message Form</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Bottom Navigation Meta Indicator */}
        <div className="max-w-7xl mx-auto w-full pt-6 border-t border-[#E2DCD2] flex items-center justify-between text-xs font-mono text-[#787268]">
          <span>CINEMATIC ROOM ENVIRONMENT · {activeRoom.toUpperCase()}</span>
          <span>SHUBHAM JADHAV · PORTFOLIO 2026</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

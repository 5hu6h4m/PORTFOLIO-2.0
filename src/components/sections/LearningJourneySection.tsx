'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Compass, Code2, Trophy, CheckCircle2, ArrowUpRight, Sparkles, Layers, Terminal, BookOpen } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface LearningJourneySectionProps {
  playClick: () => void;
  playHover: () => void;
  isAwardsRevealed?: boolean;
}

function GoldenSeal() {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
      {/* Outer intricate rings */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite]">
        <circle cx="100" cy="100" r="95" fill="none" stroke="#B85C3B" strokeWidth="2" strokeDasharray="4 8" />
        <circle cx="100" cy="100" r="85" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 4" />
      </svg>
      {/* Inner glowing ring */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite_reverse]">
        <circle cx="100" cy="100" r="75" fill="none" stroke="#E2DCD2" strokeWidth="4" />
        <circle cx="100" cy="100" r="65" fill="none" stroke="#B85C3B" strokeWidth="1" />
      </svg>
      {/* Center Aperture */}
      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-[#D4AF37] flex items-center justify-center shadow-[0_0_30px_#B85C3B]">
         <Sparkles className="w-6 h-6 text-[#D4AF37] animate-pulse" />
      </div>
    </div>
  );
}

const CHAPTERS = [
  {
    id: 'ch-1',
    chapterNum: 'CHAPTER 01',
    year: '2024',
    title: 'Started My Engineering Journey',
    subtitle: 'THE BEGINNING',
    badge: 'Foundation Phase',
    description:
      'Started my B.Tech in Computer Engineering at MET Institute of Technology, Bhujbal Knowledge City. This marked the official beginning of my deep dive into software engineering, data structures, and computer science fundamentals.',
    tags: ['B.Tech CS Degree', 'Computer Engineering', 'Data Structures & Algorithms', 'System Fundamentals'],
    accent: '#B85C3B',
    visualType: 'blueprint',
  },
  {
    id: 'ch-2',
    chapterNum: 'CHAPTER 02',
    year: '2024',
    title: 'The First Line of Code',
    subtitle: 'DISCOVERING WEB DEVELOPMENT',
    badge: 'Web Discovery',
    description:
      'Mastered HTML5, CSS3, and modern ES6+ JavaScript. Built my first responsive web layouts and fell in love with the immediate feedback loop of crafting interactive browser experiences.',
    codeSnippet: `const engineer = {\n  name: "Shubham Jadhav",\n  foundation: "B.Tech Computer Science",\n  passion: "Crafting High-Performance Web Systems",\n  status: "Building & Learning Every Day"\n};`,
    tags: ['Semantic HTML5', 'CSS Grid & Flexbox', 'JavaScript ES6+', 'DOM Mechanics'],
    accent: '#8E9A78',
    visualType: 'code',
  },
  {
    id: 'ch-3',
    chapterNum: 'CHAPTER 03',
    year: '2024 — 2025',
    title: 'Turning Ideas Into Products',
    subtitle: 'BUILDING REAL PROJECTS',
    badge: 'Practical Execution',
    description:
      'Shifted from tutorial learning to shipping real-world projects. Focused on crafting fast, responsive UI interfaces and building real-time applications solving concrete problems.',
    projects: [
      { name: 'Portfolio 2.0', desc: 'Interactive 3D & Kinetic Motion Portfolio built with Next.js 15 & React 19.', tag: 'Next.js 15' },
      { name: 'Spotify Collab Clone', desc: 'Real-time collaborative audio player with WebSockets & Express.', tag: 'React & WebSockets' },
      { name: 'AgroTech Platform', desc: 'Agri-tech marketplace web app for local crop telemetry & trading.', tag: 'Full Stack Web' },
    ],
    tags: ['Next.js App Router', 'React 19 Hooks', 'TypeScript Strict Mode', 'Tailwind CSS v4'],
    accent: '#4A6FA5',
    visualType: 'projects',
  },
  {
    id: 'ch-4',
    chapterNum: 'CHAPTER 04',
    year: '2024 — PRESENT',
    title: 'Learning Beyond Code',
    subtitle: 'LEADERSHIP & INITIATIVE',
    badge: 'Leadership Core',
    description:
      'Leadership taught me communication, execution, and developer teamwork. As President of E-Cell MET, I lead a team of 30+ coordinators, organize regional innovation hackathons, and mentor student developers.',
    roles: [
      { title: 'President — E-Cell MET BKC', desc: 'Heading regional startup summits & innovation hackathons for 500+ attendees.' },
      { title: 'Campus Ambassador & Mentor', desc: 'Guiding junior student developers in web tech & open-source workflows.' },
      { title: 'Hackathon Lead', desc: 'Organized competitive coding challenges & technical workshops.' },
    ],
    tags: ['Community Leadership', 'Hackathon Organization', 'Developer Mentorship', 'Team Execution'],
    accent: '#8A2E2B',
    visualType: 'leadership',
  },
  {
    id: 'ch-5',
    chapterNum: 'CHAPTER 05',
    year: '2025',
    title: 'Always Improving',
    subtitle: 'CURRENT LEARNING & STACK',
    badge: 'Continuous Growth',
    description:
      'Constantly expanding my mastery of modern frontend architecture, 3D WebGL graphics, and scalable full-stack Node.js server pipelines.',
    technologies: [
      { name: 'React 19', symbol: '⚛️' },
      { name: 'Next.js 15', symbol: '▲' },
      { name: 'TypeScript', symbol: 'TS' },
      { name: 'Three.js', symbol: '📐' },
      { name: 'GSAP', symbol: '⚡' },
      { name: 'Node.js', symbol: '⬢' },
      { name: 'Express.js', symbol: 'EX' },
      { name: 'MongoDB', symbol: '🍃' },
      { name: 'AWS Cloud', symbol: '☁️' },
    ],
    tags: ['WebGL & 3D Shaders', 'Server Actions', 'Full-Stack Pipelines', 'Sub-Second Vitals'],
    accent: '#B85C3B',
    visualType: 'stack',
  },
  {
    id: 'ch-6',
    chapterNum: 'CHAPTER 06',
    year: '2025 — FUTURE',
    title: 'Looking Ahead',
    subtitle: 'THE FUTURE ROADMAP',
    badge: 'Target Internship',
    description:
      'Actively preparing for a Frontend Engineering Internship where I can contribute to high-impact web products, collaborate with world-class engineering teams, and create web experiences combining design elegance with technical performance.',
    roadmapSteps: [
      'Frontend Engineering Internship Placement',
      'Open-Source Library Contributions',
      'Advanced WebGL Shader Systems',
      'Building Production Full-Stack Products',
    ],
    tags: ['Frontend Internship', 'Production Engineering', 'Open-Source Craft', 'Scalable Systems'],
    accent: '#23201C',
    visualType: 'future',
  },
];

export function LearningJourneySection({ playClick, playHover, isAwardsRevealed }: LearningJourneySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Precise Chapter Snap Translation Bounds across 600vh total scroll distance
  const trackX = useTransform(
    smoothProgress,
    [0.00, 0.16, 0.32, 0.48, 0.64, 0.80, 1.00],
    ['0vw', '0vw', '-100vw', '-200vw', '-300vw', '-400vw', '-500vw']
  );

  // Golden Seal pulse scale transition over final chapter
  const sealScale = useTransform(smoothProgress, [0.85, 1.0], [1, 2.2]);

  return (
    <div id="journey-roadmap" className="relative bg-transparent border-t border-[#E2DCD2]">
      {/* Anchor target for #journey nav link */}
      <div id="journey" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />

      {/* SECTION HEADING — SCROLLS UP NATURALLY OFF-SCREEN */}
      <motion.div
        initial={{ opacity: 0, x: -90 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-28 pb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-[#E2DCD2]"
      >
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-[#B85C3B] mb-2 font-bold">
            <BookOpen className="w-4.5 h-4.5" />
            <span>05 / ACADEMIC &amp; EDUCATION ARCHIVE — 6 EVOLUTION CHAPTERS</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#25231F]"
            style={{ letterSpacing: '-0.03em' }}
          >
            THE LEARNING JOURNEY <span className="italic font-normal text-[#B85C3B]">&amp; EDUCATION</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-[#787268] mt-4 md:mt-0 font-bold">
          <span className="text-[#B85C3B] uppercase tracking-widest font-bold">SCROLL RIGHT</span>
          <span className="text-[#25231F]">CHAPTERS 01 → 06</span>
        </div>
      </motion.div>
      
      {/* STICKY 100VH HORIZONTAL SLIDER (100% VIEWPORT HEIGHT FOR CARDS ONLY) */}
      <div ref={containerRef} className="relative w-full" style={{ height: '600vh' }}>
        <motion.div 
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#F4F0E8] select-none z-20 pointer-events-none"
        >
          
          {/* Volumetric background ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-radial from-[#B85C3B]/10 via-[#8E9A78]/6 to-transparent blur-3xl pointer-events-none" />

          {/* ── 6-CHAPTER FULL-HEIGHT HORIZONTAL TRACK (600vw WIDE) ── */}
          <motion.div
            style={{ x: trackX }}
            className="flex h-full w-[600vw] items-center pointer-events-auto"
          >
            {CHAPTERS.map((ch, idx) => (
              <div
                key={ch.id}
                className="w-screen h-full shrink-0 flex items-center px-6 md:px-12 lg:px-20 relative"
              >
                {/* Background Watermark Year */}
                <div className="absolute top-1/2 right-12 -translate-y-1/2 text-[26vw] font-serif font-bold text-[#B85C3B]/6 select-none pointer-events-none leading-none">
                  {ch.year.slice(0, 4)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center w-full max-w-7xl mx-auto relative z-10">
                  
                  {/* Left Column — Editorial Story Text */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl md:text-5xl font-serif font-bold text-[#B85C3B]">
                        {ch.year}
                      </span>
                      <div className="h-4 w-px bg-[#E2DCD2]" />
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B85C3B]/15 text-[#B85C3B] border border-[#B85C3B]/30 font-bold shadow-2xs">
                        {ch.badge}
                      </span>
                    </div>

                    <div className="text-[10px] font-mono tracking-widest text-[#B85C3B] uppercase font-bold">
                      {ch.chapterNum} // {ch.subtitle}
                    </div>

                    <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#25231F] leading-tight">
                      {ch.title}
                    </h3>

                    <p className="text-sm md:text-base text-[#565148] font-light leading-relaxed max-w-xl">
                      {ch.description}
                    </p>

                    {/* Chapter Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {ch.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3.5 py-1.5 rounded-lg text-[10px] font-mono bg-[#FAF8F3] text-[#25231F] border border-[#E2DCD2] font-bold shadow-2xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column — Vibrant Luxury Interactive Visual Card */}
                  <div className="lg:col-span-6">
                    {idx !== 5 && (
                    <div className="p-6 md:p-8 rounded-3xl bg-[#FAF8F3] border border-[#E2DCD2] shadow-2xl relative overflow-hidden min-h-[340px] flex flex-col justify-between group transition-all duration-300 hover:border-[#B85C3B]">
                      
                      {/* Terracotta Top Accent Bar */}
                      <div className="absolute top-0 left-6 right-6 h-1 bg-[#B85C3B] rounded-b-full" />

                      {/* CHAPTER 1 VISUAL: Blueprint Glass Card */}
                      {ch.visualType === 'blueprint' && (
                        <div className="space-y-4 pt-1">
                          <div className="flex items-center justify-between border-b border-[#E2DCD2] pb-3">
                            <span className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-widest font-bold">ACADEMIC BLUEPRINT</span>
                            <span className="text-[10px] font-mono text-[#25231F] font-bold">B.TECH CS · 2024 — 2028</span>
                          </div>
                          <div className="p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DCD2] space-y-2">
                            <div className="text-sm font-mono font-bold text-[#25231F]">MET Institute of Technology</div>
                            <div className="text-xs text-[#565148] font-medium">Bhujbal Knowledge City, Nashik</div>
                            <div className="text-[10px] font-mono text-[#B85C3B] pt-1 font-bold">Computer Engineering Specialization</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#25231F] font-bold">
                            <div className="p-2.5 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#B85C3B]" />
                              <span>Data Structures</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#B85C3B]" />
                              <span>Algorithms</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#B85C3B]" />
                              <span>Web Architecture</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#B85C3B]" />
                              <span>Database Systems</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CHAPTER 2 VISUAL: Animated Code Terminal */}
                      {ch.visualType === 'code' && (
                        <div className="rounded-2xl bg-[#161412] text-[#FAF8F3] p-5 font-mono text-xs shadow-2xl space-y-3 border border-[#25231F]">
                          <div className="flex items-center justify-between border-b border-[#FAF8F3]/15 pb-2 text-[10px] text-[#FAF8F3]/60 font-bold">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#B85C3B]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            </div>
                            <span>index.js — First Code</span>
                          </div>
                          <pre className="text-emerald-400 font-mono text-xs leading-relaxed overflow-x-auto font-bold">
                            {ch.codeSnippet}
                          </pre>
                          <div className="pt-2 border-t border-[#FAF8F3]/15 flex items-center justify-between text-[10px] text-amber-300 font-bold">
                            <span>✓ COMPILER: PASSING</span>
                            <span>0 ERRORS</span>
                          </div>
                        </div>
                      )}

                      {/* CHAPTER 3 VISUAL: Project Cards Preview */}
                      {ch.visualType === 'projects' && (
                        <div className="space-y-3 pt-1">
                          <div className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-widest font-bold mb-2">SHIPPED BUILDS &amp; PRODUCTS</div>
                          {ch.projects?.map((p, pIdx) => (
                            <div key={pIdx} className="p-3.5 rounded-2xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center justify-between hover:border-[#B85C3B] transition-colors">
                              <div>
                                <div className="text-xs font-serif font-bold text-[#25231F]">{p.name}</div>
                                <div className="text-[10px] text-[#565148] font-medium">{p.desc}</div>
                              </div>
                              <span className="px-2.5 py-1 rounded-full text-[9px] font-mono bg-[#B85C3B]/15 text-[#B85C3B] border border-[#B85C3B]/30 font-bold shrink-0">
                                {p.tag}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CHAPTER 4 VISUAL: Leadership Badges */}
                      {ch.visualType === 'leadership' && (
                        <div className="space-y-3 pt-1">
                          <div className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-widest font-bold mb-2">LEADERSHIP &amp; INITIATIVES</div>
                          {ch.roles?.map((r, rIdx) => (
                            <div key={rIdx} className="p-3.5 rounded-2xl bg-[#F4F0E8] border border-[#E2DCD2] space-y-1">
                              <div className="text-xs font-serif font-bold text-[#25231F] flex items-center gap-1.5">
                                <Trophy className="w-3.5 h-3.5 text-[#B85C3B]" />
                                <span>{r.title}</span>
                              </div>
                              <div className="text-[10px] text-[#565148] font-medium">{r.desc}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CHAPTER 5 VISUAL: Tech Stack Matrix */}
                      {ch.visualType === 'stack' && (
                        <div className="space-y-3 pt-1">
                          <div className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-widest font-bold mb-2">CORE TECHNOLOGIES &amp; TOOLING</div>
                          <div className="grid grid-cols-3 gap-2">
                            {ch.technologies?.map((t, tIdx) => (
                              <div key={tIdx} className="p-3 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] text-center space-y-1 hover:border-[#B85C3B] transition-colors">
                                <div className="text-lg">{t.symbol}</div>
                                <div className="text-[10px] font-mono font-bold text-[#25231F]">{t.name}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CHAPTER 6 VISUAL: Future Roadmap Path */}
                      {ch.visualType === 'future' && (
                        <div className="space-y-3 pt-1">
                          <div className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-widest font-bold mb-2">TARGET ROADMAP</div>
                          {ch.roadmapSteps?.map((step, sIdx) => (
                            <div key={sIdx} className="p-3 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center gap-2 text-xs font-mono text-[#25231F] font-bold">
                              <CheckCircle2 className="w-4 h-4 text-[#B85C3B] shrink-0" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Bottom Footer Indicator */}
                      <div className="pt-4 border-t border-[#E2DCD2] flex items-center justify-between text-[10px] font-mono text-[#25231F] font-bold">
                        <span>{ch.chapterNum} OF 06</span>
                        <span className="text-[#B85C3B]">CONTINUE SCROLLING RIGHT →</span>
                      </div>

                    </div>
                    )}
                  </div>

                </div>
              </div>
            ))}
            
            {/* THE GOLDEN PORTAL */}
            <div className="absolute top-1/2 left-[550vw] -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none flex flex-col items-center justify-center">
              <motion.div style={{ scale: sealScale }} className="relative flex items-center justify-center">
                <GoldenSeal />
              </motion.div>
            </div>
            
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

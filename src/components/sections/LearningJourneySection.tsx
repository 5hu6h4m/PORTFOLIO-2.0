'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Compass, Code2, Trophy, CheckCircle2, ArrowUpRight, Sparkles, Layers, Terminal, BookOpen } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface LearningJourneySectionProps {
  playClick: () => void;
  playHover: () => void;
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
    tags: ['B.Tech CS Degree', 'Computer Engineering', 'Data Structures', 'System Fundamentals'],
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
      { name: 'Portfolio 2.0', desc: 'Interactive 3D & Motion Portfolio with Next.js 15.', tag: 'Next.js 15' },
      { name: 'Spotify Collab Clone', desc: 'Real-time collaborative audio player with WebSockets.', tag: 'React' },
      { name: 'AgroTech Platform', desc: 'Agri-tech marketplace web app for local crop trading.', tag: 'Full Stack' },
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
      { title: 'President — E-Cell MET BKC', desc: 'Heading regional startup summits for 500+ attendees.' },
      { title: 'Campus Ambassador & Mentor', desc: 'Guiding junior student developers in web tech.' },
      { title: 'Hackathon Lead', desc: 'Organized competitive coding challenges & workshops.' },
    ],
    tags: ['Community Leadership', 'Hackathons', 'Mentorship', 'Team Execution'],
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

export function LearningJourneySection({ playClick, playHover }: LearningJourneySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Soft spring physics for butter-smooth horizontal scroll translation
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 34,
    stiffness: 75,
    mass: 0.8,
  });

  // Precise Chapter Snap Translation Bounds (0vw to -500vw with plateaus for exact chapter alignment)
  const trackX = useTransform(
    smoothProgress,
    [0.00, 0.14, 0.28, 0.42, 0.56, 0.70, 0.85, 1.00],
    ['0vw', '0vw', '-100vw', '-200vw', '-300vw', '-400vw', '-500vw', '-500vw']
  );

  return (
    <section id="journey-roadmap" ref={containerRef} className="relative bg-[#F4F0E8] border-t border-[#E2DCD2]" style={{ height: '480vh' }}>
      {/* Anchor targets for both #projects and #journey nav links */}
      <div id="projects" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />
      <div id="journey" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />
      
      {/* ── FULLSCREEN VIEWPORT CONTAINER (STICKY TOP-0 100VH COVERAGE) ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none z-20 pt-16 md:pt-14 pb-4">
        
        {/* Volumetric background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-radial from-[#B85C3B]/10 via-[#8E9A78]/6 to-transparent blur-3xl pointer-events-none" />

        {/* ── COMPACT TOP HEADER STRIP (INTEGRATED AT TOP TO MAXIMIZE SLIDE HEIGHT) ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-30 w-full shrink-0 border-b border-[#E2DCD2]/80 pb-3 bg-[#F4F0E8]/90 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-[#B85C3B] font-bold mb-0.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>05 / EVOLUTION ARCHIVE — 6 CINEMATIC CHAPTERS</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-[#25231F]"
                style={{ letterSpacing: '-0.03em' }}
              >
                THE LEARNING JOURNEY <span className="italic font-normal text-[#B85C3B]">&amp; EDUCATION</span>
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#787268] font-bold">
              <span className="text-[#B85C3B] uppercase tracking-widest font-bold">SCROLL RIGHT</span>
              <span className="text-[#25231F] hidden sm:inline">CHAPTERS 01 → 06</span>
            </div>
          </div>
        </div>

        {/* ── 6-CHAPTER FULL-HEIGHT HORIZONTAL TRACK (600vw WIDE) ── */}
        <div className="relative w-full flex-1 flex items-center overflow-hidden z-20 my-auto">
          <motion.div
            style={{ x: trackX }}
            className="flex h-full w-[600vw] items-center"
          >
            {CHAPTERS.map((ch, idx) => (
              <div
                key={ch.id}
                className="w-screen h-full shrink-0 flex items-center px-6 md:px-12 lg:px-16 relative py-4"
              >
                {/* Background Watermark Year */}
                <div className="absolute top-1/2 right-8 -translate-y-1/2 text-[26vw] font-serif font-bold text-[#B85C3B]/6 select-none pointer-events-none leading-none">
                  {ch.year.slice(0, 4)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center w-full max-w-7xl mx-auto relative z-10 my-auto">
                  
                  {/* Left Column — Editorial Story Text */}
                  <div className="lg:col-span-6 space-y-3 md:space-y-4">
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

                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#25231F] leading-tight">
                      {ch.title}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base text-[#565148] font-light leading-relaxed max-w-xl">
                      {ch.description}
                    </p>

                    {/* Chapter Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {ch.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg text-[10px] font-mono bg-[#FAF8F3] text-[#25231F] border border-[#E2DCD2] font-bold shadow-2xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column — Full Bleed Visual Card (No Cropping) */}
                  <div className="lg:col-span-6">
                    <div className="p-5 sm:p-6 md:p-7 rounded-3xl bg-[#FAF8F3] border border-[#E2DCD2] shadow-2xl relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#B85C3B]">
                      
                      {/* Terracotta Top Accent Bar */}
                      <div className="absolute top-0 left-6 right-6 h-1 bg-[#B85C3B] rounded-b-full" />

                      {/* CHAPTER 1 VISUAL: Blueprint Glass Card */}
                      {ch.visualType === 'blueprint' && (
                        <div className="space-y-3 pt-1">
                          <div className="flex items-center justify-between border-b border-[#E2DCD2] pb-2">
                            <span className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-widest font-bold">ACADEMIC BLUEPRINT</span>
                            <span className="text-[10px] font-mono text-[#25231F] font-bold">B.TECH CS · 2024 — 2028</span>
                          </div>
                          <div className="p-3.5 rounded-2xl bg-[#F4F0E8] border border-[#E2DCD2] space-y-1">
                            <div className="text-xs sm:text-sm font-mono font-bold text-[#25231F]">MET Institute of Technology</div>
                            <div className="text-xs text-[#565148] font-medium">Bhujbal Knowledge City, Nashik</div>
                            <div className="text-[10px] font-mono text-[#B85C3B] pt-0.5 font-bold">Computer Engineering Specialization</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#25231F] font-bold">
                            <div className="p-2 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#B85C3B]" />
                              <span>Data Structures</span>
                            </div>
                            <div className="p-2 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#B85C3B]" />
                              <span>Algorithms</span>
                            </div>
                            <div className="p-2 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#B85C3B]" />
                              <span>Web Architecture</span>
                            </div>
                            <div className="p-2 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#B85C3B]" />
                              <span>Database Systems</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CHAPTER 2 VISUAL: Animated Code Terminal */}
                      {ch.visualType === 'code' && (
                        <div className="rounded-2xl bg-[#161412] text-[#FAF8F3] p-4 sm:p-5 font-mono text-xs shadow-2xl space-y-2 border border-[#25231F]">
                          <div className="flex items-center justify-between border-b border-[#FAF8F3]/15 pb-2 text-[10px] text-[#FAF8F3]/60 font-bold">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#B85C3B]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            </div>
                            <span>index.js — First Code</span>
                          </div>
                          <pre className="text-emerald-400 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto font-bold py-1">
                            {ch.codeSnippet}
                          </pre>
                          <div className="pt-1.5 border-t border-[#FAF8F3]/15 flex items-center justify-between text-[10px] text-amber-300 font-bold">
                            <span>✓ COMPILER: PASSING</span>
                            <span>0 ERRORS</span>
                          </div>
                        </div>
                      )}

                      {/* CHAPTER 3 VISUAL: Project Cards Preview */}
                      {ch.visualType === 'projects' && (
                        <div className="space-y-2.5 pt-1">
                          <div className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-widest font-bold mb-1">SHIPPED BUILDS &amp; PRODUCTS</div>
                          {ch.projects?.map((p, pIdx) => (
                            <div key={pIdx} className="p-3 rounded-2xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center justify-between hover:border-[#B85C3B] transition-colors">
                              <div>
                                <div className="text-xs font-serif font-bold text-[#25231F]">{p.name}</div>
                                <div className="text-[10px] text-[#565148] font-medium">{p.desc}</div>
                              </div>
                              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono bg-[#B85C3B]/15 text-[#B85C3B] border border-[#B85C3B]/30 font-bold shrink-0">
                                {p.tag}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CHAPTER 4 VISUAL: Leadership Badges */}
                      {ch.visualType === 'leadership' && (
                        <div className="space-y-2.5 pt-1">
                          <div className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-widest font-bold mb-1">LEADERSHIP &amp; INITIATIVES</div>
                          {ch.roles?.map((r, rIdx) => (
                            <div key={rIdx} className="p-3 rounded-2xl bg-[#F4F0E8] border border-[#E2DCD2] space-y-0.5">
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
                        <div className="space-y-2 pt-1">
                          <div className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-widest font-bold mb-1">CORE TECHNOLOGIES &amp; TOOLING</div>
                          <div className="grid grid-cols-3 gap-2">
                            {ch.technologies?.map((t, tIdx) => (
                              <div key={tIdx} className="p-2.5 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] text-center space-y-0.5 hover:border-[#B85C3B] transition-colors">
                                <div className="text-base">{t.symbol}</div>
                                <div className="text-[9px] font-mono font-bold text-[#25231F]">{t.name}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CHAPTER 6 VISUAL: Future Roadmap Path */}
                      {ch.visualType === 'future' && (
                        <div className="space-y-2.5 pt-1">
                          <div className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-widest font-bold mb-1">TARGET ROADMAP</div>
                          {ch.roadmapSteps?.map((step, sIdx) => (
                            <div key={sIdx} className="p-2.5 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center gap-2 text-xs font-mono text-[#25231F] font-bold">
                              <CheckCircle2 className="w-4 h-4 text-[#B85C3B] shrink-0" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Bottom Footer Indicator */}
                      <div className="pt-3 border-t border-[#E2DCD2] flex items-center justify-between text-[10px] font-mono text-[#25231F] font-bold mt-2">
                        <span>{ch.chapterNum} OF 06</span>
                        <span className="text-[#B85C3B]">SCROLL RIGHT FOR NEXT CHAPTER →</span>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── COMPACT BOTTOM FOOTER INDICATOR ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-30 w-full shrink-0 flex items-center justify-between text-[10px] font-mono text-[#25231F] uppercase tracking-widest pt-2 border-t border-[#E2DCD2]/80 font-bold bg-[#F4F0E8]/90 backdrop-blur-md">
          <span>Horizontal Scroll Track</span>
          <span className="text-[#B85C3B]">CHAPTERS 01 TO 06</span>
          <span>600vw Canvas</span>
        </div>

      </div>
    </section>
  );
}

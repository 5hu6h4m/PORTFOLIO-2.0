'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Code2, Cpu, Flame, Layers, Rocket, Sparkles, Terminal, Trophy } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function SectionHeader({ index, title, subtitle }: { index: string; title: string; subtitle?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className="mb-16 border-b border-[#E2DCD2] pb-6"
    >
      <div className="text-[10px] font-mono tracking-[0.3em] text-[#B85C3B] uppercase mb-3">
        {index} / {title}
      </div>
      {subtitle && (
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#25231F] tracking-tight">
          {subtitle}
        </h2>
      )}
    </motion.div>
  );
}

function SubLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-xs font-mono tracking-[0.2em] text-[#B85C3B]">{index}</span>
      <div className="w-6 h-px bg-[#B85C3B]" />
      <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#787268]">
        {title}
      </span>
    </div>
  );
}

export function AboutSection({ playHover }: { playHover: () => void }) {
  const { about } = PORTFOLIO_DATA;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#F4F0E8] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader index="01" title="ABOUT THE ENGINEER" subtitle="Crafting Digital Products with Precision & Passion" />

        {/* Tagline Banner */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="p-8 md:p-12 rounded-3xl bg-[#FAF8F3] border border-[#E2DCD2] shadow-xl mb-16 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#B85C3B]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#B85C3B]/10 transition-colors" />
          <SubLabel index="01" title="CORE CREED" />
          <h3 className="text-2xl md:text-4xl font-serif font-bold text-[#25231F] leading-snug max-w-4xl">
            {about.tagline}
          </h3>
        </motion.div>

        {/* Bio Paragraphs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-20 items-start">
          <div className="lg:col-span-7 space-y-6">
            <SubLabel index="02" title="BIOGRAPHY & ENGINEERING PHILOSOPHY" />
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-base md:text-lg text-[#787268] font-light leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-4">
            <SubLabel index="03" title="KEY STATS & HIGHLIGHTS" />
            {PORTFOLIO_DATA.stats.map((st, i) => (
              <motion.div
                key={st.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={playHover}
                className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E2DCD2] hover:border-[#B85C3B] shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-[#787268] uppercase tracking-wider mb-1">
                    {st.label}
                  </div>
                  <div className="text-xs text-[#9A948C]">{st.detail}</div>
                </div>
                <div className="text-2xl md:text-3xl font-serif font-bold text-[#B85C3B]">
                  {st.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 5-CARDS HORIZONTAL FEATURED PROJECTS SECTION (#projects) ────────────────
export function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState('2022');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 32,
    stiffness: 70,
    mass: 0.9,
  });

  // Translate 5 full-screen slides horizontally (0vw to -400vw)
  const trackX = useTransform(smoothProgress, [0.05, 0.95], ['0vw', '-400vw']);

  useEffect(() => {
    return smoothProgress.on('change', (v) => {
      if (v < 0.20) setActiveYear('2022');
      else if (v < 0.42) setActiveYear('2023');
      else if (v < 0.64) setActiveYear('2024');
      else if (v < 0.84) setActiveYear('2025');
      else setActiveYear('2026');
    });
  }, [smoothProgress]);

  return (
    <div id="projects" className="relative w-full bg-[#F4F0E8] border-t border-[#E2DCD2]">
      {/* Anchor target for #timeline */}
      <div id="timeline" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />

      {/* SECTION HEADING — SCROLLS UP NATURALLY OFF-SCREEN */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-28 pb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-[#E2DCD2]">
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-[0.3em] text-[#B85C3B] font-bold uppercase mb-2">
            <Sparkles className="w-4.5 h-4.5 text-[#B85C3B]" />
            <span>03 / SHIPPED BUILDS &amp; FEATURED PROJECTS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#25231F] tracking-tight">
            FEATURED <span className="italic font-normal text-[#B85C3B]">PROJECTS</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 md:gap-3 mt-4 md:mt-0">
          {['2022', '2023', '2024', '2025', '2026'].map((year) => {
            const isActive = activeYear === year;
            return (
              <div
                key={year}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                  isActive
                    ? 'bg-[#B85C3B] text-[#FAF8F3] font-bold shadow-md scale-105'
                    : 'bg-[#FAF8F3] text-[#787268] border border-[#E2DCD2]'
                }`}
              >
                {year}
              </div>
            );
          })}
        </div>
      </div>

      {/* STICKY 100VH HORIZONTAL SLIDER (100% VIEWPORT HEIGHT FOR CARDS ONLY) */}
      <div ref={containerRef} className="relative w-full" style={{ height: '480vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#F4F0E8] select-none z-20">
          
          {/* 5 FULL-SCREEN SLIDES TRACK (500vw WIDE, TRANSLATES RIGHT TO LEFT) */}
          <motion.div
            style={{ x: trackX }}
            className="flex h-full w-[500vw] items-center"
          >
            {/* SLIDE 01: 2022 */}
            <div className="w-screen h-full shrink-0 flex items-center px-8 md:px-16 lg:px-24 bg-[#F4F0E8] relative overflow-hidden">
              <div className="absolute top-0 right-0 text-[26vw] font-serif font-bold text-[#B85C3B]/5 select-none pointer-events-none leading-none -translate-y-8">
                2022
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center w-full max-w-7xl mx-auto relative z-10">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B85C3B]/10 border border-[#B85C3B]/20 text-[#B85C3B] text-xs font-mono tracking-widest uppercase font-bold">
                    <Code2 className="w-4 h-4" />
                    <span>PROJECT 01 // DISCOVERY &amp; FOUNDATION</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F] leading-tight">
                    The First Line of Code
                  </h3>
                  <p className="text-base md:text-lg text-[#787268] font-light leading-relaxed">
                    Discovered web development through curiosity — built first HTML/CSS pages and fell in love with turning ideas into interactive browser experiences.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {['HTML5 Semantic Web', 'CSS3 Grid & Flexbox', 'Vanilla JavaScript (ES6+)', 'DOM Event Dispatching'].map((tag) => (
                      <span key={tag} className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F3] border border-[#E2DCD2] text-xs font-mono text-[#25231F] font-bold shadow-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-3xl border border-[#25231F]/10 bg-[#161412] text-[#FAF8F3] p-6 md:p-8 shadow-2xl space-y-5 font-mono text-xs overflow-hidden relative">
                    <div className="flex items-center justify-between border-b border-[#FAF8F3]/10 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#B85C3B]/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[10px] text-[#FAF8F3]/40 font-bold">index.html — 2022</span>
                    </div>
                    <div className="space-y-2.5 text-[#FAF8F3]/80 leading-relaxed font-mono text-xs font-bold">
                      <p className="text-[#B85C3B]">&lt;!DOCTYPE html&gt;</p>
                      <p>&lt;<span className="text-[#B85C3B]">script</span>&gt;</p>
                      <p className="pl-4 text-emerald-400">// First breakthrough</p>
                      <p className="pl-4">const dev = &#123; name: <span className="text-amber-300">"Shubham"</span>, passion: <span className="text-amber-300">"Building Web Systems"</span> &#125;;</p>
                      <p className="pl-4">console.log(<span className="text-amber-300">"Hello World!"</span>);</p>
                      <p>&lt;/<span className="text-[#B85C3B]">script</span>&gt;</p>
                    </div>
                    <div className="pt-3 border-t border-[#FAF8F3]/10 flex items-center justify-between text-[10px] text-[#FAF8F3]/50 font-bold">
                      <span className="text-emerald-400 font-semibold">✓ COMPILED SUCCESSFULLY</span>
                      <span>STATUS: 200 OK</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDE 02: 2023 */}
            <div className="w-screen h-full shrink-0 flex items-center px-8 md:px-16 lg:px-24 bg-[#FAF8F3] relative overflow-hidden">
              <div className="absolute top-0 right-0 text-[26vw] font-serif font-bold text-[#B85C3B]/5 select-none pointer-events-none leading-none -translate-y-8">
                2023
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center w-full max-w-7xl mx-auto relative z-10">
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="p-6 md:p-8 rounded-3xl bg-[#F4F0E8] border border-[#E2DCD2] shadow-xl space-y-5 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-[#B85C3B]/10 text-[#B85C3B]">
                        <Cpu className="w-6 h-6 animate-pulse" />
                      </div>
                      <span className="text-xs font-mono text-[#8E9A78] font-bold">REACT 19 ENGINE ACTIVE</span>
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-bold text-[#25231F] mb-1">State Architecture &amp; Component Trees</h4>
                      <p className="text-xs text-[#787268]">Dived deep into React hooks, state synchronization, and component lifecycles.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E2DCD2] flex items-center justify-between text-xs font-mono">
                      <span className="text-[#787268]">Performance Benchmark</span>
                      <span className="text-[#B85C3B] font-bold">60 FPS Render</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8E9A78]/10 border border-[#8E9A78]/20 text-[#8E9A78] text-xs font-mono tracking-widest uppercase font-bold">
                    <Layers className="w-4 h-4" />
                    <span>PROJECT 02 // REACT &amp; SPA ENGINE</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F] leading-tight">
                    Mastering Frontend Architecture
                  </h3>
                  <p className="text-base md:text-lg text-[#787268] font-light leading-relaxed">
                    Shifted to component-driven development with React and Next.js — building modular, scalable web apps with robust state management.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {['React 19 Hooks', 'Next.js App Router', 'Zustand State Store', 'Tailwind CSS Design Tokens'].map((tag) => (
                      <span key={tag} className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F3] border border-[#E2DCD2] text-xs font-mono text-[#25231F] font-bold shadow-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDE 03: 2024 */}
            <div className="w-screen h-full shrink-0 flex items-center px-8 md:px-16 lg:px-24 bg-[#F4F0E8] relative overflow-hidden">
              <div className="absolute top-0 right-0 text-[26vw] font-serif font-bold text-[#B85C3B]/5 select-none pointer-events-none leading-none -translate-y-8">
                2024
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center w-full max-w-7xl mx-auto relative z-10">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A6FA5]/10 border border-[#4A6FA5]/20 text-[#4A6FA5] text-xs font-mono tracking-widest uppercase font-bold">
                    <Terminal className="w-4 h-4" />
                    <span>PROJECT 03 // FULL-STACK DEPLOYMENTS</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F] leading-tight">
                    Full-Stack Applications &amp; APIs
                  </h3>
                  <p className="text-base md:text-lg text-[#787268] font-light leading-relaxed">
                    Expanded into server-side development — building RESTful Node.js APIs, PostgreSQL databases, and real-time WebSocket web tools.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {['Node.js REST APIs', 'Express Middleware', 'PostgreSQL & Prisma', 'WebSockets Real-Time'].map((tag) => (
                      <span key={tag} className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F3] border border-[#E2DCD2] text-xs font-mono text-[#25231F] font-bold shadow-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="p-6 md:p-8 rounded-3xl bg-[#FAF8F3] border border-[#E2DCD2] shadow-xl space-y-5 relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-[#E2DCD2] pb-3">
                      <span className="text-xs font-mono text-[#B85C3B] font-bold">SERVER STATUS</span>
                      <span className="text-xs font-mono text-emerald-600 font-bold">ONLINE (200 OK)</span>
                    </div>
                    <div className="space-y-3 font-mono text-xs text-[#25231F] font-bold">
                      <div className="p-3 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center justify-between">
                        <span>POST /api/v1/auth/login</span>
                        <span className="text-emerald-600">2ms</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F4F0E8] border border-[#E2DCD2] flex items-center justify-between">
                        <span>GET /api/v1/products/telemetry</span>
                        <span className="text-emerald-600">4ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDE 04: 2025 */}
            <div className="w-screen h-full shrink-0 flex items-center px-8 md:px-16 lg:px-24 bg-[#FAF8F3] relative overflow-hidden">
              <div className="absolute top-0 right-0 text-[26vw] font-serif font-bold text-[#B85C3B]/5 select-none pointer-events-none leading-none -translate-y-8">
                2025
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center w-full max-w-7xl mx-auto relative z-10">
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="p-6 md:p-8 rounded-3xl bg-[#F4F0E8] border border-[#E2DCD2] shadow-xl space-y-5 relative overflow-hidden text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#B85C3B]/10 text-[#B85C3B] flex items-center justify-center mx-auto text-2xl">
                      📐
                    </div>
                    <h4 className="font-serif text-xl font-bold text-[#25231F]">Kinetic 3D &amp; WebGL Engine</h4>
                    <p className="text-xs text-[#787268]">Three.js shaders, organic lighting, and camera motion pathing.</p>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B85C3B]/10 border border-[#B85C3B]/20 text-[#B85C3B] text-xs font-mono tracking-widest uppercase font-bold">
                    <Flame className="w-4 h-4" />
                    <span>PROJECT 04 // 3D WEBGL GRAPHICS</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F] leading-tight">
                    Kinetic 3D &amp; Interactive Shaders
                  </h3>
                  <p className="text-base md:text-lg text-[#787268] font-light leading-relaxed">
                    Integrating Three.js and React Three Fiber to build kinetic 3D scenes, custom GLSL shaders, and interactive web experiences.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {['Three.js Shaders', 'React Three Fiber', 'GLSL Particle Systems', 'GSAP ScrollTrigger'].map((tag) => (
                      <span key={tag} className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F3] border border-[#E2DCD2] text-xs font-mono text-[#25231F] font-bold shadow-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDE 05: 2026 */}
            <div className="w-screen h-full shrink-0 flex items-center px-8 md:px-16 lg:px-24 bg-[#F4F0E8] relative overflow-hidden">
              <div className="absolute top-0 right-0 text-[26vw] font-serif font-bold text-[#B85C3B]/5 select-none pointer-events-none leading-none -translate-y-8">
                2026
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center w-full max-w-7xl mx-auto relative z-10">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B85C3B]/10 border border-[#B85C3B]/20 text-[#B85C3B] text-xs font-mono tracking-widest uppercase font-bold">
                    <Rocket className="w-4 h-4" />
                    <span>PROJECT 05 // PRODUCTION SCALABILITY</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F] leading-tight">
                    Building High-Impact Web Systems
                  </h3>
                  <p className="text-base md:text-lg text-[#787268] font-light leading-relaxed">
                    Combining design aesthetics, sub-second performance, and scalable architecture to engineer web products that leave a lasting impression.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {['Production Systems', 'Sub-Second Vitals', 'Design Tokens System', 'Accessible Web Standards'].map((tag) => (
                      <span key={tag} className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F3] border border-[#E2DCD2] text-xs font-mono text-[#25231F] font-bold shadow-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="p-6 md:p-8 rounded-3xl bg-[#FAF8F3] border border-[#E2DCD2] shadow-xl space-y-5 relative overflow-hidden text-center">
                    <div className="p-4 rounded-2xl bg-[#B85C3B] text-[#FAF8F3] font-serif font-bold text-xl shadow-md">
                      AVAILABLE FOR HIRING &amp; INTERNSHIPS
                    </div>
                    <p className="text-xs text-[#787268] leading-relaxed">
                      Ready to build fast, memorable digital products for forward-thinking engineering teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function DiagonalLanesSection({ playHover }: { playHover: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const LANES = [
    { title: 'Full Stack Engineering', category: 'Architecture', desc: 'Building scalable Next.js App Router applications, REST APIs, and database models.' },
    { title: 'Kinetic 3D & WebGL', category: 'Interactive', desc: 'Crafting 3D scenes, particle physics, and custom GLSL shaders.' },
    { title: 'Design Systems & Tokens', category: 'Craft', desc: 'Engineering modular typography systems and component libraries.' },
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {LANES.map((lane, i) => (
        <motion.div
          key={lane.title}
          custom={i}
          variants={fadeUp}
          onMouseEnter={playHover}
          className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#E2DCD2] hover:border-[#B85C3B] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
        >
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20 font-bold">
              {lane.category}
            </span>
            <h4 className="text-2xl font-serif font-bold text-[#25231F] group-hover:text-[#B85C3B] transition-colors leading-tight">
              {lane.title}
            </h4>
            <p className="text-sm text-[#787268] font-light leading-relaxed">
              {lane.desc}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-[#E2DCD2] flex items-center justify-between text-xs font-mono text-[#9A948C]">
            <span>EXPLORE LANE</span>
            <ArrowUpRight className="w-4 h-4 text-[#B85C3B] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function HobbiesSection({ playHover }: { playHover: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { about } = PORTFOLIO_DATA;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <SubLabel index="05" title="Beyond Code" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
        {about.hobbies.map((h, i) => (
          <motion.div
            key={h.label}
            variants={fadeUp}
            custom={i}
            onMouseEnter={playHover}
            className="p-5 rounded-2xl border border-[#E2DCD2]/70 bg-[#FAF8F3]/70 hover:border-[#B85C3B]/40 hover:bg-[#FAF8F3] hover:-translate-y-1 transition-all duration-300 text-center space-y-2 group"
          >
            <div className="text-3xl mb-1">{h.icon}</div>
            <div className="text-xs font-mono font-bold text-[#25231F] group-hover:text-[#B85C3B] transition-colors">
              {h.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { KinematicTextMorph } from '@/components/ui/KinematicTextMorph';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface AboutSectionProps {
  playHover: () => void;
}


const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
};

function Divider() {
  return (
    <div className="my-24 flex items-center gap-6">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E2DCD2] to-transparent" />
      <div className="w-1 h-1 rounded-full bg-[#B85C3B]" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E2DCD2] to-transparent" />
    </div>
  );
}

function SubLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="text-xs font-mono tracking-[0.22em] text-[#B85C3B]">{index}</span>
      <div className="w-8 h-px bg-[#B85C3B]" />
      <span className="text-xs font-mono tracking-[0.22em] uppercase text-[#787268]">{title}</span>
    </div>
  );
}

function WhoIAmSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { about } = PORTFOLIO_DATA;
  const { whoIAm } = about;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <SubLabel index="01" title="Who I Am" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-5">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-4xl font-serif text-[#25231F] leading-snug"
          >
            {whoIAm.headline}
          </motion.h2>
          <div className="w-10 h-0.5 bg-[#B85C3B]" />
          {whoIAm.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              custom={i + 1}
              className="text-base md:text-lg text-[#787268] font-light leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          {whoIAm.highlights.map((h, i) => (
            <motion.div
              key={h.label}
              variants={fadeUp}
              custom={i + 2}
              className="flex items-end gap-4 p-5 rounded-2xl border border-[#E2DCD2]/70 bg-[#FAF8F3]/60 hover:border-[#B85C3B]/30 hover:bg-[#FAF8F3] transition-all duration-300"
            >
              <span className="text-4xl font-serif font-bold text-[#B85C3B] leading-none">
                {h.value}
              </span>
              <span className="text-sm text-[#787268] font-light pb-1">{h.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

import { Terminal, Cpu, Trophy, Rocket, ArrowUpRight, CheckCircle2, Sparkles, Code2 } from 'lucide-react';

export function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const updateProgress = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / total));
      rawProgress.set(p);
    };

    const lenis = typeof window !== 'undefined' ? window.__lenis : undefined;
    if (lenis) {
      lenis.on('scroll', updateProgress);
    } else {
      window.addEventListener('scroll', updateProgress, { passive: true });
    }
    updateProgress();

    return () => {
      if (lenis) {
        lenis.off('scroll', updateProgress);
      } else {
        window.removeEventListener('scroll', updateProgress);
      }
    };
  }, [rawProgress]);

  // Translate horizontal track 0vw -> -400vw (right to left panning)
  const trackX = useTransform(smoothProgress, [0, 1], ['0vw', '-400vw']);

  const [activeYear, setActiveYear] = useState('2022');
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
      <motion.div
        initial={{ opacity: 0, x: -90 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-28 pb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-[#E2DCD2]"
      >
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
      </motion.div>

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
            <div className="absolute top-0 right-0 text-[22vw] font-serif font-bold text-[#B85C3B]/5 select-none pointer-events-none leading-none -translate-y-8">
              2022
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center w-full max-w-7xl mx-auto relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B85C3B]/10 border border-[#B85C3B]/20 text-[#B85C3B] text-xs font-mono tracking-widest uppercase">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>PAGE 01 // DISCOVERY & FOUNDATION</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F] leading-tight">
                  The First Line of Code
                </h3>
                <p className="text-base md:text-lg text-[#787268] font-light leading-relaxed">
                  Discovered web development through curiosity — built first HTML/CSS pages and fell in love with turning ideas into interactive browser experiences.
                </p>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {['HTML5 Semantic Web', 'CSS3 Grid & Flexbox', 'Vanilla JavaScript (ES6+)', 'DOM Event Dispatching'].map((tag) => (
                    <span key={tag} className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F3] border border-[#E2DCD2] text-xs font-mono text-[#787268] shadow-xs">
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
                    <span className="text-[10px] text-[#FAF8F3]/40">index.html — 2022</span>
                  </div>
                  <div className="space-y-2.5 text-[#FAF8F3]/80 leading-relaxed font-mono text-xs">
                    <p className="text-[#B85C3B]">&lt;!DOCTYPE html&gt;</p>
                    <p>&lt;<span className="text-[#B85C3B]">script</span>&gt;</p>
                    <p className="pl-4 text-emerald-400">// First breakthrough</p>
                    <p className="pl-4">const dev = &#123; name: <span className="text-amber-300">"Shubham"</span>, passion: <span className="text-amber-300">"Building Web Systems"</span> &#125;;</p>
                    <p className="pl-4">console.log(<span className="text-amber-300">"Hello World!"</span>);</p>
                    <p>&lt;/<span className="text-[#B85C3B]">script</span>&gt;</p>
                  </div>
                  <div className="pt-3 border-t border-[#FAF8F3]/10 flex items-center justify-between text-[10px] text-[#FAF8F3]/50">
                    <span className="text-emerald-400 font-semibold">✓ COMPILED SUCCESSFULLY</span>
                    <span>STATUS: 200 OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 02: 2023 */}
          <div className="w-screen h-full shrink-0 flex items-center px-8 md:px-16 lg:px-24 bg-[#FAF8F3] relative overflow-hidden">
            <div className="absolute top-0 right-0 text-[22vw] font-serif font-bold text-[#B85C3B]/5 select-none pointer-events-none leading-none -translate-y-8">
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
                    <h4 className="font-serif text-xl font-bold text-[#25231F] mb-1">State Architecture & Component Trees</h4>
                    <p className="text-xs text-[#787268]">Dived deep into React hooks, state synchronization, and component lifecycles.</p>
                  </div>
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E2DCD2] text-xs font-mono">
                      <span>useState & useEffect</span>
                      <span className="text-[#B85C3B] font-bold">100% Controlled</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E2DCD2] text-xs font-mono">
                      <span>Custom Hooks Engine</span>
                      <span className="text-[#8E9A78] font-bold">Modular Reuse</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B85C3B]/10 border border-[#B85C3B]/20 text-[#B85C3B] text-xs font-mono tracking-widest uppercase">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>PAGE 02 // ARCHITECTURE EVOLUTION</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F] leading-tight">
                  React & Production Architecture
                </h3>
                <p className="text-base md:text-lg text-[#787268] font-light leading-relaxed">
                  Dived deep into React and JavaScript ecosystems. Built initial full-stack CRUD applications and developer utilities, laying down scalable architecture principles.
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    'Architected full-stack React CRUD web applications',
                    'Mastered state management patterns & custom hook abstraction',
                    'Contributed to developer tools and open-source GitHub repositories'
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-3 text-sm md:text-base text-[#25231F]">
                      <CheckCircle2 className="w-5 h-5 text-[#B85C3B] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 03: 2024 */}
          <div className="w-screen h-full shrink-0 flex items-center px-8 md:px-16 lg:px-24 bg-[#F4F0E8] relative overflow-hidden">
            <div className="absolute top-0 right-0 text-[22vw] font-serif font-bold text-[#B85C3B]/5 select-none pointer-events-none leading-none -translate-y-8">
              2024
            </div>

            <div className="max-w-6xl mx-auto space-y-8 relative z-10 w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B85C3B]/10 border border-[#B85C3B]/30 text-[#B85C3B] text-xs font-mono tracking-widest uppercase">
                <Trophy className="w-4 h-4" />
                <span>PAGE 03 // LEADERSHIP & INDUSTRIAL IMPACT</span>
              </div>

              <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F] leading-tight">
                Presidential Leadership & Production Internship
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-2">
                <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#E2DCD2] shadow-lg space-y-4">
                  <span className="px-3.5 py-1 rounded-md bg-[#B85C3B]/10 text-[#B85C3B] text-xs font-mono font-bold uppercase">
                    President — E-Cell MET BKC
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-[#25231F]">Heading E-Cell & Regional Summits</h4>
                  <p className="text-sm text-[#787268] leading-relaxed">
                    Led 30+ student coordinators, organized regional innovation summit with 500+ attendees, and built official Next.js portals.
                  </p>
                  <div className="pt-2 text-2xl font-serif font-bold text-[#B85C3B]">500+ Attendees</div>
                </div>

                <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#E2DCD2] shadow-lg space-y-4">
                  <span className="px-3.5 py-1 rounded-md bg-[#8E9A78]/15 text-[#8E9A78] text-xs font-mono font-bold uppercase">
                    Production Engineering Intern
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-[#25231F]">Production Next.js & REST APIs</h4>
                  <p className="text-sm text-[#787268] leading-relaxed">
                    Engineered 12+ reusable React/Next.js UI components with strict design tokens and optimized client bundle size by 35%.
                  </p>
                  <div className="pt-2 text-2xl font-serif font-bold text-[#8E9A78]">35% Bundle Optimization</div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 04: 2025 */}
          <div className="w-screen h-full shrink-0 flex items-center px-8 md:px-16 lg:px-24 bg-[#161412] text-[#FAF8F3] relative overflow-hidden">
            <div className="absolute top-0 right-0 text-[22vw] font-serif font-bold text-[#B85C3B]/10 select-none pointer-events-none leading-none -translate-y-8">
              2025
            </div>

            <div className="relative z-10 space-y-8 max-w-7xl mx-auto w-full">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#FAF8F3]/10 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B85C3B]/20 border border-[#B85C3B]/40 text-[#B85C3B] text-xs font-mono tracking-widest uppercase">
                  <Rocket className="w-3.5 h-3.5" />
                  <span>PAGE 04 // CHAMPIONSHIP & SAAS LAUNCH</span>
                </div>
                <div className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  ★ 1ST PLACE STATE-LEVEL HACKATHON WINNER
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#FAF8F3] leading-tight">
                    Hackathon Victory & 100k+ Event SaaS Platform
                  </h3>
                  <p className="text-base text-[#FAF8F3]/70 font-light leading-relaxed">
                    Won 1st place in a State-Level Hackathon by engineering a full-stack WebSockets prototype in under 24 hours. Shipped multiple production SaaS products including Nexus Metrics, processing over 100,000 daily telemetry events.
                  </p>
                </div>

                <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 space-y-2">
                    <div className="text-2xl md:text-3xl font-serif font-bold text-[#B85C3B]">100,000+</div>
                    <div className="text-xs font-mono text-[#FAF8F3]/50">Daily Telemetry Events</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 space-y-2">
                    <div className="text-2xl md:text-3xl font-serif font-bold text-[#8E9A78]">&lt; 24ms</div>
                    <div className="text-xs font-mono text-[#FAF8F3]/50">Query Latency</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 space-y-2">
                    <div className="text-2xl md:text-3xl font-serif font-bold text-[#FAF8F3]">1st Place</div>
                    <div className="text-xs font-mono text-[#FAF8F3]/50">State Champion</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 space-y-2">
                    <div className="text-2xl md:text-3xl font-serif font-bold text-[#B85C3B]">99.9%</div>
                    <div className="text-xs font-mono text-[#FAF8F3]/50">Uptime Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 05: 2026 */}
          <div className="w-screen h-full shrink-0 flex items-center px-8 md:px-16 lg:px-24 bg-[#FAF8F3] relative overflow-hidden">
            <div className="absolute top-0 right-0 text-[22vw] font-serif font-bold text-[#B85C3B]/5 select-none pointer-events-none leading-none -translate-y-8">
              2026
            </div>

            <div className="relative z-10 space-y-6 max-w-5xl mx-auto w-full">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-mono tracking-wider font-semibold uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                <span>PAGE 05 // ACTIVE STATUS · OPEN TO FULL-STACK ROLES</span>
              </div>

              <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#25231F] leading-tight">
                Ready to Build Meaningful Product Engineering
              </h3>

              <p className="text-base md:text-lg text-[#787268] font-light leading-relaxed max-w-3xl">
                Actively seeking a product-focused engineering role where I can contribute to high-scale web applications, collaborate with talented teams, and ship code that impacts real users daily.
              </p>

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#B85C3B] text-[#FAF8F3] text-xs font-mono tracking-widest uppercase hover:bg-[#8A2E2B] transition-colors shadow-lg"
                >
                  <span>INITIATE CONVERSATION</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="/Shubham_Jadhav_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#F4F0E8] border border-[#E2DCD2] text-[#25231F] text-xs font-mono tracking-widest uppercase hover:border-[#B85C3B] transition-colors"
                >
                  <span>DOWNLOAD CURRICULUM VITAE</span>
                </a>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Bottom Timeline Footer Bar */}
        <div className="flex items-center justify-between py-3 px-6 md:px-12 border-t border-[#E2DCD2] text-xs font-mono text-[#787268] bg-[#F4F0E8]/90 backdrop-blur-md z-40">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B85C3B] animate-ping" />
            SCROLL DOWN TO ADVANCE HORIZONTAL TIMELINE
          </span>
          <span>SHUBHAM JADHAV · TIMELINE FEATURE SHOWCASE</span>
        </div>

      </div>
    </div>
  </div>
);
}

// ─── DIAGONAL CARD ───────────────────────────────────────────────────────────
function DiagonalCard({
  title,
  description,
  accent,
  index,
  direction,
  playHover,
}: {
  title: string;
  description: string;
  accent: string;
  index: number;
  direction: 'up' | 'down';
  playHover: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, active: true });
  };

  const handleMouseLeave = () => setSpotlight((p) => ({ ...p, active: false }));

  const initX = direction === 'up' ? -120 : 120;
  const tiltDeg = direction === 'up' ? -8 : 8;

  return (
    <motion.div
      initial={{ opacity: 0, x: initX, y: direction === 'up' ? 60 : -60, rotate: tiltDeg }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{
        duration: 1.4,
        delay: index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.035, y: direction === 'up' ? -8 : 8, transition: { duration: 0.28, ease: 'easeOut' } }}
      onMouseEnter={playHover}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden cursor-default group whitespace-normal"
        style={{
          background: 'rgba(252,250,246,0.92)',
          backdropFilter: 'blur(24px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
          border: '1px solid rgba(226,220,210,0.8)',
          borderRadius: '28px',
          boxShadow: '0 20px 70px rgba(37,35,31,0.14), 0 6px 20px rgba(184,92,59,0.1), inset 0 1px 0 rgba(255,255,255,0.9)',
          padding: '44px 48px',
          minWidth: 380,
          maxWidth: 440,
          transform: `rotate(${direction === 'up' ? -3 : 3}deg)`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[28px]"
          style={{
            opacity: spotlight.active ? 1 : 0,
            background: `radial-gradient(300px circle at ${spotlight.x}% ${spotlight.y}%, rgba(184,92,59,0.18) 0%, transparent 70%)`,
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono tracking-widest text-[#B85C3B] font-bold">{accent}</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#B85C3B]/60 to-transparent" />
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#25231F] mb-4 leading-snug group-hover:text-[#B85C3B] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-base text-[#787268] font-light leading-relaxed">
            {description}
          </p>
        </div>

        <div
          className="absolute bottom-4 right-4 w-2.5 h-2.5 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: '#B85C3B' }}
        />
      </div>
    </motion.div>
  );
}

// ─── DIAGONAL LANES SECTION ───────────────────────────────────────────────────
export function DiagonalLanesSection({ playHover }: { playHover: () => void }) {
  const { about } = PORTFOLIO_DATA;
  const TILT = -7;

  const containerRef = useRef<HTMLDivElement>(null);
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const updateProgress = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalDist = rect.height + windowH;
      const currentPos = windowH - rect.top;
      const p = Math.min(1, Math.max(0, currentPos / totalDist));
      rawProgress.set(p);
    };

    const lenis = typeof window !== 'undefined' ? window.__lenis : undefined;
    if (lenis) {
      lenis.on('scroll', updateProgress);
    } else {
      window.addEventListener('scroll', updateProgress, { passive: true });
    }
    updateProgress();

    return () => {
      if (lenis) {
        lenis.off('scroll', updateProgress);
      } else {
        window.removeEventListener('scroll', updateProgress);
      }
    };
  }, [rawProgress]);

  const track1X = useTransform(smoothProgress, [0, 1], ['25%', '-115%']);
  const track2X = useTransform(smoothProgress, [0, 1], ['-95%', '25%']);

  const tripleValues = [...about.values, ...about.values, ...about.values];
  const tripleFocus = [...about.currentFocus, ...about.currentFocus, ...about.currentFocus];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible"
      style={{ paddingTop: '40px', paddingBottom: '80px' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 20% 30%, rgba(184,92,59,0.09) 0%, transparent 70%), ' +
            'radial-gradient(ellipse 60% 40% at 80% 70%, rgba(184,92,59,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative mb-14 overflow-visible">
        <div
          className="overflow-visible"
          style={{
            transform: `rotate(${TILT}deg)`,
            transformOrigin: 'left center',
          }}
        >
          <div className="pl-6 md:pl-16 mb-6 overflow-visible">
            <div className="flex items-baseline gap-4">
              <span className="text-sm font-mono tracking-[0.35em] text-[#B85C3B] uppercase font-bold">03 ✦</span>
              <h2
                className="font-serif font-bold leading-none select-none text-[#25231F]"
                style={{
                  fontSize: 'clamp(48px, 7.5vw, 88px)',
                  letterSpacing: '-0.03em',
                  textShadow: '0 4px 30px rgba(37,35,31,0.05)',
                }}
              >
                WHAT DRIVES ME
              </h2>
            </div>
            <div
              className="mt-3"
              style={{
                height: '3px',
                width: '380px',
                background: 'linear-gradient(to right, #B85C3B, transparent)',
                marginLeft: '56px',
              }}
            />
          </div>

          <motion.div
            style={{ x: track1X }}
            className="flex gap-8 items-stretch pt-2 pb-6 whitespace-nowrap overflow-visible"
          >
            {tripleValues.map((v, i) => (
              <DiagonalCard
                key={`${v.title}-${i}`}
                title={v.title}
                description={v.description}
                accent={`0${(i % about.values.length) + 1} ✦`}
                index={i % about.values.length}
                direction="up"
                playHover={playHover}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex items-center gap-6 my-4 px-12 mb-14">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E2DCD2] to-transparent" />
        <div className="w-2 h-2 rounded-full bg-[#B85C3B]/60" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E2DCD2] to-transparent" />
      </div>

      <div className="relative overflow-visible">
        <div
          className="overflow-visible"
          style={{
            transform: `rotate(${TILT}deg)`,
            transformOrigin: 'left center',
          }}
        >
          <div className="pl-6 md:pl-16 mb-6 overflow-visible">
            <div className="flex items-baseline gap-4">
              <span className="text-sm font-mono tracking-[0.35em] text-[#B85C3B] uppercase font-bold">04 ⟶</span>
              <h2
                className="font-serif font-bold leading-none select-none text-[#25231F]"
                style={{
                  fontSize: 'clamp(48px, 7.5vw, 88px)',
                  letterSpacing: '-0.03em',
                  textShadow: '0 4px 30px rgba(37,35,31,0.05)',
                }}
              >
                CURRENT FOCUS
              </h2>
            </div>
            <div
              className="mt-3"
              style={{
                height: '3px',
                width: '380px',
                background: 'linear-gradient(to right, #B85C3B, transparent)',
                marginLeft: '56px',
              }}
            />
          </div>

          <motion.div
            style={{ x: track2X }}
            className="flex gap-8 items-stretch pt-2 pb-6 whitespace-nowrap overflow-visible"
          >
            {tripleFocus.map((goal, i) => (
              <DiagonalCard
                key={`${goal.title}-${i}`}
                title={goal.title}
                description={goal.description}
                accent={`${goal.number} ⟶`}
                index={i % about.currentFocus.length}
                direction="up"
                playHover={playHover}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
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

function InteractivePCHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 100, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 100, damping: 18 });

  const imgTranslateX = useTransform(springX, [-0.5, 0.5], [-45, 45]);
  const imgTranslateY = useTransform(springY, [-0.5, 0.5], [-30, 30]);

  const textX = useTransform(springX, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(xPos);
    rawY.set(yPos);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full pt-2 pb-2 flex flex-col items-center justify-center cursor-pointer group select-none gap-0"
    >
      <motion.div
        style={{ x: textX }}
        className="relative z-10 text-center w-full max-w-7xl mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE }}
          className="relative inline-block pb-2"
        >
          <h2
            className="text-[12vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[6.5vw] font-serif font-bold leading-none tracking-tight flex flex-col sm:flex-row items-center justify-center gap-y-2 sm:gap-y-0 sm:gap-x-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span className="text-[#25231F]">SHUBHAM</span>
            <span className="text-[#B85C3B]">JADHAV</span>
          </h2>
        </motion.div>

        <div className="w-full max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-[#B85C3B]/60 to-transparent border-b border-dashed border-[#B85C3B]/40 mt-1 opacity-80" />
      </motion.div>

      <motion.div
        style={{
          x: imgTranslateX,
          y: imgTranslateY,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative z-0 w-full max-w-3xl flex items-center justify-center px-4 mt-6 sm:mt-8 md:mt-10"
      >
        <div className="absolute w-[480px] h-[300px] bg-gradient-to-tr from-[#B85C3B]/20 via-[#B85C3B]/10 to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <img
          src="/pc1.png"
          alt="Shubham Workstation Setup"
          className="w-full h-auto max-h-[420px] object-contain opacity-100 group-hover:scale-[1.02] transition-transform duration-500"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.16)) drop-shadow(0 8px 16px rgba(184, 92, 59, 0.18))',
          }}
        />
      </motion.div>
    </div>
  );
}



export function AboutSection({ playHover }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="pt-16 md:pt-24 pb-16 px-6 md:px-12 relative overflow-hidden rounded-t-3xl shadow-[0_-20px_80px_rgba(0,0,0,0.18)]"
      style={{
        background: 'linear-gradient(to bottom, transparent 0%, rgba(244,240,232,0.6) 18%, rgba(244,240,232,0.92) 38%, #F4F0E8 56%)',
      }}
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B85C3B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-12">
          <KinematicTextMorph
            category="00 / ABOUT ME"
            text="The person behind the code."
          />
        </div>

        <InteractivePCHero />

        <WhoIAmSection />
      </div>
    </section>
  );
}

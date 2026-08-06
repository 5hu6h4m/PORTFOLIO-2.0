'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Code2, Sparkles, CheckCircle2, Layers, X } from 'lucide-react';
import { FIVE_TECH_CATEGORIES, FiveCardCategory } from '@/data/fiveCardsTechData';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface SkillsSectionProps {
  playClick: () => void;
  playHover: () => void;
}

export function SkillsSection({ playClick, playHover }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<FiveCardCategory | null>(null);

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Soft, weightless spring physics (damping 40, stiffness 50, mass 1) - zero harsh snapping
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 50,
    mass: 1,
  });

  // Perfectly Uniform & Soft Staggered Timelines (0.00 to 0.85 across 260vh track)
  // Card 1 arrives: 0.00 -> 0.17
  const card1X = useTransform(smoothProgress, [0.00, 0.17], [-950, -420]);
  const card1Y = useTransform(smoothProgress, [0.00, 0.17], [160, 40]);
  const card1Rot = useTransform(smoothProgress, [0.00, 0.17], [-45, -20]);
  const card1Op = useTransform(smoothProgress, [0.00, 0.12], [0, 1]);

  // Card 2 arrives: 0.17 -> 0.34
  const card2X = useTransform(smoothProgress, [0.17, 0.34], [-950, -210]);
  const card2Y = useTransform(smoothProgress, [0.17, 0.34], [130, 10]);
  const card2Rot = useTransform(smoothProgress, [0.17, 0.34], [-35, -10]);
  const card2Op = useTransform(smoothProgress, [0.17, 0.27], [0, 1]);

  // Card 3 arrives: 0.34 -> 0.51
  const card3X = useTransform(smoothProgress, [0.34, 0.51], [-950, 0]);
  const card3Y = useTransform(smoothProgress, [0.34, 0.51], [100, 0]);
  const card3Rot = useTransform(smoothProgress, [0.34, 0.51], [-25, 0]);
  const card3Op = useTransform(smoothProgress, [0.34, 0.44], [0, 1]);

  // Card 4 arrives: 0.51 -> 0.68
  const card4X = useTransform(smoothProgress, [0.51, 0.68], [-950, 210]);
  const card4Y = useTransform(smoothProgress, [0.51, 0.68], [60, 10]);
  const card4Rot = useTransform(smoothProgress, [0.51, 0.68], [-15, 10]);
  const card4Op = useTransform(smoothProgress, [0.51, 0.61], [0, 1]);

  // Card 5 arrives: 0.68 -> 0.85
  const card5X = useTransform(smoothProgress, [0.68, 0.85], [-950, 420]);
  const card5Y = useTransform(smoothProgress, [0.68, 0.85], [30, 40]);
  const card5Rot = useTransform(smoothProgress, [0.68, 0.85], [0, 20]);
  const card5Op = useTransform(smoothProgress, [0.68, 0.78], [0, 1]);

  const cardTransformations = [
    { x: card1X, y: card1Y, rot: card1Rot, opacity: card1Op },
    { x: card2X, y: card2Y, rot: card2Rot, opacity: card2Op },
    { x: card3X, y: card3Y, rot: card3Rot, opacity: card3Op },
    { x: card4X, y: card4Y, rot: card4Rot, opacity: card4Op },
    { x: card5X, y: card5Y, rot: card5Rot, opacity: card5Op },
  ];

  const scrollToProjects = () => {
    playClick();
    setSelectedCategory(null);
    const projEl = document.getElementById('projects');
    if (projEl) {
      projEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={targetRef} className="relative h-[260vh] bg-[#F4F0E8]" id="skills">
      {/* STICKY SCREEN PINNING CONTAINER */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between pt-16 pb-10 px-6 md:px-12 select-none border-t border-[#E2DCD2]">
        
        {/* Volumetric background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-radial from-[#B85C3B]/10 via-[#8E9A78]/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">

          {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
          <div className="text-center flex flex-col items-center justify-center max-w-2xl mx-auto mt-2 mb-4">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#B85C3B] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 / TECHNICAL ARSENAL — 5 ARCHITECTURAL CATEGORIES</span>
            </div>
            <h2
              className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-[#25231F]"
              style={{ letterSpacing: '-0.03em' }}
            >
              TECH STACK
            </h2>
            <p className="text-xs md:text-sm text-[#787268] font-light max-w-md mt-2 leading-relaxed">
              Scroll down to watch 5 technical cards glide softly from the left into a rainbow arc. Click any card to inspect technologies.
            </p>
          </div>

        </div>

        {/* ── 5-CARD RAINBOW ARC FAN CONTAINER ─────────────────────────────── */}
        <div className="relative w-full max-w-7xl mx-auto h-[380px] md:h-[420px] flex items-center justify-center relative z-20 my-auto">
          {FIVE_TECH_CATEGORIES.map((cat, i) => {
            const transform = cardTransformations[i];

            return (
              <motion.div
                key={cat.id}
                style={{
                  x: transform.x,
                  y: transform.y,
                  rotate: transform.rot,
                  opacity: transform.opacity,
                }}
                whileHover={{ scale: 1.08, zIndex: 40 }}
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setSelectedCategory(cat);
                }}
                className="absolute w-[220px] sm:w-[240px] md:w-[260px] h-[340px] md:h-[370px] rounded-3xl bg-[#FCFAF6] border border-[#E2DCD2] hover:border-[#B85C3B] shadow-2xl cursor-pointer p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl overflow-hidden group select-none"
              >
                {/* Top Badge & Number */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl font-serif font-bold text-[#B85C3B]">
                      {cat.number}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20 font-bold">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#25231F] group-hover:text-[#B85C3B] transition-colors mb-1 leading-tight">
                    {cat.title}
                  </h3>

                  <div className="text-[9px] font-mono text-[#787268] uppercase tracking-widest mb-4 font-semibold">
                    {cat.subtitle}
                  </div>
                </div>

                {/* Tech Emblem Badges */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cat.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#25231F]/8 text-[#25231F] border border-[#E2DCD2] flex items-center gap-1 font-bold shadow-2xs"
                      >
                        <span className="text-xs">{t.symbol}</span>
                        <span>{t.name}</span>
                      </span>
                    ))}
                  </div>

                  {/* Bottom Footer Line */}
                  <div className="pt-3 border-t border-[#E2DCD2] flex items-center justify-between">
                    <div className="text-[10px] font-mono text-[#25231F] uppercase tracking-widest font-bold">
                      {cat.shippedBuildsCount}+ Shipped Builds
                    </div>

                    <div className="p-1.5 rounded-full border border-[#E2DCD2] text-[#25231F] group-hover:text-[#B85C3B] group-hover:border-[#B85C3B] transition-colors bg-[#F4F0E8]">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── FOOTER INSTRUCTION & MASTERY HINT ────────────────────────────── */}
        <div className="max-w-7xl mx-auto relative z-10 w-full flex items-center justify-between text-[10px] font-mono text-[#787268] uppercase tracking-widest pt-2 border-t border-[#E2DCD2] font-semibold">
          <span>Scroll to fan cards softly</span>
          <span className="text-[#B85C3B] font-bold">Click any card for deep dive modal</span>
          <span>5 Architectural Categories</span>
        </div>

      </div>

      {/* ── CATEGORY DEEP DIVE MODAL ────────────────────────────────────── */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#161412]/60 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full p-8 md:p-10 rounded-3xl bg-[#FAF8F3] border border-[#B85C3B]/30 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif font-bold text-[#B85C3B]">{selectedCategory.number}</span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20 font-bold">
                    {selectedCategory.badge}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="w-8 h-8 rounded-full border border-[#E2DCD2] flex items-center justify-center text-xs font-mono text-[#25231F] hover:bg-[#25231F] hover:text-[#FAF8F3] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#25231F] mb-2">
                {selectedCategory.title}
              </h3>
              <p className="text-xs font-mono text-[#9A948C] uppercase tracking-widest mb-4">
                {selectedCategory.subtitle} — {selectedCategory.readinessScore}
              </p>

              <p className="text-sm text-[#787268] font-light leading-relaxed mb-6">
                {selectedCategory.description}
              </p>

              {/* Technologies List Grid */}
              <div className="space-y-4 mb-8">
                <div className="text-[10px] font-mono tracking-widest text-[#9A948C] uppercase flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#B85C3B]" />
                  <span>Core Technologies & Frameworks</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCategory.technologies.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DCD2] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-lg font-mono">{t.symbol}</span>
                          <span className="text-sm font-serif font-bold text-[#25231F]">{t.name}</span>
                        </div>
                        <p className="text-xs text-[#787268] font-light leading-relaxed mb-3">
                          {t.description}
                        </p>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-[#E2DCD2]/60">
                        {t.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-1.5 text-[10px] font-mono text-[#25231F]">
                            <CheckCircle2 className="w-3 h-3 text-[#B85C3B] flex-shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="flex items-center gap-3 pt-6 border-t border-[#E2DCD2]">
                <button
                  onClick={scrollToProjects}
                  onMouseEnter={playHover}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#B85C3B] text-[#FAF8F3] text-xs font-mono tracking-widest uppercase hover:bg-[#25231F] transition-all duration-300 shadow-md cursor-pointer group"
                >
                  <span>View Projects Built With {selectedCategory.title}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="p-3.5 rounded-full border border-[#E2DCD2] text-[#25231F] hover:bg-[#25231F] hover:text-[#FAF8F3] transition-all duration-300"
                  title="View GitHub Code"
                >
                  <Code2 className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

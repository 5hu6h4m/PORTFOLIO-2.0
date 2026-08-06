'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when deep dive modal is active
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCategory]);

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Soft weightless spring physics (damping 36, stiffness 50, mass 1)
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 36,
    stiffness: 50,
    mass: 1,
  });

  // Guaranteed 5-Card Arrival Timelines (All 5 Cards finish by 0.68, with a 32% Hold Runway at the end)
  // Card 1 arrives: 0.00 -> 0.14
  const card1X = useTransform(smoothProgress, [0.00, 0.14], [-950, -420]);
  const card1Y = useTransform(smoothProgress, [0.00, 0.14], [160, 40]);
  const card1Rot = useTransform(smoothProgress, [0.00, 0.14], [-45, -20]);
  const card1Op = useTransform(smoothProgress, [0.00, 0.10], [0, 1]);

  // Card 2 arrives: 0.14 -> 0.28
  const card2X = useTransform(smoothProgress, [0.14, 0.28], [-950, -210]);
  const card2Y = useTransform(smoothProgress, [0.14, 0.28], [130, 10]);
  const card2Rot = useTransform(smoothProgress, [0.14, 0.28], [-35, -10]);
  const card2Op = useTransform(smoothProgress, [0.14, 0.22], [0, 1]);

  // Card 3 arrives: 0.28 -> 0.42
  const card3X = useTransform(smoothProgress, [0.28, 0.42], [-950, 0]);
  const card3Y = useTransform(smoothProgress, [0.28, 0.42], [100, 0]);
  const card3Rot = useTransform(smoothProgress, [0.28, 0.42], [-25, 0]);
  const card3Op = useTransform(smoothProgress, [0.28, 0.35], [0, 1]);

  // Card 4 arrives: 0.42 -> 0.55
  const card4X = useTransform(smoothProgress, [0.42, 0.55], [-950, 210]);
  const card4Y = useTransform(smoothProgress, [0.42, 0.55], [60, 10]);
  const card4Rot = useTransform(smoothProgress, [0.42, 0.55], [-15, 10]);
  const card4Op = useTransform(smoothProgress, [0.42, 0.48], [0, 1]);

  // Card 5 arrives: 0.55 -> 0.68
  const card5X = useTransform(smoothProgress, [0.55, 0.68], [-950, 420]);
  const card5Y = useTransform(smoothProgress, [0.55, 0.68], [30, 40]);
  const card5Rot = useTransform(smoothProgress, [0.55, 0.68], [0, 20]);
  const card5Op = useTransform(smoothProgress, [0.55, 0.62], [0, 1]);

  const cardTransformations = [
    { x: card1X, y: card1Y, rot: card1Rot, opacity: card1Op },
    { x: card2X, y: card2Y, rot: card2Rot, opacity: card2Op },
    { x: card3X, y: card3Y, rot: card3Rot, opacity: card3Op },
    { x: card4X, y: card4Y, rot: card4Rot, opacity: card4Op },
    { x: card5X, y: card5Y, rot: card5Rot, opacity: card5Op },
  ];

  const scrollToNext = () => {
    playClick();
    setSelectedCategory(null);
    const nextEl = document.getElementById('leadership');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={targetRef} className="relative h-[340vh] bg-[#F4F0E8]" id="skills">
      {/* STICKY SCREEN PINNING CONTAINER */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between pt-16 pb-10 px-6 md:px-12 select-none border-t border-[#E2DCD2]">
        
        {/* Volumetric background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-radial from-[#B85C3B]/10 via-[#8E9A78]/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">

          {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center flex flex-col items-center justify-center max-w-2xl mx-auto mt-2 mb-4"
          >
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
          </motion.div>

        </div>

        {/* ── 5-CARD RAINBOW ARC FAN CONTAINER ─────────────────────────────── */}
        <div className="relative w-full max-w-7xl mx-auto h-[380px] md:h-[420px] flex items-center justify-center relative z-20 my-auto mb-8 md:mb-12">
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
          <span>Scroll to fan all 5 cards smoothly</span>
          <span className="text-[#B85C3B] font-bold">Click any card for deep dive modal</span>
          <span>5 Architectural Categories</span>
        </div>

      </div>

      {/* ── CATEGORY DEEP DIVE MODAL (PORTAL TO DOCUMENT.BODY) ──────────── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="fixed inset-0 z-[99999] bg-[#161412]/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
                onClick={() => setSelectedCategory(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  onWheel={(e) => e.stopPropagation()}
                  className="max-w-3xl w-full p-6 md:p-8 rounded-3xl bg-[#FAF8F3] border border-[#B85C3B]/40 shadow-2xl relative max-h-[88vh] flex flex-col justify-between overflow-hidden"
                >
                  {/* Fixed Sticky Header inside Modal with High-Contrast Close Button */}
                  <div className="sticky top-0 z-30 bg-[#FAF8F3] pt-2 pb-4 border-b border-[#E2DCD2] flex items-center justify-between mb-4 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-serif font-bold text-[#B85C3B]">{selectedCategory.number}</span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20 font-bold">
                        {selectedCategory.badge}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        playClick();
                        setSelectedCategory(null);
                      }}
                      onMouseEnter={playHover}
                      className="w-10 h-10 rounded-full bg-[#25231F] text-[#FAF8F3] hover:bg-[#B85C3B] transition-colors flex items-center justify-center cursor-pointer shadow-md"
                      title="Close Modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Scrollable Modal Content (smooth mouse wheel scrolling) */}
                  <div className="overflow-y-auto pr-1 flex-1 space-y-6 scrollbar-thin">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#25231F] mb-1">
                        {selectedCategory.title}
                      </h3>
                      <p className="text-xs font-mono text-[#9A948C] uppercase tracking-widest mb-3 font-semibold">
                        {selectedCategory.subtitle} — {selectedCategory.readinessScore}
                      </p>

                      <p className="text-sm text-[#787268] font-light leading-relaxed">
                        {selectedCategory.description}
                      </p>
                    </div>

                    {/* Technologies List Grid */}
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono tracking-widest text-[#9A948C] uppercase flex items-center gap-1.5 font-bold">
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
                  </div>

                  {/* Fixed Bottom Action CTA Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#E2DCD2] mt-4 flex-shrink-0">
                    <button
                      onClick={scrollToNext}
                      onMouseEnter={playHover}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#B85C3B] text-[#FAF8F3] text-xs font-mono tracking-widest uppercase hover:bg-[#25231F] transition-all duration-300 shadow-md cursor-pointer group font-bold"
                    >
                      <span>Explore Leadership & Experience</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>

                    <a
                      href={PORTFOLIO_DATA.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      onMouseEnter={playHover}
                      className="p-3.5 rounded-full border border-[#E2DCD2] text-[#25231F] hover:bg-[#25231F] hover:text-[#FAF8F3] transition-all duration-300 bg-[#F4F0E8]"
                      title="View GitHub Code"
                    >
                      <Code2 className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

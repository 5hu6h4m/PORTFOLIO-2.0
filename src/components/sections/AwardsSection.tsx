'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useAnimationFrame } from 'framer-motion';
import { Award, CheckCircle2, ShieldCheck, Sparkles, ExternalLink, FileCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface AwardsSectionProps {
  playHover: () => void;
}

// Fixed positions for 4 stars spread across the constellation canvas
const STAR_POSITIONS = [
  { x: 22, y: 38 },
  { x: 55, y: 22 },
  { x: 75, y: 55 },
  { x: 38, y: 68 },
];

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 0], [0, 2],
];

const AMBIENT_COUNT = 60;

function getAmbientStars() {
  const φ = 1.6180339887;
  return Array.from({ length: AMBIENT_COUNT }, (_, i) => ({
    x: ((i * φ * 100) % 100),
    y: ((i * φ * φ * 100) % 100),
    r: 0.5 + ((i * 3) % 3) * 0.4,
    opacity: 0.15 + ((i * 7) % 5) * 0.06,
  }));
}

const AMBIENT_STARS = getAmbientStars();

export function AwardsSection({ playHover }: AwardsSectionProps) {
  const { certifications } = PORTFOLIO_DATA;
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="py-24 px-6 md:px-12 bg-[#25231F] text-[#FAF8F3] relative overflow-hidden">
      {/* Anchor targets for #certificates & #achievements nav links */}
      <div id="certificates" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />
      <div id="achievements" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />

      {/* Fine dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle, #9A948C 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Warm Glow Ambient Spotlights */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-[#B85C3B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 border-b border-[#FAF8F3]/15 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#B85C3B] uppercase mb-2 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#B85C3B]" />
              <span>06 / VERIFIED CREDENTIALS &amp; CERTIFICATIONS</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#FAF8F3] leading-none tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              CERTIFICATIONS &amp; <span className="italic font-normal text-[#B85C3B]">CREDENTIALS</span>
            </h2>
          </div>

          <div className="text-right text-xs font-mono text-[#9A948C] uppercase tracking-widest font-bold shrink-0">
            <div className="flex items-center gap-2 text-[#B85C3B]">
              <CheckCircle2 className="w-4 h-4" />
              <span>4 VERIFIED SIGNALS</span>
            </div>
          </div>
        </motion.div>

        {/* ── 4 LUXURY CERTIFICATE CARDS GRID ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {certifications.map((cert, index) => {
            const isHovered = activeIdx === index;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                onMouseEnter={() => { setActiveIdx(index); playHover(); }}
                onMouseLeave={() => setActiveIdx(null)}
                className="p-6 md:p-8 rounded-3xl bg-[#1D1B18] border border-[#FAF8F3]/15 hover:border-[#B85C3B] shadow-2xl relative overflow-hidden transition-all duration-300 group select-none flex flex-col justify-between"
              >
                {/* Accent Top Bar */}
                <div
                  className="absolute top-0 left-6 right-6 h-1 transition-colors duration-300 rounded-b-full"
                  style={{ backgroundColor: isHovered ? '#B85C3B' : 'rgba(250, 248, 243, 0.15)' }}
                />

                <div className="space-y-4">
                  {/* Top Metadata Strip */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-[#B85C3B]" />
                      <span className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-widest font-bold">
                        {cert.category}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-[#FAF8F3]/10 text-[#FAF8F3] border border-[#FAF8F3]/15 font-bold">
                      {cert.year}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#FAF8F3] group-hover:text-[#B85C3B] transition-colors leading-snug mb-1">
                      {cert.title}
                    </h3>
                    <div className="text-xs font-mono text-[#9A948C] uppercase tracking-wider font-semibold">
                      ISSUED BY: <span className="text-[#FAF8F3]">{cert.organization}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-[#9A948C] font-light leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Bottom Verification Footer */}
                <div className="pt-5 mt-6 border-t border-[#FAF8F3]/15 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#9A948C] text-[10px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ID: {cert.credentialId}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[#B85C3B] font-bold text-xs group-hover:translate-x-1 transition-transform">
                    <span>VERIFIED SIGNAL</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── CONSTELLATION SVG CANVAS (INTERACTIVE STAR MAP) ───────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="p-6 rounded-3xl bg-[#1D1B18] border border-[#FAF8F3]/15 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4 border-b border-[#FAF8F3]/15 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#B85C3B] font-bold uppercase">
              <Sparkles className="w-4 h-4 text-[#B85C3B]" />
              <span>INTERACTIVE SIGNAL CONSTELLATION MAP</span>
            </div>
            <span className="text-[10px] font-mono text-[#9A948C]">HOVER STARS TO INSPECT SIGNAL</span>
          </div>

          <svg
            viewBox="0 0 100 65"
            className="w-full"
            style={{ height: 'clamp(240px, 35vw, 360px)' }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Ambient background stars */}
            {AMBIENT_STARS.map((s, i) => (
              <circle
                key={i}
                cx={`${s.x}%`}
                cy={`${s.y}%`}
                r={s.r * 0.25}
                fill="#FAF8F3"
                opacity={s.opacity}
              />
            ))}

            {/* Constellation lines */}
            {CONNECTIONS.map(([i, j], idx) => {
              const p1 = STAR_POSITIONS[i];
              const p2 = STAR_POSITIONS[j];
              const isLineActive = activeIdx === i || activeIdx === j;
              return (
                <line
                  key={idx}
                  x1={`${p1.x}%`} y1={`${p1.y}%`}
                  x2={`${p2.x}%`} y2={`${p2.y}%`}
                  stroke={isLineActive ? '#B85C3B' : '#787268'}
                  strokeWidth={isLineActive ? '0.6' : '0.25'}
                  strokeDasharray={isLineActive ? 'none' : '1.5 1.5'}
                  opacity={isLineActive ? 0.9 : 0.4}
                />
              );
            })}

            {/* Constellation star nodes */}
            {certifications.map((cert, index) => {
              const pos = STAR_POSITIONS[index % STAR_POSITIONS.length];
              const isActive = activeIdx === index;
              return (
                <g
                  key={cert.id}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => { setActiveIdx(index); playHover(); }}
                  onMouseLeave={() => setActiveIdx(null)}
                >
                  <circle
                    cx={`${pos.x}%`}
                    cy={`${pos.y}%`}
                    r={isActive ? 3.5 : 2}
                    fill={isActive ? '#B85C3B' : '#FAF8F3'}
                    opacity={isActive ? 1 : 0.7}
                  />
                  <text
                    x={`${pos.x}%`}
                    y={`${pos.y + 4.5}%`}
                    textAnchor="middle"
                    fill={isActive ? '#B85C3B' : '#9A948C'}
                    fontSize="1.8 font-mono font-bold"
                  >
                    {cert.title.split(' ').slice(0, 2).join(' ')}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

      </div>
    </section>
  );
}

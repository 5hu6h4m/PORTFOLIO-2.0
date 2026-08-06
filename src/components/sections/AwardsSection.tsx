'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimationFrame } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface AwardsSectionProps {
  playHover: () => void;
}

// Fixed positions for 4 stars, spread across the canvas (as numbers)
const STAR_POSITIONS = [
  { x: 22, y: 38 },
  { x: 55, y: 22 },
  { x: 75, y: 55 },
  { x: 38, y: 68 },
];

// Constellation connecting lines between adjacent stars
const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 0], [0, 2],
];

// Small ambient star count
const AMBIENT_COUNT = 60;

function getAmbientStars() {
  // deterministic pseudo-random using golden ratio
  const φ = 1.6180339887;
  return Array.from({ length: AMBIENT_COUNT }, (_, i) => ({
    x: ((i * φ * 100) % 100),
    y: ((i * φ * φ * 100) % 100),
    r: 0.5 + ((i * 3) % 3) * 0.4,
    opacity: 0.15 + ((i * 7) % 5) * 0.06,
  }));
}

const AMBIENT_STARS = getAmbientStars();

interface ConstellationStarProps {
  cert: typeof PORTFOLIO_DATA.certifications[0];
  pos: { x: number; y: number };
  index: number;
  isActive: boolean;
  onActivate: (i: number | null) => void;
  playHover: () => void;
}

function ConstellationStar({ cert, pos, index, isActive, onActivate, playHover }: ConstellationStarProps) {
  const pulseRef = useRef(0);

  useAnimationFrame((t) => {
    pulseRef.current = t;
  });

  const cxStr = `${pos.x}%`;
  const cyStr = `${pos.y}%`;

  return (
    <g
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => { onActivate(index); playHover(); }}
      onMouseLeave={() => onActivate(null)}
    >
      {/* Outer glow ring — pulses */}
      <motion.circle
        cx={cxStr}
        cy={cyStr}
        r={3.5}
        fill="none"
        stroke="#B85C3B"
        strokeWidth="0.5"
        animate={isActive
          ? { opacity: [0.3, 0.7, 0.3], r: [3.5, 4.5, 3.5] }
          : { opacity: [0.1, 0.25, 0.1], r: 3.5 }
        }
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main star body */}
      <motion.circle
        cx={cxStr}
        cy={cyStr}
        r={isActive ? 1.8 : 1.1}
        fill={isActive ? '#B85C3B' : '#E2DCD2'}
        animate={{ r: isActive ? 1.8 : 1.1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Star cross sparkle */}
      {isActive && (
        <>
          <motion.line
            x1={cxStr} y1={`${pos.y - 2.5}%`}
            x2={cxStr} y2={`${pos.y + 2.5}%`}
            stroke="#B85C3B" strokeWidth="0.5" strokeDasharray="2 2"
            initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 0.6, scaleY: 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.line
            x1={`${pos.x - 2.5}%`} y1={cyStr}
            x2={`${pos.x + 2.5}%`} y2={cyStr}
            stroke="#B85C3B" strokeWidth="0.5" strokeDasharray="2 2"
            initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 0.6, scaleX: 1 }}
            transition={{ duration: 0.4 }}
          />
        </>
      )}

      {/* Label below star */}
      <motion.text
        x={cxStr}
        y={`${pos.y + 4}%`}
        textAnchor="middle"
        className="font-mono"
        fill={isActive ? '#B85C3B' : '#787268'}
        fontSize="1.6%"
        animate={{ opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.25 }}
      >
        {cert.title.split(' ').slice(0, 2).join(' ').toUpperCase()}
      </motion.text>
    </g>
  );
}

export function AwardsSection({ playHover }: AwardsSectionProps) {
  const { certifications } = PORTFOLIO_DATA;
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const activeCert = activeIdx !== null ? certifications[activeIdx] : null;

  return (
    <section id="achievements" className="py-24 px-6 md:px-12 bg-[#25231F] relative overflow-hidden">
      {/* Fine dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #9A948C 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-16"
        >
          <div className="text-[10px] font-mono tracking-[0.3em] text-[#B85C3B] mb-4">
            06 / SIGNAL ARCHIVE
          </div>
          <div className="flex items-end justify-between">
            <h2
              className="text-5xl md:text-7xl font-serif font-bold text-[#FAF8F3] leading-none"
              style={{ letterSpacing: '-0.03em' }}
            >
              VERIFIED<br />
              <span className="text-[#B85C3B]">SIGNALS</span>
            </h2>
            <div className="hidden md:block text-right text-[10px] font-mono text-[#787268] uppercase tracking-widest">
              <div className="mb-1">Hover stars</div>
              <div>to read</div>
            </div>
          </div>
        </motion.div>

        {/* Main constellation + detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Constellation SVG */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <svg
              viewBox="0 0 100 80"
              className="w-full"
              style={{ height: 'clamp(280px, 45vw, 480px)' }}
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
              {CONNECTIONS.map(([a, b], i) => {
                const pa = STAR_POSITIONS[a];
                const pb = STAR_POSITIONS[b];
                const isHighlighted = activeIdx === a || activeIdx === b;
                return (
                  <motion.line
                    key={i}
                    x1={`${pa.x}%`} y1={`${pa.y}%`}
                    x2={`${pb.x}%`} y2={`${pb.y}%`}
                    stroke={isHighlighted ? '#B85C3B' : '#3A3832'}
                    strokeWidth={isHighlighted ? '0.4' : '0.2'}
                    strokeDasharray="1.5 2"
                    animate={{ opacity: isHighlighted ? 0.8 : 0.35 }}
                    transition={{ duration: 0.4 }}
                  />
                );
              })}

              {/* Cert stars */}
              {certifications.map((cert, i) => (
                <ConstellationStar
                  key={cert.id}
                  cert={cert}
                  pos={STAR_POSITIONS[i]}
                  index={i}
                  isActive={activeIdx === i}
                  onActivate={setActiveIdx}
                  playHover={playHover}
                />
              ))}
            </svg>
          </motion.div>

          {/* Detail panel */}
          <div className="lg:col-span-5">
            <motion.div
              key={activeIdx ?? 'empty'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[220px]"
            >
              {activeCert ? (
                <div className="border border-[#3A3832] rounded-lg p-6 bg-[#1E1C19]">
                  {/* Document-style header */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#3A3832]">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B85C3B]">
                      {activeCert.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#787268]">{activeCert.year}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#FAF8F3] mb-2 leading-tight">
                    {activeCert.title}
                  </h3>
                  <div className="text-xs font-mono text-[#B85C3B] mb-4">{activeCert.organization}</div>
                  <p className="text-sm text-[#787268] font-light leading-relaxed mb-5">
                    {activeCert.description}
                  </p>
                  <div className="flex items-center gap-2 pt-4 border-t border-[#3A3832]">
                    <span className="text-[10px] font-mono text-[#4A4742] uppercase tracking-widest">ID:</span>
                    <span className="text-[10px] font-mono text-[#787268]">{activeCert.credentialId}</span>
                  </div>
                </div>
              ) : (
                <div className="border border-[#3A3832] border-dashed rounded-lg p-6 flex flex-col items-center justify-center min-h-[220px] text-center">
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#4A4742] mb-3">
                    Awaiting Signal
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1 h-1 rounded-full bg-[#B85C3B]"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] font-mono text-[#4A4742] mt-3">Hover a star to read its transmission</p>
                </div>
              )}
            </motion.div>

            {/* Certification index list */}
            <div className="mt-6 space-y-2">
              {certifications.map((cert, i) => (
                <motion.button
                  key={cert.id}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer"
                  style={{
                    background: activeIdx === i ? '#3A3832' : 'transparent',
                  }}
                  onMouseEnter={() => { onActivate(i); playHover(); }}
                  onMouseLeave={() => onActivate(null)}
                  onClick={() => setActiveIdx(i === activeIdx ? null : i)}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0 transition-all duration-300"
                    style={{ background: activeIdx === i ? '#B85C3B' : '#3A3832' }}
                  />
                  <span className="text-[11px] font-mono text-[#787268] truncate">
                    {cert.title}
                  </span>
                  <span className="ml-auto text-[10px] font-mono text-[#4A4742] shrink-0">{cert.year}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  function onActivate(i: number | null) {
    setActiveIdx(i);
  }
}

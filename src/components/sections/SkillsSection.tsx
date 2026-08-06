'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useAnimationFrame } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface SkillsSectionProps {
  playClick: () => void;
  playHover: () => void;
}

// Each bar has a unique noise seed so they animate at different rhythms
function useNoiseValue(seed: number, speed: number) {
  const val = useRef(0);
  const t = useRef(seed * 100);
  useAnimationFrame((_, delta) => {
    t.current += (delta / 1000) * speed;
    // Simple pseudo-noise using summed sines
    val.current =
      Math.sin(t.current * 1.3) * 0.3 +
      Math.sin(t.current * 2.1 + seed) * 0.2 +
      Math.sin(t.current * 0.7 + seed * 2) * 0.1;
  });
  return val;
}

interface EQBarProps {
  skill: { name: string; level: number; experience: string; highlight: string };
  index: number;
  playHover: () => void;
}

function EQBar({ skill, index, playHover }: EQBarProps) {
  const [hovered, setHovered] = useState(false);
  const noiseVal = useNoiseValue(index * 1.618, 0.8 + index * 0.07);
  const barRef = useRef<HTMLDivElement>(null);

  // Base height from skill level (60% → 100% maps to 40px → 140px)
  const baseH = 40 + ((skill.level - 60) / 40) * 100;

  useAnimationFrame(() => {
    if (!barRef.current || hovered) return;
    const h = baseH + noiseVal.current * 28;
    barRef.current.style.height = `${Math.max(24, h)}px`;
  });

  return (
    <div
      className="flex flex-col items-center gap-3 group cursor-default flex-1"
      onMouseEnter={() => { setHovered(true); playHover(); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover detail card — floats above the bar */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8, scale: hovered ? 1 : 0.95 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-52 p-3 rounded-xl bg-[#25231F] text-left pointer-events-none z-20 shadow-2xl"
        style={{ transformOrigin: 'bottom center' }}
      >
        <div className="text-[10px] font-mono text-[#B85C3B] mb-1 uppercase tracking-widest">{skill.experience}</div>
        <div className="text-sm font-serif font-bold text-[#FAF8F3] mb-1.5 leading-tight">{skill.name}</div>
        <div className="text-[11px] text-[#9A948C] leading-relaxed">{skill.highlight}</div>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#25231F]" />
      </motion.div>

      {/* The animated bar */}
      <div className="relative w-full flex flex-col justify-end" style={{ height: 160 }}>
        <motion.div
          ref={barRef}
          animate={hovered ? { height: 160, backgroundColor: '#B85C3B' } : { backgroundColor: '#E2DCD2' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-t-sm"
          style={{ height: baseH }}
        />
        {/* Level indicator line */}
        <div
          className="absolute left-0 right-0 h-px bg-[#B85C3B]/20"
          style={{ bottom: `${(skill.level / 100) * 160}px` }}
        />
      </div>

      {/* Skill name below */}
      <div className={`text-[10px] font-mono uppercase tracking-wider text-center transition-colors duration-200 ${hovered ? 'text-[#B85C3B]' : 'text-[#9A948C]'}`}>
        {skill.name.split(' ')[0]}
      </div>
    </div>
  );
}

interface RowProps {
  category: { title: string; description: string; skills: { name: string; level: number; experience: string; icon: string; highlight: string }[] };
  rowIndex: number;
  playHover: () => void;
}

function FrequencyRow({ category, rowIndex, playHover }: RowProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: rowIndex * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16"
    >
      {/* Row label */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#B85C3B]">
          {String(rowIndex + 1).padStart(2, '0')}
        </span>
        <div className="flex-1 h-px bg-[#E2DCD2]" />
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9A948C]">
          {category.title}
        </span>
        <div className="w-4 h-px bg-[#E2DCD2]" />
      </div>

      {/* EQ bars row */}
      <div className="relative flex items-end gap-2 md:gap-3">
        {category.skills.map((skill, i) => (
          <div key={skill.name} className="relative flex-1">
            <EQBar
              skill={skill}
              index={rowIndex * 4 + i}
              playHover={playHover}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection({ playClick, playHover }: SkillsSectionProps) {
  const { skillsCategories } = PORTFOLIO_DATA;
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-[#F4F0E8] relative overflow-hidden">
      {/* Ambient background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, #25231F 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #25231F 0px, transparent 1px, transparent 40px)',
      }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          ref={headerRef}
          className="flex items-end justify-between mb-20"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            <div className="text-[10px] font-mono tracking-[0.3em] text-[#B85C3B] mb-4">
              02 / FREQUENCY
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#25231F] leading-none" style={{ letterSpacing: '-0.03em' }}>
              ARSENAL
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest mb-1">Signal Strength</div>
            <div className="text-xs font-mono text-[#25231F]">
              {skillsCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} Technologies Active
            </div>
          </div>
        </motion.div>

        {/* Frequency rows */}
        {skillsCategories.map((cat, i) => (
          <FrequencyRow
            key={cat.title}
            category={cat}
            rowIndex={i}
            playHover={playHover}
          />
        ))}

        {/* Bottom signal footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-6 mt-4 pt-8 border-t border-[#E2DCD2]"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B85C3B] animate-pulse" />
            <span className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest">Live Signal</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-[#E2DCD2] to-transparent" />
          <span className="text-[10px] font-mono text-[#9A948C]">Hover bars to inspect</span>
        </motion.div>
      </div>
    </section>
  );
}

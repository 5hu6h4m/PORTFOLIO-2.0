'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface ExperienceSectionProps {
  playHover: () => void;
}

// A redacted text bar that lifts on hover
function Redacted({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [lifted, setLifted] = useState(false);

  return (
    <span className="relative inline-block">
      <span className={`transition-opacity duration-500 ${lifted ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </span>
      <motion.span
        className="absolute inset-0 rounded-sm bg-[#25231F] cursor-pointer"
        initial={false}
        animate={lifted ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: lifted ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left center' }}
        onClick={() => setLifted(true)}
        onMouseEnter={() => setLifted(true)}
      />
    </span>
  );
}

interface MissionLogProps {
  exp: (typeof PORTFOLIO_DATA.experience)[0];
  index: number;
  playHover: () => void;
}

function MissionLog({ exp, index, playHover }: MissionLogProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [declassified, setDeclassified] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative border border-[#E2DCD2] rounded-none bg-[#FAF8F3] overflow-hidden"
      onMouseEnter={playHover}
    >
      {/* Document header bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#25231F] text-[#FAF8F3]">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
          MISSION LOG · {String(index + 1).padStart(3, '0')}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[#9A948C] uppercase">{exp.period}</span>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-sm uppercase tracking-wider ${
              declassified
                ? 'bg-emerald-800/80 text-emerald-300'
                : 'bg-[#B85C3B]/80 text-[#FAF8F3]'
            }`}
          >
            {declassified ? '✓ DECLASSIFIED' : '▓ CLASSIFIED'}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Role & Company */}
        <div className="mb-6">
          <div className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-widest mb-2">SUBJECT</div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#25231F] mb-1">
            {exp.role}
          </h3>
          <div className="text-sm font-mono font-semibold text-[#B85C3B]">{exp.company}</div>
          <div className="text-xs font-mono text-[#9A948C] mt-1">{exp.type} · {exp.location}</div>
        </div>

        {/* Description — partially redacted */}
        <div className="mb-6">
          <div className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest mb-2">SUMMARY</div>
          <p className="text-sm text-[#787268] leading-relaxed">
            {exp.description}
          </p>
        </div>

        {/* Deliverables — redacted on load */}
        <div className="mb-6">
          <div className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest mb-3">
            KEY OPERATIONS <span className="text-[#B85C3B]">— hover to declassify</span>
          </div>
          <ul className="space-y-3">
            {exp.deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="text-[#B85C3B] font-mono mt-0.5 shrink-0">›</span>
                <span className="text-[#25231F] leading-relaxed">
                  <Redacted delay={i * 0.06}>{item}</Redacted>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="pt-5 border-t border-[#E2DCD2] flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-mono text-[#9A948C] uppercase tracking-widest mr-2">Stack:</span>
          {exp.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-sm border border-[#E2DCD2] text-[10px] font-mono text-[#787268] bg-[#F4F0E8]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Declassify CTA strip */}
      {!declassified && (
        <motion.button
          className="w-full py-3 border-t border-[#E2DCD2] text-[10px] font-mono uppercase tracking-[0.3em] text-[#9A948C] hover:bg-[#25231F] hover:text-[#FAF8F3] transition-all duration-300 cursor-pointer"
          onClick={() => setDeclassified(true)}
          whileHover={{ letterSpacing: '0.4em' }}
        >
          ▓▓▓ HOVER DELIVERABLES TO DECLASSIFY ▓▓▓
        </motion.button>
      )}
    </motion.div>
  );
}

export function ExperienceSection({ playHover }: ExperienceSectionProps) {
  const { experience } = PORTFOLIO_DATA;
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-[#F4F0E8] relative overflow-hidden">
      {/* Scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #25231F 0px, transparent 1px, transparent 3px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-[10px] font-mono tracking-[0.3em] text-[#B85C3B] mb-4">
            04 / MISSION ARCHIVE
          </div>
          <div className="flex items-end justify-between">
            <h2
              className="text-5xl md:text-7xl font-serif font-bold text-[#25231F] leading-none"
              style={{ letterSpacing: '-0.03em' }}
            >
              FIELD<br />RECORDS
            </h2>
            <div className="hidden md:block text-right text-[10px] font-mono text-[#9A948C]">
              <div className="uppercase tracking-widest mb-1">Status</div>
              <div className="text-[#B85C3B]">ACTIVE DEPLOYMENT</div>
            </div>
          </div>
        </motion.div>

        {/* Mission log documents */}
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <MissionLog key={exp.id} exp={exp} index={i} playHover={playHover} />
          ))}
        </div>
      </div>
    </section>
  );
}

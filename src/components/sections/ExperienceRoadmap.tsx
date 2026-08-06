'use client';
// ExperienceRoadmap.tsx – Chapter 07 interactive experience timeline
// Premium cream visual identity, glassmorphism cards, smooth scroll animations

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import styles from './ExperienceRoadmap.module.css';
import { ArrowUpRight } from 'lucide-react';
interface ExperienceRoadmapProps {
  onClose?: () => void;
  playClick?: () => void;
  playHover?: () => void;
}

// Single timeline entry card
function TimelineCard({ exp, index, playHover }: { exp: typeof PORTFOLIO_DATA.experience[0]; index: number; playHover?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      onMouseEnter={playHover}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.header}>
        <span className={styles.period}>{exp.period}</span>
        <ArrowUpRight className={styles.icon} size={16} />
      </div>
      <h3 className={styles.role}>{exp.role}</h3>
      <p className={styles.company}>{exp.company} • {exp.location}</p>
      <p className={styles.desc}>{exp.description}</p>
      <div className={styles.techStack}>
        {exp.technologies.map((t) => (
          <span key={t} className={styles.techBadge}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

export function ExperienceRoadmap({ onClose, playClick, playHover }: ExperienceRoadmapProps) {
  const { experience } = PORTFOLIO_DATA;
  const containerRef = useRef<HTMLDivElement>(null);

  // Use window scroll for full-screen section
  const { scrollYProgress } = useScroll();
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className={styles.section} ref={containerRef} id="experience-roadmap">
      {/* Header bar with Back / Close option if inside modal */}
      {onClose && (
        <div className="flex items-center justify-between border-b border-[#FAF8F3]/10 pb-4 max-w-5xl mx-auto w-full mb-8 relative z-20">
          <button
            onClick={() => {
              playClick?.();
              onClose();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F3]/10 hover:bg-[#B55D3D] text-[#FAF8F3] text-xs font-mono transition-colors"
          >
            ← BACK TO COMMAND CENTER
          </button>
          <span className="text-xs font-mono text-[#FAF8F3]/50">CHAPTER 07 // EXPERIENCE</span>
        </div>
      )}

      <h2 className={styles.title}>EXPERIENCE ROADMAP</h2>
      <div className={styles.timelineContainer}>
        {/* Vertical line – grows with scroll */}
        <motion.div className={styles.verticalLine} style={{ scaleY: lineScale }} />
        {/* Cards */}
        <div className={styles.cardsWrapper}>
          {experience.map((exp, i) => (
            <TimelineCard key={exp.id} exp={exp} index={i} playHover={playHover} />
          ))}
        </div>
      </div>
    </section>
  );
}


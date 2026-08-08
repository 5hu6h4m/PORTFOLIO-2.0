'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { KinematicTextMorph } from '@/components/ui/KinematicTextMorph';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Terminal, Cpu, Trophy, Rocket, Sparkles } from 'lucide-react';

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

// ── KINETIC CIPHER TEXT SCRAMBLE REVEAL COMPONENT ─────────────────────────────
function TextScrambleReveal({
  text,
  inView,
  delay = 0,
  className = '',
}: {
  text: string;
  inView: boolean;
  delay?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&*';

  useEffect(() => {
    if (!inView) {
      setDisplayText('');
      return;
    }

    let iteration = 0;
    const totalFrames = text.length * 2.2;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / 2.2) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        iteration += 1;

        if (iteration >= totalFrames) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 22);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [inView, text, delay]);

  return <span className={className}>{displayText || (inView ? '' : text)}</span>;
}

function SubLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="text-xs font-mono tracking-[0.22em] text-[#B85C3B] font-bold">{index}</span>
      <div className="w-8 h-px bg-[#B85C3B]" />
      <span className="text-xs font-mono tracking-[0.22em] uppercase text-[#787268] font-bold">{title}</span>
    </div>
  );
}

// ── FREE-FLOATING KINETIC EDITORIAL BIO SECTION WITH CIPHER TEXT SCRAMBLE ────
function PersonalBioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const textLines = [
    "I’m a Computer Science student and frontend developer who enjoys turning ideas into clean, interactive web experiences.",
    "I’m currently exploring modern frontend technologies, 3D experiences and full-stack development while building projects that turn ideas into something people can actually use."
  ];

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto my-16 sm:my-24 px-4 select-none">
      {/* 1. Tagline Cipher Scramble Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="w-2 h-2 rounded-full bg-[#B85C3B] animate-pulse" />
        <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.25em] text-[#B85C3B]">
          <TextScrambleReveal
            text="Building for the web, learning every day."
            inView={inView}
            delay={0.1}
          />
        </span>
      </motion.div>

      {/* 2. Free Floating Kinetic Serif Paragraph (A to Z Character Cipher Lock-In Reveal) */}
      <div className="space-y-5 mb-16">
        {textLines.map((line, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, delay: 0.2 + idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#25231F] leading-[1.35] font-normal tracking-tight"
          >
            <TextScrambleReveal
              text={line}
              inView={inView}
              delay={0.3 + idx * 0.35}
            />
          </motion.p>
        ))}
      </div>

      {/* 3. Free Floating 3 Small Facts Editorial Row (NO BOX CARDS, NO BORDERS) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-[#E2DCD2]/80"
      >
        <div className="space-y-1.5">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#B85C3B] font-bold">
            BASED IN
          </div>
          <div className="text-sm sm:text-base font-mono font-bold text-[#25231F] tracking-wide">
            <TextScrambleReveal
              text="NASHIK, INDIA"
              inView={inView}
              delay={1.2}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#B85C3B] font-bold">
            EDUCATION
          </div>
          <div className="text-sm sm:text-base font-mono font-bold text-[#25231F] tracking-wide">
            <TextScrambleReveal
              text="B.TECH • COMPUTER SCIENCE"
              inView={inView}
              delay={1.35}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#B85C3B] font-bold">
            CURRENTLY
          </div>
          <div className="text-sm sm:text-base font-mono font-bold text-[#25231F] tracking-wide">
            <TextScrambleReveal
              text="BUILDING + LEARNING"
              inView={inView}
              delay={1.5}
            />
          </div>
        </div>
      </motion.div>
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

        <PersonalBioSection />

        <WhoIAmSection />
      </div>
    </section>
  );
}

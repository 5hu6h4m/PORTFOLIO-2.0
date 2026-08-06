'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDownRight, FileText, ArrowDown, Mail, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface HeroSectionProps {
  playClick: () => void;
  playHover: () => void;
}

export function HeroSection({ playClick, playHover }: HeroSectionProps) {
  const { personal } = PORTFOLIO_DATA;

  // Responsive device check to prevent mobile fading/blurring
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fade out ALL hero content as user scrolls — so hero text is gone
  // before the About section slides over it. The fixed 3D canvas (z-0)
  // is NOT wrapped here and remains fully visible regardless.
  const { scrollY } = useScroll();
  const rawOpacity = useTransform(scrollY, [150, 520], [1, 0]);
  const rawY = useTransform(scrollY, [150, 520], [0, -35]);

  // Spring physics for buttery-smooth scroll fade-out
  const responsiveOpacity = useSpring(rawOpacity, { stiffness: 90, damping: 22, mass: 0.8 });
  const responsiveY = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.8 });

  const lineVariant = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.12,
        ease: 'easeOut' as const,
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-32 lg:pt-36 pb-12 px-6 md:px-12 overflow-hidden bg-transparent select-none">
      {/* Warm Ambient Radial Glow */}
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-[#B85C3B]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Marquee ticker — credentials strip */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden border-b border-[#E2DCD2]/40 z-20 pointer-events-none">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].map((_, ri) => (
            <div key={ri} className="flex items-center shrink-0">
              {[
                'FRONTEND DEVELOPER', 'NEXT.JS 15', 'REACT 19',
                'TYPESCRIPT', 'NODE.JS', 'THREE.JS', 'FRAMER MOTION',
                'E-CELL PRESIDENT', '18+ PRODUCTION APPS', 'LIGHTHOUSE 98+',
                '250+ DEVS MENTORED', 'AVAILABLE FOR HIRE',
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-4 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#9A948C]">
                  <span className="w-1 h-1 rounded-full bg-[#B85C3B] shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll-fade wrapper — fades out as user scrolls so it doesn't
          bleed through the transparent top of the About section */}
      <motion.div
        style={{ opacity: responsiveOpacity, y: responsiveY }}
        className="flex flex-col flex-1 justify-between"
      >

      {/* Ultra-Clean Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto pt-[32vh] sm:pt-[26vh] lg:pt-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-none">
        <div className="lg:col-span-8 pointer-events-auto">
          {/* Availability Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F3]/90 backdrop-blur-md border border-[#E2DCD2] text-[11px] font-mono text-[#787268] mb-6 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#B85C3B] animate-pulse" />
            <span className="font-semibold text-[#25231F] tracking-wider uppercase">{personal.statusPill}</span>
          </motion.div>

          {/* Headline */}
          <div className="mb-6 space-y-1">
            <div className="overflow-hidden mask-text-reveal">
              <motion.h1
                custom={0}
                initial="hidden"
                animate="visible"
                variants={lineVariant}
                className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-[#25231F] leading-[1.1]"
              >
                Crafting High-Performance
              </motion.h1>
            </div>

            <div className="overflow-hidden mask-text-reveal">
              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={lineVariant}
                className="text-3xl sm:text-5xl lg:text-6xl font-sans italic font-light text-[#B85C3B] leading-[1.1]"
              >
                Web Applications.
              </motion.h1>
            </div>
          </div>

          {/* Requested Editorial Quote */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-base md:text-lg text-[#B85C3B] font-serif font-medium italic mb-8"
          >
            "Every pixel has a purpose. Every interaction tells a story."
          </motion.p>

          {/* Action CTAs & Social Links (Lighter Warm Luxury Buttons) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 relative z-20 pointer-events-auto"
          >
            <MagneticButton href="#skills" variant="primary" onClick={playClick}>
              <span>Explore Tech Stack</span>
              <ArrowDownRight className="w-4 h-4 text-[#FAF8F3]" />
            </MagneticButton>

            <MagneticButton href={personal.resumeUrl} download variant="glass" onClick={playClick}>
              <FileText className="w-4 h-4 text-[#B85C3B]" />
              <span>Download Resume</span>
            </MagneticButton>

            <div className="flex items-center gap-3 pl-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="p-3.5 rounded-full bg-[#FAF8F3]/90 backdrop-blur-md border border-[#E2DCD2] text-[#25231F] hover:border-[#B85C3B] hover:text-[#B85C3B] transition-colors shadow-xs"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4.5 h-4.5" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="p-3.5 rounded-full bg-[#FAF8F3]/90 backdrop-blur-md border border-[#E2DCD2] text-[#25231F] hover:border-[#B85C3B] hover:text-[#B85C3B] transition-colors shadow-xs"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4.5 h-4.5" />
              </a>

              <a
                href={`mailto:${personal.email}`}
                onMouseEnter={playHover}
                onClick={playClick}
                className="p-3.5 rounded-full bg-[#FAF8F3]/90 backdrop-blur-md border border-[#E2DCD2] text-[#25231F] hover:border-[#B85C3B] hover:text-[#B85C3B] transition-colors shadow-xs"
                title="Send Email"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator & Subtle Interactive 3D Callout */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.75 }}
        className="relative z-10 max-w-7xl mx-auto w-full pt-6 flex items-center justify-between text-xs font-mono text-[#787268] border-t border-[#E2DCD2]/80 pointer-events-auto"
      >
        <a
          href="#about"
          onClick={playClick}
          onMouseEnter={playHover}
          className="flex items-center gap-2 hover:text-[#B85C3B] transition-colors"
        >
          <ArrowDown className="w-4 h-4 animate-bounce text-[#B85C3B]" />
          <span>Scroll to Explore</span>
        </a>

        {/* Sleek Minimal Interactive Micro-Tag */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3]/90 border border-[#E2DCD2] text-[11px] font-mono text-[#787268]">
            <Sparkles className="w-3 h-3 text-[#B85C3B]" />
            <span>Interactive 3D Stage</span>
          </span>
          <span className="text-[11px] font-mono text-[#787268]">
            Shubham Jadhav · Portfolio 2026
          </span>
        </div>
      </motion.div>
      </motion.div>
    </section>
  );
}

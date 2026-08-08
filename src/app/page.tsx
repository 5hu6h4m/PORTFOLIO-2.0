'use client';

import { useState, useRef, useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useSound } from '@/hooks/useSound';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Preloader } from '@/components/sections/Preloader';
import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { LeadershipSection } from '@/components/sections/LeadershipSection';
import { LearningJourneySection } from '@/components/sections/LearningJourneySection';
import { AwardsSection } from '@/components/sections/AwardsSection';
import { BeyondTheCodeSection } from '@/components/sections/BeyondTheCodeSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { SceneCanvas } from '@/components/3d/SceneCanvas';
import { ScrollTypeQuote } from '@/components/ui/ScrollTypeQuote';

export default function Home() {
  // Initialize Lenis smooth scroll provider
  useLenis();

  // Initialize Web Audio API sound synthesizer
  const { soundEnabled, toggleSound, playClick, playHover, playSuccess } = useSound();

  const [loaded, setLoaded] = useState(false);
  
  const [awardsRevealed, setAwardsRevealed] = useState(true);
  const awardsTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable browser scroll restoration so refresh always starts at top Home section
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAwardsRevealed(true);
        }
      },
      { threshold: 0.05 }
    );

    if (awardsTriggerRef.current) {
      observer.observe(awardsTriggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#F4F0E8] text-[#23201C] selection:bg-[#B85C3B] selection:text-[#FAF7F2]">
      {/* Preloader */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Global Custom Cursor */}
      <CustomCursor />

      {/* Header Floating Nav Bar */}
      <Header playClick={playClick} playHover={playHover} />

      {/* FIXED 3D HERO CANVAS STAGE */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <SceneCanvas />
      </div>

      {/* HERO SCROLL CONTAINER (100VH) */}
      <div id="hero" className="relative z-10 w-full min-h-screen pointer-events-none">
        <div className="relative w-full min-h-screen flex flex-col justify-between pointer-events-none">
          <HeroSection playClick={playClick} playHover={playHover} />
          {/* Smooth 38% bottom gradient overlay fade — sitting underneath hero buttons */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none h-[25%] md:h-[38%]"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, #F4F0E8 85%)',
              zIndex: 5,
            }}
          />
        </div>
      </div>

      {/* MAIN SECTIONS SHEET OVERLAY */}
      <div className="relative z-20 pointer-events-auto">
        {/* ABOUT & JOURNEY */}
        <AboutSection playHover={playHover} />

        {/* OPENING SCROLL-TYPED QUOTE */}
        <ScrollTypeQuote
          badge="🌑 OPENING STATEMENT"
          quote="Every masterpiece was once invisible. The world remembers results, it never sees the nights that created them."
          subtext="— THE PHILOSOPHY OF CONTINUOUS CREATION"
          className="border-y border-[#E2DCD2]/60 bg-[#FAF8F3]"
        />



        {/* 02 / FEATURED PROJECTS (FIELD WORK / CASE FILES) */}
        <ProjectsSection playClick={playClick} playHover={playHover} />

        {/* 03 / TECH STACK & ECOSYSTEM (5-Card Rainbow Arc Pinning) */}
        <SkillsSection playClick={playClick} playHover={playHover} />

        {/* 03 / LEADERSHIP (LED. BUILT. WON.) */}
        <LeadershipSection playHover={playHover} />

        {/* SACRED TREE SCROLL-TYPED QUOTE */}
        <ScrollTypeQuote
          badge="🌳 SACRED TREE — GROWTH"
          quote="Roots grow in darkness. That's why they become strong."
          subtext="— SILENT DEDICATION BEFORE MASTERY"
          className="border-y border-[#E2DCD2]/60 bg-[#FAF8F3]"
        />

        {/* 04 / THE LEARNING JOURNEY (6 Cinematic Evolution Chapters) */}
        <div className="relative z-20">
          <LearningJourneySection playClick={playClick} playHover={playHover} isAwardsRevealed={awardsRevealed} />
        </div>

        {/* SAGE MODE SCROLL-TYPED QUOTE */}
        <ScrollTypeQuote
          badge="🧘 SAGE MODE — CREDENTIALS"
          quote="Mastery is quiet. It doesn't need to announce itself."
          subtext="— VERIFIED ACADEMIC & TECHNICAL SIGNALS"
          className="border-y border-[#E2DCD2]/60 bg-[#FAF8F3]"
        />

        {/* 05 / CERTIFICATIONS & CREDENTIALS */}
        <div id="certificates" ref={awardsTriggerRef} className="relative z-10 border-t border-[#E2DCD2]">
          <div id="achievements" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />
          <AwardsSection playHover={playHover} isRevealed={awardsRevealed} />
        </div>

        {/* 06 / BEYOND THE CODE */}
        <BeyondTheCodeSection playHover={playHover} />

        {/* FINAL WAR SCROLL-TYPED QUOTE */}
        <ScrollTypeQuote
          badge="⚡ FINAL WAR — LEGACY"
          quote="Every challenge prepared you for this moment. Leave behind work that speaks long after you stop talking."
          subtext="— ARCHITECTING HIGH-PERFORMANCE SYSTEMS"
          className="border-y border-[#E2DCD2]/60 bg-[#FAF8F3]"
        />

        {/* 07 / CONTACT FORM */}
        <ContactSection playClick={playClick} playHover={playHover} playSuccess={playSuccess} />

        {/* 08 / FOOTER */}
        <Footer playClick={playClick} playHover={playHover} />
      </div>
    </main>
  );
}

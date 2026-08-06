'use client';

import { useState } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useSound } from '@/hooks/useSound';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Preloader } from '@/components/sections/Preloader';
import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection, JourneySection, DiagonalLanesSection, HobbiesSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { LeadershipSection } from '@/components/sections/LeadershipSection';
import { AwardsSection } from '@/components/sections/AwardsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { SceneCanvas } from '@/components/3d/SceneCanvas';

export default function Home() {
  // Initialize Lenis smooth scroll provider
  useLenis();

  // Initialize Web Audio API sound synthesizer
  const { soundEnabled, toggleSound, playClick, playHover, playSuccess } = useSound();

  const [loaded, setLoaded] = useState(false);

  return (
    <main className="relative bg-[#F4F0E8] text-[#25231F] selection:bg-[#B85C3B] selection:text-white">
      {/* Fixed Fullscreen 3D Stage — always behind everything */}
      <div className="fixed inset-0 pointer-events-auto z-0">
        <SceneCanvas section="hero" />
      </div>

      {/* Brand Preloader */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Custom Spring Glass Magnetic Cursor */}
      <CustomCursor />

      {/* Header Navigation */}
      <Header playClick={playClick} playHover={playHover} />

      {/*
        STICKY HERO ARCHITECTURE:
        - Outer wrapper: 200vh tall so scroll has space to travel
        - Inner div: sticky top-0, h-screen — stays pinned while user scrolls
        - 3D canvas (fixed) shows through the transparent hero
        - After 100vh scroll, sections below start sliding up OVER the hero
      */}
      {/* pointer-events-none so the 200vh spacer div never blocks canvas clicks */}
      <div className="relative z-10 pointer-events-none" style={{ height: '200vh' }}>
        <div className="sticky top-0 h-screen relative">
          <HeroSection playClick={playClick} playHover={playHover} />
          {/*
            Cream fade mask — sits inside z-10, covers hero text as About slides over.
            The fixed 3D canvas (z-0) is behind this whole layer so it still shows
            through the semi-transparent About section top.
          */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none h-[20%] md:h-[55%]"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, #F4F0E8 75%)',
              zIndex: 20,
            }}
          />
        </div>
      </div>

      {/*
        COVER / SHEET EFFECT:
        marginTop: -100vh pulls sections up so they start sliding OVER the
        pinned hero at the 100vh scroll mark — cube stays fixed behind them.
        About's rounded-t-3xl + deep shadow gives the "new sheet" depth feel.
      */}
      <div className="relative z-20 pointer-events-auto" style={{ marginTop: '-100vh' }}>
        <AboutSection playHover={playHover} />

        {/*
          DIAGONAL LANES SECTION (What Drives Me & Current Focus):
          Positioned below the main About description.
        */}
        <section className="py-16 px-6 md:px-12 relative overflow-hidden bg-[#F4F0E8]">
          <div className="max-w-6xl mx-auto">
            <DiagonalLanesSection playHover={playHover} />
          </div>
        </section>

        {/*
          FULLSCREEN HORIZONTAL TIMELINE SECTION:
          Positioned right below Current Focus!
        */}
        <div className="relative w-full">
          <JourneySection />
        </div>

        {/*
          INTERACTIVE 3D KNOWLEDGE SPHERE & TECH STACK:
        */}
        <SkillsSection playClick={playClick} playHover={playHover} />

        {/*
          PROJECTS SECTION (Case Files + View More GitHub Chapter):
        */}
        <ProjectsSection playClick={playClick} playHover={playHover} />

        {/*
          EXPERIENCE & LEADERSHIP & AWARDS:
        */}
        <ExperienceSection playHover={playHover} />
        <LeadershipSection playHover={playHover} />
        <AwardsSection playHover={playHover} />

        {/*
          HOBBIES SECTION (Beyond Code):
          Moved to the end right before Contact!
        */}
        <section className="py-24 px-6 md:px-12 relative overflow-hidden bg-[#F4F0E8]">
          <div className="max-w-6xl mx-auto">
            <HobbiesSection playHover={playHover} />
          </div>
        </section>

        <ContactSection playClick={playClick} playHover={playHover} playSuccess={playSuccess} />
        <Footer playClick={playClick} playHover={playHover} />
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useSound } from '@/hooks/useSound';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Preloader } from '@/components/sections/Preloader';
import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection, JourneySection, DiagonalLanesSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { LeadershipSection } from '@/components/sections/LeadershipSection';
import { LearningJourneySection } from '@/components/sections/LearningJourneySection';
import { AwardsSection } from '@/components/sections/AwardsSection';
import { BeyondTheCodeSection } from '@/components/sections/BeyondTheCodeSection';
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

      {/* STICKY HERO ARCHITECTURE */}
      <div className="relative z-10 pointer-events-none" style={{ height: '200vh' }}>
        <div className="sticky top-0 h-screen relative">
          <HeroSection playClick={playClick} playHover={playHover} />
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none h-[20%] md:h-[55%]"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, #F4F0E8 75%)',
              zIndex: 20,
            }}
          />
        </div>
      </div>

      {/* MAIN SECTIONS SHEET OVERLAY */}
      <div className="relative z-20 pointer-events-auto" style={{ marginTop: '-100vh' }}>
        {/* ABOUT & JOURNEY */}
        <AboutSection playHover={playHover} />

        <section className="py-16 px-6 md:px-12 relative overflow-hidden bg-[#F4F0E8]">
          <div className="max-w-6xl mx-auto">
            <DiagonalLanesSection playHover={playHover} />
          </div>
        </section>

        <div className="relative w-full">
          <JourneySection />
        </div>

        {/* 02 / TECH STACK & ECOSYSTEM (5-Card Rainbow Arc Pinning) */}
        <SkillsSection playClick={playClick} playHover={playHover} />

        {/* 03 / LEADERSHIP (LED. BUILT. WON.) */}
        <LeadershipSection playHover={playHover} />

        {/* 04 / THE LEARNING JOURNEY (6 Cinematic Evolution Chapters) */}
        <LearningJourneySection playClick={playClick} playHover={playHover} />

        {/* 05 / CERTIFICATIONS & CREDENTIALS */}
        <AwardsSection playHover={playHover} />

        {/* 06 / BEYOND THE CODE */}
        <BeyondTheCodeSection playHover={playHover} />

        {/* 07 / CONTACT FORM */}
        <ContactSection playClick={playClick} playHover={playHover} playSuccess={playSuccess} />

        {/* 08 / FOOTER */}
        <Footer playClick={playClick} playHover={playHover} />
      </div>
    </main>
  );
}

'use client';

import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { KinematicTextMorph } from '@/components/ui/KinematicTextMorph';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Sparkles } from 'lucide-react';

interface AboutSectionProps {
  playHover: () => void;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── 3D CUBE PARTICLE INSTANCED ATMOSPHERE (POINT 1, 3, 11, 14) ────────────────
function AboutCubeParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 45;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particlesData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      ),
      rotation: new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      speed: 0.2 + Math.random() * 0.4,
      scale: 0.08 + Math.random() * 0.14,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particlesData.forEach((p, i) => {
      // Gentle atmospheric drift around portrait area
      const floatY = Math.sin(time * p.speed + i) * 0.35;
      const floatX = Math.cos(time * p.speed * 0.8 + i) * 0.25;

      // Mouse repulsion response via native R3F pointer
      const mouseDistX = p.position.x - state.pointer.x * 4;
      const mouseDistY = p.position.y - state.pointer.y * 3;
      const dist = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY);

      let repulseX = 0;
      let repulseY = 0;
      if (dist < 2.5) {
        const force = (2.5 - dist) * 0.12;
        repulseX = (mouseDistX / dist) * force;
        repulseY = (mouseDistY / dist) * force;
      }

      dummy.position.set(
        p.position.x + floatX + repulseX,
        p.position.y + floatY + repulseY,
        p.position.z
      );
      dummy.rotation.set(
        p.rotation.x + time * 0.1,
        p.rotation.y + time * 0.15,
        p.rotation.z
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#B85C3B"
        roughness={0.3}
        metalness={0.2}
        transparent
        opacity={0.3}
      />
    </instancedMesh>
  );
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

// ── REPEATABLE MASKED EDITORIAL BIO WITH PARALLAX & STAGGERED METADATA ────────
function PersonalBioSection({ scrollProgress }: { scrollProgress: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });

  // Parallax layer depth translation (Point 8)
  const textY = useTransform(scrollProgress, [0, 1], ['0px', '-25px']);
  const factsY = useTransform(scrollProgress, [0, 1], ['0px', '-40px']);

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto my-14 sm:my-20 px-4 select-none relative z-10">
      {/* 1. Tagline Pill (Point 6) */}
      <div className="overflow-hidden mb-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#B85C3B]/10 text-[#B85C3B] border border-[#B85C3B]/20"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B85C3B]" />
          <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.25em]">
            Building for the web, learning every day.
          </span>
        </motion.div>
      </div>

      {/* 2. Masked Paragraph Reveals (Point 5) */}
      <motion.div style={{ y: textY }} className="space-y-6 mb-16 overflow-hidden">
        <div className="overflow-hidden">
          <motion.p
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-[#25231F] leading-[1.45] font-normal tracking-tight"
          >
            I’m a <span className="text-[#B85C3B] font-semibold italic">Computer Science student</span> and <span className="text-[#B85C3B] font-semibold">frontend developer</span> who enjoys turning ideas into <span className="text-[#B85C3B] italic font-light">clean, interactive web experiences.</span>
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <motion.p
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-[#25231F] leading-[1.45] font-normal tracking-tight"
          >
            I’m currently exploring <span className="text-[#B85C3B] font-semibold">modern frontend technologies</span>, <span className="text-[#B85C3B] italic font-light">3D experiences</span> and <span className="text-[#B85C3B] font-semibold">full-stack development</span> while building projects that turn ideas into something people can actually use.
          </motion.p>
        </div>
      </motion.div>

      {/* 3. 3 Small Facts Metadata Grid (Point 6 - Tiny Horizontal & Depth Reveal) */}
      <motion.div
        style={{ y: factsY }}
        initial={{ opacity: 0, y: 25 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
        transition={{ duration: 0.85, delay: 0.55, ease: EASE }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-[#E2DCD2]/80"
      >
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="space-y-1.5"
        >
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#B85C3B] font-bold">
            BASED IN
          </div>
          <div className="text-sm sm:text-base font-mono font-bold text-[#25231F] tracking-wide">
            NASHIK, INDIA
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="space-y-1.5"
        >
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#B85C3B] font-bold">
            EDUCATION
          </div>
          <div className="text-sm sm:text-base font-mono font-bold text-[#25231F] tracking-wide">
            B.TECH • COMPUTER SCIENCE
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="space-y-1.5"
        >
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#B85C3B] font-bold">
            CURRENTLY
          </div>
          <div className="text-sm sm:text-base font-mono font-bold text-[#25231F] tracking-wide">
            BUILDING + LEARNING
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function WhoIAmSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const { about } = PORTFOLIO_DATA;
  const { whoIAm } = about;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="relative z-10"
    >
      <SubLabel index="01" title="Who I Am" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-5 overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-3xl md:text-4xl font-serif text-[#25231F] leading-snug"
          >
            {whoIAm.headline}
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-10 h-0.5 bg-[#B85C3B]" 
          />
          {whoIAm.paragraphs.map((p, i) => {
            const direction = i % 2 === 0 ? 1 : -1;
            const startX = direction * 60;
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: startX }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: startX }}
                transition={{ duration: 0.8, delay: (i + 1) * 0.15, ease: EASE }}
                className="text-base md:text-lg text-[#787268] font-light leading-relaxed"
              >
                {p}
              </motion.p>
            );
          })}
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          {whoIAm.highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: (i + 2) * 0.1, ease: EASE }}
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

function InteractivePCHero({
  scrollProgress,
}: {
  scrollProgress: any;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { once: false, margin: '-50px' });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring physics for mouse interaction (Point 9: rotateX ±2deg, rotateY ±3deg)
  const springX = useSpring(rawX, { stiffness: 90, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 90, damping: 20 });

  const portraitRotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const portraitRotateX = useTransform(springY, [-0.5, 0.5], [2, -2]);

  // Camera Z-axis & Parallax scroll scrubbing (Point 2, 7, 8, 13)
  const portraitY = useTransform(scrollProgress, [0, 1], ['0px', '-30px']);
  const portraitScale = useTransform(scrollProgress, [0, 0.5, 1], [0.98, 1.0, 0.97]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full pt-2 pb-2 flex flex-col items-center justify-center select-none gap-0 z-10"
    >
      {/* 1. Masked Vertical Reveal Heading (Point 4: Line 1 & Line 2) */}
      <div className="relative z-10 text-center w-full max-w-7xl mx-auto px-4 overflow-hidden pb-2">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ translateY: '100%', opacity: 0 }}
            animate={inView ? { translateY: '0%', opacity: 1 } : { translateY: '100%', opacity: 0 }}
            transition={{ duration: 1.0, ease: EASE }}
            className="text-[12vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[6.5vw] font-serif font-bold leading-none tracking-tight flex flex-col sm:flex-row items-center justify-center gap-y-2 sm:gap-y-0 sm:gap-x-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span className="text-[#25231F]">SHUBHAM</span>
            <span className="text-[#B85C3B]">JADHAV</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 0.8 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="w-full max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-[#B85C3B]/60 to-transparent border-b border-dashed border-[#B85C3B]/40 mt-1"
        />
      </div>

      {/* 2. Portrait Reveal with 3D Z-axis Entrance (Point 2) */}
      <motion.div
        style={{
          rotateX: portraitRotateX,
          rotateY: portraitRotateY,
          y: portraitY,
          scale: portraitScale,
          transformStyle: 'preserve-3d',
          perspective: 1200,
        }}
        className="relative w-full max-w-[640px] sm:max-w-[780px] md:max-w-[880px] group my-4 px-4 cursor-pointer"
      >
        <motion.img
          src="/pc1.png"
          alt={PORTFOLIO_DATA.personal.name}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={inView ? { scale: 1.0, opacity: 1 } : { scale: 1.05, opacity: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        />
      </motion.div>
    </div>
  );
}

// ── MAIN ABOUT SECTION COMPONENT (POINTS 1 TO 15 COMPLIANT) ──────────────────
export function AboutSection({ playHover }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.05 });

  // Scroll Progress tracking for Camera Motion & Parallax scrub (Points 7, 8, 10, 13)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Camera Zoom & Depth Parallax Scrub
  const cameraScale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.96, 1.0, 1.0, 0.97]);
  const sectionElevationY = useTransform(scrollYProgress, [0, 0.25], ['60px', '0px']);

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 1.1, ease: EASE }}
      style={{
        scale: cameraScale,
        y: sectionElevationY,
        background: 'linear-gradient(to bottom, transparent 0%, rgba(244,240,232,0.6) 18%, rgba(244,240,232,0.92) 38%, #F4F0E8 56%)',
      }}
      className="pt-16 md:pt-24 pb-16 px-6 md:px-12 relative overflow-hidden rounded-t-3xl shadow-[0_-20px_80px_rgba(0,0,0,0.18)]"
    >
      {/* 3D Cube Particle Canvas Stage Overlay (Points 1, 3, 11, 14) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          frameloop={isSectionInView ? 'always' : 'demand'}
        >
          <ambientLight intensity={1.2} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#FAF8F3" />
          <pointLight position={[-5, -5, -5]} intensity={1.0} color="#B85C3B" />
          <Suspense fallback={null}>
            <AboutCubeParticles />
          </Suspense>
        </Canvas>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8 md:mb-12">
          <KinematicTextMorph
            category="00 / ABOUT ME"
            text="The person behind the code."
          />
        </div>

        {/* Interactive 3D Portrait Stage */}
        <InteractivePCHero scrollProgress={scrollYProgress} />

        {/* Bio Content & Facts */}
        <PersonalBioSection scrollProgress={scrollYProgress} />

        {/* Detailed Who I Am Grid */}
        <WhoIAmSection />
      </div>
    </motion.section>
  );
}

'use client';

import { useState, useRef, useMemo, useEffect, useCallback, Suspense } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { HeroSculpture } from '@/components/3d/HeroSculpture';
import {
  ShieldCheck,
  Award,
  Sparkles,
  X,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Trophy,
  Star,
  Shield,
  Crown,
  Medal,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Layers,
  Zap,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface AwardsSectionProps {
  playHover: () => void;
  isRevealed?: boolean;
}

const certMobileSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 160 : -160,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 160 : -160,
    opacity: 0,
    scale: 0.94,
  }),
};

function BadgeIcon({ model, className = 'w-4 h-4' }: { model: string; className?: string }) {
  switch (model) {
    case 'trophy':
    case 'Trophy':
      return <Trophy className={className} />;
    case 'star':
    case 'Star':
      return <Star className={className} />;
    case 'shield':
    case 'Shield':
      return <Shield className={className} />;
    case 'crown':
    case 'Crown':
      return <Crown className={className} />;
    case 'medal':
    case 'Medal':
      return <Medal className={className} />;
    default:
      return <Award className={className} />;
  }
}

// ── 3D SPINNING & PARALLAX CERTIFICATE CARD COMPONENT ──────────────────────────
interface CompactCertificateCardProps {
  cert: (typeof PORTFOLIO_DATA.certifications)[0];
  index: number;
  onSelect: (cert: (typeof PORTFOLIO_DATA.certifications)[0]) => void;
  playHover: () => void;
  isRevealed?: boolean;
}

function CompactCertificateCard({ cert, index, onSelect, playHover, isRevealed = true }: CompactCertificateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { damping: 20, stiffness: 250 });
  const rotateY = useSpring(rawRotateY, { damping: 20, stiffness: 250 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate dynamic 3D tilt rotation (-12deg to +12deg)
    const rY = ((mouseX - width / 2) / (width / 2)) * 12;
    const rX = -((mouseY - height / 2) / (height / 2)) * 12;

    rawRotateX.set(rX);
    rawRotateY.set(rY);
    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.55,
    });
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
      onClick={() => onSelect(cert)}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        y: -10,
        scale: 1.03,
        boxShadow: '0 25px 50px -12px rgba(181, 93, 61, 0.32)',
      }}
      transition={{
        rotateX: { type: 'spring', stiffness: 350, damping: 22 },
        rotateY: { type: 'spring', stiffness: 350, damping: 22 },
        scale: { duration: 0.25 },
        y: { duration: 0.25 },
      }}
      className="group relative rounded-2xl bg-[#FCFAF6] border border-[#E2DCD2] hover:border-[#B55D3D] p-5 cursor-pointer transition-colors duration-300 select-none flex flex-col justify-between overflow-hidden shadow-sm"
    >
      {/* Dynamic 3D Glare Light Reflection Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-20"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.85) 0%, rgba(181, 93, 61, 0.22) 40%, transparent 80%)`,
        }}
      />

      {/* Top Accent Line */}
      <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#B55D3D] to-transparent rounded-b-full opacity-40 group-hover:opacity-100 transition-opacity" />

      {/* Holographic Watermark Background Icon */}
      <div className="absolute -right-6 -bottom-6 text-[#E2DCD2]/30 group-hover:text-[#B55D3D]/18 transition-colors pointer-events-none transform -rotate-12 group-hover:scale-125 group-hover:rotate-0 transition-all duration-500">
        <BadgeIcon model={cert.badgeModel} className="w-32 h-32" />
      </div>

      <div className="space-y-3 relative z-10">
        {/* Header Strip */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E2DCD2]/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#23201C] text-[#FCFAF6] flex items-center justify-center font-bold text-xs group-hover:bg-[#B55D3D] group-hover:rotate-[360deg] transition-all duration-500 shadow-md">
              <BadgeIcon model={cert.badgeModel} className="w-3.5 h-3.5 text-[#FCFAF6]" />
            </div>
            <span className="text-xs font-mono font-bold text-[#23201C] uppercase tracking-wider">
              {cert.organization}
            </span>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-[#B55D3D]/10 text-[#B55D3D] border border-[#B55D3D]/20 font-bold">
            {cert.year}
          </span>
        </div>

        {/* Certificate Title & Subject */}
        <div>
          <div className="text-[9px] font-mono text-[#B55D3D] uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#B55D3D]" />
            <span>{cert.category}</span>
          </div>
          <h3 className="text-base md:text-lg font-serif font-bold text-[#23201C] group-hover:text-[#B55D3D] transition-colors leading-snug">
            {cert.title}
          </h3>
          <p className="text-xs text-[#787268] font-light leading-relaxed line-clamp-2 mt-1.5">
            {cert.description}
          </p>
        </div>

        {/* Skills Tag Pills */}
        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {cert.skills.slice(0, 3).map((skill: string) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-[#E2DCD2]/40 text-[#23201C] border border-[#E2DCD2] font-semibold group-hover:border-[#B55D3D]/40 transition-colors"
              >
                {skill}
              </span>
            ))}
            {cert.skills.length > 3 && (
              <span className="text-[9px] font-mono text-[#787268] font-bold self-center">
                +{cert.skills.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#E2DCD2]/70 flex items-center justify-between mt-4 relative z-10">
        <div className="flex items-center gap-1 text-[9px] font-mono text-[#787268] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8A2E2B]" />
          <span>ID: {cert.credentialId}</span>
        </div>

        <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#B55D3D] group-hover:translate-x-1 transition-transform uppercase">
          <span>INSPECT</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}



// ── THREE.JS WEBGL RUBIK'S CUBE CUTSCENE (FULL SCREEN 3D CANVAS WITH PARTICLES) ──
function ThreeJsRubiksCubeCutscene({ onComplete }: { onComplete: () => void }) {
  const handleComplete = useCallback(() => {
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.start();
    }
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Lock Lenis scroll while 3D cube is open so viewport stays fixed
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.stop();
    }

    return () => {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [handleComplete]);

  return (
    <div className="fixed inset-0 pointer-events-auto z-[9999] flex items-center justify-center overflow-hidden bg-[#FAF8F3]">
      {/* Volumetric background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-radial from-[#B85C3B]/30 via-[#D4AF37]/18 to-transparent blur-3xl pointer-events-none animate-pulse" />

      {/* Dynamic Floating 3D Energy Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: (i * 4.2) % 100 + 'vw',
              y: (i * 7.1) % 100 + 'vh',
              opacity: 0.3,
              scale: 0.5,
            }}
            animate={{
              y: ['-20px', '25px', '-20px'],
              x: ['-15px', '20px', '-15px'],
              opacity: [0.2, 0.9, 0.2],
              scale: [0.4, 1.2, 0.4],
            }}
            transition={{
              duration: 2.8 + (i % 3) * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i % 6) * 0.25,
            }}
            className="absolute rounded-full shadow-[0_0_16px_#B85C3B]"
            style={{
              width: i % 2 === 0 ? '8px' : '5px',
              height: i % 2 === 0 ? '8px' : '5px',
              backgroundColor: i % 3 === 0 ? '#B85C3B' : i % 2 === 0 ? '#D4AF37' : '#8E9A78',
            }}
          />
        ))}
      </div>

      {/* Status Badge Tag */}
      <div className="absolute top-10 md:top-14 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-[#25231F]/90 text-[#FCFAF6] border border-[#B85C3B]/40 text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] flex items-center gap-2.5 shadow-2xl backdrop-blur-md z-30 select-none">
        <Sparkles className="w-3.5 h-3.5 text-[#B85C3B] animate-spin" />
        <span>SOLVING ARCHITECTURAL CUBE &amp; DECRYPTING VAULT</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full relative z-20"
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} color="#FFFFFF" />
        <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#B55D3D" />

        <Suspense fallback={null}>
          <HeroSculpture
            skipScatter={true}
            onSolveComplete={handleComplete}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// ── MAIN CERTIFICATE SECTION ──────────────────────────────────────────────────
export function AwardsSection({ playHover, isRevealed = true }: AwardsSectionProps) {
  const { certifications } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<(typeof certifications)[0] | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  const [mobileCertIndex, setMobileCertIndex] = useState<number>(0);
  const [mobileCertDirection, setMobileCertDirection] = useState<number>(0);
  const [mobileViewMode, setMobileViewMode] = useState<'carousel' | 'grid'>('carousel');

  const handlePrevMobileCert = () => {
    setMobileCertDirection(-1);
    setMobileCertIndex((prev) => (prev === 0 ? filteredCerts.length - 1 : prev - 1));
    playHover();
  };

  const handleNextMobileCert = () => {
    setMobileCertDirection(1);
    setMobileCertIndex((prev) => (prev === filteredCerts.length - 1 ? 0 : prev + 1));
    playHover();
  };

  const handleSelectMobileCategory = (cat: string) => {
    setSelectedCategory(cat);
    setShowAll(false);
    setMobileCertIndex(0);
    setMobileCertDirection(0);
    playHover();
  };

  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(certifications.map((c) => c.category)));
    return ['All', ...cats];
  }, [certifications]);

  const filteredCerts = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All' || selectedCategory === 'ALL') return certifications;
    return certifications.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [certifications, selectedCategory]);

  const [cutsceneState, setCutsceneState] = useState<'IDLE' | 'PLAYING' | 'FINISHED'>('IDLE');

  // Permanent Every-Visit Scroll Observer: Trigger 3D Rubik's Cube cutscene EVERY TIME section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let isCurrentlyInView = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isCurrentlyInView) {
          isCurrentlyInView = true;
          setCutsceneState('PLAYING');
        } else if (!entry.isIntersecting && isCurrentlyInView) {
          isCurrentlyInView = false;
          setCutsceneState('IDLE');
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Listen for navbar click event to re-trigger cutscene when navigating to #certificates
  useEffect(() => {
    const handleNavTrigger = (e: CustomEvent) => {
      if (e.detail?.href === '#certificates') {
        setCutsceneState('PLAYING');
      }
    };

    window.addEventListener('shatter-travel-destination' as any, handleNavTrigger as any);
    return () => {
      window.removeEventListener('shatter-travel-destination' as any, handleNavTrigger as any);
    };
  }, []);

  const handleCutsceneComplete = useCallback(() => {
    setCutsceneState('FINISHED');
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.start();
    }
  }, []);

  const visibleCerts = useMemo(() => {
    if (showAll) return filteredCerts;
    return filteredCerts.slice(0, 4);
  }, [filteredCerts, showAll]);

  const handleCopyCredential = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2200);
  };

  return (
    <section
      ref={sectionRef as any}
      className="pt-20 md:pt-28 pb-20 px-4 sm:px-6 md:px-12 bg-[#F4F0E8] text-[#23201C] relative overflow-hidden select-none border-t border-[#E2DCD2]"
    >
      {/* Three.js WebGL Rubik's Cube Full Screen 3D Cutscene with smooth AnimatePresence crossfade */}
      <AnimatePresence>
        {cutsceneState === 'PLAYING' && (
          <motion.div
            key="rubiks-cutscene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 pointer-events-auto z-[9999]"
          >
            <ThreeJsRubiksCubeCutscene onComplete={handleCutsceneComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 border-b border-[#E2DCD2] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#B55D3D] uppercase mb-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#B55D3D]" />
              <span>05 / OFFICIAL CERTIFICATIONS &amp; CREDENTIALS</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#23201C] leading-none tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              ACADEMIC <span className="italic font-normal text-[#B55D3D]">CERTIFICATES</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs font-mono text-[#787268] uppercase tracking-widest font-bold shrink-0">
            <button
              onClick={() => {
                playHover();
                setCutsceneState('PLAYING');
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#B55D3D]/10 text-[#B55D3D] border border-[#B55D3D]/30 hover:bg-[#B55D3D] hover:text-[#FCFAF6] transition-all duration-300 flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
              title="Launch 3D Rubik's Cube Decryption"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B55D3D]" />
              <span>LAUNCH 3D CUBE DECRYPTION</span>
            </button>

            <div className="flex items-center gap-2 text-[#B55D3D] justify-end">
              <Award className="w-4 h-4 text-[#8A2E2B]" />
              <span>{certifications.length} VERIFIED CREDENTIAL SIGNALS</span>
            </div>
          </div>
        </motion.div>

        {/* ── DESKTOP VIEW (MD+ SCREENS) ─────────────────────────────────── */}
        <div className="hidden md:block">
          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowAll(false);
                  }}
                  onMouseEnter={playHover}
                  className={`relative px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                    isActive
                      ? 'text-[#FCFAF6]'
                      : 'text-[#787268] hover:text-[#23201C] bg-[#FCFAF6] border border-[#E2DCD2]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeVaultTab"
                      className="absolute inset-0 rounded-full bg-[#23201C]"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </motion.div>

          {/* 3D Spinning Entrance Cards Grid */}
          <div className="perspective-[1200px]">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <AnimatePresence mode="popLayout">
                {visibleCerts.map((cert, index) => (
                  <CompactCertificateCard
                    key={cert.id}
                    cert={cert}
                    index={index}
                    onSelect={(c) => setSelectedCert(c)}
                    playHover={playHover}
                    isRevealed={isRevealed}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* View More Action Bar */}
          {filteredCerts.length > 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 text-center flex flex-col items-center justify-center gap-3"
            >
              <div className="text-[10px] font-mono text-[#787268] font-bold uppercase tracking-widest">
                SHOWING {visibleCerts.length} OF {filteredCerts.length} CREDENTIALS
              </div>

              <button
                onClick={() => {
                  setShowAll((prev) => !prev);
                  playHover();
                }}
                onMouseEnter={playHover}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#23201C] text-[#FCFAF6] hover:bg-[#B55D3D] transition-all duration-300 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B55D3D] group-hover:text-white transition-colors" />
                  {showAll ? 'COLLAPSE CREDENTIALS' : `VIEW MORE CERTIFICATES (+${filteredCerts.length - 4})`}
                </span>
                {showAll ? (
                  <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                )}
              </button>
            </motion.div>
          )}
        </div>

        {/* ── MOBILE TOUCH-FRIENDLY VIEW (MOBILE ONLY: MD:HIDDEN) ─────────── */}
        <div className="block md:hidden space-y-4">
          {/* Mobile Category Quick Filter Tabs & View Mode Switcher */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex overflow-x-auto gap-1.5 py-1 no-scrollbar scroll-smooth flex-1 pr-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleSelectMobileCategory(cat)}
                    className={`flex-none px-3 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1 border ${
                      isSelected
                        ? 'bg-[#23201C] text-[#FCFAF6] border-[#23201C] shadow-md scale-105'
                        : 'bg-[#FCFAF6] text-[#787268] border-[#E2DCD2] active:scale-95'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                playHover();
                setMobileViewMode((prev) => (prev === 'carousel' ? 'grid' : 'carousel'));
              }}
              className="flex-none p-2 rounded-full bg-[#FCFAF6] border border-[#E2DCD2] text-[#23201C] active:scale-95 shadow-xs flex items-center justify-center"
              title="Toggle Deck / Grid view"
            >
              {mobileViewMode === 'carousel' ? (
                <LayoutGrid className="w-4 h-4 text-[#B55D3D]" />
              ) : (
                <Layers className="w-4 h-4 text-[#B55D3D]" />
              )}
            </button>
          </div>

          {filteredCerts.length === 0 ? (
            <div className="p-8 text-center bg-[#FCFAF6] rounded-2xl border border-[#E2DCD2] text-xs font-mono text-[#787268]">
              No credentials found for this category.
            </div>
          ) : mobileViewMode === 'carousel' ? (
            <div className="relative max-w-sm mx-auto">
              {/* Active Animated Certificate Stage */}
              <div className="relative min-h-[350px] flex items-center justify-center">
                <AnimatePresence mode="wait" custom={mobileCertDirection}>
                  {(() => {
                    const currentCert = filteredCerts[mobileCertIndex] || filteredCerts[0];
                    if (!currentCert) return null;

                    return (
                      <motion.div
                        key={currentCert.id}
                        custom={mobileCertDirection}
                        variants={certMobileSlideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, { offset }) => {
                          if (offset.x < -40) {
                            handleNextMobileCert();
                          } else if (offset.x > 40) {
                            handlePrevMobileCert();
                          }
                        }}
                        className="w-full rounded-3xl bg-[#FCFAF6] border border-[#E2DCD2] shadow-xl p-5 flex flex-col justify-between relative overflow-hidden select-none active:cursor-grabbing touch-pan-y"
                      >
                        {/* Decorative Top Gradient Line */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B55D3D] via-[#8E9A78] to-[#23201C]" />

                        {/* Background Holographic Watermark Badge */}
                        <div className="absolute -right-4 -bottom-4 text-[#E2DCD2]/40 pointer-events-none transform -rotate-12">
                          <BadgeIcon model={currentCert.badgeModel} className="w-28 h-28" />
                        </div>

                        <div className="relative z-10 space-y-3">
                          {/* Header Strip */}
                          <div className="flex items-center justify-between pb-2 border-b border-[#E2DCD2]">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-[#23201C] text-[#FCFAF6] flex items-center justify-center font-bold text-xs shadow-md">
                                <BadgeIcon model={currentCert.badgeModel} className="w-3.5 h-3.5 text-[#FCFAF6]" />
                              </div>
                              <span className="text-xs font-mono font-bold text-[#23201C] uppercase tracking-wider">
                                {currentCert.organization}
                              </span>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-[#B55D3D]/10 text-[#B55D3D] border border-[#B55D3D]/20 font-bold">
                              {currentCert.year}
                            </span>
                          </div>

                          {/* Category Tag & Title */}
                          <div>
                            <div className="text-[9px] font-mono text-[#B55D3D] uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3 text-[#B55D3D]" />
                              <span>{currentCert.category}</span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[#23201C] leading-snug">
                              {currentCert.title}
                            </h3>
                            <p className="text-xs text-[#787268] font-light leading-relaxed line-clamp-2 mt-1.5">
                              {currentCert.description}
                            </p>
                          </div>

                          {/* Skills Pills */}
                          {currentCert.skills && currentCert.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {currentCert.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-[#E2DCD2]/40 text-[#23201C] border border-[#E2DCD2] font-semibold"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Card Footer Action */}
                        <div className="pt-3 border-t border-[#E2DCD2] mt-4 relative z-10 space-y-3">
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#787268]">
                            <span className="flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#8A2E2B]" />
                              <span>ID: {currentCert.credentialId}</span>
                            </span>
                            <span className="text-[#B55D3D] font-mono">
                              {mobileCertIndex + 1} / {filteredCerts.length}
                            </span>
                          </div>

                          <button
                            onClick={() => setSelectedCert(currentCert)}
                            className="w-full py-3 px-4 rounded-2xl bg-[#23201C] text-[#FCFAF6] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:bg-[#B55D3D] transition-colors shadow-md cursor-pointer"
                          >
                            <span>Inspect Credential Details</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#B55D3D]" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>

              {/* Navigation Controls & Progress Dots */}
              <div className="flex items-center justify-between mt-4 px-2">
                <button
                  onClick={handlePrevMobileCert}
                  className="p-2.5 rounded-full bg-[#FCFAF6] border border-[#E2DCD2] text-[#23201C] active:scale-90 transition-transform shadow-xs cursor-pointer"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Progress Indicators */}
                <div className="flex items-center gap-1.5 max-w-[180px] overflow-x-auto py-1 no-scrollbar">
                  {filteredCerts.map((c, idx) => {
                    const isActive = idx === mobileCertIndex;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          setMobileCertDirection(idx > mobileCertIndex ? 1 : -1);
                          setMobileCertIndex(idx);
                          playHover();
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          isActive ? 'w-6 bg-[#B55D3D]' : 'w-2 bg-[#E2DCD2]'
                        }`}
                        aria-label={`Go to certificate ${idx + 1}`}
                      />
                    );
                  })}
                </div>

                <button
                  onClick={handleNextMobileCert}
                  className="p-2.5 rounded-full bg-[#FCFAF6] border border-[#E2DCD2] text-[#23201C] active:scale-90 transition-transform shadow-xs cursor-pointer"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Gesture Hint */}
              <div className="text-center mt-3 text-[9px] font-mono text-[#787268] uppercase tracking-widest">
                Swipe card left or right to switch certificates
              </div>
            </div>
          ) : (
            /* Grid View Fallback */
            <div className="space-y-3 max-w-sm mx-auto">
              {filteredCerts.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  onClick={() => setSelectedCert(cert)}
                  className="rounded-2xl bg-[#FCFAF6] border border-[#E2DCD2] p-4 cursor-pointer active:scale-[0.98] transition-all shadow-sm flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#23201C] text-[#FCFAF6] flex items-center justify-center text-xs shrink-0 font-bold">
                      <BadgeIcon model={cert.badgeModel} className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-serif font-bold text-[#23201C] leading-snug">{cert.title}</h4>
                      <span className="text-[9px] font-mono text-[#787268] uppercase">{cert.organization} • {cert.year}</span>
                    </div>
                  </div>
                  <div className="p-1.5 rounded-full border border-[#E2DCD2] text-[#B55D3D] bg-[#F4F0E8] shrink-0">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── HIGH-PRECISION 3D DETAIL FOCUS MODAL ─────────────────────────────── */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-[#23201C]/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotateY: -75, y: 30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotateY: 75, y: 30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full p-6 md:p-8 rounded-3xl bg-[#FCFAF6] text-[#23201C] border-2 border-[#B55D3D]/40 shadow-2xl relative overflow-hidden my-auto border-double"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Close Modal Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#23201C] text-[#FCFAF6] hover:bg-[#B55D3D] transition-colors flex items-center justify-center cursor-pointer shadow-md z-30"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-2 border-[#E2DCD2] p-6 sm:p-8 rounded-2xl relative bg-[#FAF8F3] shadow-inner overflow-hidden">
                {/* Background Watermark Seal */}
                <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
                  <BadgeIcon model={selectedCert.badgeModel} className="w-64 h-64 text-[#23201C]" />
                </div>

                {/* Header Info */}
                <div className="text-center space-y-2 pb-5 border-b border-[#E2DCD2] relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#B55D3D]/12 text-[#B55D3D] flex items-center justify-center mx-auto mb-1 border border-[#B55D3D]/30 shadow-md">
                    <BadgeIcon model={selectedCert.badgeModel} className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B55D3D] font-bold flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B55D3D]" />
                    <span>OFFICIAL VERIFIED CREDENTIAL</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#23201C]">
                    {selectedCert.title}
                  </h3>
                  <div className="text-xs font-mono text-[#787268] uppercase tracking-wider font-semibold">
                    ISSUED BY: <span className="text-[#23201C] font-bold">{selectedCert.organization}</span>
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="text-center py-6 space-y-2 relative z-10">
                  <div className="text-[10px] font-mono text-[#787268] uppercase tracking-widest font-semibold">
                    THIS CREDENTIAL OFFICIALLY CERTIFIES THAT
                  </div>
                  <div className="text-2xl sm:text-4xl font-serif font-bold italic text-[#B55D3D]">
                    Shubham Jadhav
                  </div>
                  <p className="text-xs text-[#787268] font-light max-w-lg mx-auto pt-1 leading-relaxed">
                    {selectedCert.description}
                  </p>

                  {/* Skill Badges Matrix */}
                  {selectedCert.skills && selectedCert.skills.length > 0 && (
                    <div className="pt-3 flex flex-wrap justify-center gap-1.5">
                      {selectedCert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-[#E2DCD2]/50 text-[#23201C] border border-[#E2DCD2] font-bold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Credential Seal & Verification Grid */}
                <div className="pt-5 border-t border-[#E2DCD2] grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-center sm:text-left relative z-10">
                  <div>
                    <div className="text-[9px] font-mono text-[#787268] uppercase font-bold">
                      CREDENTIAL ID HASH
                    </div>
                    <div className="text-xs font-mono font-bold text-[#23201C] flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                      <span>{selectedCert.credentialId}</span>
                      <button
                        onClick={() => handleCopyCredential(selectedCert.credentialId)}
                        className="p-1 text-[#B55D3D] hover:text-[#23201C] transition-colors cursor-pointer"
                        title="Copy Credential ID"
                      >
                        {copiedId ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    {copiedId && (
                      <div className="text-[9px] font-mono text-green-700 font-bold">COPIED TO CLIPBOARD!</div>
                    )}
                  </div>

                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-[#B55D3D] text-white flex items-center justify-center mx-auto mb-1 font-bold text-xs shadow-md">
                      ✓
                    </div>
                    <div className="text-[8px] font-mono text-[#B55D3D] uppercase font-bold tracking-wider">
                      CHAMPAGNE VERIFIED SEAL
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <div className="text-[9px] font-mono text-[#787268] uppercase font-bold">ISSUE STATUS</div>
                    <div className="text-xs font-mono font-bold text-[#23201C]">
                      {selectedCert.year} · ACTIVE VERIFIED SIGNAL
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-5 relative z-10">
                {selectedCert.verifyUrl ? (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#B55D3D] text-[#B55D3D] hover:bg-[#B55D3D] hover:text-white transition-all text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <span>VERIFY ON OFFICIAL PORTAL</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div />
                )}

                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-2 rounded-full bg-[#23201C] text-[#FCFAF6] hover:bg-[#B55D3D] transition-colors text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  CLOSE PREVIEW
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

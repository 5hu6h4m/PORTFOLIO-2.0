'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { ShieldCheck, Award, Sparkles, X, ExternalLink, FileCheck, Lock, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface AwardsSectionProps {
  playHover: () => void;
}

// ── 3D FLOATING RUBIK CUBE PIECES STAGE ───────────────────────────────────────
function VaultCubeParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 75;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Distribute pieces across sides (left/right) and center spaces
      let x = 0;
      if (i % 3 === 0) x = -5.5 - Math.random() * 4.5; // Left margin
      else if (i % 3 === 1) x = 5.5 + Math.random() * 4.5; // Right margin
      else x = (Math.random() - 0.5) * 6; // Center spaces

      return {
        x,
        y: (Math.random() - 0.5) * 9,
        z: (Math.random() - 0.5) * 5,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        scale: 0.18 + Math.random() * 0.32,
        speed: 0.15 + Math.random() * 0.35,
      };
    });
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(time * p.speed + i) * 0.45,
        p.y + Math.cos(time * p.speed * 0.8 + i) * 0.45,
        p.z + Math.sin(time * p.speed * 0.5 + i) * 0.3
      );
      dummy.rotation.set(
        p.rotX + time * 0.25,
        p.rotY + time * 0.35,
        time * 0.15
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.45, 0.45, 0.45]} />
      <meshStandardMaterial
        color="#B55D3D"
        roughness={0.25}
        metalness={0.5}
        transparent
        opacity={0.5}
      />
    </instancedMesh>
  );
}

// ── DOM FLOATING CUBE ACCENTS (THEME RELATABLE PIECES) ────────────────────────
function FloatingSideCubes() {
  const cubeAccents = [
    { top: '12%', left: '2%', size: 'w-10 h-10', color: 'bg-[#B55D3D]/15 border-[#B55D3D]/40', delay: 0 },
    { top: '28%', right: '3%', size: 'w-12 h-12', color: 'bg-[#23201C]/10 border-[#23201C]/30', delay: 0.8 },
    { top: '54%', left: '4%', size: 'w-14 h-14', color: 'bg-[#B55D3D]/20 border-[#B55D3D]/50', delay: 1.5 },
    { top: '72%', right: '2.5%', size: 'w-10 h-10', color: 'bg-[#8A2E2B]/15 border-[#8A2E2B]/40', delay: 0.4 },
    { top: '42%', right: '12%', size: 'w-8 h-8', color: 'bg-[#B55D3D]/10 border-[#B55D3D]/30', delay: 1.2 },
    { top: '85%', left: '8%', size: 'w-11 h-11', color: 'bg-[#23201C]/15 border-[#23201C]/40', delay: 1.8 },
  ];

  return (
    <>
      {cubeAccents.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.size} rounded-xl border backdrop-blur-md pointer-events-none z-10 shadow-lg ${c.color}`}
          style={{ top: c.top, left: c.left, right: c.right }}
          animate={{
            y: [-12, 12, -12],
            rotate: [0, 45, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: c.delay,
          }}
        >
          {/* Internal bevel cube face lines */}
          <div className="w-full h-full p-1 flex items-center justify-center opacity-60">
            <div className="w-full h-full border border-dashed border-[#B55D3D]/40 rounded-lg" />
          </div>
        </motion.div>
      ))}
    </>
  );
}

// ── LUXURIOUS FLOATING GLASS DOCUMENT CARD ────────────────────────────────────
interface GlassDocumentProps {
  cert: typeof PORTFOLIO_DATA.certifications[0];
  index: number;
  onSelect: (cert: typeof PORTFOLIO_DATA.certifications[0]) => void;
  playHover: () => void;
}

function FloatingGlassDocument({ cert, index, onSelect, playHover }: GlassDocumentProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Spring Mouse Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 220, damping: 20 });
  
  // Reflection Light Overlay Translation
  const reflectX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      layout
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
      onClick={() => onSelect(cert)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl bg-[#FCFAF6]/90 backdrop-blur-xl border border-[#B55D3D]/30 shadow-[0_20px_50px_rgba(35,32,28,0.08)] p-7 md:p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:border-[#B55D3D] hover:shadow-[0_30px_70px_rgba(181,93,61,0.18)] select-none flex flex-col justify-between min-h-[360px]"
    >
      {/* Dynamic Champagne Light Reflection Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF8F3]/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ x: reflectX, transform: 'skewX(-20deg)' }}
      />

      {/* Top Metallic Champagne Border Accent */}
      <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-[#B55D3D] to-transparent rounded-b-full opacity-60 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Certificate Issuer Strip */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E2DCD2]/80 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#23201C] text-[#FCFAF6] flex items-center justify-center font-serif font-bold text-xs shadow-md group-hover:bg-[#B55D3D] transition-colors">
              <Award className="w-4 h-4 text-[#FCFAF6]" />
            </div>
            <span className="text-xs font-mono font-bold text-[#23201C] uppercase tracking-wider">
              {cert.organization}
            </span>
          </div>
          
          <span className="px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B55D3D]/12 text-[#B55D3D] border border-[#B55D3D]/25 font-bold shadow-2xs">
            {cert.year}
          </span>
        </div>

        {/* Certificate Title & Subject */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#B55D3D] uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VAULT DOCUMENT // {cert.category}</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#23201C] group-hover:text-[#B55D3D] transition-colors leading-snug">
            {cert.title}
          </h3>
          
          <p className="text-xs md:text-sm text-[#787268] font-light leading-relaxed pt-1">
            {cert.description}
          </p>
        </div>
      </div>

      {/* Bottom Verification Seal Footer */}
      <div className="pt-6 border-t border-[#E2DCD2]/80 flex items-center justify-between mt-4">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#787268] font-bold">
          <ShieldCheck className="w-4 h-4 text-[#8A2E2B]" />
          <span>ID: {cert.credentialId}</span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#23201C] text-[#FCFAF6] group-hover:bg-[#B55D3D] transition-colors text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm">
          <span>INSPECT VAULT SIGNAL</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN CREDENTIAL VAULT SECTION ─────────────────────────────────────────────
export function AwardsSection({ playHover }: AwardsSectionProps) {
  const { certifications } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const categories = ['ALL', 'Full-Stack Engineering', 'Frontend Architecture', 'Algorithmic Systems', 'Cloud & Infrastructure'];

  const filteredCerts = useMemo(() => {
    if (selectedCategory === 'ALL') return certifications;
    return certifications.filter((c) => c.category.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 5)));
  }, [certifications, selectedCategory]);

  return (
    <section id="certifications" ref={sectionRef} className="py-28 px-6 md:px-12 bg-[#F7F3EC] text-[#23201C] relative overflow-hidden select-none">
      {/* Anchor targets for #certificates & #achievements nav links */}
      <div id="certificates" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />
      <div id="achievements" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />

      {/* Floating Theme Cube Pieces (Left, Right & Interspersed) */}
      <FloatingSideCubes />

      {/* Fullscreen 3D Ambient Cube Particles Stage */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <VaultCubeParticles />
          </Float>
        </Canvas>
      </div>

      {/* Volumetric Warm Ambient Spotlights */}
      <div className="absolute top-1/4 left-10 w-[650px] h-[650px] bg-[#B55D3D]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-[#8A2E2B]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 border-b border-[#E2DCD2] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#B55D3D] uppercase mb-2 font-bold">
              <Lock className="w-4 h-4 text-[#B55D3D]" />
              <span>06 / THE CREDENTIAL VAULT — ARCHIVAL SIGNALS</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#23201C] leading-none tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              CREDENTIAL <span className="italic font-normal text-[#B55D3D]">VAULT</span>
            </h2>
          </div>

          <div className="text-right text-xs font-mono text-[#787268] uppercase tracking-widest font-bold shrink-0">
            <div className="flex items-center gap-2 text-[#B55D3D] justify-end">
              <ShieldCheck className="w-4 h-4 text-[#8A2E2B]" />
              <span>4 VERIFIED SIGNALS ASSEMBLED</span>
            </div>
          </div>
        </motion.div>

        {/* ── CATEGORY FILTER TABS ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 md:gap-3 mb-12"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                onMouseEnter={playHover}
                className={`relative px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                  isActive ? 'text-[#FCFAF6]' : 'text-[#787268] hover:text-[#23201C] bg-[#FCFAF6] border border-[#E2DCD2]'
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

        {/* ── STAGGERED FLOATING GLASS DOCUMENTS ARCHIVE ───────────────────── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <FloatingGlassDocument
                key={cert.id}
                cert={cert}
                index={index}
                onSelect={(c) => setSelectedCert(c)}
                playHover={playHover}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* ── HIGH-PRECISION DETAIL FOCUS VAULT MODAL ───────────────────────── */}
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
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full p-8 md:p-12 rounded-3xl bg-[#FCFAF6] text-[#23201C] border-2 border-[#B55D3D]/40 shadow-2xl relative overflow-hidden my-auto border-double"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#23201C] text-[#FCFAF6] hover:bg-[#B55D3D] transition-colors flex items-center justify-center cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Border Frame */}
              <div className="border-2 border-[#E2DCD2] p-6 sm:p-10 rounded-2xl relative bg-[#FAF8F3] shadow-inner">
                {/* Top Certificate Header */}
                <div className="text-center space-y-3 pb-6 border-b border-[#E2DCD2]">
                  <div className="w-12 h-12 rounded-full bg-[#B55D3D]/12 text-[#B55D3D] flex items-center justify-center mx-auto mb-2 border border-[#B55D3D]/30 shadow-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono tracking-[0.3em] uppercase text-[#B55D3D] font-bold">
                    OFFICIAL VAULT VERIFIED CREDENTIAL
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-serif font-bold text-[#23201C]">
                    {selectedCert.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-[#787268] uppercase tracking-wider font-semibold">
                    ISSUED BY: <span className="text-[#23201C] font-bold">{selectedCert.organization}</span>
                  </div>
                </div>

                {/* Recipient Line */}
                <div className="text-center py-8 space-y-2">
                  <div className="text-xs font-mono text-[#787268] uppercase tracking-widest font-semibold">
                    THIS CREDENTIAL CERTIFIES THAT
                  </div>
                  <div className="text-3xl sm:text-5xl font-serif font-bold italic text-[#B55D3D]">
                    Shubham Jadhav
                  </div>
                  <p className="text-xs sm:text-sm text-[#787268] font-light max-w-lg mx-auto pt-2 leading-relaxed">
                    Has successfully passed all architectural evaluations and practical requirements in {selectedCert.category} for the year {selectedCert.year}.
                  </p>
                </div>

                {/* Bottom Signature & Credential ID Strip */}
                <div className="pt-6 border-t border-[#E2DCD2] grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center sm:text-left">
                  <div>
                    <div className="text-[10px] font-mono text-[#787268] uppercase font-bold">CREDENTIAL VERIFICATION HASH</div>
                    <div className="text-xs font-mono font-bold text-[#23201C]">{selectedCert.credentialId}</div>
                  </div>

                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-[#B55D3D] text-white flex items-center justify-center mx-auto mb-1 font-bold text-xs shadow-md">
                      ✓
                    </div>
                    <div className="text-[9px] font-mono text-[#B55D3D] uppercase font-bold">OFFICIAL CHAMPAGNE SEAL</div>
                  </div>

                  <div className="sm:text-right">
                    <div className="text-[10px] font-mono text-[#787268] uppercase font-bold">ISSUE STATUS</div>
                    <div className="text-xs font-mono font-bold text-[#23201C]">{selectedCert.year} · ACTIVE SIGNAL</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-2.5 rounded-full bg-[#23201C] text-[#FCFAF6] hover:bg-[#B55D3D] transition-colors text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  RETURN TO VAULT
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

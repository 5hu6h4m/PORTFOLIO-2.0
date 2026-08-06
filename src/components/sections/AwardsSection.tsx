'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ShieldCheck, Award, Sparkles, X, ExternalLink, Lock, CheckCircle2, Box, Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface AwardsSectionProps {
  playHover: () => void;
}

// ── 3D INTERACTIVE 3x3 RUBIK'S CUBE ASSEMBLY (PARTICLES FALL & ASSEMBLE) ───
function Rubik3x3Assembly() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Build 27 cubelets for a complete 3x3x3 Rubik's Cube grid
  const cubelets = useMemo(() => {
    const list = [];
    const colors = ['#B55D3D', '#23201C', '#FAF8F3', '#8A2E2B', '#E2DCD2'];
    let id = 0;
    
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          list.push({
            id: id++,
            targetPos: [x * 0.78, y * 0.78, z * 0.78] as [number, number, number],
            startPos: [
              (Math.random() - 0.5) * 8,
              7 + Math.random() * 6, // Rain down from above
              (Math.random() - 0.5) * 6
            ] as [number, number, number],
            color: colors[Math.abs(x + y + z) % colors.length],
            delay: Math.random() * 2.5,
          });
        }
      }
    }
    return list;
  }, []);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle continuous 3D rotation of assembled 3x3 Rubik's Cube
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.25;
    }

    const t = state.clock.getElapsedTime();

    cubelets.forEach((c, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      // Particle convergence progress (loops smoothly every 6 seconds)
      const loopTime = (t + c.delay) % 6;
      const progress = Math.min(1, loopTime / 2.2);

      // Smooth cubic ease out assembly interpolation from sky particle -> 3x3 target grid
      const easeP = 1 - Math.pow(1 - progress, 3);

      mesh.position.x = THREE.MathUtils.lerp(c.startPos[0], c.targetPos[0], easeP);
      mesh.position.y = THREE.MathUtils.lerp(c.startPos[1], c.targetPos[1], easeP);
      mesh.position.z = THREE.MathUtils.lerp(c.startPos[2], c.targetPos[2], easeP);

      // Micro-spin while assembling into the cube
      if (progress < 1) {
        mesh.rotation.x = (1 - easeP) * Math.PI * 2;
        mesh.rotation.y = (1 - easeP) * Math.PI * 2;
      } else {
        mesh.rotation.set(0, 0, 0);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {cubelets.map((c, i) => (
        <mesh
          key={c.id}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={c.startPos}
        >
          <boxGeometry args={[0.72, 0.72, 0.72]} />
          <meshStandardMaterial
            color={c.color}
            roughness={0.25}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── DOM FLOATING CUBE ACCENTS ON MARGINS ─────────────────────────────────────
function FloatingSideCubes() {
  const cubeAccents = [
    { top: '12%', left: '2%', size: 'w-10 h-10', color: 'bg-[#B55D3D]/15 border-[#B55D3D]/40', delay: 0 },
    { top: '28%', right: '3%', size: 'w-12 h-12', color: 'bg-[#23201C]/10 border-[#23201C]/30', delay: 0.8 },
    { top: '54%', left: '4%', size: 'w-14 h-14', color: 'bg-[#B55D3D]/20 border-[#B55D3D]/50', delay: 1.5 },
    { top: '72%', right: '2.5%', size: 'w-10 h-10', color: 'bg-[#8A2E2B]/15 border-[#8A2E2B]/40', delay: 0.4 },
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
          <div className="w-full h-full p-1 flex items-center justify-center opacity-60">
            <div className="w-full h-full border border-dashed border-[#B55D3D]/40 rounded-lg" />
          </div>
        </motion.div>
      ))}
    </>
  );
}

// ── SLEEK COMPACT CERTIFICATE DOCUMENT CARD ──────────────────────────────────
interface GlassDocumentProps {
  cert: typeof PORTFOLIO_DATA.certifications[0];
  index: number;
  onSelect: (cert: typeof PORTFOLIO_DATA.certifications[0]) => void;
  playHover: () => void;
}

function FloatingGlassDocument({ cert, index, onSelect, playHover }: GlassDocumentProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 220, damping: 20 });
  
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl bg-[#FCFAF6]/90 backdrop-blur-xl border border-[#B55D3D]/30 shadow-[0_15px_35px_rgba(35,32,28,0.06)] p-5 md:p-6 cursor-pointer overflow-hidden transition-all duration-400 hover:border-[#B55D3D] hover:shadow-[0_25px_50px_rgba(181,93,61,0.16)] select-none flex flex-col justify-between min-h-[240px]"
    >
      {/* Light Reflection Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF8F3]/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ x: reflectX, transform: 'skewX(-20deg)' }}
      />

      {/* Top Accent Line */}
      <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#B55D3D] to-transparent rounded-b-full opacity-60 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Compact Header Strip */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E2DCD2]/70 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#23201C] text-[#FCFAF6] flex items-center justify-center font-bold text-xs shadow-sm group-hover:bg-[#B55D3D] transition-colors">
              <Box className="w-4 h-4 text-[#FCFAF6]" />
            </div>
            <span className="text-xs font-mono font-bold text-[#23201C] uppercase tracking-wider">
              {cert.organization}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* 3D Mini Cube Facelet Badge Accent */}
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5 opacity-80 group-hover:rotate-90 transition-transform duration-500">
              <div className="bg-[#B55D3D] rounded-[1px]" />
              <div className="bg-[#23201C] rounded-[1px]" />
              <div className="bg-[#23201C] rounded-[1px]" />
              <div className="bg-[#B55D3D] rounded-[1px]" />
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-[#B55D3D]/12 text-[#B55D3D] border border-[#B55D3D]/25 font-bold">
              {cert.year}
            </span>
          </div>
        </div>

        {/* Certificate Title & Subject */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#B55D3D] uppercase tracking-widest font-bold">
            <Sparkles className="w-3 h-3" />
            <span>VAULT CREDENTIAL // {cert.category}</span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#23201C] group-hover:text-[#B55D3D] transition-colors leading-snug">
            {cert.title}
          </h3>
          
          <p className="text-xs text-[#787268] font-light leading-relaxed line-clamp-2">
            {cert.description}
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-4 border-t border-[#E2DCD2]/70 flex items-center justify-between mt-3">
        <div className="flex items-center gap-1 text-[9px] font-mono text-[#787268] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8A2E2B]" />
          <span>ID: {cert.credentialId}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#23201C] text-[#FCFAF6] group-hover:bg-[#B55D3D] transition-colors text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
          <span>INSPECT SIGNAL</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
    <section id="certifications" ref={sectionRef} className="py-24 px-6 md:px-12 bg-[#F7F3EC] text-[#23201C] relative overflow-hidden select-none">
      {/* Anchor targets for #certificates & #achievements nav links */}
      <div id="certificates" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />
      <div id="achievements" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />

      {/* Floating Theme Cube Pieces on Margins */}
      <FloatingSideCubes />

      {/* Volumetric Warm Ambient Spotlights */}
      <div className="absolute top-1/4 left-10 w-[650px] h-[650px] bg-[#B55D3D]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-[#8A2E2B]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 border-b border-[#E2DCD2] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#B55D3D] uppercase mb-2 font-bold">
              <Lock className="w-4 h-4 text-[#B55D3D]" />
              <span>06 / THE CREDENTIAL VAULT — ARCHIVAL SIGNALS</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#23201C] leading-none tracking-tight"
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

        {/* ── MAIN 2-COLUMN LAYOUT: 3D 3x3 RUBIK CUBE STAGE (LEFT) + CERTIFICATES (RIGHT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: 3D 3x3 RUBIK'S CUBE ASSEMBLY STAGE */}
          <div className="lg:col-span-5 relative w-full h-[440px] rounded-3xl bg-[#FCFAF6]/90 border-2 border-[#B55D3D]/30 shadow-xl overflow-hidden p-6 flex flex-col justify-between group">
            
            {/* Top Stage Header */}
            <div className="flex items-center justify-between border-b border-[#E2DCD2] pb-3 z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#B55D3D] font-bold uppercase">
                <Box className="w-4 h-4 text-[#B55D3D]" />
                <span>3x3 CUBE ASSEMBLY ENGINE</span>
              </div>
              <span className="text-[10px] font-mono text-[#787268] uppercase font-bold">PARTICLES CONVERGE ↓</span>
            </div>

            {/* 3D WebGL Canvas Stage */}
            <div className="absolute inset-0 pointer-events-auto">
              <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 6, 5]} intensity={1.4} />
                <directionalLight position={[-5, -4, -3]} intensity={0.5} />
                <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
                  <Rubik3x3Assembly />
                </Float>
              </Canvas>
            </div>

            {/* Bottom Interactive Tag */}
            <div className="mt-auto z-10 pt-3 border-t border-[#E2DCD2] flex items-center justify-between text-[10px] font-mono text-[#787268] bg-[#FCFAF6]/90 backdrop-blur-md px-3 py-2 rounded-xl">
              <span>REAL-TIME 3D MATRIX</span>
              <span className="text-[#B55D3D] font-bold">27 CUBELETS SNAP IN PLACE</span>
            </div>
          </div>

          {/* RIGHT COLUMN: CATEGORY FILTERS + COMPACT CERTIFICATE CARDS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Category Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-wrap items-center gap-2"
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    onMouseEnter={playHover}
                    className={`relative px-4 py-2 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
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

            {/* Compact Staggered Floating Glass Documents */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        </div>

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
              className="max-w-3xl w-full p-6 md:p-10 rounded-3xl bg-[#FCFAF6] text-[#23201C] border-2 border-[#B55D3D]/40 shadow-2xl relative overflow-hidden my-auto border-double"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#23201C] text-[#FCFAF6] hover:bg-[#B55D3D] transition-colors flex items-center justify-center cursor-pointer shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-2 border-[#E2DCD2] p-6 sm:p-8 rounded-2xl relative bg-[#FAF8F3] shadow-inner">
                <div className="text-center space-y-2 pb-5 border-b border-[#E2DCD2]">
                  <div className="w-10 h-10 rounded-full bg-[#B55D3D]/12 text-[#B55D3D] flex items-center justify-center mx-auto mb-1 border border-[#B55D3D]/30 shadow-xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B55D3D] font-bold">
                    OFFICIAL VAULT VERIFIED CREDENTIAL
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#23201C]">
                    {selectedCert.title}
                  </h3>
                  <div className="text-xs font-mono text-[#787268] uppercase tracking-wider font-semibold">
                    ISSUED BY: <span className="text-[#23201C] font-bold">{selectedCert.organization}</span>
                  </div>
                </div>

                <div className="text-center py-6 space-y-1.5">
                  <div className="text-[10px] font-mono text-[#787268] uppercase tracking-widest font-semibold">
                    THIS CREDENTIAL CERTIFIES THAT
                  </div>
                  <div className="text-2xl sm:text-4xl font-serif font-bold italic text-[#B55D3D]">
                    Shubham Jadhav
                  </div>
                  <p className="text-xs text-[#787268] font-light max-w-lg mx-auto pt-1 leading-relaxed">
                    Has successfully passed all technical evaluations and practical requirements in {selectedCert.category} for the year {selectedCert.year}.
                  </p>
                </div>

                <div className="pt-5 border-t border-[#E2DCD2] grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-center sm:text-left">
                  <div>
                    <div className="text-[9px] font-mono text-[#787268] uppercase font-bold">CREDENTIAL VERIFICATION HASH</div>
                    <div className="text-xs font-mono font-bold text-[#23201C]">{selectedCert.credentialId}</div>
                  </div>

                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-[#B55D3D] text-white flex items-center justify-center mx-auto mb-1 font-bold text-xs shadow-md">
                      ✓
                    </div>
                    <div className="text-[8px] font-mono text-[#B55D3D] uppercase font-bold">OFFICIAL CHAMPAGNE SEAL</div>
                  </div>

                  <div className="sm:text-right">
                    <div className="text-[9px] font-mono text-[#787268] uppercase font-bold">ISSUE STATUS</div>
                    <div className="text-xs font-mono font-bold text-[#23201C]">{selectedCert.year} · ACTIVE SIGNAL</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-5">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-5 py-2 rounded-full bg-[#23201C] text-[#FCFAF6] hover:bg-[#B55D3D] transition-colors text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-md"
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

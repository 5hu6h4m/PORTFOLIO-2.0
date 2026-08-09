'use client';

import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Copy, Check, Send, Sparkles, Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  playClick: () => void;
  playHover: () => void;
  playSuccess: () => void;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── 3D CUBE PARTICLE FIELD & ARCHITECTURAL GLASS PORTAL RING ────────────────
function ContactPortalWorld({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  const cubeMeshRef = useRef<THREE.InstancedMesh>(null);
  const portalRingRef = useRef<THREE.Mesh>(null);

  const count = 55;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate 3D cube fragment positions
  const particlesData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10 - 2
      ),
      rotation: new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      speed: 0.15 + Math.random() * 0.35,
      scale: 0.08 + Math.random() * 0.14,
    }));
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Rotate 3D Glass Portal Ring
    if (portalRingRef.current) {
      portalRingRef.current.rotation.z = time * 0.1;
      portalRingRef.current.rotation.x = Math.sin(time * 0.2) * 0.08;
      portalRingRef.current.position.z = THREE.MathUtils.lerp(
        portalRingRef.current.position.z,
        -1 + scrollProgress * 2.5,
        0.05
      );
    }

    // 2. Animate 3D Cube Particles
    if (cubeMeshRef.current) {
      particlesData.forEach((p, i) => {
        const floatY = Math.sin(time * p.speed + i) * 0.35;
        const floatX = Math.cos(time * p.speed * 0.8 + i) * 0.25;

        // Subtle mouse repulsion via native R3F pointer
        const dx = p.position.x - state.pointer.x * 4;
        const dy = p.position.y - state.pointer.y * 3;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let repulseX = 0;
        let repulseY = 0;
        if (dist < 2.5) {
          const force = (2.5 - dist) * 0.12;
          repulseX = (dx / dist) * force;
          repulseY = (dy / dist) * force;
        }

        dummy.position.set(
          p.position.x + floatX + repulseX,
          p.position.y + floatY + repulseY,
          p.position.z + scrollProgress * 1.5
        );

        dummy.rotation.set(
          p.rotation.x + time * 0.1,
          p.rotation.y + time * 0.15,
          p.rotation.z
        );

        dummy.scale.setScalar(p.scale);
        dummy.updateMatrix();

        cubeMeshRef.current!.setMatrixAt(i, dummy.matrix);
      });

      cubeMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 3D Instanced Cube Particles */}
      <instancedMesh ref={cubeMeshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#B55D3D"
          roughness={0.3}
          metalness={0.25}
          transparent
          opacity={0.45}
        />
      </instancedMesh>

      {/* Architectural Glass & Metallic Portal Ring */}
      <mesh ref={portalRingRef} position={[0, 0, -1]}>
        <torusGeometry args={[3.8, 0.08, 32, 100]} />
        <meshStandardMaterial
          color="#D7C7A1"
          roughness={0.15}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

// ── 4-LINE ALTERNATING LEFT / RIGHT MASKED HEADING REVEAL ───────────────────
function AlternatingEditorialHeader() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: false, amount: 0.35 });

  return (
    <div ref={headerRef} className="text-center max-w-4xl mx-auto space-y-4">
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#B55D3D]/10 text-[#B55D3D] border border-[#B55D3D]/20 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-[#B55D3D]" />
        <span className="text-xs font-mono font-bold uppercase tracking-[0.25em]">
          07 / THE LAST TRANSMISSION
        </span>
      </div>

      <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-[#23201C] leading-[1.05] flex flex-col items-center justify-center overflow-hidden">
        {/* Line 1: Enters from LEFT */}
        <div className="overflow-hidden py-1">
          <motion.div
            initial={{ opacity: 0, x: -140 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -140 }}
            transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
          >
            LET’S BUILD
          </motion.div>
        </div>

        {/* Line 2: Enters from RIGHT (Terracotta Italic Accent) */}
        <div className="overflow-hidden py-1">
          <motion.div
            initial={{ opacity: 0, x: 140 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 140 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="italic font-normal text-[#B55D3D]"
          >
            SOMETHING
          </motion.div>
        </div>

        {/* Line 3: Enters from LEFT */}
        <div className="overflow-hidden py-1">
          <motion.div
            initial={{ opacity: 0, x: -140 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -140 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            WORTH
          </motion.div>
        </div>

        {/* Line 4: Enters from RIGHT */}
        <div className="overflow-hidden py-1">
          <motion.div
            initial={{ opacity: 0, x: 140 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 140 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          >
            REMEMBERING.
          </motion.div>
        </div>
      </h2>

      <p className="text-base sm:text-lg font-serif font-light text-[#787268] max-w-xl mx-auto leading-relaxed pt-4">
        Have an idea, opportunity, collaboration or project in mind? I’d love to hear what you’re building.
      </p>
    </div>
  );
}

export function ContactSection({ playClick, playHover, playSuccess }: ContactSectionProps) {
  const { personal } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.05 });
  const [currentScrollProgress, setCurrentScrollProgress] = useState(0);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [focusedField, setFocusedField] = useState<'name' | 'email' | 'message' | null>(null);

  const maxChars = 600;

  // Scroll Progress tracking for camera movement through portal
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.onChange((v) => setCurrentScrollProgress(v));
  }, [scrollYProgress]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring physics for mouse interaction (±2.5deg max tilt)
  const springX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 80, damping: 20 });

  const consoleRotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const consoleRotateX = useTransform(springY, [-0.5, 0.5], [2, -2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length < 5 || sending) return;
    playClick();
    setSending(true);

    try {
      const res = await fetch('/api/transmit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        playSuccess();
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#B55D3D', '#FAF7F2', '#D7C7A1'],
        });
        setSent(true);
      } else {
        throw new Error('API offline');
      }
    } catch {
      playSuccess();
      window.location.href = `mailto:${personal.email}?subject=Conversation from ${encodeURIComponent(name || 'Portfolio')}&body=${encodeURIComponent(message)}`;
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen bg-[#F7F3EC] text-[#23201C] py-24 px-6 md:px-12 overflow-hidden flex flex-col justify-between select-none rounded-t-3xl shadow-[0_-20px_80px_rgba(0,0,0,0.1)] border-t border-[#E2DCD2]"
    >
      {/* 3D WebGL Camera & Portal Canvas Stage Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 48 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          frameloop={isInView ? 'always' : 'demand'}
        >
          <ambientLight intensity={1.3} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#FAF7F2" />
          <pointLight position={[-5, -5, -5]} intensity={1.0} color="#B55D3D" />
          <Suspense fallback={null}>
            <ContactPortalWorld scrollProgress={currentScrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* Volumetric Soft Lighting Ambient Spheres */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#B55D3D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D7C7A1]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between space-y-16">
        
        {/* 1. EDITORIAL CHAPTER HEADER (ALTERNATING 4-LINE LEFT/RIGHT MASKED REVEAL) */}
        <AlternatingEditorialHeader />

        {/* 2. FLOATING COMMUNICATION CONSOLE & DIRECT CONTACT STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start flex-1">
          
          {/* Left Column — Direct Contact Object & Architectural Plaques */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Direct Email Plaque */}
            <div className="p-8 rounded-3xl bg-[#FCFAF6]/90 backdrop-blur-md border border-[#E2DCD2] hover:border-[#B55D3D]/40 transition-all duration-300 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B55D3D] font-bold">
                  <Mail className="w-4 h-4 text-[#B55D3D]" />
                  <span>DIRECT CONTACT</span>
                </div>
                <span className="text-[10px] font-mono text-[#787268]">CLICK TO COPY</span>
              </div>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={playHover}
                className="w-full text-left group flex items-center justify-between p-4 rounded-2xl bg-[#F7F3EC] border border-[#E2DCD2] hover:border-[#B55D3D] transition-all duration-300 cursor-pointer shadow-inner"
              >
                <span className="font-mono text-sm sm:text-base text-[#23201C] font-bold truncate">
                  {personal.email}
                </span>
                {copied ? (
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-600 font-bold shrink-0">
                    <Check className="w-4 h-4" /> COPIED ✓
                  </span>
                ) : (
                  <Copy className="w-4 h-4 text-[#787268] group-hover:text-[#B55D3D] transition-colors shrink-0" />
                )}
              </button>

              <p className="text-xs font-mono text-[#787268] leading-relaxed">
                Direct signal line for project inquiries, freelance opportunities, and architectural discussions.
              </p>
            </div>

            {/* Architectural Social Link Plaques */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#787268] font-bold">
                PROFESSIONAL NETWORKS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="p-4 rounded-2xl bg-[#FCFAF6]/80 border border-[#E2DCD2] hover:border-[#B55D3D] hover:bg-[#FCFAF6] transition-all duration-300 flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-[#23201C]">
                    <GithubIcon className="w-4 h-4 text-[#B55D3D]" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#787268] group-hover:text-[#B55D3D] transition-colors" />
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="p-4 rounded-2xl bg-[#FCFAF6]/80 border border-[#E2DCD2] hover:border-[#B55D3D] hover:bg-[#FCFAF6] transition-all duration-300 flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-[#23201C]">
                    <LinkedinIcon className="w-4 h-4 text-[#4A6FA5]" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#787268] group-hover:text-[#B55D3D] transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Floating Communication Console (Physical 3D Glass Object) */}
          <motion.div
            style={{
              rotateX: consoleRotateX,
              rotateY: consoleRotateY,
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
            className="lg:col-span-7 w-full"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-10 sm:p-14 rounded-3xl bg-[#FCFAF6] border border-[#B55D3D]/40 text-center space-y-6 shadow-2xl"
                >
                  <div className="w-16 h-16 rounded-full bg-[#B55D3D]/10 text-[#B55D3D] flex items-center justify-center mx-auto border border-[#B55D3D]/30 shadow-md">
                    <Send className="w-8 h-8 text-[#B55D3D]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-serif font-bold text-[#23201C]">MESSAGE SENT.</h3>
                    <p className="text-sm font-mono text-[#787268] max-w-md mx-auto leading-relaxed">
                      I’ll decode your message and get back to you soon. Thank you for visiting the portfolio.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSent(false); setMessage(''); setName(''); setEmail(''); }}
                    className="px-8 py-3.5 rounded-full bg-[#B55D3D] text-[#FAF7F2] text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#23201C] transition-all cursor-pointer shadow-md"
                  >
                    Start Another Conversation
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 sm:p-10 rounded-3xl bg-[#FCFAF6]/90 backdrop-blur-xl border border-[#E2DCD2] shadow-2xl space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-[#E2DCD2] pb-4">
                    <span className="text-xs font-mono text-[#787268] uppercase tracking-widest font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B55D3D] animate-pulse" />
                      <span>COMMUNICATION STUDIO CONSOLE</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#B55D3D] font-bold">ONLINE</span>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#787268] uppercase tracking-[0.2em] font-bold block">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Alex Mercer"
                      className="w-full bg-[#F7F3EC] border border-[#E2DCD2] rounded-2xl px-4 py-3 text-sm font-mono text-[#23201C] focus:outline-none focus:border-[#B55D3D] transition-all placeholder:text-[#787268]/40"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#787268] uppercase tracking-[0.2em] font-bold block">
                      YOUR EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="alex@company.com"
                      className="w-full bg-[#F7F3EC] border border-[#E2DCD2] rounded-2xl px-4 py-3 text-sm font-mono text-[#23201C] focus:outline-none focus:border-[#B55D3D] transition-all placeholder:text-[#787268]/40"
                    />
                  </div>

                  {/* Message Area */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#787268]">
                      <label>MESSAGE / INQUIRY</label>
                      <span>{message.length} / {maxChars} CHARACTERS</span>
                    </div>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project, timeline, or idea..."
                      rows={5}
                      className="w-full bg-[#F7F3EC] border border-[#E2DCD2] rounded-2xl p-4 text-sm font-mono text-[#23201C] focus:outline-none focus:border-[#B55D3D] transition-all resize-none placeholder:text-[#787268]/40 leading-relaxed"
                      style={{ caretColor: '#B55D3D' }}
                    />
                  </div>

                  {/* Submit Action Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="text-[10px] font-mono text-[#787268] uppercase tracking-widest">
                      NASHIK, INDIA · 2026
                    </div>

                    <motion.button
                      type="submit"
                      onMouseEnter={playHover}
                      disabled={message.trim().length < 5 || sending}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xl bg-[#B55D3D] text-[#FAF7F2] hover:bg-[#23201C]"
                      whileHover={{ scale: message.trim().length >= 5 ? 1.03 : 1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {sending ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-[#FAF7F2] border-t-transparent animate-spin" />
                          <span>SENDING MESSAGE...</span>
                        </>
                      ) : (
                        <>
                          <span>START A CONVERSATION</span>
                          <span className="text-base leading-none">↗</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 3. FINAL EDITORIAL SIGNATURE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="border-t border-[#E2DCD2] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#787268] tracking-widest gap-4"
        >
          <div className="flex items-center gap-3 font-bold text-[#23201C]">
            <span>SHUBHAM JADHAV</span>
            <span>•</span>
            <span className="text-[#B55D3D]">FRONTEND DEVELOPER</span>
          </div>

          <div>NASHIK, INDIA · 2026</div>
        </motion.div>

      </div>
    </motion.section>
  );
}

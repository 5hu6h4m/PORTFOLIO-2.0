'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

function CubePiece({
  x, y, size, duration, delay, drift, rotSpeed, color,
}: {
  x: number; y: number; size: number; duration: number;
  delay: number; drift: number; rotSpeed: number; color: string;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ y: [-10, -300], x: [0, drift], rotate: [0, rotSpeed * 360], opacity: [0, 0.6, 0.5, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    >
      <div className="w-full h-full" style={{ background: color, boxShadow: `inset -2px -2px 5px rgba(0,0,0,0.4), inset 1px 1px 3px rgba(255,255,255,0.07)`, borderRadius: 2 }} />
      <div className="absolute" style={{ width: '80%', height: '28%', top: '-23%', left: '10%', background: color, opacity: 0.5, transform: 'skewX(-22deg)', borderRadius: 1 }} />
      <div className="absolute" style={{ width: '28%', height: '100%', top: 0, right: '-24%', background: color, opacity: 0.32, transform: 'skewY(-22deg)', borderRadius: 1 }} />
    </motion.div>
  );
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'logo' | 'shrink' | 'text'>('logo');
  const [typedText, setTypedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const logoControls = useAnimation();

  const line1 = "EVERY CLICK HAS A REASON.";
  const line2 = " THIS ONE STARTS HERE.";
  const fullText = line1 + line2;

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 450);
    return () => clearInterval(id);
  }, []);

  // Master sequence: logo big → shrink → text typing
  useEffect(() => {
    const run = async () => {
      // Phase 1: Logo enters large, holds for a moment
      await logoControls.start({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      });

      // Hold big for 600ms
      await new Promise(r => setTimeout(r, 600));

      // Phase 2: Logo shrinks up and settles right above text
      setPhase('shrink');
      await logoControls.start({
        scale: 0.62,
        y: 0,
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
      });

      // Phase 3: show text
      setPhase('text');
    };
    run();
  }, [logoControls]);

  // Typing starts when phase === 'text'
  useEffect(() => {
    if (phase !== 'text') return;
    let currentIndex = 0;

    const getDelay = (i: number) => {
      if (i === 0) return 300;
      const prev = fullText[i - 1];
      if (prev === '.') return 850; // deliberate cinematic pause at sentence end
      if (i < 14) return 120;       // slower start (EVERY CLICK HAS)
      if (i < 28) return 60;        // smooth middle (A REASON. THIS ONE)
      return 220;                   // dramatic slow finish (STARTS HERE.)
    };

    const typeNext = () => {
      if (currentIndex < fullText.length) {
        const c = fullText[currentIndex];
        setTypedText(p => p + c);
        currentIndex++;
        setTimeout(typeNext, getDelay(currentIndex));
      } else {
        setTimeout(() => {
          setIsFinished(true);
          if (typeof window !== 'undefined')
            window.dispatchEvent(new CustomEvent('portfolio-preloader-complete'));
          setTimeout(onComplete, 900);
        }, 800);
      }
    };

    const t = setTimeout(typeNext, 200);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const progress = Math.max(1, Math.min(Math.floor((typedText.length / fullText.length) * 100), 100));
  const typed1 = typedText.slice(0, 25);
  const typed2 = typedText.slice(25);

  const cubePieces = useMemo(() => {
    const colors = [
      'rgba(184,92,59,0.6)',
      'rgba(232,226,213,0.22)',
      'rgba(42,43,48,0.75)',
      'rgba(255,200,117,0.28)',
      'rgba(184,92,59,0.38)',
    ];
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      size: Math.random() * 34 + 18,
      x: Math.random() * 100,
      y: Math.random() * 100 + 15,
      duration: Math.random() * 22 + 16,
      delay: Math.random() * -22,
      drift: (Math.random() - 0.5) * 160,
      rotSpeed: (Math.random() - 0.5) * 2.4,
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ y: '-100%', transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-[#191817] text-[#FAF7F2] select-none overflow-hidden"
        >
          {/* ── Cube Fragment Particles ─────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {cubePieces.map(p => <CubePiece key={p.id} {...p} />)}
          </div>

          {/* ── Vignette overlay (depth) ─────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(25,24,23,0.72) 100%)',
            }}
          />

          {/* ── Core Content (shifted higher up to clear bottom area) ── */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 md:px-24 -mt-32">

            {/* Logo — starts huge, shrinks smoothly */}
            <motion.img
              src="/logoP.png"
              alt="Logo"
              animate={logoControls}
              initial={{ opacity: 0, scale: 1.8, y: 20 }}
              className="w-auto object-contain"
              style={{
                height: 'clamp(9rem, 25vw, 18rem)',
                transformOrigin: 'center center',
              }}
            />

            {/* Text lines — only appear after logo shrinks */}
            <AnimatePresence>
              {phase === 'text' && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="-mt-3 flex flex-col items-center gap-0"
                >
                  {/* Line 1 — full 100% opacity ivory */}
                  <p
                    className="font-serif italic font-bold text-[#FAF7F2] leading-[1.4] tracking-wide whitespace-nowrap"
                    style={{ fontSize: 'clamp(2.2rem, 5.8vw, 4.5rem)' }}
                  >
                    {typed1}
                  </p>

                  {/* Line 2 — full 100% opacity rust accent */}
                  <p
                    className="font-serif italic font-bold text-[#B85C3B] leading-[1.4] tracking-wide whitespace-nowrap"
                    style={{ fontSize: 'clamp(2.2rem, 5.8vw, 4.5rem)' }}
                  >
                    {typed2}
                    <span
                      className="not-italic font-sans font-light ml-1.5 select-none inline-block align-baseline text-[#B85C3B]"
                      style={{ opacity: cursorVisible ? 1 : 0 }}
                    >|</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Percentage Counter (bottom-right: giant ultra-faint watermark) ── */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-0 select-none pointer-events-none">
            <div
              className="font-serif font-light italic text-[#B85C3B]/12 tracking-tighter leading-none"
              style={{ fontSize: 'clamp(7rem, 20vw, 16rem)' }}
            >
              {progress < 10 ? `0${progress}` : progress}
              <span
                className="font-mono font-light text-[#E8E2D5]/08 ml-2 not-italic"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >%</span>
            </div>
          </div>

          {/* ── Hairline bottom bar ───────────────────────────────────── */}
          <div className="absolute bottom-0 left-0 right-0 h-px z-10">
            <motion.div
              className="h-full bg-[#B85C3B]/40"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ ease: 'linear', duration: 0.15 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

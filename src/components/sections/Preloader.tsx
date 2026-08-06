'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('portfolio-preloader-complete'));
            }
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#191817] text-[#FAF7F2] p-8 md:p-16 select-none"
        >
          {/* Top Brand Signature */}
          <div className="flex justify-between items-center text-xs tracking-widest uppercase font-mono text-[#E8E2D5]/70">
            <span>SHUBHAM JADHAV</span>
            <span>ENGINEERING PORTFOLIO 2026</span>
          </div>

          {/* Center Statement */}
          <div className="my-auto max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-serif font-light text-[#E8E2D5]/90 leading-tight mb-4"
            >
              Architecting high-performance digital experiences.
            </motion.p>
          </div>

          {/* Bottom Progress Counter */}
          <div className="flex items-end justify-between border-t border-[#E8E2D5]/20 pt-6">
            <div className="text-[10px] font-mono text-[#E8E2D5]/50 tracking-widest uppercase">
              INITIALIZING REACT 19 &amp; 3D KINETIC ENGINE
            </div>
            <div className="text-4xl md:text-6xl font-serif font-bold text-[#B85C3B] font-mono">
              {Math.min(progress, 100)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

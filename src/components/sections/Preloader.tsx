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
              "Crafting fast, scalable, and immersive web experiences."
            </motion.p>
            <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#C87D46]"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          {/* Bottom Counter */}
          <div className="flex justify-between items-end">
            <div className="text-xs tracking-widest uppercase font-mono text-[#C87D46]">
              INITIALIZING APPLICATION & 3D CANVAS
            </div>
            <div className="text-6xl md:text-8xl font-mono font-light tracking-tighter text-[#FAF7F2]">
              {Math.min(progress, 100)}<span className="text-3xl text-[#C87D46]">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

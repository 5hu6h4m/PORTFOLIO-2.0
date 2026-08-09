'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface KinematicTextMorphProps {
  text: string;
  category?: string;
}

export function KinematicTextMorph({ text, category }: KinematicTextMorphProps) {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 28, rotateX: -60, filter: 'blur(8px)', scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 180,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      y: -24,
      rotateX: 60,
      filter: 'blur(8px)',
      scale: 0.9,
      transition: {
        duration: 0.35,
      },
    },
  };

  return (
    <div className="relative overflow-hidden py-2 select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="flex flex-wrap items-center gap-x-1.5"
        >
          {category && (
            <motion.span
              layoutId="shared-ppt-category-pill"
              className="text-xs font-mono font-bold text-[#B85C3B] uppercase tracking-widest mr-4 px-4 py-1.5 rounded-full bg-[#FAF8F3] border border-[#B85C3B]/40 shadow-xs"
              transition={{
                type: 'spring' as const,
                stiffness: 220,
                damping: 25,
              }}
            >
              {category}
            </motion.span>
          )}

          {letters.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={letterVariants}
              className="inline-block text-lg md:text-2xl font-serif font-bold text-[#25231F] leading-tight"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

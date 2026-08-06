'use client';

import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  soundEnabled: boolean;
  onToggle: () => void;
  playClick: () => void;
}

export function SoundToggle({ soundEnabled, onToggle, playClick }: SoundToggleProps) {
  const handleClick = () => {
    playClick();
    onToggle();
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E8E2D5] shadow-xs text-[#2C2925] hover:text-[#C87D46] hover:border-[#C87D46]/30 transition-all cursor-pointer text-xs tracking-wider uppercase font-medium"
      title="Toggle Web Audio Synthesizer"
    >
      <div className="flex items-center gap-0.5 h-3 w-3">
        {soundEnabled ? (
          <>
            <motion.span
              animate={{ height: ['20%', '100%', '30%', '80%', '20%'] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="w-0.5 bg-[#C87D46] rounded-full inline-block"
            />
            <motion.span
              animate={{ height: ['60%', '20%', '100%', '40%', '60%'] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
              className="w-0.5 bg-[#C87D46] rounded-full inline-block"
            />
            <motion.span
              animate={{ height: ['40%', '80%', '20%', '90%', '40%'] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut', delay: 0.4 }}
              className="w-0.5 bg-[#C87D46] rounded-full inline-block"
            />
          </>
        ) : (
          <VolumeX className="w-3.5 h-3.5 opacity-60" />
        )}
      </div>
      <span>{soundEnabled ? 'SOUND ON' : 'SOUND MUTED'}</span>
    </motion.button>
  );
}

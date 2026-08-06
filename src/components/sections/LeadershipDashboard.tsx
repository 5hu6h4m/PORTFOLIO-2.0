import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { X, Star, Trophy } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import styles from './LeadershipDashboard.module.css';

export interface LeadershipDashboardProps {
  onClose: () => void;
  playClick: () => void;
  playHover: () => void;
}

export function LeadershipDashboard({ onClose, playClick, playHover }: LeadershipDashboardProps) {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Entrance animation on mount
  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } });
  }, [controls]);

  const handleClose = () => {
    playClick();
    controls.start({ opacity: 0, y: -20, transition: { duration: 0.5 } }).then(() => onClose());
  };

  return (
    <div className={styles.overlay} ref={containerRef}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={controls} className={styles.dashboard}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Mission Control – Leadership</h2>
          <button className={styles.closeBtn} onClick={handleClose} onMouseEnter={playHover} aria-label="Close Leadership Dashboard">
            <X className="w-5 h-5 text-[#FAF8F3]/60" />
          </button>
        </div>
        {/* Cards Grid */}
        <div className={styles.cardsGrid}>
          {PORTFOLIO_DATA.leadership.map((item) => (
            <motion.div key={item.id} className={styles.card} whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(184,92,59,0.8)' }}>
              <div className={styles.badgeWrapper}>
                <Trophy className="w-6 h-6 text-[#B85C3B]" />
                <span className={styles.badge}>{item.badge}</span>
              </div>
              <h3 className={styles.role}>{item.role}</h3>
              <p className={styles.org}>{item.organization}</p>
              <p className={styles.period}>{item.period}</p>
              <p className={styles.tagline}>{item.tagline}</p>
              <p className={styles.description}>{item.description}</p>
              <ul className={styles.impactList}>
                {item.impact.map((point, idx) => (
                  <li key={idx} className={styles.impactItem}>
                    <Star className="w-4 h-4 inline-block mr-1 text-[#8E9A78]" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

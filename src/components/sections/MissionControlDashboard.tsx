import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Trophy, Star, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import styles from './MissionControlDashboard.module.css';

const SoftParticleField = () => null;

export interface MissionControlDashboardProps {
  onClose: () => void;
  playClick: () => void;
  playHover: () => void;
}

export function MissionControlDashboard({ onClose, playClick, playHover }: MissionControlDashboardProps) {
  const controls = useAnimation();
  const [bootComplete, setBootComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulate boot sequence (2 seconds) then reveal content
  useEffect(() => {
    const seq = async () => {
      await controls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } });
      // simple boot text animation
      await new Promise((res) => setTimeout(res, 1500));
      setBootComplete(true);
    };
    seq();
  }, [controls]);

  const handleClose = async () => {
    playClick();
    await controls.start({ opacity: 0, y: -20, transition: { duration: 0.5 } });
    onClose();
  };

  const leadership = PORTFOLIO_DATA.leadership;

  // Asymmetric layout: first item featured, rest secondary
  const featured = leadership[0];
  const secondary = leadership.slice(1);

  return (
    <div className={styles.overlay} ref={containerRef} aria-live="polite">
      <SoftParticleField />
      {/* Boot / intro sequence */}
      {!bootComplete && (
        <motion.div className={styles.boot} initial={{ opacity: 0 }} animate={controls}>
          <div className={styles.bootScreen}>MISSION CONTROL – INITIALIZING…</div>
        </motion.div>
      )}
      {/* Main content after boot */}
      {bootComplete && (
        <motion.div className={styles.dashboard} initial={{ opacity: 0 }} animate={controls}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>Mission Control – Leadership</h2>
            <button className={styles.closeBtn} onClick={handleClose} onMouseEnter={playHover} aria-label="Close Mission Control">
              <ChevronRight className="w-5 h-5 rotate-180 text-[#23201C]" />
            </button>
          </div>
          {/* Layout */}
          <div className={styles.layout}>
            {/* Featured card – larger, cinematic */}
            <motion.div
              className={styles.featuredCard}
              whileHover={{ scale: 1.02, boxShadow: '0 0 12px rgba(181,93,61,0.5)' }}
            >
              <div className={styles.badgeWrapper}>
                <Trophy className="w-6 h-6 text-[#B55D3D]" />
                <span className={styles.badge}>{featured.badge}</span>
              </div>
              <h3 className={styles.role}>{featured.role}</h3>
              <p className={styles.org}>{featured.organization}</p>
              <p className={styles.period}>{featured.period}</p>
              <p className={styles.tagline}>{featured.tagline}</p>
              <p className={styles.description}>{featured.description}</p>
              <ul className={styles.impactList}>
                {featured.impact.map((point, idx) => (
                  <li key={idx} className={styles.impactItem}>
                    <Star className="w-4 h-4 inline-block mr-1 text-[#8A2E2B]" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
            {/* Secondary cards – carousel on mobile, grid on desktop */}
            <div className={styles.secondaryContainer}>
              {secondary.map((item) => (
                <motion.div
                  key={item.id}
                  className={styles.secondaryCard}
                  whileHover={{ scale: 1.015, boxShadow: '0 0 8px rgba(181,93,61,0.4)' }}
                >
                  <div className={styles.badgeWrapper}>
                    <Trophy className="w-5 h-5 text-[#B55D3D]" />
                    <span className={styles.badge}>{item.badge}</span>
                  </div>
                  <h4 className={styles.role}>{item.role}</h4>
                  <p className={styles.org}>{item.organization}</p>
                  <p className={styles.period}>{item.period}</p>
                  <p className={styles.tagline}>{item.tagline}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

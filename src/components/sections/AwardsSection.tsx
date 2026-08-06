'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ShieldCheck, Award, Sparkles, X, ExternalLink, Lock } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface AwardsSectionProps {
  playHover: () => void;
}

// ── ULTRA-COMPACT SLEEK CERTIFICATE CARD COMPONENT ──────────────────────────
interface CompactCertificateCardProps {
  cert: typeof PORTFOLIO_DATA.certifications[0];
  index: number;
  onSelect: (cert: typeof PORTFOLIO_DATA.certifications[0]) => void;
  playHover: () => void;
}

function CompactCertificateCard({ cert, index, onSelect, playHover }: CompactCertificateCardProps) {
  return (
    <motion.div
      layout
      onMouseEnter={playHover}
      onClick={() => onSelect(cert)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative rounded-2xl bg-[#FCFAF6] border border-[#E2DCD2] hover:border-[#B55D3D] p-5 cursor-pointer transition-all duration-300 hover:shadow-lg select-none flex flex-col justify-between"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#B55D3D] to-transparent rounded-b-full opacity-40 group-hover:opacity-100 transition-opacity" />

      <div className="space-y-2">
        {/* Header Strip */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E2DCD2]/70">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#23201C] text-[#FCFAF6] flex items-center justify-center font-bold text-[10px] group-hover:bg-[#B55D3D] transition-colors">
              <Award className="w-3.5 h-3.5 text-[#FCFAF6]" />
            </div>
            <span className="text-xs font-mono font-bold text-[#23201C] uppercase tracking-wider">
              {cert.organization}
            </span>
          </div>
          
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-[#B55D3D]/10 text-[#B55D3D] border border-[#B55D3D]/20 font-bold">
            {cert.year}
          </span>
        </div>

        {/* Certificate Title & Subject */}
        <div>
          <div className="text-[9px] font-mono text-[#B55D3D] uppercase tracking-widest font-bold mb-1">
            {cert.category}
          </div>
          <h3 className="text-base md:text-lg font-serif font-bold text-[#23201C] group-hover:text-[#B55D3D] transition-colors leading-snug">
            {cert.title}
          </h3>
          <p className="text-xs text-[#787268] font-light leading-relaxed line-clamp-2 mt-1">
            {cert.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#E2DCD2]/70 flex items-center justify-between mt-3">
        <div className="flex items-center gap-1 text-[9px] font-mono text-[#787268] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8A2E2B]" />
          <span>ID: {cert.credentialId}</span>
        </div>

        <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#B55D3D] group-hover:translate-x-0.5 transition-transform uppercase">
          <span>INSPECT</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN CERTIFICATE SECTION ──────────────────────────────────────────────────
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
    <section id="certifications" ref={sectionRef} className="py-20 px-6 md:px-12 bg-[#F4F0E8] text-[#23201C] relative overflow-hidden select-none border-t border-[#E2DCD2]">
      {/* Anchor targets for #certificates & #achievements nav links */}
      <div id="certificates" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />
      <div id="achievements" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -90 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 border-b border-[#E2DCD2] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#B55D3D] uppercase mb-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#B55D3D]" />
              <span>06 / OFFICIAL CERTIFICATIONS &amp; CREDENTIALS</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#23201C] leading-none tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              ACADEMIC <span className="italic font-normal text-[#B55D3D]">CERTIFICATES</span>
            </h2>
          </div>

          <div className="text-right text-xs font-mono text-[#787268] uppercase tracking-widest font-bold shrink-0">
            <div className="flex items-center gap-2 text-[#B55D3D] justify-end">
              <Award className="w-4 h-4 text-[#8A2E2B]" />
              <span>4 VERIFIED SIGNALS</span>
            </div>
          </div>
        </motion.div>

        {/* ── CATEGORY FILTER TABS ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                onMouseEnter={playHover}
                className={`relative px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
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

        {/* ── ULTRA-COMPACT 2x2 CERTIFICATE CARDS GRID ─────────────────────── */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <CompactCertificateCard
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

      {/* ── HIGH-PRECISION DETAIL FOCUS MODAL ─────────────────────────────── */}
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
              className="max-w-3xl w-full p-6 md:p-8 rounded-3xl bg-[#FCFAF6] text-[#23201C] border-2 border-[#B55D3D]/40 shadow-2xl relative overflow-hidden my-auto border-double"
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
                    OFFICIAL VERIFIED CREDENTIAL
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
                  CLOSE PREVIEW
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

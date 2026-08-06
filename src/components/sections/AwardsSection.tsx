'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Award, CheckCircle2, ShieldCheck, ExternalLink, FileCheck, Sparkles, X, Download, Eye, QrCode } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface AwardsSectionProps {
  playHover: () => void;
}

export function AwardsSection({ playHover }: AwardsSectionProps) {
  const { certifications } = PORTFOLIO_DATA;
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="py-24 px-6 md:px-12 bg-[#25231F] text-[#FAF8F3] relative overflow-hidden">
      {/* Anchor targets for #certificates & #achievements nav links */}
      <div id="certificates" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />
      <div id="achievements" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />

      {/* Fine dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle, #9A948C 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Warm Ambient Glow Spotlight */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#B85C3B]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ── SECTION HEADER ───────────────────────────────────────────────── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 border-b border-[#FAF8F3]/15 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#B85C3B] uppercase mb-2 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#B85C3B]" />
              <span>06 / OFFICIAL CERTIFICATES &amp; CREDENTIALS</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#FAF8F3] leading-none tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              ACADEMIC <span className="italic font-normal text-[#B85C3B]">CERTIFICATES</span>
            </h2>
          </div>

          <div className="text-right text-xs font-mono text-[#9A948C] uppercase tracking-widest font-bold shrink-0">
            <div className="flex items-center gap-2 text-[#B85C3B]">
              <Award className="w-4 h-4" />
              <span>4 VERIFIED CERTIFICATES</span>
            </div>
          </div>
        </motion.div>

        {/* ── 4 OFFICIAL CERTIFICATE CARDS GRID ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              onMouseEnter={playHover}
              className="p-8 rounded-3xl bg-[#FAF8F3] text-[#25231F] border-2 border-[#E2DCD2] hover:border-[#B85C3B] shadow-2xl relative overflow-hidden transition-all duration-300 group select-none flex flex-col justify-between"
            >
              {/* Decorative Corner Seals */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#B85C3B]/10 rounded-bl-full pointer-events-none group-hover:bg-[#B85C3B]/20 transition-colors" />

              <div>
                {/* Certificate Issuer Ribbon Strip */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E2DCD2] mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#25231F] text-[#FAF8F3] flex items-center justify-center font-bold text-xs">
                      <Award className="w-4 h-4 text-[#B85C3B]" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#25231F] uppercase tracking-wider">
                      {cert.organization}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-[#B85C3B]/15 text-[#B85C3B] border border-[#B85C3B]/30 font-bold">
                    VERIFIED · {cert.year}
                  </span>
                </div>

                {/* Certificate Title & Subject */}
                <div className="space-y-2 mb-4">
                  <div className="text-[10px] font-mono text-[#B85C3B] uppercase tracking-widest font-bold">
                    CERTIFICATE OF ACHIEVEMENT
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#25231F] group-hover:text-[#B85C3B] transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#787268] font-light leading-relaxed pt-1">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Certificate Footer & View Modal Button */}
              <div className="pt-6 border-t border-[#E2DCD2] flex items-center justify-between mt-4">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#787268] font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ID: {cert.credentialId}</span>
                </div>

                <button
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25231F] text-[#FAF8F3] hover:bg-[#B85C3B] transition-colors text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>VIEW CERTIFICATE</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── HIGH-FIDELITY OFFICIAL CERTIFICATE MODAL VIEW ─────────────────── */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-[#161412]/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full p-8 md:p-12 rounded-3xl bg-[#FCFAF6] text-[#25231F] border-4 border-[#B85C3B]/30 shadow-2xl relative overflow-hidden my-auto border-double"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#25231F] text-[#FAF8F3] hover:bg-[#B85C3B] transition-colors flex items-center justify-center cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Border Frame */}
              <div className="border-2 border-[#E2DCD2] p-6 sm:p-10 rounded-2xl relative bg-[#FAF8F3]">
                {/* Top Certificate Header */}
                <div className="text-center space-y-3 pb-6 border-b border-[#E2DCD2]">
                  <div className="w-12 h-12 rounded-full bg-[#B85C3B]/10 text-[#B85C3B] flex items-center justify-center mx-auto mb-2 border border-[#B85C3B]/30">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono tracking-[0.3em] uppercase text-[#B85C3B] font-bold">
                    OFFICIAL VERIFIED CERTIFICATE
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-serif font-bold text-[#25231F]">
                    {selectedCert.title}
                  </h3>
                  <div className="text-sm font-mono text-[#787268] uppercase tracking-wider font-semibold">
                    ISSUED BY: <span className="text-[#25231F] font-bold">{selectedCert.organization}</span>
                  </div>
                </div>

                {/* Recipient Line */}
                <div className="text-center py-8 space-y-2">
                  <div className="text-xs font-mono text-[#787268] uppercase tracking-widest font-semibold">
                    THIS CERTIFIES THAT
                  </div>
                  <div className="text-3xl sm:text-4xl font-serif font-bold italic text-[#B85C3B]">
                    Shubham Jadhav
                  </div>
                  <p className="text-xs sm:text-sm text-[#787268] font-light max-w-lg mx-auto pt-2 leading-relaxed">
                    Has successfully completed all technical criteria and examinations in {selectedCert.category} for the year {selectedCert.year}.
                  </p>
                </div>

                {/* Bottom Signature & Credential ID Strip */}
                <div className="pt-6 border-t border-[#E2DCD2] grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center sm:text-left">
                  <div>
                    <div className="text-[10px] font-mono text-[#787268] uppercase font-bold">CREDENTIAL ID</div>
                    <div className="text-xs font-mono font-bold text-[#25231F]">{selectedCert.credentialId}</div>
                  </div>

                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-[#B85C3B] text-white flex items-center justify-center mx-auto mb-1 font-bold text-xs shadow-md">
                      ✓
                    </div>
                    <div className="text-[9px] font-mono text-[#B85C3B] uppercase font-bold">OFFICIAL VERIFIED SEAL</div>
                  </div>

                  <div className="sm:text-right">
                    <div className="text-[10px] font-mono text-[#787268] uppercase font-bold">ISSUE DATE</div>
                    <div className="text-xs font-mono font-bold text-[#25231F]">{selectedCert.year} · VERIFIED</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-2.5 rounded-full bg-[#25231F] text-[#FAF8F3] hover:bg-[#B85C3B] transition-colors text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-md"
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

'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Copy, Check, Send, Sparkles, Mail, MessageSquare, ShieldCheck, ArrowUpRight, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/BrandIcons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  playClick: () => void;
  playHover: () => void;
  playSuccess: () => void;
}

const PLACEHOLDER_LINES = [
  "Hi Shubham, I have an exciting Next.js & 3D project...",
  "We're looking for a frontend developer to build an MVP...",
  "Hey Shubham, let's collaborate on a web application...",
  "Hi, I saw your portfolio and would love to connect...",
];

// Typewriter for terminal message placeholder
function usePlaceholderTypewriter(lines: string[], active: boolean) {
  const [text, setText] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!active) return;
    const line = lines[lineIdx];
    const delay = deleting ? 25 : charIdx < line.length ? 45 : 1400;

    const timer = setTimeout(() => {
      if (!deleting && charIdx < line.length) {
        setText(line.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!deleting && charIdx === line.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setText(line.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setDeleting(false);
        setLineIdx((l) => (l + 1) % lines.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [active, charIdx, deleting, lineIdx, lines]);

  return text;
}

export function ContactSection({ playClick, playHover, playSuccess }: ContactSectionProps) {
  const { personal } = PORTFOLIO_DATA;
  const [message, setMessage] = useState('');
  const [from, setFrom] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const placeholder = usePlaceholderTypewriter(PLACEHOLDER_LINES, !focused && !message);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: false });

  const charCount = message.length;
  const maxChars = 600;

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTransmit = async () => {
    if (message.trim().length < 10 || sending) return;
    playClick();
    setSending(true);

    try {
      const res = await fetch('/api/transmit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, from }),
      });

      if (res.ok) {
        playSuccess();
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#B85C3B', '#FAF8F3', '#8E9A78'],
        });
        setSent(true);
      } else {
        throw new Error('API offline');
      }
    } catch {
      // Fallback: open mailto
      playSuccess();
      window.location.href = `mailto:${personal.email}?subject=Transmission from Portfolio&body=${encodeURIComponent(message)}`;
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen bg-[#161412] text-[#FAF8F3] overflow-hidden flex flex-col justify-between py-20 px-6 md:px-12 select-none border-t border-[#3A3832]">
      {/* Background Volumetric Ambient Lighting Sheen */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B85C3B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8E9A78]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#FAF8F3 1px, transparent 1px), linear-gradient(90deg, #FAF8F3 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between space-y-12">
        
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="border-b border-[#3A3832] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#B85C3B] mb-2 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B85C3B]" />
              <span>06 / OPEN TRANSMISSION CHANNEL</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-none text-[#FAF8F3]">
              INITIATE <span className="italic font-light text-[#B85C3B]">TRANSMISSION.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#FAF8F3]/70 font-bold shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8E9A78] animate-pulse" />
            <span className="text-[#FAF8F3]">STATUS: AVAILABLE FOR NEW PROJECTS</span>
          </div>
        </motion.div>

        {/* 2-Column Contact Command Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start flex-1">
          
          {/* Left Column — Quick Signal Channels & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Direct Email Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1E1C19] border border-[#3A3832] hover:border-[#B85C3B]/60 transition-all duration-300 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B85C3B] font-bold">
                  <Mail className="w-4 h-4" />
                  <span>DIRECT EMAIL SIGNAL</span>
                </div>
                <span className="text-[10px] font-mono text-[#FAF8F3]/50">CLICK TO COPY</span>
              </div>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={playHover}
                className="w-full text-left group flex items-center justify-between p-4 rounded-2xl bg-[#161412] border border-[#3A3832] hover:border-[#B85C3B] transition-all duration-300 cursor-pointer"
              >
                <span className="font-mono text-sm sm:text-base text-[#FAF8F3] font-bold truncate">
                  {personal.email}
                </span>
                {copied ? (
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 font-bold shrink-0">
                    <Check className="w-4 h-4" /> COPIED!
                  </span>
                ) : (
                  <Copy className="w-4 h-4 text-[#FAF8F3]/50 group-hover:text-[#B85C3B] transition-colors shrink-0" />
                )}
              </button>

              <div className="text-[11px] font-mono text-[#FAF8F3]/60 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8E9A78]" />
                <span>Response Time SLA: Under 24 Hours Guaranteed</span>
              </div>
            </div>

            {/* Social Signal Networks */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#FAF8F3]/50 font-bold">
                ENGINEERING NETWORKS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="p-4 rounded-2xl bg-[#1E1C19] border border-[#3A3832] hover:border-[#B85C3B] transition-all duration-300 flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FAF8F3]">
                    <GithubIcon className="w-4 h-4 text-[#B85C3B]" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FAF8F3]/40 group-hover:text-[#B85C3B] transition-colors" />
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="p-4 rounded-2xl bg-[#1E1C19] border border-[#3A3832] hover:border-[#B85C3B] transition-all duration-300 flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FAF8F3]">
                    <LinkedinIcon className="w-4 h-4 text-[#4A6FA5]" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FAF8F3]/40 group-hover:text-[#B85C3B] transition-colors" />
                </a>

                <a
                  href={personal.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="p-4 rounded-2xl bg-[#1E1C19] border border-[#3A3832] hover:border-[#B85C3B] transition-all duration-300 flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FAF8F3]">
                    <TwitterIcon className="w-4 h-4 text-[#9B5DE5]" />
                    <span>Twitter / X</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FAF8F3]/40 group-hover:text-[#B85C3B] transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Encrypted Transmission Composer Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 w-full"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 sm:p-12 rounded-3xl bg-[#1E1C19] border border-[#B85C3B]/60 text-center space-y-6 shadow-2xl"
                >
                  <div className="w-16 h-16 rounded-full bg-[#B85C3B]/20 text-[#B85C3B] flex items-center justify-center mx-auto border border-[#B85C3B]/40 shadow-lg">
                    <Send className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-serif font-bold text-[#FAF8F3]">Transmission Locked &amp; Received.</h3>
                    <p className="text-sm font-mono text-[#FAF8F3]/70 max-w-md mx-auto leading-relaxed">
                      Your signal has been encrypted and routed directly to Shubham's primary terminal. Expect a response within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSent(false); setMessage(''); setFrom(''); }}
                    className="px-8 py-3.5 rounded-full bg-[#B85C3B] text-[#FAF8F3] text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#FAF8F3] hover:text-[#161412] transition-all cursor-pointer shadow-md"
                  >
                    Send Another Transmission
                  </button>
                </motion.div>
              ) : (
                <div className="rounded-3xl bg-[#1E1C19] border border-[#3A3832] shadow-2xl p-6 sm:p-8 space-y-6">
                  {/* Terminal Title Bar */}
                  <div className="flex items-center justify-between border-b border-[#3A3832] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                      <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                      <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                      <span className="ml-3 text-xs font-mono text-[#FAF8F3]/60 uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#B85C3B]" />
                        <span>ENCRYPTED_TRANSMISSION.TXT</span>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#B85C3B] font-bold">256-BIT ENCRYPTED</span>
                  </div>

                  {/* Sender Name/Contact Input */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-[#FAF8F3]/60 uppercase tracking-[0.2em] font-bold">
                      SENDER IDENTIFICATION (Optional)
                    </div>
                    <input
                      type="text"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="Your Name / Email / Company"
                      className="w-full bg-[#161412] border border-[#3A3832] rounded-2xl px-4 py-3 text-sm font-mono text-[#FAF8F3] focus:outline-none focus:border-[#B85C3B] transition-colors placeholder:text-[#FAF8F3]/30"
                    />
                  </div>

                  {/* Message Composer Area */}
                  <div className="space-y-2 relative">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#FAF8F3]/60">
                      <span>TRANSMISSION PAYLOAD</span>
                      <span className={charCount > maxChars * 0.9 ? 'text-amber-400' : 'text-[#FAF8F3]/40'}>
                        {charCount} / {maxChars} CHARACTERS
                      </span>
                    </div>

                    <div className="relative rounded-2xl bg-[#161412] border border-[#3A3832] focus-within:border-[#B85C3B] transition-colors overflow-hidden">
                      <div className="absolute top-4 left-4 text-[#B85C3B] font-mono text-sm pointer-events-none">›</div>
                      <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder={focused ? '' : placeholder}
                        rows={7}
                        className="w-full bg-transparent text-[#FAF8F3] font-mono text-sm p-4 pl-9 focus:outline-none resize-none placeholder:text-[#FAF8F3]/30 leading-relaxed"
                        style={{ caretColor: '#B85C3B' }}
                      />
                    </div>
                  </div>

                  {/* Action Transmit Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="text-[10px] font-mono text-[#FAF8F3]/40 uppercase tracking-widest">
                      LOCATION: NASHIK, INDIA
                    </div>

                    <motion.button
                      onClick={handleTransmit}
                      onMouseEnter={playHover}
                      disabled={message.trim().length < 10 || sending}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xl"
                      style={{
                        backgroundColor: message.trim().length >= 10 ? '#B85C3B' : 'transparent',
                        color: message.trim().length >= 10 ? '#FAF8F3' : '#FAF8F3',
                        border: `1px solid ${message.trim().length >= 10 ? '#B85C3B' : '#3A3832'}`,
                      }}
                      whileHover={{ scale: message.trim().length >= 10 ? 1.03 : 1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {sending ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-[#FAF8F3] border-t-transparent animate-spin" />
                          <span>TRANSMITTING SIGNAL...</span>
                        </>
                      ) : (
                        <>
                          <span>TRANSMIT SIGNAL</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

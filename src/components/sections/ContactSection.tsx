'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  playClick: () => void;
  playHover: () => void;
  playSuccess: () => void;
}

const PLACEHOLDER_LINES = [
  "Hi Shubham, I'm Alex from TechCorp.",
  "We're building a next-gen SaaS platform",
  "and need a frontend engineer who thinks",
  "beyond components. Interested?",
];

// Typewriter for placeholder
function usePlaceholderTypewriter(lines: string[], active: boolean) {
  const [text, setText] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!active) return;
    const line = lines[lineIdx];
    const delay = deleting ? 30 : charIdx < line.length ? 55 : 1200;

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
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#B85C3B', '#FAF8F3', '#25231F'],
        });
        setSent(true);
      }
    } catch {
      // Fallback: open mailto
      window.location.href = `mailto:${personal.email}?subject=Transmission&body=${encodeURIComponent(message)}`;
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen bg-[#25231F] overflow-hidden flex flex-col">
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, #FAF8F3 0px, transparent 1px, transparent 4px)' }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B85C3B]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 max-w-5xl mx-auto w-full px-6 md:px-12 py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -90 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#B85C3B] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#B85C3B]">
              07 / OPEN CHANNEL
            </span>
          </div>

          <h2
            className="text-5xl md:text-7xl font-serif font-bold text-[#FAF8F3] leading-none mb-6"
            style={{ letterSpacing: '-0.03em' }}
          >
            LET'S<br />
            <span className="text-[#B85C3B]">TRANSMIT.</span>
          </h2>

          {/* Email — large, copyable */}
          <button
            onClick={handleCopyEmail}
            onMouseEnter={playHover}
            className="group flex items-center gap-3 text-[#9A948C] hover:text-[#FAF8F3] transition-colors cursor-pointer"
          >
            <span className="font-mono text-sm md:text-base">{personal.email}</span>
            {copied
              ? <Check className="w-4 h-4 text-emerald-400" />
              : <Copy className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            }
          </button>
        </motion.div>

        {/* Transmission composer */}
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <div className="text-6xl mb-6">📡</div>
              <h3 className="text-3xl font-serif font-bold text-[#FAF8F3] mb-3">Transmission Received.</h3>
              <p className="text-[#9A948C] font-light mb-8 max-w-md">
                Signal locked. I'll decode it and reply within 24 hours.
              </p>
              <button
                onClick={() => { setSent(false); setMessage(''); setFrom(''); }}
                className="px-6 py-2.5 rounded-full border border-[#B85C3B] text-[#B85C3B] text-xs font-mono uppercase tracking-widest hover:bg-[#B85C3B] hover:text-white transition-all cursor-pointer"
              >
                New Transmission
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col"
            >
              {/* Sender field */}
              <div className="mb-4">
                <div className="text-[10px] font-mono text-[#787268] uppercase tracking-[0.2em] mb-2">
                  SENDER IDENTIFICATION (optional)
                </div>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Your name · Company · Role"
                  className="w-full bg-transparent border-b border-[#3A3832] text-[#FAF8F3] font-mono text-sm py-2 focus:outline-none focus:border-[#B85C3B] transition-colors placeholder:text-[#4A4742]"
                />
              </div>

              {/* Message composer — the terminal */}
              <div className="flex-1 relative border border-[#3A3832] rounded-lg overflow-hidden focus-within:border-[#B85C3B] transition-colors">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-2 border-b border-[#3A3832] bg-[#1E1C19]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  <span className="ml-3 text-[10px] font-mono text-[#4A4742] uppercase tracking-widest">
                    transmission.txt
                  </span>
                </div>

                {/* Prompt line */}
                <div className="absolute top-10 left-4 text-[#B85C3B] font-mono text-sm pointer-events-none">›</div>

                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder={focused ? '' : placeholder}
                  rows={8}
                  className="w-full bg-transparent text-[#FAF8F3] font-mono text-sm p-4 pl-9 focus:outline-none resize-none placeholder:text-[#4A4742] leading-relaxed"
                  style={{ caretColor: '#B85C3B' }}
                />

                {/* Character count */}
                <div className="absolute bottom-3 right-4 text-[10px] font-mono text-[#4A4742]">
                  {charCount}/{maxChars}
                </div>
              </div>

              {/* Transmit controls */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-[10px] font-mono text-[#4A4742] uppercase tracking-widest">
                  {personal.location} · {personal.statusPill}
                </div>
                <motion.button
                  onClick={handleTransmit}
                  onMouseEnter={playHover}
                  disabled={message.trim().length < 10 || sending}
                  className="group flex items-center gap-3 px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: message.trim().length >= 10 ? '#B85C3B' : 'transparent',
                    color: message.trim().length >= 10 ? '#FAF8F3' : '#4A4742',
                    border: `1px solid ${message.trim().length >= 10 ? '#B85C3B' : '#3A3832'}`,
                  }}
                  whileHover={{ scale: message.trim().length >= 10 ? 1.03 : 1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {sending ? (
                    <>
                      <span className="w-3 h-3 rounded-full border-2 border-[#FAF8F3] border-t-transparent animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit</span>
                      <span className="text-lg leading-none">→</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

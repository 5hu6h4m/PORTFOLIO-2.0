'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface HeaderProps {
  playClick: () => void;
  playHover: () => void;
}

export function Header({ playClick, playHover }: HeaderProps) {
  const { personal } = PORTFOLIO_DATA;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Journey', href: '#journey-roadmap', id: 'journey-roadmap' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavHover = (href: string, id: string) => {
    playHover();

    // Clear any existing hover timeout for butter-smooth debouncing
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // 150ms Intent Debounce so passing mouse across navbar feels ultra-smooth & natural
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveSection(id);

      // Home = scroll to top; others = Lenis inertia scroll
      if (href === '#') {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1.6 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (window.__lenis) {
        window.__lenis.scrollTo(href, {
          duration: 1.6,
          offset: -80,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Trigger sub-cube piece scattering transition (only on section nav, not Home)
      if (href !== '#') {
        window.dispatchEvent(
          new CustomEvent('shatter-travel-destination', {
            detail: { href },
          })
        );
      }
    }, 150);
  };

  const handleNavClick = (href: string, id: string) => {
    playClick();
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveSection(id);

    if (href === '#') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.6 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (window.__lenis) {
      window.__lenis.scrollTo(href, {
        duration: 1.6,
        offset: -80,
      });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* ── FLOATING TOP HEADER NAVBAR ────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 select-none ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left Brand Mark */}
          <a
            href="#"
            onClick={() => handleNavClick('#', 'home')}
            onMouseEnter={playHover}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-full bg-[#25231F] text-[#FAF8F3] flex items-center justify-center font-serif font-bold text-sm border border-[#E2DCD2] group-hover:bg-[#B85C3B] transition-colors shadow-sm">
              {personal.brandMark}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-mono font-bold tracking-widest text-[#25231F] uppercase">
                {personal.name}
              </div>
              <div className="text-[9px] font-mono text-[#787268] uppercase tracking-widest">
                Full Stack Engineer
              </div>
            </div>
          </a>

          {/* Center Floating Pill Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F3]/90 backdrop-blur-xl border border-[#E2DCD2] shadow-lg">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => handleNavHover(link.href, link.id)}
                  onClick={() => handleNavClick(link.href, link.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-[#FAF8F3]' : 'text-[#787268] hover:text-[#25231F]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-[#25231F]"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={personal.resumeUrl}
              download
              onClick={playClick}
              onMouseEnter={playHover}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25231F] text-[#FAF8F3] hover:bg-[#B85C3B] transition-colors text-xs font-mono font-bold uppercase tracking-wider shadow-md"
            >
              <span>RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-[#FAF8F3] border border-[#E2DCD2] text-[#25231F]"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* ── MOBILE FULLSCREEN NAVIGATION OVERLAY ────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9980] bg-[#FAF8F3] flex flex-col justify-between p-8 md:p-12 select-none"
          >
            <div className="flex items-center justify-between pt-4">
              <span className="font-serif font-bold text-xl text-[#25231F]">{personal.brandMark}</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full bg-[#25231F] text-[#FAF8F3]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6 my-auto">
              {navLinks.map((link, idx) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick(link.href, link.id);
                  }}
                  className="text-3xl font-serif font-bold text-[#25231F] hover:text-[#B85C3B] transition-colors flex items-center justify-between border-b border-[#E2DCD2] pb-4"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-[#9A948C]">0{idx + 1}</span>
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E2DCD2] flex items-center justify-between text-xs font-mono text-[#787268]">
              <span>{personal.name}</span>
              <a href={`mailto:${personal.email}`} className="text-[#B85C3B] underline font-bold">
                CONNECT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

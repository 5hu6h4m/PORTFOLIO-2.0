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
    { label: 'Experience', href: '#experience', id: 'experience' },
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
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-4 md:py-6 transition-all duration-500 ${
          scrolled ? 'bg-[#F4F0E8]/90 backdrop-blur-xl border-b border-[#E2DCD2]/80 shadow-xs' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Mark: SJ. */}
          <a
            href="#"
            onMouseEnter={playHover}
            onClick={playClick}
            className="flex items-center gap-2.5 group pointer-events-auto"
          >
            <div className="text-xl font-serif font-bold text-[#25231F] tracking-tight group-hover:text-[#B85C3B] transition-colors">
              {personal.brandMark}
            </div>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#787268] uppercase tracking-wider pl-2 border-l border-[#E2DCD2]">
              SHUBHAM JADHAV
            </span>
          </a>

          {/* Desktop Navigation Links with Butter-Smooth Layout Spring Pill */}
          <div className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FAF8F3]/95 backdrop-blur-xl border border-[#E2DCD2] shadow-xs pointer-events-auto relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => handleNavHover(link.href, link.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, link.id);
                  }}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-colors duration-300 ${
                    isActive ? 'text-[#FAF8F3]' : 'text-[#787268] hover:text-[#25231F]'
                  }`}
                >
                  {/* Butter-Smooth Active Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-[#25231F] rounded-full shadow-sm -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Action Links: Resume ↗ & Socials */}
          <div className="hidden md:flex items-center gap-4 pointer-events-auto">
            <div className="flex items-center gap-2 pr-2 border-r border-[#E2DCD2]">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="p-2 rounded-full text-[#787268] hover:text-[#B85C3B] transition-colors"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="p-2 rounded-full text-[#787268] hover:text-[#B85C3B] transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <a
              href={personal.resumeUrl}
              download
              onMouseEnter={playHover}
              onClick={playClick}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-[#25231F] text-[#FAF8F3] text-xs font-mono uppercase font-semibold hover:bg-[#B85C3B] transition-colors shadow-xs"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-3 pointer-events-auto">
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2.5 rounded-full bg-[#FAF8F3] border border-[#E2DCD2] text-[#25231F] shadow-xs"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Cinematic Luxury Overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { 
                clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                opacity: 0 
              },
              visible: { 
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                opacity: 1,
                transition: { 
                  duration: 0.75, 
                  ease: [0.76, 0, 0.24, 1],
                  staggerChildren: 0.08,
                  delayChildren: 0.1
                } 
              },
              exit: { 
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                opacity: 0,
                transition: { 
                  duration: 0.55, 
                  ease: [0.76, 0, 0.24, 1] 
                } 
              }
            }}
            className="fixed inset-0 z-30 bg-[#1A1816]/98 backdrop-blur-3xl flex flex-col justify-between p-8 pt-28 lg:hidden pointer-events-auto"
          >
            {/* Elegant Background Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#B85C3B]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#E2DCD2]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-md mx-auto w-full my-auto flex flex-col justify-between h-full max-h-[75vh] relative z-10">
              <nav className="flex flex-col gap-6 text-left w-full">
                {navLinks.map((link, idx) => (
                  <motion.div 
                    key={link.label} 
                    variants={{
                      hidden: { y: 35, opacity: 0 },
                      visible: { 
                        y: 0, 
                        opacity: 1, 
                        transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } 
                      }
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        playClick();
                        setMobileMenuOpen(false);
                        handleNavClick(link.href, link.id);
                      }}
                      className="group py-2.5 flex items-baseline justify-between border-b border-[#FAF8F3]/10 hover:border-[#B85C3B]/60 transition-colors duration-500"
                    >
                      <div className="flex items-baseline">
                        <span className="font-mono text-[11px] text-[#B85C3B]/80 mr-4 tracking-widest">
                          0{idx + 1}
                        </span>
                        <span className="text-3xl font-serif font-medium text-[#FAF8F3] group-hover:text-[#B85C3B] group-hover:translate-x-2 transition-all duration-300">
                          {link.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-[#FAF8F3]/30 group-hover:text-[#B85C3B] group-hover:rotate-45 transition-all duration-300" />
                    </a>
                  </motion.div>
                ))}
              </nav>

              <motion.div 
                variants={{
                  hidden: { y: 35, opacity: 0 },
                  visible: { 
                    y: 0, 
                    opacity: 1, 
                    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } 
                  }
                }} 
                className="flex flex-col items-center gap-6 pt-8 border-t border-[#FAF8F3]/10 w-full"
              >
                <div className="flex items-center justify-center gap-4 w-full">
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-full bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 text-[#FAF8F3] hover:text-[#B85C3B] hover:border-[#B85C3B] transition-colors shadow-xs"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-full bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 text-[#FAF8F3] hover:text-[#B85C3B] hover:border-[#B85C3B] transition-colors shadow-xs"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={personal.resumeUrl}
                    download
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#B85C3B] text-white text-xs font-mono uppercase font-bold shadow-md hover:bg-[#A04D2E] transition-colors"
                  >
                    <span>Download Resume</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
                
                <p className="text-[10px] font-mono text-[#FAF8F3]/40 tracking-wider uppercase text-center">
                  Shubham Jadhav · Portfolio ©2026
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

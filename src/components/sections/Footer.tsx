'use client';

import { motion } from 'framer-motion';
import { ArrowUp, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/BrandIcons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface FooterProps {
  playClick: () => void;
  playHover: () => void;
}

export function Footer({ playClick, playHover }: FooterProps) {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { label: 'GitHub', href: personal.github, icon: GithubIcon },
    { label: 'LinkedIn', href: personal.linkedin, icon: LinkedinIcon },
    { label: 'Twitter', href: personal.twitter, icon: TwitterIcon },
    { label: 'Résumé PDF', href: personal.resumeUrl, icon: FileText },
  ];

  return (
    <footer className="bg-[#25231F] text-[#FAF8F3] pt-20 pb-12 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-12 border-b border-[#FAF8F3]/10 gap-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#B85C3B] mb-3">
              FRONTEND & FULL-STACK ENGINEER PORTFOLIO
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-[#FAF8F3]">
              SHUBHAM JADHAV
            </h2>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={playHover}
            className="self-start md:self-auto p-4 rounded-full bg-[#FAF8F3]/10 border border-[#FAF8F3]/20 hover:bg-[#B85C3B] hover:border-[#B85C3B] text-[#FAF8F3] transition-colors cursor-pointer group"
            title="Scroll to top of page"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bottom Social & Copyright Grid */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#787268]">
          <div className="flex flex-wrap items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="flex items-center gap-1.5 hover:text-[#B85C3B] transition-colors uppercase"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          <div>
            © {new Date().getFullYear()} SHUBHAM JADHAV. ENGINEERED WITH NEXT.JS 15, REACT 19 & TAILWIND V4.
          </div>
        </div>
      </div>
    </footer>
  );
}

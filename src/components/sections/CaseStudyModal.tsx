'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { Project } from '@/data/portfolioData';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  playClick: () => void;
}

export function CaseStudyModal({ project, onClose, playClick }: CaseStudyModalProps) {
  if (!project) return null;

  const { caseStudy } = project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClick();
            onClose();
          }}
          className="fixed inset-0 bg-[#25231F]/70 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F4F0E8] rounded-3xl border border-[#E2DCD2] p-6 md:p-12 shadow-2xl z-10 text-[#25231F]"
        >
          {/* Close button */}
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-[#FAF8F3] border border-[#E2DCD2] hover:bg-[#25231F] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-8 pr-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B85C3B] font-semibold">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[#787268]">• {project.year}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#25231F] mb-2">
              {project.title}
            </h2>
            <p className="text-base text-[#787268] font-light">{project.subtitle}</p>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#FAF8F3] border border-[#E2DCD2] mb-10">
            {caseStudy.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="text-2xl font-serif font-bold text-[#B85C3B]">
                  {metric.value}
                </div>
                <div className="text-xs font-mono text-[#787268]">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Overview & Challenge */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-lg font-serif font-bold mb-2">The Overview</h3>
              <p className="text-sm text-[#787268] font-light leading-relaxed">
                {caseStudy.overview}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold mb-2">Technical Challenge</h3>
              <p className="text-sm text-[#787268] font-light leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
          </div>

          {/* Solution Architecture */}
          <div className="mb-10 p-6 rounded-2xl bg-[#FAF8F3] border border-[#E2DCD2]">
            <h3 className="text-lg font-serif font-bold mb-4">Architecture Highlights</h3>
            <ul className="space-y-3">
              {caseStudy.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#25231F]">
                  <CheckCircle2 className="w-4 h-4 text-[#B85C3B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div className="mb-10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#787268] mb-3">
              TECHNOLOGY STACK
            </h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-[#FAF8F3] text-xs font-mono text-[#25231F] border border-[#E2DCD2]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E2DCD2]">
            <div className="flex items-center gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25231F] text-[#FAF8F3] text-xs font-mono uppercase font-semibold hover:bg-[#B85C3B] transition-colors"
              >
                <span>Launch Live Project</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF8F3] text-[#25231F] text-xs font-mono uppercase font-semibold border border-[#E2DCD2] hover:border-[#B85C3B] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Source</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

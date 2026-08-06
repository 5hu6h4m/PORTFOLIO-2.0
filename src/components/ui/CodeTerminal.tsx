'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Terminal, Code2, GitBranch, ShieldCheck } from 'lucide-react';

export function CodeTerminal() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'developer' | 'stack' | 'cmd'>('developer');

  const codeSnippets = {
    developer: `// ShubhamJadhav.config.ts
export const developer = {
  name: "Shubham Jadhav",
  role: "Frontend Engineer / Full-Stack Developer",
  status: "Open for Opportunities",
  leadership: "President @ E-Cell MET BKC",
  coreFocus: [
    "High-Performance React/Next.js Architecture",
    "Sub-Second Core Web Vitals Optimization",
    "Node.js & PostgreSQL Backend Systems"
  ],
  buildProduct: () => Promise.resolve({ lighthouse: 99, productionReady: true })
};`,
    stack: `// techStack.json
{
  "frontend": ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS v4"],
  "backend": ["Node.js", "Express.js", "PostgreSQL", "Prisma", "MongoDB"],
  "motion": ["Three.js", "React Three Fiber", "GSAP ScrollTrigger", "Lenis"],
  "tools": ["Git", "GitHub Actions", "Docker", "Vercel"]
}`,
    cmd: `$ npx shubham-jadhav
✔ Fetching developer profile...
✔ Verifying technical certifications [Meta, Frontend Masters]...
✔ Loading production projects...
→ 18+ Apps Deployed | 98+ Lighthouse Score
→ Available for Senior Engineering Engagements.`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-[#191817] text-[#FAF8F3] border border-[#25231F] shadow-2xl overflow-hidden font-mono text-xs select-none">
      {/* IDE Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#25231F] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-[11px] text-[#787268] ml-2 flex items-center gap-1">
            <GitBranch className="w-3 h-3 text-[#B85C3B]" />
            main*
          </span>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 bg-[#191817] p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setActiveTab('developer')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
              activeTab === 'developer' ? 'bg-[#B85C3B] text-white font-semibold' : 'text-[#787268] hover:text-white'
            }`}
          >
            Developer.ts
          </button>
          <button
            onClick={() => setActiveTab('stack')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
              activeTab === 'stack' ? 'bg-[#B85C3B] text-white font-semibold' : 'text-[#787268] hover:text-white'
            }`}
          >
            Stack.json
          </button>
          <button
            onClick={() => setActiveTab('cmd')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
              activeTab === 'cmd' ? 'bg-[#B85C3B] text-white font-semibold' : 'text-[#787268] hover:text-white'
            }`}
          >
            Terminal
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-white/10 text-[#787268] hover:text-white transition-colors cursor-pointer"
          title="Copy snippet"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Editor Body */}
      <div className="p-5 overflow-x-auto max-h-64 leading-relaxed text-[#FAF8F3]/90">
        <pre className="font-mono text-[11px]">
          <code>{codeSnippets[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
}

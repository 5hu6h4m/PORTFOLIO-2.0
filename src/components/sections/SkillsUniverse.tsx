'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Sparkles, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface SkillsUniverseProps {
  onClose: () => void;
  playClick: () => void;
  playHover: () => void;
}

interface NodeSkill {
  name: string;
  category: string;
  x: number; // percentage width
  y: number; // percentage height
  level: number;
  exp: string;
  detail: string;
}

export function SkillsUniverse({ onClose, playClick, playHover }: SkillsUniverseProps) {
  const [selectedNode, setSelectedNode] = useState<NodeSkill | null>(null);

  // Position nodes inside a coordinate map to look organic yet balanced
  const nodes: NodeSkill[] = [
    { name: 'React', category: 'frontend', x: 50, y: 50, level: 95, exp: '3+ Years', detail: 'Advanced architecture, state systems (Redux, Zustand), Hooks & Server Components.' },
    { name: 'Next.js', category: 'frontend', x: 35, y: 40, level: 92, exp: '2 Years', detail: 'App router optimization, SSR, Static Generation, dynamic caching mechanisms.' },
    { name: 'TypeScript', category: 'frontend', x: 65, y: 40, level: 90, exp: '2.5 Years', detail: 'Strict typing structures, generics, utility helper typings, robust modular code.' },
    { name: 'Tailwind CSS', category: 'frontend', x: 20, y: 35, level: 95, exp: '3 Years', detail: 'Responsive web engineering, fluid systems, complex animation utilities.' },
    { name: 'Three.js', category: 'interactive', x: 52, y: 25, level: 82, exp: '1 Year', detail: 'Interactive 3D spaces, shaders, materials, light configurations.' },
    { name: 'Framer Motion', category: 'interactive', x: 30, y: 65, level: 92, exp: '2 Years', detail: 'Staggered elements, gesture hooks, layout transformations, spring physics.' },
    { name: 'GSAP', category: 'interactive', x: 70, y: 65, level: 85, exp: '1.5 Years', detail: 'ScrollTrigger timelines, hardware-accelerated animations, complex tweens.' },
    { name: 'Node.js', category: 'backend', x: 48, y: 78, level: 88, exp: '2 Years', detail: 'RESTful API construction, cluster configuration, asynchronous scripting.' },
    { name: 'Express', category: 'backend', x: 32, y: 82, level: 88, exp: '2 Years', detail: 'Modular routers, middleware validation, payload parsers, error-handling chains.' },
    { name: 'MongoDB', category: 'backend', x: 68, y: 82, level: 85, exp: '2 Years', detail: 'Indexing strategies, database pipelines, model relationships, mongoose queries.' },
  ];

  // SVG lines representing connections between nodes
  const connections = [
    { from: 'React', to: 'Next.js' },
    { from: 'React', to: 'TypeScript' },
    { from: 'React', to: 'Three.js' },
    { from: 'React', to: 'Framer Motion' },
    { from: 'React', to: 'GSAP' },
    { from: 'React', to: 'Node.js' },
    { from: 'Next.js', to: 'Tailwind CSS' },
    { from: 'Node.js', to: 'Express' },
    { from: 'Node.js', to: 'MongoDB' },
    { from: 'Express', to: 'MongoDB' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#161412] text-[#FAF8F3] relative flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#FAF8F3]/10 pb-4 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 text-xs font-mono text-[#FAF8F3]/80 hover:text-[#B85C3B] hover:border-[#B85C3B]/40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>EXIT ARCHIVE</span>
          </button>
          <span className="text-[10px] font-mono text-[#FAF8F3]/40 tracking-wider hidden sm:inline-block">
            CHAPTER 05 // SKILLS UNIVERSE NODE SYSTEM
          </span>
        </div>

        <div className="text-xs font-mono text-[#FAF8F3]/70">
          HOVER OR TAP A NODE FOR DETAILS
        </div>
      </div>

      {/* Main Interactive Space */}
      <div className="my-auto max-w-7xl mx-auto w-full py-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full min-h-[60vh]">
        
        {/* Left Side: Interconnected Node Map Canvas */}
        <div className="lg:col-span-8 relative w-full h-[380px] md:h-[500px] bg-[#1A1816] border border-[#FAF8F3]/5 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-4">
          
          {/* Animated Ambient Backglow */}
          <div className="absolute inset-0 bg-[#B85C3B]/2 pointer-events-none" />

          {/* SVG Connection Lines Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B85C3B" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FAF8F3" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {connections.map((conn, idx) => {
              const fromNode = nodes.find((n) => n.name === conn.from);
              const toNode = nodes.find((n) => n.name === conn.to);
              if (!fromNode || !toNode) return null;
              
              return (
                <motion.line
                  key={idx}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke="url(#glowGrad)"
                  strokeWidth="1.5"
                  initial={{ strokeDasharray: '4 4', strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -20 }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                />
              );
            })}
          </svg>

          {/* Render Interactive Floating Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNode?.name === node.name;
            
            return (
              <motion.div
                key={node.name}
                style={{
                  position: 'absolute',
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  y: [
                    Math.sin(node.x) * 6,
                    Math.cos(node.y) * 8,
                    Math.sin(node.x) * 6,
                  ],
                }}
                transition={{
                  duration: 5 + (node.x % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="z-10"
              >
                <div
                  onMouseEnter={() => {
                    playHover();
                    setSelectedNode(node);
                  }}
                  onClick={() => {
                    playClick();
                    setSelectedNode(node);
                  }}
                  className={`px-4 py-2.5 rounded-full border text-xs font-mono font-bold tracking-wider cursor-pointer shadow-lg transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#B85C3B] text-white border-transparent scale-110 shadow-[#B85C3B]/20'
                      : 'bg-[#161412] text-[#FAF8F3]/90 border-[#FAF8F3]/15 hover:border-[#B85C3B] hover:text-[#B85C3B] hover:scale-105'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#B85C3B]'} animate-pulse`} />
                    <span>{node.name}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Side: Node Details Sidebar */}
        <div className="lg:col-span-4 h-full flex flex-col justify-center">
          <div className="p-6 rounded-3xl bg-[#1A1816] border border-[#FAF8F3]/5 shadow-2xl space-y-6 min-h-[300px] flex flex-col justify-between">
            {selectedNode ? (
              <div className="space-y-5 my-auto">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF8F3]/5 border border-[#FAF8F3]/10 text-[#B85C3B]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#FAF8F3]">{selectedNode.name}</h3>
                    <span className="text-[10px] font-mono text-[#FAF8F3]/40 uppercase tracking-widest">{selectedNode.category} ENGINE</span>
                  </div>
                </div>

                <p className="text-xs text-[#FAF8F3]/80 leading-relaxed font-light">
                  {selectedNode.detail}
                </p>

                <div className="space-y-2 border-t border-[#FAF8F3]/10 pt-4 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#FAF8F3]/40">EXPERIENCE</span>
                    <span className="text-[#FAF8F3]/80">{selectedNode.exp}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#FAF8F3]/40">MASTERY LEVEL</span>
                    <span className="text-[#B85C3B] font-bold">{selectedNode.level}%</span>
                  </div>
                  <div className="w-full bg-[#FAF8F3]/5 h-1 rounded-full overflow-hidden mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedNode.level}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-[#B85C3B]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center my-auto py-8 space-y-4">
                <Sparkles className="w-8 h-8 text-[#FAF8F3]/25 mx-auto animate-pulse" />
                <h4 className="text-lg font-serif font-bold text-[#FAF8F3]/70">Node Info Center</h4>
                <p className="text-xs text-[#FAF8F3]/40 leading-relaxed max-w-xs mx-auto">
                  Hover over or click any technology node on the visual connector board to load its execution parameters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full border-t border-[#FAF8F3]/10 pt-4 relative z-10">
        <span className="text-[10px] font-mono text-[#FAF8F3]/30 tracking-wider">
          SJ-ENGINE // STABLE BUILD PROD_05
        </span>
        <span className="text-[10px] font-mono text-[#FAF8F3]/30 tracking-wider">
          SYSTEM: INTERACTIVE GRAPH TIMELINE
        </span>
      </div>
    </div>
  );
}

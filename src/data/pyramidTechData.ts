export interface DomainFace {
  id: 'frontend' | 'backend' | 'database' | 'devops';
  title: string;
  subtitle: string;
  angle: number; // Y-rotation angle in radians: 0, Math.PI/2, Math.PI, 3*Math.PI/2
  accentColor: string;
  description: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
}

export const DOMAIN_FACES: DomainFace[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    subtitle: 'Face 1 — Front (0°)',
    angle: 0,
    accentColor: '#B85C3B',
    description: 'Building reactive, component-driven interfaces with React 19, Next.js 15, strict TypeScript, and utility-first Tailwind CSS.',
    technologies: ['React 19', 'Next.js 15', 'TypeScript', 'JavaScript ES6+', 'Tailwind CSS v4', 'Redux Toolkit', 'Zustand'],
    metrics: [
      { label: 'Core Vitals Score', value: '98+' },
      { label: 'Experience', value: '4.0+ Yrs' },
      { label: 'Production MVPs', value: '18+' },
      { label: 'Type Safety', value: 'Strict 100%' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Systems',
    subtitle: 'Face 2 — Right (90°)',
    angle: Math.PI / 2,
    accentColor: '#8E9A78',
    description: 'High-throughput asynchronous Node.js REST services, Express middleware pipelines, WebSocket streams, and backend architecture.',
    technologies: ['Node.js', 'Express.js', 'RESTful APIs', 'WebSockets / Socket.io', 'JWT Auth', 'GraphQL'],
    metrics: [
      { label: 'API Latency', value: '< 25ms' },
      { label: 'Experience', value: '3.5+ Yrs' },
      { label: 'Real-Time Sync', value: 'Socket.io' },
      { label: 'Architecture', value: 'Microservices' },
    ],
  },
  {
    id: 'database',
    title: 'Databases & Caching',
    subtitle: 'Face 3 — Back (180°)',
    angle: Math.PI,
    accentColor: '#4A6FA5',
    description: 'Relational PostgreSQL with Prisma ORM, MongoDB NoSQL document stores, and Redis in-memory sub-millisecond API caching.',
    technologies: ['MongoDB', 'PostgreSQL', 'Prisma ORM', 'Redis Caching', 'Aggregation Pipelines', 'ACID Transactions'],
    metrics: [
      { label: 'Database Schemas', value: 'ACID Robust' },
      { label: 'Redis Speed', value: 'Sub-1ms' },
      { label: 'Experience', value: '3.0+ Yrs' },
      { label: 'ORM Queries', value: 'Type-Safe' },
    ],
  },
  {
    id: 'devops',
    title: 'Tools & DevOps',
    subtitle: 'Face 4 — Left (270°)',
    angle: (3 * Math.PI) / 2,
    accentColor: '#25231F',
    description: 'Isolated Docker containers, GitHub Actions CI/CD workflows, AWS cloud hosting, Vercel edge networks, VS Code, Postman, and Figma.',
    technologies: ['Git & GitHub', 'Docker Containers', 'AWS Cloud S3/CDN', 'Vercel Edge', 'VS Code', 'Postman', 'Figma'],
    metrics: [
      { label: 'CI/CD Pipelines', value: 'Automated' },
      { label: 'Containers', value: 'Multi-Stage' },
      { label: 'DevOps Tools', value: 'Modern Stack' },
      { label: 'Deployment', value: 'Edge CDN' },
    ],
  },
];

export interface PyramidCubeItem {
  id: string;
  name: string;
  symbol: string; // Icon / Emblem logo
  domainId: 'frontend' | 'backend' | 'database' | 'devops';
  layer: 1 | 2 | 3 | 4;
  layerName: string;
  accentColor: string;
  description: string;
}

export const PYRAMID_CUBE_ITEMS: PyramidCubeItem[] = [
  // Apex (1)
  { id: 'apex-1', name: 'Full-Stack Architecture', symbol: '⚡', domainId: 'frontend', layer: 4, layerName: 'Layer 4 — Apex Architecture', accentColor: '#B85C3B', description: 'End-to-end web architecture unifying design systems, 3D WebGL, and cloud endpoints.' },

  // Layer 3 (4 Cubes)
  { id: 'l3-1', name: 'React 19 & Next.js 15', symbol: '⚛️', domainId: 'frontend', layer: 3, layerName: 'Layer 3 — Core Frameworks', accentColor: '#B85C3B', description: 'Concurrent React rendering, SSR, and App Router server components.' },
  { id: 'l3-2', name: 'Node.js & Express', symbol: '⬢', domainId: 'backend', layer: 3, layerName: 'Layer 3 — Core Frameworks', accentColor: '#8E9A78', description: 'High-speed event loop REST APIs and streaming web services.' },
  { id: 'l3-3', name: 'PostgreSQL & MongoDB', symbol: '🐘', domainId: 'database', layer: 3, layerName: 'Layer 3 — Core Frameworks', accentColor: '#4A6FA5', description: 'Relational SQL & NoSQL document stores with type-safe Prisma ORM.' },
  { id: 'l3-4', name: 'Docker & Git DevOps', symbol: '🐳', domainId: 'devops', layer: 3, layerName: 'Layer 3 — Core Frameworks', accentColor: '#25231F', description: 'Containerization and automated build verification workflows.' },

  // Layer 2 (9 Cubes)
  { id: 'l2-1', name: 'TypeScript Strict', symbol: 'TS', domainId: 'frontend', layer: 2, layerName: 'Layer 2 — Frontend & Systems', accentColor: '#B85C3B', description: 'Compile-time type safety and generics.' },
  { id: 'l2-2', name: 'Tailwind CSS v4', symbol: '🎨', domainId: 'frontend', layer: 2, layerName: 'Layer 2 — Frontend & Systems', accentColor: '#B85C3B', description: 'Utility design tokens & glassmorphism.' },
  { id: 'l2-3', name: 'REST APIs & WebSockets', symbol: '🔌', domainId: 'backend', layer: 2, layerName: 'Layer 2 — Frontend & Systems', accentColor: '#8E9A78', description: 'Bi-directional real-time event streaming and REST contracts.' },
  { id: 'l2-4', name: 'Redis In-Memory Caching', symbol: '⚡', domainId: 'database', layer: 2, layerName: 'Layer 2 — Frontend & Systems', accentColor: '#4A6FA5', description: 'Sub-millisecond API rate limiting and session caching.' },
  { id: 'l2-5', name: 'Three.js & WebGL', symbol: '🧊', domainId: 'frontend', layer: 2, layerName: 'Layer 2 — Frontend & Systems', accentColor: '#B85C3B', description: 'Declarative 3D canvases and GLSL shaders.' },
  { id: 'l2-6', name: 'Prisma ORM Models', symbol: '💎', domainId: 'database', layer: 2, layerName: 'Layer 2 — Frontend & Systems', accentColor: '#4A6FA5', description: 'Type-safe relational database schemas.' },
  { id: 'l2-7', name: 'GitHub Actions CI/CD', symbol: '🐙', domainId: 'devops', layer: 2, layerName: 'Layer 2 — Frontend & Systems', accentColor: '#25231F', description: 'Automated test pipelines & version releases.' },
  { id: 'l2-8', name: 'AWS S3 & CloudFront', symbol: '☁️', domainId: 'devops', layer: 2, layerName: 'Layer 2 — Frontend & Systems', accentColor: '#25231F', description: 'Static asset storage and global edge CDN.' },
  { id: 'l2-9', name: 'Zustand & Redux', symbol: '🐻', domainId: 'frontend', layer: 2, layerName: 'Layer 2 — Frontend & Systems', accentColor: '#B85C3B', description: 'Centralized reactive state management.' },

  // Layer 1 (16 Cubes Base)
  { id: 'l1-1', name: 'JavaScript ES6+', symbol: 'JS', domainId: 'frontend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#B85C3B', description: 'Event loop and async promise pipelines.' },
  { id: 'l1-2', name: 'HTML5 & ARIA', symbol: '🌐', domainId: 'frontend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#B85C3B', description: 'Accessible semantic markup.' },
  { id: 'l1-3', name: 'CSS3 Grid & Flex', symbol: '📦', domainId: 'frontend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#B85C3B', description: 'Responsive container queries.' },
  { id: 'l1-4', name: 'MongoDB Aggregation', symbol: '🍃', domainId: 'database', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#4A6FA5', description: 'BSON document schemas and aggregation.' },
  { id: 'l1-5', name: 'Socket.io Channels', symbol: '⚡', domainId: 'backend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#8E9A78', description: 'Real-time multi-room event broadcasting.' },
  { id: 'l1-6', name: 'JWT & OAuth Security', symbol: '🔒', domainId: 'backend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#8E9A78', description: 'Secure token authentication.' },
  { id: 'l1-7', name: 'PostgreSQL Relational', symbol: '🐘', domainId: 'database', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#4A6FA5', description: 'ACID compliant SQL transactions.' },
  { id: 'l1-8', name: 'GSAP ScrollTrigger', symbol: '🎯', domainId: 'frontend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#B85C3B', description: 'Timeline animations and scroll parallax.' },
  { id: 'l1-9', name: 'Framer Motion Spring', symbol: '🌊', domainId: 'frontend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#B85C3B', description: 'Layout animations and spring dampening.' },
  { id: 'l1-10', name: 'Vercel Edge Network', symbol: '▲', domainId: 'devops', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#25231F', description: 'Serverless deployment and previews.' },
  { id: 'l1-11', name: 'VS Code Tooling', symbol: '💻', domainId: 'devops', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#25231F', description: 'IDE refactoring & workspace setups.' },
  { id: 'l1-12', name: 'Postman API Testing', symbol: '🚀', domainId: 'devops', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#25231F', description: 'Automated test suite collections.' },
  { id: 'l1-13', name: 'Figma Design System', symbol: '❖', domainId: 'devops', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#25231F', description: 'Component auto-layout design systems.' },
  { id: 'l1-14', name: 'Git Version Control', symbol: '🐙', domainId: 'devops', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#25231F', description: 'Branching and sanitized commit logs.' },
  { id: 'l1-15', name: 'Sub-Second Web Vitals', symbol: '📈', domainId: 'frontend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#B85C3B', description: 'Lighthouse 98+ performance tuning.' },
  { id: 'l1-16', name: 'Linux Shell Admin', symbol: '🐧', domainId: 'devops', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#25231F', description: 'SSH server operations & bash scripts.' },
];

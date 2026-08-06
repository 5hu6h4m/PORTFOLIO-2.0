export interface DomainFace {
  id: 'frontend' | 'backend' | 'three' | 'devops';
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
    title: 'Frontend Architecture',
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
    title: 'Full-Stack & Systems',
    subtitle: 'Face 2 — Right (90°)',
    angle: Math.PI / 2,
    accentColor: '#8E9A78',
    description: 'High-throughput asynchronous Node.js REST services, Express middleware pipelines, WebSocket streams, and PostgreSQL relational schemas.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Prisma ORM', 'WebSockets', 'Redis Caching'],
    metrics: [
      { label: 'API Latency', value: '< 25ms' },
      { label: 'Experience', value: '3.5+ Yrs' },
      { label: 'Real-Time Sync', value: 'Socket.io' },
      { label: 'Database Schemas', value: 'ACID Robust' },
    ],
  },
  {
    id: 'three',
    title: '3D WebGL & Motion',
    subtitle: 'Face 3 — Back (180°)',
    angle: Math.PI,
    accentColor: '#4A6FA5',
    description: 'Immersive WebGL 3D canvases, custom GLSL shaders, 60 FPS instanced mesh physics, GSAP timelines, and Framer Motion layout physics.',
    technologies: ['Three.js', 'React Three Fiber', 'GSAP ScrollTrigger', 'Framer Motion', 'GLSL Custom Shaders'],
    metrics: [
      { label: 'Target Frame Rate', value: '60 FPS' },
      { label: 'Instanced Cubes', value: '1,000+' },
      { label: 'Experience', value: '2.5+ Yrs' },
      { label: 'Interactive Canvases', value: 'Sub-Pixel' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Infrastructure',
    subtitle: 'Face 4 — Left (270°)',
    angle: (3 * Math.PI) / 2,
    accentColor: '#25231F',
    description: 'Isolated Docker containers, GitHub Actions CI/CD workflows, AWS S3/CloudFront infrastructure, Vercel edge networks, and Linux shell administration.',
    technologies: ['Docker', 'AWS Infrastructure', 'Git & GitHub', 'GitHub Actions CI/CD', 'Vercel Edge', 'Linux Shell'],
    metrics: [
      { label: 'CI/CD Pipelines', value: 'Automated' },
      { label: 'Containers', value: 'Multi-Stage' },
      { label: 'Version Control', value: '4.0+ Yrs' },
      { label: 'Deployment', value: 'Edge CDN' },
    ],
  },
];

export interface PyramidCubeItem {
  id: string;
  name: string;
  domainId: 'frontend' | 'backend' | 'three' | 'devops';
  layer: 1 | 2 | 3 | 4;
  layerName: string;
  accentColor: string;
  description: string;
}

export const PYRAMID_CUBE_ITEMS: PyramidCubeItem[] = [
  // Apex
  { id: 'apex-1', name: 'Full-Stack Web Architecture', domainId: 'frontend', layer: 4, layerName: 'Layer 4 — Apex', accentColor: '#B85C3B', description: 'End-to-end architecture unifying design systems, 3D WebGL, and cloud endpoints.' },

  // Layer 3 (4 Cubes)
  { id: 'l3-1', name: 'React 19 & Next.js 15', domainId: 'frontend', layer: 3, layerName: 'Layer 3 — Core Frameworks', accentColor: '#B85C3B', description: 'Concurrent React rendering, SSR, and App Router server components.' },
  { id: 'l3-2', name: 'Node.js & Async IO', domainId: 'backend', layer: 3, layerName: 'Layer 3 — Core Frameworks', accentColor: '#8E9A78', description: 'High-speed event loop REST APIs and streaming web services.' },
  { id: 'l3-3', name: 'Three.js & WebGL', domainId: 'three', layer: 3, layerName: 'Layer 3 — Core Frameworks', accentColor: '#4A6FA5', description: '3D WebGL scenes, custom shaders, and instanced geometry physics.' },
  { id: 'l3-4', name: 'Docker & CI/CD Pipelines', domainId: 'devops', layer: 3, layerName: 'Layer 3 — Core Frameworks', accentColor: '#25231F', description: 'Containerization and automated build verification workflows.' },

  // Layer 2 (9 Cubes)
  { id: 'l2-1', name: 'TypeScript Strict', domainId: 'frontend', layer: 2, layerName: 'Layer 2 — Frontend & APIs', accentColor: '#B85C3B', description: 'Compile-time type safety and generics.' },
  { id: 'l2-2', name: 'Tailwind CSS v4', domainId: 'frontend', layer: 2, layerName: 'Layer 2 — Frontend & APIs', accentColor: '#B85C3B', description: 'Utility design tokens & glassmorphism.' },
  { id: 'l2-3', name: 'Express Middleware', domainId: 'backend', layer: 2, layerName: 'Layer 2 — Frontend & APIs', accentColor: '#8E9A78', description: 'RESTful routes and auth pipelines.' },
  { id: 'l2-4', name: 'PostgreSQL & Prisma', domainId: 'backend', layer: 2, layerName: 'Layer 2 — Frontend & APIs', accentColor: '#8E9A78', description: 'Type-safe relational database queries.' },
  { id: 'l2-5', name: 'React Three Fiber', domainId: 'three', layer: 2, layerName: 'Layer 2 — Frontend & APIs', accentColor: '#4A6FA5', description: 'Declarative R3F component canvases.' },
  { id: 'l2-6', name: 'GSAP ScrollTrigger', domainId: 'three', layer: 2, layerName: 'Layer 2 — Frontend & APIs', accentColor: '#4A6FA5', description: 'Timeline animations and scroll parallax.' },
  { id: 'l2-7', name: 'Git & GitHub Actions', domainId: 'devops', layer: 2, layerName: 'Layer 2 — Frontend & APIs', accentColor: '#25231F', description: 'Branch management and automated testing.' },
  { id: 'l2-8', name: 'AWS S3 & CloudFront', domainId: 'devops', layer: 2, layerName: 'Layer 2 — Frontend & APIs', accentColor: '#25231F', description: 'Static asset storage and global edge CDN.' },
  { id: 'l2-9', name: 'Zustand & Redux', domainId: 'frontend', layer: 2, layerName: 'Layer 2 — Frontend & APIs', accentColor: '#B85C3B', description: 'Centralized state management.' },

  // Layer 1 (16 Cubes Base)
  { id: 'l1-1', name: 'JavaScript ES6+', domainId: 'frontend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#B85C3B', description: 'Event loop and async promise pipelines.' },
  { id: 'l1-2', name: 'HTML5 & ARIA', domainId: 'frontend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#B85C3B', description: 'Accessible semantic markup.' },
  { id: 'l1-3', name: 'CSS3 Grid & Flex', domainId: 'frontend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#B85C3B', description: 'Responsive container queries.' },
  { id: 'l1-4', name: 'MongoDB NoSQL', domainId: 'backend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#8E9A78', description: 'Document schemas and aggregation.' },
  { id: 'l1-5', name: 'WebSockets & Socket.io', domainId: 'backend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#8E9A78', description: 'Bi-directional real-time streaming.' },
  { id: 'l1-6', name: 'REST API Contracts', domainId: 'backend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#8E9A78', description: 'Versioned HTTP status standards.' },
  { id: 'l1-7', name: 'Redis In-Memory', domainId: 'backend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#8E9A78', description: 'Rate limiting and session caching.' },
  { id: 'l1-8', name: 'Framer Motion Spring', domainId: 'three', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#4A6FA5', description: 'Layout animations and spring dampening.' },
  { id: 'l1-9', name: 'GLSL Custom Shaders', domainId: 'three', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#4A6FA5', description: 'Vertex and fragment shader code.' },
  { id: 'l1-10', name: 'Vercel Edge Network', domainId: 'devops', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#25231F', description: 'Serverless deployment and previews.' },
  { id: 'l1-11', name: 'Linux Bash CLI', domainId: 'devops', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#25231F', description: 'Shell automation & server admin.' },
  { id: 'l1-12', name: 'Postman API Testing', domainId: 'devops', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#25231F', description: 'Automated test suite collections.' },
  { id: 'l1-13', name: 'Figma UI Handoff', domainId: 'devops', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#25231F', description: 'Component auto-layout design systems.' },
  { id: 'l1-14', name: 'Webpack & Vite', domainId: 'frontend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#B85C3B', description: 'Sub-second module bundling.' },
  { id: 'l1-15', name: 'Sub-Second Web Vitals', domainId: 'frontend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#B85C3B', description: 'Lighthouse 98+ performance tuning.' },
  { id: 'l1-16', name: 'JWT & OAuth Auth', domainId: 'backend', layer: 1, layerName: 'Layer 1 — Core Base', accentColor: '#8E9A78', description: 'Secure token authentication.' },
];

export interface CityBuildingTech {
  id: string;
  name: string;
  symbol: string;
  accentColor: string;
  description: string;
  experienceYears: number;
  projectsCount: number;
}

export interface CityBuilding {
  id: 'frontend' | 'backend' | 'database' | 'animation' | 'cloud' | 'tools';
  title: string;
  subtitle: string;
  position: [number, number]; // [X, Z] grid offset
  dimensions: [number, number, number]; // [width, height, depth] in cubes
  accentColor: string;
  secondaryColor: string;
  description: string;
  technologies: CityBuildingTech[];
  architectureFocus: string[];
}

export const TECH_CITY_BUILDINGS: CityBuilding[] = [
  {
    id: 'frontend',
    title: 'Frontend Tower',
    subtitle: 'Building 01 — Client Architecture',
    position: [-3.2, -1.8],
    dimensions: [2.2, 5.2, 2.2], // Tallest minimalist tower
    accentColor: '#B85C3B',
    secondaryColor: '#23201C',
    description: 'High-rise architectural tower dedicated to reactive user interfaces, server-rendered App Routers, and strict compile-time type safety.',
    architectureFocus: ['Concurrent Fiber Engine', 'App Router & SSR', 'Strict Type Systems', 'Utility-First Tokens'],
    technologies: [
      { id: 'react', name: 'React 19', symbol: '⚛️', accentColor: '#61DAFB', description: 'Concurrent Fiber rendering, custom hooks architecture, and Suspense.', experienceYears: 4.0, projectsCount: 22 },
      { id: 'nextjs', name: 'Next.js 15', symbol: '▲', accentColor: '#B85C3B', description: 'The React framework for production with App Router & Server Actions.', experienceYears: 3.5, projectsCount: 18 },
      { id: 'typescript', name: 'TypeScript', symbol: 'TS', accentColor: '#3178C6', description: 'Strict compile-time type safety and generics at scale.', experienceYears: 3.5, projectsCount: 20 },
      { id: 'javascript', name: 'JavaScript ES6+', symbol: 'JS', accentColor: '#F7DF1E', description: 'Modern ES6+ asynchronous pipelines and event loop mechanics.', experienceYears: 4.5, projectsCount: 25 },
      { id: 'tailwind', name: 'Tailwind CSS', symbol: '🎨', accentColor: '#06B6D4', description: 'Utility-first design tokens, glassmorphic UI, and themes.', experienceYears: 3.5, projectsCount: 20 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Tower',
    subtitle: 'Building 02 — High-Throughput IO',
    position: [0, -2.4],
    dimensions: [2.0, 4.2, 2.0],
    accentColor: '#8E9A78',
    secondaryColor: '#23201C',
    description: 'Central asynchronous IO monolith powering non-blocking REST middleware pipelines and low-latency API contracts.',
    architectureFocus: ['Event Loop Async IO', 'Middleware Pipelines', 'RESTful Endpoints', 'Microservices'],
    technologies: [
      { id: 'nodejs', name: 'Node.js', symbol: '⬢', accentColor: '#5FA04E', description: 'Event-driven runtime building non-blocking REST services.', experienceYears: 3.5, projectsCount: 16 },
      { id: 'express', name: 'Express.js', symbol: 'EX', accentColor: '#8E9A78', description: 'Fast HTTP web framework for middleware and routing.', experienceYears: 3.0, projectsCount: 14 },
    ],
  },
  {
    id: 'database',
    title: 'Database Vault',
    subtitle: 'Building 03 — Persistence Fortress',
    position: [3.2, -1.8],
    dimensions: [2.4, 3.2, 2.4],
    accentColor: '#4A6FA5',
    secondaryColor: '#23201C',
    description: 'Heavy reinforced vault housing document stores, BSON schemas, and real-time database query indexing.',
    architectureFocus: ['NoSQL BSON Stores', 'Aggregation Pipelines', 'Relational Schemas', 'Indexing'],
    technologies: [
      { id: 'mongodb', name: 'MongoDB', symbol: '🍃', accentColor: '#47A248', description: 'Document-oriented NoSQL database for rapid schema iteration.', experienceYears: 3.0, projectsCount: 10 },
    ],
  },
  {
    id: 'animation',
    title: 'Animation Studio',
    subtitle: 'Building 04 — Motion & WebGL Pavilion',
    position: [-2.8, 1.8],
    dimensions: [2.2, 3.6, 2.2],
    accentColor: '#B85C3B',
    secondaryColor: '#8A2E2B',
    description: 'Creative motion graphics pavilion running 60 FPS Three.js WebGL shaders, GSAP timelines, and spring physics.',
    architectureFocus: ['WebGL Shaders', 'GSAP Scroll Sync', 'Spring Dampening', 'GPU Acceleration'],
    technologies: [
      { id: 'threejs', name: 'Three.js', symbol: '🧊', accentColor: '#FAF8F3', description: 'Declarative 3D WebGL scenes, meshes, and GLSL shaders.', experienceYears: 2.5, projectsCount: 12 },
      { id: 'gsap', name: 'GSAP', symbol: '🎯', accentColor: '#88CE02', description: 'Timeline animations and scroll parallax synchronization.', experienceYears: 3.0, projectsCount: 15 },
      { id: 'framer', name: 'Framer Motion', symbol: '🌊', accentColor: '#E535AB', description: 'Layout animations, gesture controls, and spring physics.', experienceYears: 3.5, projectsCount: 18 },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Hub',
    subtitle: 'Building 05 — Edge Broadcast Spire',
    position: [0, 2.2],
    dimensions: [1.8, 4.6, 1.8],
    accentColor: '#8A2E2B',
    secondaryColor: '#23201C',
    description: 'High-frequency cloud antenna distributing global asset CDN caching, S3 bucket storage, and edge functions.',
    architectureFocus: ['Global Edge CDN', 'S3 Bucket Storage', 'Serverless Routes', 'Sub-Second Latency'],
    technologies: [
      { id: 'aws', name: 'AWS', symbol: '☁️', accentColor: '#FF9900', description: 'Amazon S3 bucket asset storage, CloudFront CDN, and IAM.', experienceYears: 1.5, projectsCount: 5 },
    ],
  },
  {
    id: 'tools',
    title: 'Developer Tools Lab',
    subtitle: 'Building 06 — Engineering Foundry',
    position: [2.8, 1.8],
    dimensions: [2.0, 3.8, 2.0],
    accentColor: '#23201C',
    secondaryColor: '#B85C3B',
    description: 'Engineering lab facilitating automated Docker container builds, Git version control, Postman testing, and Figma UX.',
    architectureFocus: ['Docker Containers', 'Git CI/CD', 'API Collections', 'Design Systems'],
    technologies: [
      { id: 'git', name: 'Git', symbol: '🐙', accentColor: '#F05032', description: 'Distributed version control & branching workflows.', experienceYears: 4.0, projectsCount: 25 },
      { id: 'github', name: 'GitHub', symbol: '⚡', accentColor: '#FAF8F3', description: 'Automated CI/CD workflows and version releases.', experienceYears: 4.0, projectsCount: 25 },
      { id: 'docker', name: 'Docker', symbol: '🐳', accentColor: '#2496ED', description: 'Isolated multi-stage container build environments.', experienceYears: 2.0, projectsCount: 7 },
      { id: 'postman', name: 'Postman', symbol: '🚀', accentColor: '#FF6C37', description: 'Automated API collection testing & mocking.', experienceYears: 3.5, projectsCount: 22 },
      { id: 'figma', name: 'Figma', symbol: '❖', accentColor: '#F24E1E', description: 'Collaborative UI design tokens & auto-layout.', experienceYears: 3.5, projectsCount: 20 },
    ],
  },
];

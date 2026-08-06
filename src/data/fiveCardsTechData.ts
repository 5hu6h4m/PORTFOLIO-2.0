export interface FiveCardTechItem {
  name: string;
  symbol: string;
  description: string;
  highlights: string[];
}

export interface FiveCardCategory {
  id: 'frontend' | 'backend' | 'database' | 'tools' | 'devops';
  number: string; // '01', '02', '03', '04', '05'
  title: string;
  subtitle: string;
  badge: string;
  accentColor: string;
  description: string;
  shippedBuildsCount: number;
  readinessScore: string; // e.g. "Production Ready (100%)"
  technologies: FiveCardTechItem[];
}

export const FIVE_TECH_CATEGORIES: FiveCardCategory[] = [
  {
    id: 'frontend',
    number: '01',
    title: 'Frontend Architecture',
    subtitle: 'Client Interfaces & WebGL',
    badge: 'Core Focus',
    accentColor: '#B85C3B',
    description: 'Crafting responsive, sub-second web interfaces using React 19, Next.js 15, strict TypeScript, and utility-first Tailwind CSS.',
    shippedBuildsCount: 22,
    readinessScore: 'Production Ready (100%)',
    technologies: [
      { name: 'React 19', symbol: '⚛️', description: 'Concurrent Fiber rendering, custom hooks architecture, and Suspense.', highlights: ['Concurrent Fiber Engine', 'Custom Hooks Architecture', 'Server Components & Suspense'] },
      { name: 'Next.js 15', symbol: '▲', description: 'Production framework with App Router, SSR, and Server Actions.', highlights: ['App Router & Server Actions', 'Incremental Static Regeneration', 'Route Handlers & Edge Runtime'] },
      { name: 'TypeScript', symbol: 'TS', description: 'Strict compile-time type safety, generics, and automated contract verification.', highlights: ['Strict Type Systems', 'Generics & Utility Types', 'Automated Type Checks'] },
      { name: 'JavaScript ES6+', symbol: 'JS', description: 'Modern ES6+ syntax, asynchronous promise pipelines, and event loop mechanics.', highlights: ['Async/Await & Promises', 'Closures & Prototypes', 'ES Modules Bundling'] },
      { name: 'Tailwind CSS v4', symbol: '🎨', description: 'Utility-first CSS engine crafting responsive design systems and glassmorphism.', highlights: ['Tailwind v4 JIT Engine', 'Design System Tokens', 'Glassmorphism & Gradients'] },
    ],
  },
  {
    id: 'backend',
    number: '02',
    title: 'Backend Systems',
    subtitle: 'High-Throughput IO & APIs',
    badge: 'API Engine',
    accentColor: '#8E9A78',
    description: 'Asynchronous Node.js REST services, Express middleware pipelines, WebSocket streams, and low-latency API contracts.',
    shippedBuildsCount: 16,
    readinessScore: 'High Latency Optimized',
    technologies: [
      { name: 'Node.js', symbol: '⬢', description: 'Event-driven runtime building non-blocking REST services.', highlights: ['Event Loop IO Engine', 'Stream & Buffer APIs', 'High-Throughput IO'] },
      { name: 'Express.js', symbol: 'EX', description: 'Fast HTTP web framework for middleware and routing.', highlights: ['Middleware Pipelines', 'RESTful Routes', 'CORS & Rate Limiting'] },
      { name: 'RESTful APIs', symbol: '🔌', description: 'Designing clean HTTP endpoint contracts with Zod validation.', highlights: ['HTTP Status Standards', 'JWT & OAuth Security', 'Zod Payload Validation'] },
      { name: 'WebSockets', symbol: '⚡', description: 'Bi-directional real-time event streaming and room broadcasting.', highlights: ['Bi-directional Event Streams', 'Automatic Reconnections', 'Low-Latency Packets'] },
    ],
  },
  {
    id: 'database',
    number: '03',
    title: 'Databases & Storage',
    subtitle: 'Persistence & In-Memory Cache',
    badge: 'Data Core',
    accentColor: '#4A6FA5',
    description: 'Relational PostgreSQL with Prisma ORM, document-oriented MongoDB NoSQL, and sub-millisecond Redis caching.',
    shippedBuildsCount: 12,
    readinessScore: 'ACID Compliant',
    technologies: [
      { name: 'MongoDB NoSQL', symbol: '🍃', description: 'Document-oriented NoSQL database for rapid schema iteration.', highlights: ['Aggregation Pipelines', 'BSON Document Store', 'Indexing Strategies'] },
      { name: 'PostgreSQL', symbol: '🐘', description: 'Relational SQL database for ACID compliant data transactions.', highlights: ['ACID Compliant Transactions', 'Relational Schema Models', 'Automated SQL Migrations'] },
      { name: 'Prisma ORM', symbol: '💎', description: 'Type-safe query builder and automated schema migrations.', highlights: ['Type-Safe Prisma Client', 'Automated Schema Migrations', 'Relational Query Builder'] },
      { name: 'Redis Caching', symbol: '⚡', description: 'Sub-millisecond in-memory cache for API rate limiting & sessions.', highlights: ['Sub-Millisecond In-Memory', 'Session Token Store', 'Pub/Sub Messaging'] },
    ],
  },
  {
    id: 'tools',
    number: '04',
    title: 'Developer Tools',
    subtitle: 'IDE, Version Control & Design',
    badge: 'Workflow',
    accentColor: '#23201C',
    description: 'Modern developer workflow suite including VS Code refactoring, Git branching, GitHub Actions CI/CD, Postman, and Figma.',
    shippedBuildsCount: 25,
    readinessScore: 'Automated CI/CD',
    technologies: [
      { name: 'VS Code', symbol: '💻', description: 'IDE workspace configuration, refactoring, and extensions.', highlights: ['Workspace Config', 'Extension Tooling', 'Debugger Setup'] },
      { name: 'Git & GitHub', symbol: '🐙', description: 'Distributed version control & automated GitHub Actions CI/CD.', highlights: ['Branching & Rebase Workflows', 'GitHub Actions CI/CD', 'Pull Request Reviews'] },
      { name: 'Postman', symbol: '🚀', description: 'Automated API collection testing, environment mocking, and specs.', highlights: ['Automated Test Collections', 'Environment Mocking', 'OpenAPI Specs'] },
      { name: 'Figma UI/UX', symbol: '❖', description: 'Collaborative UI design tokens, auto-layout, and prototypes.', highlights: ['Auto-Layout & Components', 'Design System Tokens', 'Design-to-Code Handoff'] },
    ],
  },
  {
    id: 'devops',
    number: '05',
    title: 'DevOps & Cloud',
    subtitle: 'Containerization & Edge Deployment',
    badge: 'Infrastructure',
    accentColor: '#8A2E2B',
    description: 'Packaging applications into isolated multi-stage Docker containers, AWS Cloud asset storage, and Vercel edge networks.',
    shippedBuildsCount: 18,
    readinessScore: 'Cloud Deployed',
    technologies: [
      { name: 'Docker Containers', symbol: '🐳', description: 'Isolated multi-stage container build environments.', highlights: ['Multi-Stage Dockerfiles', 'Docker Compose Networks', 'Environment Parity'] },
      { name: 'AWS Cloud', symbol: '☁️', description: 'Amazon S3 bucket asset storage, CloudFront CDN, and EC2.', highlights: ['S3 Bucket Asset Storage', 'CloudFront Edge CDN', 'IAM Policy Security'] },
      { name: 'Vercel Edge', symbol: '▲', description: 'Frontend cloud platform for instant Next.js deployments and previews.', highlights: ['Edge Network CDNs', 'Serverless Function Routes', 'Instant Preview Deploys'] },
    ],
  },
];

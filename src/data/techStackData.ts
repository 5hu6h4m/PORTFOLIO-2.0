export interface TechItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops';
  categoryLabel: string;
  symbol: string;
  experienceYears: number;
  tags: string[];
  accentColor?: string;
  proficiency?: number;
}

export const BAND_1_TECH: TechItem[] = [
  { id: "react", name: "React 19", category: "frontend", categoryLabel: "Frontend Architecture", symbol: "⚛️", experienceYears: 4.0, tags: ["Virtual DOM", "Fiber", "Hooks"] },
  { id: "nextjs", name: "Next.js 15", category: "frontend", categoryLabel: "Frontend Architecture", symbol: "▲", experienceYears: 3.5, tags: ["App Router", "SSR", "Server Actions"] },
  { id: "typescript", name: "TypeScript", category: "frontend", categoryLabel: "Frontend Architecture", symbol: "TS", experienceYears: 3.5, tags: ["Strict Typing", "Generics", "Safety"] },
  { id: "javascript", name: "JavaScript ES6+", category: "frontend", categoryLabel: "Frontend Architecture", symbol: "JS", experienceYears: 4.5, tags: ["Async", "Promises", "ES Modules"] },
  { id: "tailwind", name: "Tailwind CSS v4", category: "frontend", categoryLabel: "Frontend Architecture", symbol: "🎨", experienceYears: 3.5, tags: ["JIT Engine", "Tokens", "Glassmorphism"] },
  { id: "threejs", name: "Three.js & WebGL", category: "frontend", categoryLabel: "Frontend Architecture", symbol: "🧊", experienceYears: 2.5, tags: ["3D Scenes", "Shaders", "R3F"] },
  { id: "framer", name: "Framer Motion", category: "frontend", categoryLabel: "Frontend Architecture", symbol: "🌊", experienceYears: 3.5, tags: ["Spring Physics", "Layout Animations"] },
  { id: "gsap", name: "GSAP ScrollTrigger", category: "frontend", categoryLabel: "Frontend Architecture", symbol: "🎯", experienceYears: 3.0, tags: ["Timelines", "Scroll Sync"] },
  { id: "zustand", name: "Zustand & Redux", category: "frontend", categoryLabel: "Frontend Architecture", symbol: "🐻", experienceYears: 3.0, tags: ["State Container", "Slice Architecture"] },
  { id: "html-css", name: "HTML5 & CSS3", category: "frontend", categoryLabel: "Frontend Architecture", symbol: "🌐", experienceYears: 4.5, tags: ["Semantic Markup", "Grid & Flexbox"] },
];

export const BAND_2_TECH: TechItem[] = [
  { id: "nodejs", name: "Node.js", category: "backend", categoryLabel: "Backend & Systems", symbol: "⬢", experienceYears: 3.5, tags: ["Event Loop", "Streams", "High IO"] },
  { id: "express", name: "Express.js", category: "backend", categoryLabel: "Backend & Systems", symbol: "EX", experienceYears: 3.0, tags: ["Middleware", "REST Routing"] },
  { id: "mongodb", name: "MongoDB NoSQL", category: "database", categoryLabel: "Databases & Caching", symbol: "🍃", experienceYears: 3.0, tags: ["BSON Documents", "Aggregation"] },
  { id: "postgresql", name: "PostgreSQL", category: "database", categoryLabel: "Databases & Caching", symbol: "🐘", experienceYears: 2.5, tags: ["ACID SQL", "Relational Schema"] },
  { id: "prisma", name: "Prisma ORM", category: "database", categoryLabel: "Databases & Caching", symbol: "💎", experienceYears: 2.5, tags: ["Type-Safe Models", "Migrations"] },
  { id: "redis", name: "Redis Caching", category: "database", categoryLabel: "Databases & Caching", symbol: "⚡", experienceYears: 1.5, tags: ["In-Memory", "Sub-1ms Speed"] },
  { id: "websockets", name: "WebSockets", category: "backend", categoryLabel: "Backend & Systems", symbol: "🔌", experienceYears: 2.5, tags: ["Real-time Sync", "Bi-directional"] },
  { id: "docker", name: "Docker Containers", category: "devops", categoryLabel: "DevOps & Tools", symbol: "🐳", experienceYears: 2.0, tags: ["Isolation", "Multi-stage Builds"] },
  { id: "git", name: "Git & GitHub Actions", category: "devops", categoryLabel: "DevOps & Tools", symbol: "🐙", experienceYears: 4.0, tags: ["CI/CD Pipelines", "Branching"] },
  { id: "aws", name: "AWS Cloud", category: "devops", categoryLabel: "DevOps & Tools", symbol: "☁️", experienceYears: 1.5, tags: ["S3 Buckets", "CloudFront CDN"] },
  { id: "vercel", name: "Vercel Edge", category: "devops", categoryLabel: "DevOps & Tools", symbol: "▲", experienceYears: 3.0, tags: ["Edge Deployment", "Previews"] },
  { id: "figma", name: "Figma UI/UX", category: "devops", categoryLabel: "DevOps & Tools", symbol: "❖", experienceYears: 3.5, tags: ["Auto-Layout", "Design Tokens"] },
  { id: "postman", name: "Postman & VS Code", category: "devops", categoryLabel: "DevOps & Tools", symbol: "💻", experienceYears: 3.5, tags: ["API Testing", "Refactoring"] },
];

export const ALL_TECH_ITEMS: TechItem[] = [...BAND_1_TECH, ...BAND_2_TECH];

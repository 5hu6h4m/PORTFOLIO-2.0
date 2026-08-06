export interface TechItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops';
  categoryLabel: string;
  symbol: string;
  featured?: boolean;
  proficiency: number; // Percentage e.g. 96
  experienceYears: number;
  projectsCount: number;
  accentColor: string;
  description: string;
  capabilities: string[];
}

export const TECH_STACK_DATA: TechItem[] = [
  // ── FRONTEND ARCHITECTURE ──────────────────────────────────────────────────
  {
    id: "react",
    name: "React 19",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    symbol: "⚛️",
    featured: true,
    proficiency: 97,
    experienceYears: 4.0,
    projectsCount: 22,
    accentColor: "#61DAFB",
    description: "Concurrent Fiber rendering, custom hooks architecture, server components, and Virtual DOM performance.",
    capabilities: ["Concurrent Fiber Engine", "Custom Hooks Architecture", "Server Components & Suspense", "Virtual DOM Optimization"]
  },
  {
    id: "nextjs",
    name: "Next.js 15",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    symbol: "▲",
    featured: true,
    proficiency: 96,
    experienceYears: 3.5,
    projectsCount: 18,
    accentColor: "#B85C3B",
    description: "The React framework for production with App Router, SSR, Server Actions, and automatic asset optimization.",
    capabilities: ["App Router & Server Actions", "Incremental Static Regeneration", "Route Handlers & Edge Runtime", "Font & Image Optimization"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    symbol: "TS",
    featured: true,
    proficiency: 96,
    experienceYears: 3.5,
    projectsCount: 20,
    accentColor: "#3178C6",
    description: "Typed JavaScript at scale, ensuring robust API contracts, compile-time safety, and maintainable refactoring.",
    capabilities: ["Strict Type Systems", "Generics & Utility Types", "Automated Type Verification", "IDE Autocompletion"]
  },
  {
    id: "javascript",
    name: "JavaScript ES6+",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    symbol: "JS",
    proficiency: 98,
    experienceYears: 4.5,
    projectsCount: 25,
    accentColor: "#F7DF1E",
    description: "Modern ES6+ features, asynchronous pipelines, event loop mechanics, and DOM performance.",
    capabilities: ["Async/Await & Promises", "Closures & Prototypes", "Web Workers & Microtasks", "ES Modules Bundling"]
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    symbol: "🎨",
    proficiency: 97,
    experienceYears: 3.5,
    projectsCount: 20,
    accentColor: "#06B6D4",
    description: "Utility-first CSS engine crafting responsive design systems, glassmorphism, and token themes.",
    capabilities: ["Tailwind v4 JIT Engine", "Design System Tokens", "Glassmorphism & Gradients", "Dark & Light Mode Themes"]
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    symbol: "🌊",
    proficiency: 95,
    experienceYears: 3.5,
    projectsCount: 18,
    accentColor: "#E535AB",
    description: "Production motion library powering layout transitions, spring physics, and gesture controls.",
    capabilities: ["AnimatePresence Page Transitions", "Spring Dampening Physics", "Layout Animation Engine", "Drag & Scroll Gestures"]
  },
  {
    id: "zustand",
    name: "Zustand & Redux",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    symbol: "🐻",
    proficiency: 92,
    experienceYears: 3.0,
    projectsCount: 14,
    accentColor: "#764ABC",
    description: "Predictable centralized state management containers for multi-screen web applications.",
    capabilities: ["Transient State Updates", "Slice Architecture", "RTK Query Caching", "Persist Middleware"]
  },

  // ── BACKEND & SYSTEMS ──────────────────────────────────────────────────────
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    categoryLabel: "Backend & Systems",
    symbol: "⬢",
    featured: true,
    proficiency: 92,
    experienceYears: 3.5,
    projectsCount: 16,
    accentColor: "#5FA04E",
    description: "Asynchronous event-driven JavaScript runtime building non-blocking REST APIs and streaming web services.",
    capabilities: ["Event Loop IO Engine", "Stream & Buffer APIs", "Cluster Scaling", "High-Throughput IO"]
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    categoryLabel: "Backend & Systems",
    symbol: "EX",
    proficiency: 90,
    experienceYears: 3.0,
    projectsCount: 14,
    accentColor: "#8E9A78",
    description: "Fast, unopinionated web framework for building resilient HTTP services and middleware.",
    capabilities: ["Middleware Pipelines", "RESTful Routes", "Error Handling Chains", "CORS & Rate Limiting"]
  },
  {
    id: "websockets",
    name: "WebSockets / Socket.io",
    category: "backend",
    categoryLabel: "Backend & Systems",
    symbol: "⚡",
    proficiency: 88,
    experienceYears: 2.5,
    projectsCount: 8,
    accentColor: "#B85C3B",
    description: "Full-duplex real-time messaging protocols powering live multi-user collaboration and telemetry.",
    capabilities: ["Bi-directional Event Streams", "Automatic Reconnections", "Channel Room Broadcasts", "Low-Latency Packets"]
  },
  {
    id: "rest-api",
    name: "RESTful API Architecture",
    category: "backend",
    categoryLabel: "Backend & Systems",
    symbol: "🔌",
    proficiency: 95,
    experienceYears: 3.5,
    projectsCount: 20,
    accentColor: "#4A6FA5",
    description: "Designing clean, versioned HTTP endpoint contracts with strict status codes and JSON validation.",
    capabilities: ["HTTP Status Standards", "JWT & OAuth Security", "Zod Payload Validation", "OpenAPI Specs"]
  },

  // ── DATABASES & CACHING ────────────────────────────────────────────────────
  {
    id: "mongodb",
    name: "MongoDB NoSQL",
    category: "database",
    categoryLabel: "Databases & Caching",
    symbol: "🍃",
    featured: true,
    proficiency: 88,
    experienceYears: 3.0,
    projectsCount: 10,
    accentColor: "#47A248",
    description: "Document-oriented NoSQL database for rapid schema iteration and BSON data storage.",
    capabilities: ["Aggregation Pipelines", "BSON Document Store", "Indexing Strategies", "Mongoose Schemas"]
  },
  {
    id: "postgresql",
    name: "PostgreSQL & Prisma",
    category: "database",
    categoryLabel: "Databases & Caching",
    symbol: "🐘",
    proficiency: 90,
    experienceYears: 2.5,
    projectsCount: 9,
    accentColor: "#4169E1",
    description: "Relational SQL database paired with Prisma ORM for type-safe queries and automated migrations.",
    capabilities: ["Type-Safe Prisma Client", "Relational Schema Models", "Automated SQL Migrations", "ACID Compliant"]
  },
  {
    id: "redis",
    name: "Redis Caching",
    category: "database",
    categoryLabel: "Databases & Caching",
    symbol: "⚡",
    proficiency: 82,
    experienceYears: 1.5,
    projectsCount: 5,
    accentColor: "#DC382D",
    description: "High-speed in-memory key-value store for API rate limiting, session storage, and event queues.",
    capabilities: ["Sub-Millisecond In-Memory", "Session Token Store", "Pub/Sub Messaging", "API Rate Limit Caching"]
  },

  // ── DEVOPS & INFRASTRUCTURE ────────────────────────────────────────────────
  {
    id: "docker",
    name: "Docker Containers",
    category: "devops",
    categoryLabel: "DevOps & Tools",
    symbol: "🐳",
    featured: true,
    proficiency: 85,
    experienceYears: 2.0,
    projectsCount: 7,
    accentColor: "#2496ED",
    description: "Container platform packaging web applications into isolated, reproducible runtime environments.",
    capabilities: ["Multi-Stage Dockerfiles", "Docker Compose Networks", "Environment Parity", "Volume Persistence"]
  },
  {
    id: "git",
    name: "Git & GitHub Actions",
    category: "devops",
    categoryLabel: "DevOps & Tools",
    symbol: "🐙",
    proficiency: 96,
    experienceYears: 4.0,
    projectsCount: 25,
    accentColor: "#F05032",
    description: "Distributed version control system and CI/CD automated build/test/release workflows.",
    capabilities: ["Branching & Rebase", "GitHub Actions Workflows", "Pull Request Reviews", "Sanitized Commit Logs"]
  },
  {
    id: "aws",
    name: "AWS Infrastructure",
    category: "devops",
    categoryLabel: "DevOps & Tools",
    symbol: "☁️",
    proficiency: 80,
    experienceYears: 1.5,
    projectsCount: 5,
    accentColor: "#FF9900",
    description: "Amazon Web Services for static asset storage (S3), CloudFront CDN, and serverless API endpoints.",
    capabilities: ["S3 Bucket Asset Storage", "CloudFront Edge CDN", "EC2 & Lambda Functions", "IAM Policy Security"]
  },
  {
    id: "vercel",
    name: "Vercel Edge",
    category: "devops",
    categoryLabel: "DevOps & Tools",
    symbol: "▲",
    proficiency: 96,
    experienceYears: 3.0,
    projectsCount: 18,
    accentColor: "#25231F",
    description: "Frontend cloud platform for instant Next.js deployments, edge middleware, and previews.",
    capabilities: ["Edge Network CDNs", "Serverless Function Routes", "Instant Preview Deploys", "Analytics Monitoring"]
  },
  {
    id: "figma",
    name: "Figma UI/UX",
    category: "devops",
    categoryLabel: "DevOps & Tools",
    symbol: "❖",
    proficiency: 92,
    experienceYears: 3.5,
    projectsCount: 20,
    accentColor: "#F24E1E",
    description: "Collaborative design tool for wireframes, design system tokens, and interactive handoff.",
    capabilities: ["Auto-Layout & Components", "Design System Tokens", "Interactive Prototypes", "Design-to-Code Handoff"]
  },
  {
    id: "postman",
    name: "Postman & VS Code",
    category: "devops",
    categoryLabel: "DevOps & Tools",
    symbol: "💻",
    proficiency: 94,
    experienceYears: 3.5,
    projectsCount: 22,
    accentColor: "#FF6C37",
    description: "API testing collections, environment mocking, IDE refactoring, and workspace tooling.",
    capabilities: ["Automated Test Collections", "Environment Mocking", "IDE Refactoring Tools", "Workspace Integration"]
  }
];

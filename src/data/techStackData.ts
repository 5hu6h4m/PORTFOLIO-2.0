export interface TechItem {
  id: string;
  name: string;
  category: string;
  experienceYears: number;
  projectsCount: number;
  confidence: number; // percentage
  accentColor: string;
  description: string;
  keyFeatures: string[];
  projectsUsing: string[];
}

export const TECH_STACK: TechItem[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend Library",
    experienceYears: 3.5,
    projectsCount: 18,
    confidence: 96,
    accentColor: "#61DAFB",
    description: "Declarative, component-driven UI architecture for high-performance interactive web applications.",
    keyFeatures: ["Concurrent Rendering & Fiber", "Custom React Hooks", "Server Components & Suspense", "Virtual DOM Performance Optimization"],
    projectsUsing: ["NEXUS METRICS", "SPATIAL CANVAS", "SYNCSPACE COLLAB"]
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "React Framework",
    experienceYears: 3.0,
    projectsCount: 14,
    confidence: 94,
    accentColor: "#B55D3D",
    description: "The React framework for production with App Router, SSR, Server Actions, and sub-second page performance.",
    keyFeatures: ["App Router & Server Actions", "Incremental Static Regeneration", "Route Handlers & Edge Runtime", "Automatic Image & Font Optimization"],
    projectsUsing: ["NEXUS METRICS", "DEV-HUB PORTAL", "SPATIAL CANVAS"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Programming Language",
    experienceYears: 3.0,
    projectsCount: 16,
    confidence: 95,
    accentColor: "#3178C6",
    description: "Typed JavaScript at scale, ensuring robust API contracts, compile-time safety, and maintainable codebases.",
    keyFeatures: ["Strict Type Systems & Generics", "Utility Types & Conditional Types", "Automated Type Verification", "IDE Autocompletion & Refactoring"],
    projectsUsing: ["NEXUS METRICS", "SPATIAL CANVAS", "SYNCSPACE COLLAB"]
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Core Web Language",
    experienceYears: 4.0,
    projectsCount: 22,
    confidence: 98,
    accentColor: "#F7DF1E",
    description: "Modern ES6+ JavaScript, mastering event loop semantics, asynchronous pipelines, and DOM performance.",
    keyFeatures: ["Async/Await & Promises", "Closures & Prototype Chain", "Web Workers & Microtasks", "ES Modules & Bundling"],
    projectsUsing: ["All Production Projects"]
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend Runtime",
    experienceYears: 3.0,
    projectsCount: 12,
    confidence: 90,
    accentColor: "#5FA04E",
    description: "Asynchronous event-driven JavaScript runtime building non-blocking REST APIs and streaming web services.",
    keyFeatures: ["Event Loop Architecture", "Stream & Buffer APIs", "Cluster & Worker Threads", "High-Throughput IO Pipelines"],
    projectsUsing: ["NEXUS METRICS", "SYNCSPACE COLLAB"]
  },
  {
    id: "express",
    name: "Express.js",
    category: "Backend Framework",
    experienceYears: 2.5,
    projectsCount: 10,
    confidence: 88,
    accentColor: "#8A2E2B",
    description: "Fast, unopinionated minimalist web framework for building resilient HTTP services and API middleware.",
    keyFeatures: ["Middleware Chains & Auth", "RESTful Route Architecture", "Error Handling Pipelines", "CORS & Rate Limiting"],
    projectsUsing: ["SYNCSPACE COLLAB", "NEXUS METRICS"]
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "NoSQL Database",
    experienceYears: 2.5,
    projectsCount: 8,
    confidence: 86,
    accentColor: "#47A248",
    description: "Document-oriented NoSQL database for rapid schema iteration and flexible JSON data stores.",
    keyFeatures: ["Aggregation Framework", "BSON Document Models", "Indexing & Sharding", "Mongoose ORM Schemas"],
    projectsUsing: ["SYNCSPACE COLLAB"]
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Utility CSS Framework",
    experienceYears: 3.0,
    projectsCount: 16,
    confidence: 96,
    accentColor: "#06B6D4",
    description: "Utility-first CSS framework for crafting modern, responsive design systems with zero runtime overhead.",
    keyFeatures: ["Tailwind v4 Engine", "Design System Tokens", "Glassmorphism & Gradients", "Dark Mode & Responsive Layouts"],
    projectsUsing: ["NEXUS METRICS", "DEV-HUB PORTAL", "SPATIAL CANVAS"]
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "3D Web Graphics",
    experienceYears: 2.0,
    projectsCount: 6,
    confidence: 90,
    accentColor: "#000000",
    description: "WebGL 3D graphics library for creating immersive 3D scenes, shaders, particle systems, and interactive canvases.",
    keyFeatures: ["React Three Fiber & Drei", "GLSL Custom Shaders", "InstancedMesh 60FPS Physics", "Postprocessing Effects"],
    projectsUsing: ["SPATIAL CANVAS", "PORTFOLIO 3D ENGINE"]
  },
  {
    id: "gsap",
    name: "GSAP",
    category: "Animation Engine",
    experienceYears: 2.5,
    projectsCount: 10,
    confidence: 92,
    accentColor: "#88CE02",
    description: "Professional-grade JavaScript animation library for high-speed timeline control and scroll triggers.",
    keyFeatures: ["ScrollTrigger Parallax", "Timeline Orchestration", "MorphSVG & Flip Animations", "Sub-Pixel Smoothness"],
    projectsUsing: ["SPATIAL CANVAS", "DEV-HUB PORTAL"]
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    category: "React Motion Engine",
    experienceYears: 3.0,
    projectsCount: 15,
    confidence: 95,
    accentColor: "#E535AB",
    description: "Production-ready motion library for React powering layout transitions, spring physics, and scroll gestures.",
    keyFeatures: ["Layout Animations & AnimatePresence", "Spring Physics & Dampening", "Gesture Recognition", "Scroll Progress Hooks"],
    projectsUsing: ["NEXUS METRICS", "DEV-HUB PORTAL", "JOURNEY TIMELINE"]
  },
  {
    id: "git",
    name: "Git",
    category: "Version Control",
    experienceYears: 4.0,
    projectsCount: 25,
    confidence: 96,
    accentColor: "#F05032",
    description: "Distributed version control system for tracking codebase history, branch merges, and collaborative commits.",
    keyFeatures: ["Feature Branching & Rebase", "Merge Conflict Resolution", "Git Hooks & Automations", "Commit History Sanitation"],
    projectsUsing: ["All Projects"]
  },
  {
    id: "github",
    name: "GitHub",
    category: "Code Hosting & CI/CD",
    experienceYears: 4.0,
    projectsCount: 25,
    confidence: 95,
    accentColor: "#25201C",
    description: "DevOps platform for open-source collaboration, pull request code reviews, and GitHub Actions CI/CD.",
    keyFeatures: ["GitHub Actions Workflows", "Pull Request Reviews", "Issue Tracking & Projects", "Package Registry"],
    projectsUsing: ["All Projects"]
  },
  {
    id: "docker",
    name: "Docker",
    category: "Containerization",
    experienceYears: 1.5,
    projectsCount: 5,
    confidence: 82,
    accentColor: "#2496ED",
    description: "Container platform packaging applications and runtime environments for predictable multi-stage deployments.",
    keyFeatures: ["Multi-Stage Dockerfiles", "Docker Compose Orchestration", "Container Networking", "Environment Parity"],
    projectsUsing: ["NEXUS METRICS", "SYNCSPACE COLLAB"]
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud Infrastructure",
    experienceYears: 1.5,
    projectsCount: 4,
    confidence: 80,
    accentColor: "#FF9900",
    description: "Amazon Web Services for cloud deployment, S3 asset buckets, CloudFront CDN distribution, and serverless API endpoints.",
    keyFeatures: ["S3 Static Asset Buckets", "CloudFront Global CDN", "Lambda Serverless Functions", "EC2 & IAM Security"],
    projectsUsing: ["NEXUS METRICS"]
  },
  {
    id: "postman",
    name: "Postman",
    category: "API Tooling",
    experienceYears: 3.0,
    projectsCount: 14,
    confidence: 92,
    accentColor: "#FF6C37",
    description: "API platform for designing, testing, documenting, and monitoring RESTful HTTP endpoints and WebSocket streams.",
    keyFeatures: ["API Endpoint Testing", "Collection Runner Automation", "Environment Variables", "Mock Servers & Docs"],
    projectsUsing: ["NEXUS METRICS", "SYNCSPACE COLLAB"]
  },
  {
    id: "figma",
    name: "Figma",
    category: "UI/UX Design",
    experienceYears: 3.0,
    projectsCount: 20,
    confidence: 90,
    accentColor: "#F24E1E",
    description: "Collaborative interface design tool for building wireframes, design tokens, responsive layouts, and interactive prototypes.",
    keyFeatures: ["Auto-Layout & Components", "Design System Libraries", "Interactive Prototyping", "Design-to-Code Handoff"],
    projectsUsing: ["All UI Projects"]
  }
];

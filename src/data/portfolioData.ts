export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Frontend Engineering' | 'Full-Stack SaaS' | 'Real-Time Web Apps' | 'Interactive 3D';
  description: string;
  tags: string[];
  year: string;
  client: string;
  role: string;
  accentColor: string;
  githubUrl: string;
  liveUrl: string;
  caseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    architecture: string[];
    metrics: { label: string; value: string }[];
    technologies: string[];
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: number;
    experience: string;
    icon: string;
    highlight: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  deliverables: string[];
  technologies: string[];
}

export interface LeadershipItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  tagline: string;
  description: string;
  impact: string[];
  badge: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  category: string;
  credentialId: string;
  description: string;
  badgeModel: 'trophy' | 'diamond' | 'shield' | 'star' | 'medal' | 'crown';
  skills?: string[];
  verifyUrl?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "SHUBHAM JADHAV",
    brandMark: "SJ.",
    title: "Frontend Developer / Full Stack Engineer",
    statusPill: "AVAILABLE FOR OPPORTUNITIES",
    headlineLine1: "I BUILD DIGITAL",
    headlineLine2: "EXPERIENCES",
    headlineLine3: "PEOPLE REMEMBER.",
    subHeadline: "Frontend Developer building fast, interactive and thoughtfully designed web experiences.",
    location: "Based in India · Building for the Web",
    email: "shubhamjadhav.dev@gmail.com",
    resumeUrl: "/Shubham_Jadhav_Resume.pdf",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },

  stats: [
    { label: "Production Apps", value: "18+", detail: "Full-Stack SaaS & Scalable React Systems" },
    { label: "Lighthouse Score", value: "98+", detail: "Core Web Vitals & Sub-Second Loads" },
    { label: "Community Leadership", value: "E-Cell President", detail: "Heading MET Entrepreneurship & Hackathons" },
    { label: "Developers Mentored", value: "250+", detail: "Web Development & Open Source" },
  ],

  about: {
    tagline: "HIGH-PERFORMANCE FRONTEND ARCHITECTURE WITH THOUGHTFUL UI ENGINEERING.",
    paragraphs: [
      "I am a Software Engineer focused on crafting modern web products that load fast, feel responsive, and scale seamlessly.",
      "As President of E-Cell MET BKC, I lead developer teams, organize innovation hackathons, and mentor aspiring student developers in building production MVPs.",
      "I prioritize code quality, clean modular architecture, and sub-second page performance."
    ],
    pillars: [
      {
        number: "01",
        title: "Clean UI Architecture",
        description: "Modular React 19 & Next.js 15 components with strict TypeScript types and clean design system tokens."
      },
      {
        number: "02",
        title: "Performance Engineering",
        description: "Sub-second load times, Core Web Vitals optimization, and efficient bundle splitting."
      },
      {
        number: "03",
        title: "Community & Leadership",
        description: "Leading student developer teams, organizing regional summits, and competing in hackathons."
      }
    ],

    // — WHO I AM — hiring pitch
    whoIAm: {
      headline: "Why should someone hire me?",
      paragraphs: [
        "I am a Frontend Developer who enjoys building web experiences that feel fast, intuitive and meaningful.",
        "I believe great products are created when clean engineering meets thoughtful design. My focus is not only writing code, but building experiences that users genuinely enjoy interacting with.",
        "Currently I am expanding my expertise into full-stack development while continuously shipping real-world projects and deepening my backend engineering foundations.",
      ],
      highlights: [
        { label: "Production Apps", value: "18+" },
        { label: "Lighthouse Score", value: "98+" },
        { label: "Developers Mentored", value: "250+" },
      ],
    },

    // — MY JOURNEY — timeline
    journey: [
      {
        year: "2022",
        title: "The First Line of Code",
        description: "Discovered web development through curiosity — built first HTML/CSS pages and fell in love with making things appear in a browser.",
        side: "left" as const,
      },
      {
        year: "2023",
        title: "React & Real Projects",
        description: "Dived deep into React and JavaScript ecosystems. Built first full-stack CRUD app and open-source tools, gaining confidence in the craft.",
        side: "right" as const,
      },
      {
        year: "2024",
        title: "Leadership & Internship",
        description: "Elected President of E-Cell MET BKC. Started internship building production Next.js components and REST APIs serving real users.",
        side: "left" as const,
      },
      {
        year: "2025",
        title: "Hackathon Win & SaaS Launch",
        description: "Won 1st place in a State-Level Hackathon. Shipped multiple SaaS products including a real-time telemetry platform with 100k+ daily events.",
        side: "right" as const,
      },
      {
        year: "2026",
        title: "Open to Full-Stack Roles",
        description: "Actively seeking a product-focused engineering role where I can contribute to meaningful products, grow in system design, and ship things that matter.",
        side: "left" as const,
      },
    ],

    // — WHAT DRIVES ME — values
    values: [
      {
        icon: "✦",
        title: "Craft Over Shortcuts",
        description: "I take pride in code that is readable, maintainable, and intentional — not just code that works.",
      },
      {
        icon: "⚡",
        title: "Speed by Default",
        description: "Performance is a feature. Every millisecond saved is a user retained.",
      },
      {
        icon: "🌱",
        title: "Continuous Learning",
        description: "The web moves fast. I stay curious — reading, building and iterating every week.",
      },
      {
        icon: "🤝",
        title: "Community Impact",
        description: "I believe in sharing knowledge. Mentoring 250+ developers is one of my most fulfilling achievements.",
      },
      {
        icon: "🎯",
        title: "User-Centric Design",
        description: "Great engineering starts with empathy. Every interaction is sculpted to feel intuitive and seamless.",
      },
    ],

    // — BEYOND CODE — hobbies
    hobbies: [
      { icon: "🎧", label: "Music" },
      { icon: "✈️", label: "Travel & Exploring" },
      { icon: "📸", label: "Photography" },
      { icon: "🎮", label: "Gaming" },
    ],

    // — CURRENT FOCUS — goals
    currentFocus: [
      {
        number: "01",
        title: "Master Full-Stack Depth",
        description: "Going deeper into PostgreSQL, Node.js internals, and distributed system design to become a complete product engineer.",
      },
      {
        number: "02",
        title: "Land a Product-Focused Role",
        description: "Joining a team where I can ship features that reach real users, collaborate with designers, and grow fast.",
      },
      {
        number: "03",
        title: "Ship a Profitable SaaS",
        description: "Building and launching a personal SaaS product — from zero to first paying customer — entirely as a solo developer.",
      },
      {
        number: "04",
        title: "Explore AI Integration",
        description: "Integrating LLMs and real-time streaming AI agents into web products to craft next-gen user workflows.",
      },
      {
        number: "05",
        title: "Advanced 3D Web Graphics",
        description: "Elevating web experiences using WebGL, custom shaders, and Three.js performance optimizations.",
      },
    ],
  },

  skillsCategories: [
    {
      title: "Frontend Architecture",
      description: "Modern React Frameworks & User Interface Systems",
      skills: [
        { name: "React 19 & Next.js 15", level: 96, experience: "3+ yrs", icon: "Code2", highlight: "App Router, Server Components, Streaming SSR" },
        { name: "TypeScript", level: 94, experience: "3+ yrs", icon: "FileCode", highlight: "Strict types, generic interfaces & automated verification" },
        { name: "Tailwind CSS v4", level: 95, experience: "3+ yrs", icon: "Palette", highlight: "Design tokens, glassmorphism & responsive layouts" },
        { name: "State Management", level: 90, experience: "2+ yrs", icon: "Cpu", highlight: "Redux Toolkit, Zustand, React Query" },
      ]
    },
    {
      title: "Full-Stack & Backend",
      description: "REST APIs, Databases & Real-Time Sync",
      skills: [
        { name: "Node.js & Express", level: 92, experience: "3+ yrs", icon: "Server", highlight: "Scalable REST APIs, middleware & auth pipelines" },
        { name: "PostgreSQL & Prisma", level: 88, experience: "2+ yrs", icon: "Database", highlight: "Relational schema design & high-speed queries" },
        { name: "MongoDB", level: 86, experience: "2+ yrs", icon: "HardDrive", highlight: "NoSQL document modeling & aggregation" },
        { name: "WebSockets", level: 85, experience: "2+ yrs", icon: "Zap", highlight: "Real-time telemetry, chat & collaborative state sync" },
      ]
    },
    {
      title: "Motion & Engineering Tools",
      description: "Supporting 3D Canvas, Scroll Animations & DevOps",
      skills: [
        { name: "Three.js & R3F", level: 85, experience: "2+ yrs", icon: "Box", highlight: "Supporting 3D organic sculpture elements & shaders" },
        { name: "GSAP & Framer Motion", level: 92, experience: "2+ yrs", icon: "Activity", highlight: "ScrollTrigger timelines & component spring physics" },
        { name: "Git, GitHub & Vercel", level: 92, experience: "3+ yrs", icon: "GitBranch", highlight: "CI/CD pipelines, PR code reviews & automated deploys" },
        { name: "Testing & Web Vitals", level: 86, experience: "2+ yrs", icon: "CheckCircle", highlight: "Jest unit testing & Lighthouse performance optimization" },
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "nexus-analytics-saas",
      title: "NEXUS METRICS",
      subtitle: "Full-Stack Telemetry & Analytics Platform",
      category: "Full-Stack SaaS",
      description: "Enterprise web analytics platform providing real-time traffic telemetry, WebSocket data pipelines, and custom reporting dashboards.",
      tags: ["Next.js 15", "React 19", "Node.js", "PostgreSQL", "Prisma", "Tailwind v4"],
      year: "2026",
      client: "Production SaaS Product",
      role: "Lead Full-Stack Engineer",
      accentColor: "#B85C3B",
      githubUrl: "https://github.com",
      liveUrl: "https://nexus-metrics.example.com",
      caseStudy: {
        overview: "Engineered a full-stack telemetry platform to aggregate and visualize live website analytics with sub-30ms query latency.",
        challenge: "Processing high-frequency streaming events without blocking client rendering.",
        solution: "Implemented WebSocket streaming connected to Redis event caching and PostgreSQL analytical indexes.",
        architecture: [
          "Next.js 15 App Router server components for fast SSR",
          "Node.js Express backend with JWT authentication",
          "PostgreSQL database indexed for date-range queries",
          "Tailwind CSS v4 responsive dashboard layout"
        ],
        metrics: [
          { label: "Lighthouse Score", value: "99 / 100" },
          { label: "Query Latency", value: "< 24ms" },
          { label: "Daily Events", value: "100,000+" },
          { label: "Uptime", value: "99.9%" }
        ],
        technologies: ["Next.js 15", "React 19", "TypeScript", "Node.js", "PostgreSQL", "Prisma"]
      }
    },
    {
      id: "spatial-3d-canvas",
      title: "SPATIAL CANVAS 3D",
      subtitle: "Interactive 3D Product Customizer",
      category: "Interactive 3D",
      description: "Interactive 3D product configurator enabling users to customize hardware materials in real-time with glowing lighting and organic shaders.",
      tags: ["Three.js", "React Three Fiber", "Next.js 15", "GLSL Shaders", "GSAP"],
      year: "2025",
      client: "E-Commerce Client",
      role: "Lead Frontend Engineer",
      accentColor: "#B85C3B",
      githubUrl: "https://github.com",
      liveUrl: "https://spatial-canvas.example.com",
      caseStudy: {
        overview: "Developed a 3D product customizer allowing real-time material and lighting adjustments directly in browser.",
        challenge: "Maintaining smooth 60 FPS performance across mobile viewports.",
        solution: "Applied Draco geometry compression and GLSL shaders to reduce 3D asset overhead by 65%.",
        architecture: [
          "React Three Fiber declarative 3D canvas",
          "GSAP ScrollTrigger camera transitions for product tour",
          "Framer Motion layout panels for configuration",
          "Mobile touch & orbit control dampening"
        ],
        metrics: [
          { label: "Frame Rate", value: "60 FPS" },
          { label: "Asset Reduction", value: "65%" },
          { label: "Engagement", value: "+ 45%" },
          { label: "Mobile Support", value: "100%" }
        ],
        technologies: ["Three.js", "React Three Fiber", "TypeScript", "GSAP", "Tailwind CSS"]
      }
    },
    {
      id: "syncspace-workspace",
      title: "SYNCSPACE COLLAB",
      subtitle: "Real-Time Collaborative Markdown Editor",
      category: "Real-Time Web Apps",
      description: "Collaborative workspace web app enabling multi-user real-time document editing, live cursor tracking, and instant version history.",
      tags: ["React 19", "TypeScript", "WebSockets", "Express.js", "MongoDB", "Zustand"],
      year: "2025",
      client: "Open-Source Tool",
      role: "Creator & Full-Stack Developer",
      accentColor: "#8E9A78",
      githubUrl: "https://github.com",
      liveUrl: "https://syncspace.example.com",
      caseStudy: {
        overview: "Created a real-time collaborative documentation editor for developer teams.",
        challenge: "Handling concurrent edit conflicts without data loss.",
        solution: "Implemented WebSocket Operational Transformation with Zustand optimistic updates.",
        architecture: [
          "Socket.io server broadcast channels",
          "MongoDB document store with automated snapshots",
          "Monaco Editor React integration",
          "Tailwind CSS responsive preview"
        ],
        metrics: [
          { label: "Sync Latency", value: "< 15ms" },
          { label: "Concurrent Users", value: "50+" },
          { label: "Test Coverage", value: "92%" },
          { label: "GitHub Stars", value: "350+" }
        ],
        technologies: ["React 19", "TypeScript", "WebSockets", "Node.js", "MongoDB"]
      }
    },
    {
      id: "dev-hub-portfolio",
      title: "DEV-HUB PORTAL",
      subtitle: "Developer Knowledge Repository",
      category: "Frontend Engineering",
      description: "Fast developer knowledge portal featuring snippet management, interactive API sandbox, and automated documentation generator.",
      tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "REST API", "Vercel"],
      year: "2024",
      client: "Developer Tool",
      role: "Frontend Engineer",
      accentColor: "#B85C3B",
      githubUrl: "https://github.com",
      liveUrl: "https://dev-hub.example.com",
      caseStudy: {
        overview: "Built a developer knowledge portal providing instant snippet search and tech documentation.",
        challenge: "Achieving instantaneous client-side search without main thread lag.",
        solution: "Utilized Web Workers for off-thread fuzzy search indexing.",
        architecture: [
          "Next.js 15 SSG with incremental static regeneration",
          "Framer Motion search drawer and filter tags",
          "Web Worker off-thread fuzzy text index",
          "Accessible ARIA keyboard shortcuts"
        ],
        metrics: [
          { label: "Search Speed", value: "< 2ms" },
          { label: "Lighthouse Score", value: "100 / 100" },
          { label: "Monthly Users", value: "15,000+" },
          { label: "SEO Score", value: "100 / 100" }
        ],
        technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Web Workers"]
      }
    }
  ] as Project[],

  experience: [
    {
      id: "exp-1",
      role: "Full-Stack Engineering Intern / Developer",
      company: "TECH INNOVATION LABS",
      location: "India / Remote",
      period: "2025 — PRESENT",
      type: "Internship",
      description: "Building production React components, developing RESTful APIs, and optimizing web performance.",
      deliverables: [
        "Engineered 12+ reusable React/Next.js UI components with strict design tokens",
        "Optimized client bundle size by 35% via dynamic code splitting and image optimization",
        "Collaborated on Node.js REST API middleware and Prisma database schemas",
        "Integrated supporting 3D organic canvas elements using React Three Fiber"
      ],
      technologies: ["Next.js 15", "React 19", "TypeScript", "Node.js", "Tailwind CSS"]
    },
    {
      id: "exp-2",
      role: "Frontend Development Engineer",
      company: "MET DIGITAL STUDIO",
      location: "Nashik, India",
      period: "2024 — 2025",
      type: "Project Lead",
      description: "Led frontend development for web portals and student management platforms.",
      deliverables: [
        "Architected responsive Next.js web portal serving 3,000+ daily student users",
        "Implemented real-time form validation, Toast alerts, and dynamic data tables",
        "Maintained 95+ Lighthouse performance scores across all pages"
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "REST APIs", "Git"]
    }
  ] as ExperienceItem[],

  leadership: [
    {
      id: "lead-1",
      role: "President — Entrepreneurship Cell (E-Cell MET BKC)",
      organization: "MET’s Institute of Engineering",
      period: "2024 — PRESENT",
      tagline: "Heading student entrepreneurship & innovation initiatives.",
      description: "Leading a team of 30+ student coordinators to foster startup culture, organize regional innovation summits, and manage developer hackathons.",
      impact: [
        "Organized regional E-Summit with 500+ participants and startup founders",
        "Spearheaded 4 workshops covering Web Development, Git/GitHub, and AI Tools",
        "Built official E-Cell event portal using Next.js 15 and Tailwind CSS",
        "Mentored student startup teams on technical architecture and MVPs"
      ],
      badge: "Presidential Leadership"
    },
    {
      id: "lead-2",
      role: "Campus Ambassador & Tech Community Lead",
      organization: "National Student Developer Network",
      period: "2023 — 2025",
      tagline: "Connecting student developers with modern technology.",
      description: "Represented tech initiatives on campus, driving open-source engagement and peer coding bootcamps.",
      impact: [
        "Mentored 200+ junior student developers in JavaScript, React, and Git",
        "Organized open-source drives resulting in 150+ merged PRs",
        "Hosted technical webinars and coding challenges"
      ],
      badge: "Community Growth"
    },
    {
      id: "lead-3",
      role: "Hackathon Winner & Tech Lead",
      organization: "State-Level Hackathons",
      period: "2024 — 2025",
      tagline: "Building functional web products under 36-hour deadlines.",
      description: "Led 4-person engineering teams to build and pitch working web product prototypes in high-intensity competitions.",
      impact: [
        "Won 1st Place in Innovation Hackathon for healthcare booking MVP",
        "Engineered full-stack WebSockets prototype in under 24 hours",
        "Presented live product demonstrations to judges from tech firms"
      ],
      badge: "Hackathon Champion"
    }
  ] as LeadershipItem[],

  certifications: [
    {
      id: "cert-1",
      title: "Full-Stack Web Development Mastery",
      organization: "Meta / Coursera",
      year: "2025",
      category: "Full-Stack Engineering",
      credentialId: "META-FS-9842",
      description: "Advanced certification covering modern React 19 architecture, Node.js REST APIs, database management, and cloud deployment.",
      badgeModel: "trophy",
      skills: ["React 19", "Node.js", "Express", "PostgreSQL", "REST APIs"],
      verifyUrl: "https://coursera.org/verify/META-FS-9842"
    },
    {
      id: "cert-2",
      title: "Advanced React & Next.js Systems",
      organization: "Frontend Masters",
      year: "2025",
      category: "Frontend Architecture",
      credentialId: "FEM-REACT-3310",
      description: "Accreditation for Next.js App Router, Server Components, Web Vitals tuning, and custom performance hooks.",
      badgeModel: "star",
      skills: ["Next.js 15", "Server Components", "Performance", "Web Vitals"],
      verifyUrl: "https://frontendmasters.com/certificates/FEM-REACT-3310"
    },
    {
      id: "cert-3",
      title: "TypeScript Systems Design",
      organization: "Educative / Tech Guild",
      year: "2024",
      category: "Software Design",
      credentialId: "TS-ENG-7712",
      description: "Specialized certification in strict TypeScript generic types, structural typing, and enterprise architectural patterns.",
      badgeModel: "shield",
      skills: ["TypeScript", "Design Patterns", "Generics", "Strict Typing"],
      verifyUrl: "https://educative.io/verify/TS-ENG-7712"
    },
    {
      id: "cert-4",
      title: "Three.js & WebGL Graphics",
      organization: "Three.js Journey",
      year: "2024",
      category: "3D Web Graphics",
      credentialId: "THREE-3D-9021",
      description: "Training in 3D scene construction, GLSL shaders, camera choreography, and browser GPU optimization.",
      badgeModel: "diamond",
      skills: ["Three.js", "WebGL", "GLSL Shaders", "R3F", "3D Math"],
      verifyUrl: "https://threejs-journey.com/certificate/THREE-3D-9021"
    },
    {
      id: "cert-5",
      title: "Cloud Native & AWS Architecture",
      organization: "Amazon Web Services",
      year: "2025",
      category: "Cloud & Infrastructure",
      credentialId: "AWS-SAA-8831",
      description: "Certification in cloud architecture design, microservices orchestration, serverless lambdas, and CDN distribution.",
      badgeModel: "crown",
      skills: ["AWS", "Serverless", "Docker", "CDN", "Cloud Security"],
      verifyUrl: "https://aws.amazon.com/verification/AWS-SAA-8831"
    },
    {
      id: "cert-6",
      title: "Algorithmic Systems & Data Structures",
      organization: "Stanford Online",
      year: "2024",
      category: "Algorithmic Systems",
      credentialId: "STAN-DS-4419",
      description: "Rigorous certification covering graph algorithms, dynamic programming, graph traversal, and time complexity analysis.",
      badgeModel: "medal",
      skills: ["Algorithms", "Data Structures", "Dynamic Programming", "Optimization"],
      verifyUrl: "https://online.stanford.edu/verify/STAN-DS-4419"
    },
    {
      id: "cert-7",
      title: "AI Engineering & Agentic Integration",
      organization: "DeepLearning.AI",
      year: "2025",
      category: "AI & Machine Learning",
      credentialId: "DLAI-AGENT-5520",
      description: "Specialized accreditation in integrating LLMs, real-time streaming AI pipelines, and autonomous agentic workflows into web apps.",
      badgeModel: "shield",
      skills: ["LangChain", "LLM APIs", "Vector DBs", "Streaming AI", "Python"],
      verifyUrl: "https://deeplearning.ai/verify/DLAI-AGENT-5520"
    },
    {
      id: "cert-8",
      title: "UI/UX & Motion Engineering",
      organization: "DesignCode Guild",
      year: "2024",
      category: "Frontend Architecture",
      credentialId: "DC-MOTION-1102",
      description: "Mastery of fluid spring physics, scroll-triggered timelines, micro-interactions, and visual design systems.",
      badgeModel: "star",
      skills: ["Framer Motion", "GSAP", "UI Design", "Glassmorphism", "CSS Architecture"],
      verifyUrl: "https://designcode.io/verify/DC-MOTION-1102"
    }
  ] as CertificationItem[]
};

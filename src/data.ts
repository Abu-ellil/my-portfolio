/**
 * Central data + config for the portfolio.
 * Optimized for 2027: Full-Stack & Mobile AI Engineer.
 */

export const IDENTITY = {
  name: 'Mahmoud Abuellil',
  nameAr: 'محمود ابوالليل',
  title: 'Full-Stack & Mobile AI Engineer',
  tagline: 'React Native · Next.js · Agentic AI & LLMs',
  location: 'Cairo, Egypt (UTC+2)',
  email: 'aboellil.dev@gmail.com',
  phoneDisplay: '+20 122 108 9249',
  whatsapp: 'https://wa.me/201221089249',
  github: 'https://github.com/Abu-ellil',
  linkedin: 'https://www.linkedin.com/in/abu-ellil-806619254/',
  upwork: 'https://www.upwork.com/freelancers/~01515e873f38ed144f',
  mostaql: 'https://mostaql.com/u/AbuEllil',
  youtube: 'https://www.youtube.com/@ABUELLIL',
  portfolio: 'https://abuellil.is-a.dev/',
  cv: '/MahmoudAboellilFullStack.pdf',
  available: 'Available for high-impact freelance & remote contracts',
};

export const STATS = [
  { value: '4+', label: 'Years Experience' },
  { value: '10K+', label: 'Active App Downloads' },
  { value: '25+', label: 'Production Projects' },
  { value: '100%', label: 'Delivery & Client Rating' },
];

export const SERVICES = [
  {
    icon: 'smartphone',
    title: 'Cross-Platform Mobile Apps',
    description: 'Native-feel iOS & Android apps using React Native & Expo with real-time sync and offline storage.',
  },
  {
    icon: 'brain',
    title: 'AI & LLM Integration',
    description: 'Custom AI agents, OpenAI/Gemini APIs, and local private LLMs (Ollama, llama.cpp) embedded into web & mobile.',
  },
  {
    icon: 'globe',
    title: 'Full-Stack Web & Next.js',
    description: 'High-performance SSR/SSG web applications with React, Next.js, TypeScript, Node.js, and MongoDB.',
  },
  {
    icon: 'cpu',
    title: 'Desktop Systems & Offline ERPs',
    description: 'Cross-platform desktop software using Electron, React, and SQLite with bilingual invoicing and thermal printing.',
  },
];

export const TECH_CATEGORIES = [
  {
    title: 'AI & Intelligent Systems',
    items: ['OpenAI API', 'Google Gemini API', 'Ollama', 'LM Studio', 'llama.cpp', 'AI Agent Orchestration', 'Prompt Engineering'],
  },
  {
    title: 'Mobile Development',
    items: ['React Native', 'Expo', 'NativeWind', 'Redux Toolkit', 'Zustand', 'Offline-First Storage', 'Push Notifications'],
  },
  {
    title: 'Web Frontend',
    items: ['React.js', 'Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'Three.js'],
  },
  {
    title: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'RESTful APIs', 'GraphQL', 'Socket.IO', 'JWT Auth', 'OAuth 2.0'],
  },
  {
    title: 'Database & Cloud',
    items: ['MongoDB', 'Firebase / Firestore', 'SQLite', 'PostgreSQL', 'Redis', 'Vercel', 'Docker'],
  },
  {
    title: 'DevOps & Tooling',
    items: ['Git / GitHub', 'GitHub Actions CI/CD', 'Postman', 'Linux', 'Figma', 'Bash Scripting'],
  },
];

export interface ProjectItem {
  title: string;
  subtitle: string;
  icon: 'phone' | 'truck' | 'leaf' | 'scissors' | 'brain' | 'cart';
  highlight?: string;
  image?: string;
  tech: string[];
  description: string;
  features: string[];
  githubLink?: string;
  liveLink?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    title: 'Hawadeet Social App',
    subtitle: 'Social Networking on Google Play',
    icon: 'phone',
    highlight: '10,000+ Downloads',
    image: '/projects/hawadeet-cover.jpg',
    tech: ['React Native', 'Expo', 'Node.js', 'Socket.IO', 'MongoDB', 'RTL Layout'],
    description:
      'Community storytelling and social platform published on Google Play with 10,000+ downloads. Features full Arabic RTL layout, voice recording & playback, story sharing, interactive posts, and low-latency real-time group chat.',
    features: [
      '10,000+ active Google Play downloads',
      'Voice memo recording & sharing engine',
      'Real-time community messaging with Socket.IO',
      'Full Arabic RTL & localized user experience',
    ],
    liveLink: 'https://play.google.com/store/apps/details?id=com.hawadeet.app',
  },
  {
    title: 'Delivery Ecosystem',
    subtitle: '4-in-1 Multi-Platform Logistics',
    icon: 'truck',
    highlight: '4 Connected Apps',
    image: '/projects/delivery-cover.jpg',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Socket.IO', 'Expo', 'Google Maps API'],
    description:
      'Production-grade logistics ecosystem comprising 4 interlinked applications: Driver App with live GPS navigation, Store Merchant App with instant dispatch, Super Admin analytics panel, and customer marketing site.',
    features: [
      'Real-time GPS tracking & route recalculation',
      'In-app driver ↔ store encrypted chat',
      'Sub-200ms API response with indexed queries',
      'Complete order lifecycle from cart to delivery',
    ],
    githubLink: 'https://github.com/Abu-ellil/Tawseelah2025',
  },
  {
    title: 'Greeno-AI',
    subtitle: 'AI-Powered Agriculture Assistant',
    icon: 'leaf',
    highlight: 'Vision AI & Offline',
    image: '/projects/greeno-cover.jpg',
    tech: ['React Native', 'Gemini API', 'OpenAI', 'Node.js', 'Firebase', 'Expo'],
    description:
      'Intelligent agricultural diagnosis app utilizing computer vision models (Google Gemini & OpenAI) to detect plant diseases from leaf photographs, paired with localized crop recommendations and offline-first weather alerting.',
    features: [
      'Plant disease diagnosis via camera & Vision AI',
      'Intelligent API response caching (cuts costs by 40%)',
      'Offline-first synchronization for rural farmers',
      'Localized seasonal crop planning & harvest alerts',
    ],
    githubLink: 'https://github.com/Abu-ellil/AI-Farmer2',
  },
  {
    title: 'Etiquette Tailor ERP',
    subtitle: 'Desktop Enterprise ERP System',
    icon: 'scissors',
    highlight: 'Multi-Branch & Hardware Sync',
    image: '/projects/etiquette-cover.jpg',
    tech: ['Electron', 'React', 'TypeScript', 'SQLite', 'shadcn/ui'],
    description:
      'Commercial desktop management software built for fashion tailoring chains. Coordinates multi-branch orders, automatic piece-rate artisan wages, bilingual Arabic/English invoices with ESC/POS thermal printer support, and local SQLite data isolation.',
    features: [
      'Multi-branch order tracking & auto-numbering',
      'Automated artisan wage calculation',
      'ESC/POS hardware thermal receipt printing',
      '100% offline functionality with zero cloud dependency',
    ],
    githubLink: 'https://github.com/Abu-ellil/etiquette-tailor',
  },
  {
    title: 'LocalBench AI',
    subtitle: 'Local LLM Benchmarking Suite',
    icon: 'brain',
    highlight: 'Open-Source & Local LLMs',
    image: '/projects/localbench-cover.jpg',
    tech: ['Python', 'Ollama', 'LM Studio', 'llama.cpp', 'Bash', 'Benchmarking'],
    description:
      'Developer toolchain engineered to evaluate and benchmark local Large Language Models (LLMs) on consumer hardware across diverse quantization parameters, measuring token generation throughput and VRAM footprint.',
    features: [
      'Inference speed & latency profiling (tokens/sec)',
      'Memory & VRAM saturation telemetry',
      'Automated test runs across GGUF quantization tiers',
      'Comprehensive open-source benchmarks',
    ],
    githubLink: 'https://github.com/Abu-ellil/Arabic-Ai-Lab',
  },
  {
    title: 'Soog E-Commerce',
    subtitle: 'Full-Stack E-Commerce Platform',
    icon: 'cart',
    highlight: 'SSR & Type-Safe',
    image: '/projects/soog-cover.jpg',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe API'],
    description:
      'Full e-commerce platform with Next.js server-side rendering for optimal SEO, dynamic multi-attribute product filters, secure Stripe payment processing, and end-to-end type safety.',
    features: [
      'Server-side rendered dynamic product catalogs',
      'Stripe payment gateway integration',
      'Real-time customer order status updates',
      '100% end-to-end TypeScript codebase',
    ],
    githubLink: 'https://github.com/Abu-ellil/Soog-app',
  },
];

export const EXPERIENCE = [
  {
    title: 'Freelance Full-Stack & Mobile Engineer',
    company: 'MASOFT',
    period: '2022 — Present',
    description:
      'Designing and shipping end-to-end production software across e-commerce, logistics, and AI for clients across Egypt, the Gulf, and international markets.',
  },
  {
    title: 'Full-Stack Software Engineering Fellow',
    company: 'Kalbonyan Elmarsous',
    period: '2022 — 2023',
    description:
      'Rigorous software engineering curriculum focused on clean architecture, MERN stack, data structures, and production-level system design.',
    website: 'https://kalbonyanelmarsos.com',
  },
  {
    title: 'Open Source & AI Tools Creator',
    company: 'Community / YouTube',
    period: '2023 — Present',
    description:
      'Publishing technical tutorials on Local LLMs, agentic AI tooling, and cross-platform mobile engineering for developer communities.',
  },
];

export const CERTIFICATIONS = [
  { title: 'React – The Complete Guide', description: 'Advanced hooks, architecture, performance, and state machines.' },
  { title: 'Node.js & Deno.js Master Course', description: 'Microservices, REST & GraphQL APIs, authentication, and MongoDB.' },
  { title: 'JavaScript – Modern ES6+ & Deep Dive', description: 'DOM internals, async runtime, memory management, and design patterns.' },
  { title: 'Responsive Web Design Certification', description: 'Semantic HTML5, CSS Grid/Flexbox, and accessibility standards (freeCodeCamp).' },
  { title: 'REST APIs, GraphQL, MongoDB & SQL', description: 'Database indexing, schema modeling, query optimization, and caching layers.' },
];

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Central data + config for the portfolio.
 * All facts verified against CV/repo — keep in sync with public/MahmoudAboellilFullStack.pdf.
 */

export const IDENTITY = {
  name: 'Mahmoud Abuellil',
  nameAr: 'محمود ابوالليل',
  title: 'Full-Stack Engineer',
  tagline: 'MERN · React Native · Next.js',
  location: 'Cairo, Egypt (UTC+2)',
  email: 'aboellil.dev@gmail.com',
  phoneDisplay: '+20 122 108 9249',
  whatsapp: 'https://wa.me/201221089249',
  github: 'https://github.com/Abu-ellil',
  linkedin: 'https://www.linkedin.com/in/abu-ellil-806619254/',
  mostaql: 'https://mostaql.com/u/AbuEllil',
  youtube: 'https://www.youtube.com/@ABUELLIL',
  cv: '/MahmoudAboellilFullStack.pdf',
  available: 'Open to freelance & full-time remote roles',
};

export const STATS = [
  { value: '4+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Delivered' },
  { value: '15+', label: 'Technologies' },
  { value: '100%', label: 'Client Satisfaction' },
];

export const SERVICES = [
  {
    icon: 'globe',
    title: 'Full-Stack Web',
    description: 'End-to-end web apps with React, Next.js, Node.js, and MongoDB.',
  },
  {
    icon: 'smartphone',
    title: 'Mobile Development',
    description: 'Cross-platform apps with React Native + Expo for iOS & Android.',
  },
  {
    icon: 'cpu',
    title: 'Desktop Applications',
    description: 'Electron-based desktop apps with SQLite and offline-first architecture.',
  },
  {
    icon: 'zap',
    title: 'Real-time & Integrations',
    description: 'Real-time features, payment integrations, push notifications, and more.',
  },
];

export const TECH_CATEGORIES = [
  {
    title: 'Frontend',
    items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'shadcn/ui'],
  },
  {
    title: 'Mobile',
    items: ['React Native', 'Expo', 'NativeWind'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Socket.io', 'JWT / OAuth'],
  },
  {
    title: 'Database & Cloud',
    items: ['MongoDB', 'Firebase', 'SQL', 'Vercel'],
  },
  {
    title: 'Desktop & Tools',
    items: ['Electron', 'SQLite', 'Git', 'Docker', 'Postman', 'Figma'],
  },
];

export const PROJECTS = [
  {
    title: 'Delivery Platform',
    subtitle: 'Complete Delivery Ecosystem',
    icon: 'truck',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'Expo'],
    description:
      'Production-grade delivery ecosystem with 4 apps: Driver App with real-time GPS tracking and order status transitions, Store App with instant notifications, Admin Panel with analytics, and a marketing landing site. Includes in-app chat between driver & store and role-based access control.',
    features: [
      'Real-time map tracking',
      'In-app driver ↔ store chat',
      'Push notifications',
      'Role-based access control',
    ],
    link: 'https://github.com/Abu-ellil',
  },
  {
    title: 'Greeno-AI',
    subtitle: 'AI Agriculture Assistant',
    icon: 'leaf',
    tech: ['React Native', 'Node.js', 'AI APIs', 'Firebase', 'Expo'],
    description:
      'AI-powered agriculture assistant for farmers that works offline: plant disease diagnosis from leaf photos via camera, smart crop planning based on season and region, and real-time weather alerts with intelligent caching for rural low-connectivity areas.',
    features: [
      'Offline-first architecture',
      'Plant disease diagnosis via camera',
      'Smart crop planning',
      'Real-time weather alerts',
    ],
    link: 'https://github.com/Abu-ellil',
  },
  {
    title: 'Etiquette Tailor',
    subtitle: 'Tailoring Shop Management',
    icon: 'scissors',
    tech: ['Electron', 'React', 'TypeScript', 'SQLite', 'shadcn/ui'],
    description:
      'Professional desktop system for women’s tailoring shops with multiple branches: full order lifecycle from receipt to delivery, worker task assignment with automatic wage calculation, bilingual invoices (Arabic + English) with thermal printing, and comprehensive sales/wages/profit reports.',
    features: [
      'Multi-branch with auto-numbering',
      'Auto wage calculation',
      'Bilingual invoices + thermal printing',
      'Sales, wages & profit reports',
    ],
    link: 'https://github.com/Abu-ellil',
  },
  {
    title: 'Soog App',
    subtitle: 'Full E-commerce Platform',
    icon: 'cart',
    tech: ['TypeScript', 'Next.js', 'Node.js', 'MongoDB'],
    description:
      'Full e-commerce solution with advanced product filtering and search, shopping cart and complete checkout system, and real-time order tracking. Type-safe codebase end-to-end with TypeScript on both frontend and backend.',
    features: [
      'Advanced filtering & search',
      'Cart + complete checkout',
      'Real-time order tracking',
      'Type-safe end-to-end',
    ],
    link: 'https://github.com/Abu-ellil',
  },
];

export const EXPERIENCE = [
  {
    title: 'Freelance Full-Stack Engineer',
    company: 'MASOFT',
    period: '2022 — Present',
    description:
      'Delivering custom web, mobile & desktop solutions for clients worldwide — from requirements gathering to production deployment.',
  },
  {
    title: 'Full-Stack Developer',
    company: 'Kalbonyan Elmarsous',
    period: '2023 — 2024',
    description:
      'Comprehensive full-stack development program focusing on modern web technologies and best practices.',
    website: 'https://kalbonyanelmarsos.com',
  },
  {
    title: 'Open Source Contributor',
    company: 'Community',
    period: '2022 — Present',
    description: 'Building and maintaining open-source projects and developer tools.',
  },
];

export const CERTIFICATIONS = [
  { title: 'React - The Complete Guide', description: 'Comprehensive React course covering hooks, context, Redux, and modern patterns.' },
  { title: 'Node.js - The Complete Guide', description: 'Complete Node.js development including Express, MongoDB, and REST APIs.' },
  { title: 'React Native Development', description: 'Cross-platform mobile app development with React Native.' },
  { title: 'MongoDB Developer', description: 'Database design, aggregation, and performance optimization.' },
  { title: 'JavaScript Algorithms', description: 'Data structures and algorithms implementation in JavaScript.' },
  { title: 'Full Stack Web Development', description: 'Intensive full-stack development program with real-world projects.' },
];

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

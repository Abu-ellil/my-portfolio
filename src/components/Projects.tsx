import React from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  Leaf,
  Scissors,
  ShoppingCart,
  MapPin,
  MessageSquare,
  Bell,
  Wifi,
  Cpu,
  Globe,
  Smartphone,
  Monitor,
  ExternalLink,
} from 'lucide-react';

const projects = [
  {
    title: 'Delivery Platform',
    subtitle: 'Complete Delivery Ecosystem',
    description:
      'A production-grade delivery platform with 4 interconnected apps — Driver App, Store App, Admin Panel, and Landing Site. Features real-time GPS tracking, in-app chat, order management, push notifications, and role-based access control.',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'Expo'],
    icon: <Truck className="w-6 h-6" />,
    gradient: 'from-blue-600 to-cyan-500',
    features: ['Real-time GPS Tracking', 'In-app Chat', 'Push Notifications', 'Multi-role System'],
    color: 'blue',
  },
  {
    title: 'Greeno-AI',
    subtitle: 'AI Agriculture Assistant',
    description:
      'AI-powered agriculture assistant for farmers. Diagnoses plant diseases from leaf photos via camera, provides smart crop planning based on season and region, and delivers real-time weather alerts with intelligent caching. Works offline-first for rural areas.',
    tech: ['React Native', 'Node.js', 'AI APIs', 'Firebase', 'Expo'],
    icon: <Leaf className="w-6 h-6" />,
    gradient: 'from-emerald-600 to-green-400',
    features: ['Plant Disease Diagnosis', 'Smart Crop Planning', 'Offline-First', 'Weather Alerts'],
    color: 'emerald',
  },
  {
    title: 'Etiquette Tailor',
    subtitle: 'Tailoring Shop Management',
    description:
      'Professional desktop system for women\'s tailoring shops with multi-branch management. Handles full order lifecycle, worker task assignment with automatic wage calculation, bilingual invoices (Arabic + English), thermal printing, and comprehensive reporting.',
    tech: ['Electron', 'React', 'TypeScript', 'SQLite', 'Tailwind CSS', 'shadcn/ui'],
    icon: <Scissors className="w-6 h-6" />,
    gradient: 'from-purple-600 to-pink-500',
    features: ['Multi-branch Management', 'Bilingual Invoices', 'Wage Calculation', 'Auto Backup'],
    color: 'purple',
  },
  {
    title: 'Soog App',
    subtitle: 'Full E-commerce Platform',
    description:
      'Complete e-commerce solution with product listings, advanced filtering, shopping cart, checkout system, and real-time order tracking. Fully type-safe codebase from frontend to backend using TypeScript throughout the entire stack.',
    tech: ['TypeScript', 'Next.js', 'Node.js', 'MongoDB'],
    icon: <ShoppingCart className="w-6 h-6" />,
    gradient: 'from-orange-500 to-yellow-400',
    features: ['Product Filtering', 'Order Tracking', 'Type-safe Stack', 'Full Checkout'],
    color: 'orange',
  },
];

const Projects: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" className="section-padding bg-[#080808]">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="text-sm font-medium text-blue-400 tracking-widest uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Production-grade applications I've built — from real-time delivery
            platforms to AI-powered agriculture tools.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="card group"
              variants={itemVariants}
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Left: Project Info */}
                <div className="md:col-span-3 p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white shadow-lg`}
                    >
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      <p className="text-sm text-gray-500">{project.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <motion.a
                      href="https://github.com/Abu-ellil"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Code
                    </motion.a>
                  </div>
                </div>

                {/* Right: Features */}
                <div className="md:col-span-2 p-8 bg-white/[0.02] border-l border-white/5">
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                    Key Features
                  </h4>
                  <div className="space-y-3">
                    {project.features.map((feature, fIndex) => (
                      <motion.div
                        key={fIndex}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: fIndex * 0.1 }}
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient} flex-shrink-0`}
                        />
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative element */}
                  <div className="mt-8 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                      <Cpu className="w-3 h-3" />
                      <span>Production Application</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;

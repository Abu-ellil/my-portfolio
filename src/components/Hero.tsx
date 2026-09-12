import React from 'react';
import { motion } from 'framer-motion';
import Scene3D from './Scene3D';
import { IDENTITY, STATS } from '../data';
import { Github, Linkedin, Download, ArrowRight, MessageCircle, Youtube } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <Scene3D />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050508_75%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/5 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-gray-300">{IDENTITY.available}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] leading-[1.05] mb-6">
            <span className="text-white">{IDENTITY.name}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 pb-2">
              {IDENTITY.title}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
            Building <span className="text-amber-300">production-grade</span> web, mobile & desktop
            applications with <span className="text-orange-300">MERN</span>,{' '}
            <span className="text-rose-300">React Native</span> and{' '}
            <span className="text-amber-300">Next.js</span> — from Cairo to the world.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => scrollTo('#projects')}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-white bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={IDENTITY.cv}
              download="Mahmoud_Abuellil_FullStack_Resume.pdf"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-gray-200 border border-gray-700 hover:border-amber-400/50 hover:text-amber-300 hover:bg-amber-400/5 transition-all duration-300 backdrop-blur-sm"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>

          <div className="flex items-center gap-5 mb-14">
            {[
              { icon: <Github className="w-5 h-5" />, href: IDENTITY.github, label: 'GitHub' },
              { icon: <Linkedin className="w-5 h-5" />, href: IDENTITY.linkedin, label: 'LinkedIn' },
              { icon: <MessageCircle className="w-5 h-5" />, href: IDENTITY.mostaql, label: 'Mostaql' },
              { icon: <Youtube className="w-5 h-5" />, href: IDENTITY.youtube, label: 'YouTube' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-gray-500 hover:text-amber-300 transition-all duration-300 hover:-translate-y-1"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="text-3xl font-bold font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo('#about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gray-600 hover:text-amber-300 transition-colors"
        aria-label="Scroll down"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.button>
    </section>
  );
};

export default Hero;

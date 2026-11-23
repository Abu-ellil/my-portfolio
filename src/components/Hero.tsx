import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Scene3D from './Scene3D';
import { IDENTITY, STATS } from '../data';
import {
  Github,
  Linkedin,
  Download,
  ArrowRight,
  MessageCircle,
  Youtube,
  ExternalLink,
  Check,
  Copy,
  Sparkles,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(IDENTITY.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-grid pt-24 pb-16">
      <Scene3D />

      {/* Modern ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-slate-900/60 backdrop-blur-md mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-medium text-slate-300">
                Available for Contract & Freelance · Q1/Q2
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Architecting{' '}
              <span className="gradient-accent">
                Mobile Apps
              </span>{' '}
              & Agentic AI Systems.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-400 mb-9 max-w-2xl leading-relaxed">
              I’m <span className="text-white font-medium">{IDENTITY.name}</span>, a full-stack engineer building resilient mobile applications (React Native/Expo) and intelligent AI integrations that drive tangible business revenue.
            </p>

            {/* Modern Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-11">
              <button
                onClick={() => scrollTo('#projects')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-slate-950 bg-white hover:bg-slate-200 transition-all duration-200 shadow-md hover:shadow-cyan-500/20 text-sm"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={IDENTITY.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 transition-all duration-200 text-sm backdrop-blur-sm"
              >
                <ExternalLink className="w-4 h-4 text-cyan-400" />
                Hire on Upwork
              </a>

              <a
                href={IDENTITY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all duration-200 text-sm"
              >
                <FaWhatsapp className="w-4 h-4 text-emerald-400" />
                WhatsApp
              </a>
            </div>

            {/* Social Icons Bar */}
            <div className="flex items-center gap-4 text-slate-400">
              <span className="text-xs uppercase tracking-widest font-mono text-slate-500 mr-2">Connect:</span>
              {[
                { icon: <Github className="w-4 h-4" />, href: IDENTITY.github, label: 'GitHub' },
                { icon: <Linkedin className="w-4 h-4" />, href: IDENTITY.linkedin, label: 'LinkedIn' },
                { icon: <ExternalLink className="w-4 h-4" />, href: IDENTITY.upwork, label: 'Upwork' },
                { icon: <Youtube className="w-4 h-4" />, href: IDENTITY.youtube, label: 'YouTube' },
                { icon: <MessageCircle className="w-4 h-4" />, href: IDENTITY.mostaql, label: 'Mostaql' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2 rounded-lg bg-slate-900/50 border border-white/5 hover:border-cyan-400/30 hover:text-cyan-300 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Sleek Interactive Tech Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-2xl overflow-hidden font-mono text-xs">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-400 text-[11px] font-sans">abuellil-terminal</span>
                </div>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  title="Copy email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[10px]">{copied ? 'Copied' : 'Copy Email'}</span>
                </button>
              </div>

              {/* Terminal Body */}
              <div className="p-5 space-y-3.5 text-slate-300 leading-relaxed">
                <div>
                  <span className="text-emerald-400">root@abuellil</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-slate-500">$ </span>
                  <span className="text-white">abuellil --whoami</span>
                </div>
                <div className="pl-3 border-l border-white/10 text-slate-400 space-y-1">
                  <p>• <span className="text-slate-200">Engineer:</span> Mahmoud Abuellil (Cairo, UTC+2)</p>
                  <p>• <span className="text-slate-200">Specialty:</span> Cross-Platform Mobile & Full-Stack AI</p>
                  <p>• <span className="text-slate-200">Experience:</span> 4+ Years Building Scalable MVPs</p>
                </div>

                <div>
                  <span className="text-emerald-400">root@abuellil</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-slate-500">$ </span>
                  <span className="text-white">abuellil --metrics</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="text-lg font-bold text-cyan-400">{stat.value}</div>
                      <div className="text-[10px] text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" /> Verified Upwork Pro
                  </span>
                  <a
                    href={IDENTITY.cv}
                    download="Mahmoud_Abuellil_FullStack_Resume.pdf"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> Get Resume PDF
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

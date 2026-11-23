import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Cpu, Zap, MapPin, Languages, Brain, Sparkles } from 'lucide-react';
import { SERVICES, IDENTITY } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  globe: <Globe className="w-5 h-5 text-cyan-400" />,
  smartphone: <Smartphone className="w-5 h-5 text-indigo-400" />,
  cpu: <Cpu className="w-5 h-5 text-emerald-400" />,
  zap: <Zap className="w-5 h-5 text-amber-400" />,
  brain: <Brain className="w-5 h-5 text-violet-400" />,
};

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          {/* Left Column: Bio & Core Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-slate-900/60 text-slate-300 text-xs font-mono tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Engineering Background
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Solving complex product challenges with modern engineering.
            </h2>

            <p className="text-base text-slate-400 leading-relaxed">
              I’m <span className="text-white font-medium">{IDENTITY.name}</span>, a full-stack & mobile AI engineer based in Cairo. Over the past 4+ years, I’ve delivered production software ranging from consumer apps serving 10,000+ active users to mission-critical offline desktop ERPs with localized hardware integration.
            </p>

            <p className="text-base text-slate-400 leading-relaxed">
              I emphasize clean architecture, strict type safety with TypeScript, and seamless UI responsiveness—ensuring that every line of code adds tangible business value.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {IDENTITY.location}
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300">
                <Languages className="w-3.5 h-3.5 text-indigo-400" />
                Arabic (Native) · English (Professional)
              </span>
            </div>
          </motion.div>

          {/* Right Column: Services Grid */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-cyan-500/30 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                  {iconMap[service.icon] || <Cpu className="w-5 h-5 text-cyan-400" />}
                </div>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  Leaf,
  Scissors,
  ShoppingCart,
  ExternalLink,
  Check,
  Github,
  Smartphone,
  Brain,
  Sparkles,
  Layers,
  Activity,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { PROJECTS } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  phone: <Smartphone className="w-5 h-5 text-cyan-400" />,
  truck: <Truck className="w-5 h-5 text-indigo-400" />,
  leaf: <Leaf className="w-5 h-5 text-emerald-400" />,
  scissors: <Scissors className="w-5 h-5 text-amber-400" />,
  brain: <Brain className="w-5 h-5 text-violet-400" />,
  cart: <ShoppingCart className="w-5 h-5 text-sky-400" />,
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-28 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-mono tracking-wider uppercase mb-3">
            <Layers className="w-3.5 h-3.5" />
            Selected Production Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Engineered for resilience and scale.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Real products deployed to production: from mobile apps with 10k+ downloads to multi-branch desktop ERPs and local AI benchmarking suites.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => {
            const isFeatured = i === 0 || i === 1; // Hawadeet & Delivery get prominent styling
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className={`bento-card p-7 flex flex-col justify-between group ${
                  isFeatured ? 'lg:col-span-1 border-white/[0.12] bg-slate-900/50' : ''
                }`}
              >
                <div>
                  {/* Cover Image (real screenshots / brand tiles) */}
                  {project.image && (
                    <img
                      src={project.image}
                      alt={`${project.title} — project preview`}
                      loading="lazy"
                      className="w-full h-40 object-cover rounded-xl border border-white/10 mb-5"
                    />
                  )}

                  {/* Top Bar with Icon and Links */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      {iconMap[project.icon] || <Sparkles className="w-5 h-5 text-cyan-400" />}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub`}
                          className="p-2 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white border border-white/5 hover:border-white/20 transition-all"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} Demo`}
                          className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Highlights Badge */}
                  {project.highlight && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-3">
                      <Activity className="w-3 h-3 text-cyan-400" />
                      {project.highlight}
                    </div>
                  )}

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 mb-4">{project.subtitle}</p>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2 mb-6">
                    {project.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-800/60 border border-white/5 text-slate-400 group-hover:text-slate-200 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom Banner / Upwork Prompt */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">Have a specific feature or MVP in mind?</h4>
              <p className="text-sm text-slate-400">Available for contract sprints, mobile deployments, and AI integrations.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.upwork.com/freelancers/~01515e873f38ed144f"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl font-medium text-slate-950 bg-white hover:bg-slate-200 transition-all text-sm flex items-center gap-1.5"
            >
              Hire on Upwork
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/Abu-ellil"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl font-medium text-slate-300 hover:text-white bg-slate-800/80 border border-white/10 hover:border-white/20 transition-all text-sm"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

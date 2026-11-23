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
} from 'lucide-react';
import { PROJECTS } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  phone: <Smartphone className="w-6 h-6" />,
  truck: <Truck className="w-6 h-6" />,
  leaf: <Leaf className="w-6 h-6" />,
  scissors: <Scissors className="w-6 h-6" />,
  brain: <Brain className="w-6 h-6" />,
  cart: <ShoppingCart className="w-6 h-6" />,
};

const gradients = [
  'from-amber-500/20 to-orange-500/10 text-amber-300',
  'from-orange-500/20 to-rose-500/10 text-orange-300',
  'from-rose-500/20 to-amber-500/10 text-rose-300',
  'from-emerald-500/20 to-teal-500/10 text-emerald-300',
  'from-purple-500/20 to-indigo-500/10 text-purple-300',
  'from-yellow-500/20 to-orange-500/10 text-yellow-200',
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/5 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Featured Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white">
            Engineered For{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
              Real-World Impact
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base">
            From consumer mobile apps with 10k+ downloads to local AI benchmarking suites and multi-branch enterprise ERPs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl mx-auto">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.55 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/35 overflow-hidden transition-all duration-300 flex flex-col backdrop-blur-sm"
            >
              {/* top accent */}
              <div
                className={`h-1.5 w-full bg-gradient-to-r ${gradients[i % gradients.length]
                  .split(' ')
                  .slice(0, 2)
                  .join(' ')}`}
              />

              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br border border-white/10 flex items-center justify-center ${
                      gradients[i % gradients.length]
                    } group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300 shadow-lg`}
                  >
                    {iconMap[project.icon] || <Sparkles className="w-6 h-6" />}
                  </div>

                  <div className="flex items-center gap-1">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} on GitHub`}
                        className="text-gray-400 hover:text-amber-300 transition-colors p-2 rounded-lg hover:bg-white/5"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="text-gray-400 hover:text-rose-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {project.highlight && (
                  <div className="inline-flex self-start items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-400/10 text-amber-300 border border-amber-400/20 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    {project.highlight}
                  </div>
                )}

                <h3 className="text-xl font-semibold font-['Space_Grotesk'] text-white mb-1 group-hover:text-amber-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-amber-400/80 uppercase tracking-wider mb-4 font-mono">
                  {project.subtitle}
                </p>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <div className="space-y-2 mb-6">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] rounded-md bg-white/5 border border-white/10 text-gray-400 group-hover:border-amber-400/20 group-hover:text-gray-200 transition-colors font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14 flex items-center justify-center gap-6"
        >
          <a
            href="https://github.com/Abu-ellil"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-amber-400/40 text-gray-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] transition-all font-medium text-sm"
          >
            <Github className="w-4 h-4" />
            Explore More on GitHub
          </a>
          <a
            href="https://www.upwork.com/freelancers/~01515e873f38ed144f"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white transition-all font-medium text-sm shadow-lg shadow-orange-500/20"
          >
            Hire on Upwork
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

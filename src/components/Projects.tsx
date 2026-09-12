import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Leaf, Scissors, ShoppingCart, ExternalLink, Check, Github } from 'lucide-react';
import { PROJECTS } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  truck: <Truck className="w-6 h-6" />,
  leaf: <Leaf className="w-6 h-6" />,
  scissors: <Scissors className="w-6 h-6" />,
  cart: <ShoppingCart className="w-6 h-6" />,
};

const gradients = [
  'from-blue-500/20 to-cyan-500/10 text-blue-300',
  'from-emerald-500/20 to-green-500/10 text-emerald-300',
  'from-purple-500/20 to-fuchsia-500/10 text-purple-300',
  'from-orange-500/20 to-amber-500/10 text-orange-300',
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
          <span className="text-sm font-medium text-cyan-400 tracking-widest uppercase">Projects</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Work</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Production-grade applications — from real-time delivery platforms to AI-powered
            agriculture tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-7 max-w-6xl mx-auto">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: (i % 2) * 0.12, duration: 0.55 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 overflow-hidden transition-all duration-300 flex flex-col"
            >
              {/* top accent */}
              <div className={`h-1 w-full bg-gradient-to-r ${gradients[i % 4].split(' ').slice(0, 2).join(' ')}`} />

              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br border border-white/10 flex items-center justify-center ${gradients[i % 4]} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                  >
                    {iconMap[project.icon]}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on GitHub`}
                    className="text-gray-600 hover:text-cyan-300 transition-colors p-2"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>

                <h3 className="text-xl font-semibold font-['Space_Grotesk'] text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-cyan-400/80 mb-4">{project.subtitle}</p>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <div className="space-y-2 mb-6">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400 group-hover:text-gray-300 transition-colors"
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
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Abu-ellil"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-300 transition-colors font-medium"
          >
            More on GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

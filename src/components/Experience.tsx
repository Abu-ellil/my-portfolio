import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, GitBranch, ChevronRight, History } from 'lucide-react';
import { EXPERIENCE } from '../data';

const icons = [Briefcase, GraduationCap, GitBranch];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-slate-900/60 text-slate-300 text-xs font-mono tracking-wider uppercase mb-3">
            <History className="w-3.5 h-3.5 text-cyan-400" />
            Track Record
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Career & Commercial Experience
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            From foundation training in engineering clean architecture to delivering client projects globally.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-white/10" />

          {EXPERIENCE.map((exp, i) => {
            const Icon = icons[i % icons.length];
            const left = i % 2 === 0;
            return (
              <motion.div
                key={exp.title + exp.company}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className={`relative flex md:w-1/2 ${left ? 'md:pr-12' : 'md:ml-auto md:pl-12'} pl-14 md:pl-0 mb-10`}
              >
                {/* Node */}
                <div
                  className={`absolute top-1 left-0 md:left-auto ${
                    left ? 'md:-right-[19px]' : 'md:-left-[19px]'
                  } w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 z-10 shadow-lg`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div
                  className={`w-full p-6 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-cyan-500/30 transition-all duration-200 group ${
                    left ? 'md:text-right' : ''
                  }`}
                >
                  <span className="text-[11px] font-mono font-medium text-cyan-400 tracking-wider uppercase">
                    {exp.period}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">
                    {exp.company}
                    {exp.website && (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 ml-2 text-cyan-400 hover:underline"
                      >
                        site <ChevronRight className="w-3 h-3" />
                      </a>
                    )}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;

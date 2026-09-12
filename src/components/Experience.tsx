import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, GitBranch, ChevronRight } from 'lucide-react';
import { EXPERIENCE } from '../data';

const icons = [Briefcase, GraduationCap, GitBranch];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-cyan-400 tracking-widest uppercase">Experience</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent" />

          {EXPERIENCE.map((exp, i) => {
            const Icon = icons[i % icons.length];
            const left = i % 2 === 0;
            return (
              <motion.div
                key={exp.title + exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className={`relative flex md:w-1/2 ${left ? 'md:pr-12' : 'md:ml-auto md:pl-12'} pl-14 md:pl-0 mb-12 ${left ? '' : 'md:pl-12'}`}
              >
                {/* node */}
                <div
                  className={`absolute top-1 left-0 md:left-auto ${
                    left ? 'md:-right-[19px]' : 'md:-left-[19px]'
                  } w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/25 to-purple-500/25 border border-white/10 backdrop-blur flex items-center justify-center text-cyan-300 z-10`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div
                  className={`w-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 group ${
                    left ? 'md:text-right' : ''
                  }`}
                >
                  <span className="text-xs font-medium text-cyan-400/90 tracking-wide">{exp.period}</span>
                  <h3 className="mt-1 text-lg font-semibold text-white group-hover:text-cyan-200 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {exp.company}
                    {exp.website && (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 ml-2 text-blue-400/80 hover:text-blue-300"
                      >
                        site <ChevronRight className="w-3 h-3" />
                      </a>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">{exp.description}</p>
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

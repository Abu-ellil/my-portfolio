import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Target, Users, Award } from 'lucide-react';
import { CERTIFICATIONS } from '../data';

const badges = [
  { icon: <Target className="w-3.5 h-3.5" />, text: 'Goal-Oriented Delivery' },
  { icon: <BadgeCheck className="w-3.5 h-3.5" />, text: 'Continuous Engineering' },
  { icon: <Users className="w-3.5 h-3.5" />, text: 'Open-Source Sharing' },
];

const Certifications: React.FC = () => {
  return (
    <section className="relative py-28 border-t border-white/5 bg-slate-950/20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-slate-900/60 text-slate-300 text-xs font-mono tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            Certifications & Verified Learning
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Foundations & Continuous Mastery
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Deep dive coursework across modern JavaScript runtimes, state machines, and distributed APIs.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: (i % 3) * 0.06, duration: 0.4 }}
              className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-cyan-500/30 transition-all group"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <BadgeCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm mb-1 group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{cert.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2.5"
        >
          {badges.map((b) => (
            <span
              key={b.text}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-slate-400"
            >
              <span className="text-cyan-400">{b.icon}</span>
              {b.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;

import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Target, Users } from 'lucide-react';
import { CERTIFICATIONS } from '../data';

const badges = [
  { icon: <Target className="w-4 h-4" />, text: 'Goal-Oriented' },
  { icon: <BadgeCheck className="w-4 h-4" />, text: 'Always Learning' },
  { icon: <Users className="w-4 h-4" />, text: 'Knowledge Sharing' },
];

const Certifications: React.FC = () => {
  return (
    <section className="relative py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-medium text-amber-400 tracking-widest uppercase">Learning</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white">
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Growth</span>
          </h2>
          <p className="mt-4 text-gray-500">Continuous learning and professional development.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-rose-400/40 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">🏅</span>
                <div>
                  <h3 className="text-white font-medium text-sm mb-1">{cert.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{cert.description}</p>
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
          className="flex flex-wrap justify-center gap-3"
        >
          {badges.map((b) => (
            <span
              key={b.text}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400"
            >
              <span className="text-amber-400">{b.icon}</span>
              {b.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Cpu, Zap, MapPin, Languages } from 'lucide-react';
import { SERVICES, IDENTITY } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  globe: <Globe className="w-6 h-6" />,
  smartphone: <Smartphone className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-cyan-400 tracking-widest uppercase">About</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Ideas Into Reality</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="space-y-6"
          >
            <p className="text-lg text-gray-400 leading-relaxed">
              I'm <span className="text-white font-medium">{IDENTITY.name}</span>, a full-stack
              engineer based in Cairo with <span className="text-cyan-300">4+ years</span> of
              experience building production-grade applications across web, mobile, and desktop —
              from real-time delivery platforms to AI-powered agriculture tools.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              I care about <span className="text-blue-300">clean architecture</span>,{' '}
              <span className="text-purple-300">type-safe codebases</span>, and shipping products
              that solve real problems for real users — independently, end-to-end.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                {IDENTITY.location}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                <Languages className="w-4 h-4 text-purple-400" />
                Arabic · English
              </span>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-full blur-2xl group-hover:from-blue-500/25 group-hover:to-purple-500/25 transition-all duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-cyan-300 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Monitor, Globe, MapPin, Clock, Languages } from 'lucide-react';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const highlights = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Full-Stack Web',
      description: 'End-to-end web apps with React, Next.js, Node.js, and MongoDB.',
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile Development',
      description: 'Cross-platform apps with React Native + Expo for iOS & Android.',
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: 'Desktop Applications',
      description: 'Electron-based desktop apps with SQLite and offline-first architecture.',
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Production Grade',
      description: 'Real-time features, payment integrations, push notifications, and more.',
    },
  ];

  const stats = [
    { number: '4+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Delivered' },
    { number: '30+', label: 'Technologies' },
    { number: '100%', label: 'Client Satisfaction' },
  ];

  const details = [
    { icon: <MapPin className="w-4 h-4" />, label: 'Cairo, Egypt (UTC+2)' },
    { icon: <Clock className="w-4 h-4" />, label: '4+ years experience' },
    { icon: <Languages className="w-4 h-4" />, label: 'Arabic (Native) · English (Professional)' },
  ];

  return (
    <section id="about" className="section-padding">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="text-sm font-medium text-blue-400 tracking-widest uppercase mb-4 block">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
            Turning Ideas Into{' '}
            <span className="gradient-text">Digital Reality</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* About Text */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Full-Stack Engineer With a{' '}
              <span className="gradient-text">Mission</span>
            </h3>

            <div className="space-y-4 text-gray-400 text-lg leading-relaxed mb-8">
              <p>
                I'm Mahmoud Abuellil, a full-stack engineer based in Cairo with 4+ years
                of experience building production-grade applications across web, mobile,
                and desktop platforms.
              </p>
              <p>
                I specialize in the MERN stack, React Native, and Electron — delivering
                complete solutions from concept to deployment. My work includes real-time
                delivery platforms, AI-powered agriculture tools, enterprise desktop
                systems, and full e-commerce ecosystems.
              </p>
              <p>
                I'm passionate about clean architecture, type-safe codebases, and building
                products that solve real-world problems at scale.
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-8">
              {details.map((detail, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-500">
                  <span className="text-blue-400">{detail.icon}</span>
                  <span className="text-sm">{detail.label}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 glass rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold gradient-text mb-1">{stat.number}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlight Cards */}
          <motion.div className="space-y-4" variants={itemVariants}>
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                className="card p-6 flex items-start gap-4 group"
                whileHover={{ x: 8 }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/10 flex items-center justify-center text-blue-400 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

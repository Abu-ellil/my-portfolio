import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin, ChevronDown, Globe, MessageCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/Abu-ellil', label: 'GitHub', hover: 'hover:text-white' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/abu-ellil/', label: 'LinkedIn', hover: 'hover:text-blue-400' },
    { icon: <Globe className="w-5 h-5" />, href: 'https://aboellil.dev', label: 'Website', hover: 'hover:text-cyan-400' },
    { icon: <MessageCircle className="w-5 h-5" />, href: 'https://mostaql.com/u/AbuEllil', label: 'Mostaql', hover: 'hover:text-emerald-400' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Spheres */}
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-[float_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] animate-[float_20s_ease-in-out_infinite_5s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] animate-[float_20s_ease-in-out_infinite_10s]" />
        
        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-24 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Available for new opportunities
          </span>
        </motion.div>

        {/* Profile Image */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[3px] shadow-xl shadow-blue-500/20">
            <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center overflow-hidden">
              <img
                src="https://avatars.githubusercontent.com/u/94858304?v=4"
                alt="Mahmoud Abuellil"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 font-['Space_Grotesk'] leading-tight"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Mahmoud
          </span>
          <br />
          <span className="gradient-text">Abuellil</span>
        </motion.h1>

        {/* Arabic Name */}
        <motion.p variants={itemVariants} className="text-lg text-gray-500 mb-4 font-arabic" dir="rtl">
          محمود أبو عليل
        </motion.p>

        {/* Title */}
        <motion.h2
          className="text-xl md:text-2xl text-gray-300 mb-6 font-medium"
          variants={itemVariants}
        >
          Full-Stack Engineer{' '}
          <span className="text-gray-500">|</span>{' '}
          <span className="gradient-text">MERN & React Native</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={itemVariants}
        >
          Building production-grade web, mobile & desktop applications with
          4+ years of experience crafting scalable, real-world solutions that
          users love.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={itemVariants}
        >
          <motion.a
            href="mailto:mr.abuellil@gmail.com"
            className="btn-primary animate-pulse-glow flex items-center justify-center gap-2 text-base px-8 py-4"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail className="w-5 h-5" />
            Hire Me
          </motion.a>

          <motion.a
            href="/MahmoudAboellilFullStack.pdf"
            download="Mahmoud_Abuellil_FullStack_Resume.pdf"
            className="btn-secondary flex items-center justify-center gap-2 text-base px-8 py-4"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download className="w-5 h-5" />
            Download CV
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-3"
          variants={itemVariants}
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-xl glass text-gray-400 ${social.hover} transition-all duration-300`}
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;

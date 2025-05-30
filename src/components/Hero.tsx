import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin } from 'lucide-react';
import { DiscordIcon, InstagramIcon, TwitterIcon, YouTubeIcon } from './SocialIcons';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
      <motion.div
        className="container mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              {/* <span className="text-4xl font-bold text-gray-600 dark:text-gray-300">MA</span> */}
              <img
                src="https://avatars.githubusercontent.com/u/94858304?v=4"
                alt="Mahmoud Abuellil"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Name and Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4"
          variants={itemVariants}
        >
          <span className="gradient-text">Mahmoud Abuellil</span>
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6"
          variants={itemVariants}
        >
          MERN Stack & React Native Developer
        </motion.h2>

        {/* Short Intro */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
          variants={itemVariants}
        >
          Passionate full-stack developer specializing in building exceptional digital experiences
          with modern web and mobile technologies. I create scalable, user-friendly applications
          that solve real-world problems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={itemVariants}
        >
          <motion.a
            href="/MahmoudAboellilFullStack.pdf"
            download="Mahmoud_Abuellil_FullStack_Resume.pdf"
            className="btn-primary flex items-center justify-center gap-2 download-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            Download Resume
          </motion.a>

          <motion.button
            className="btn-secondary flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Mail className="w-5 h-5" />
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-4 flex-wrap gap-2"
          variants={itemVariants}
        >
          <motion.a
            href="https://github.com/Abu-ellil"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass hover:scale-110 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300"
            whileHover={{ y: -5 }}
            title="GitHub"
          >
            <Github className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/abu-ellil-806619254"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass hover:scale-110 transition-all duration-300 hover:text-blue-600"
            whileHover={{ y: -5 }}
            title="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://discord.gg/sSfMCsz4"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass hover:scale-110 transition-all duration-300 hover:text-indigo-500"
            whileHover={{ y: -5 }}
            title="Discord"
          >
            <DiscordIcon className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://instagram.com/mahmoud.aboellil"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass hover:scale-110 transition-all duration-300 hover:text-pink-500"
            whileHover={{ y: -5 }}
            title="Instagram"
          >
            <InstagramIcon className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://twitter.com/MahmoudAboelli3"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass hover:scale-110 transition-all duration-300 hover:text-blue-400"
            whileHover={{ y: -5 }}
            title="Twitter"
          >
            <TwitterIcon className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://youtube.com/channel/UCMYVcvtt0Cs3lYpKGcIO-4g"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass hover:scale-110 transition-all duration-300 hover:text-red-500"
            whileHover={{ y: -5 }}
            title="YouTube"
          >
            <YouTubeIcon className="w-6 h-6" />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

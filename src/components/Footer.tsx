import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Heart, ArrowUp } from 'lucide-react';
import { DiscordIcon, InstagramIcon, TwitterIcon, YouTubeIcon } from './SocialIcons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/Abu-ellil",
      color: "hover:text-gray-700 dark:hover:text-gray-300"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://linkedin.com/in/abu-ellil-806619254",
      color: "hover:text-blue-600"
    },
    {
      name: "Discord",
      icon: <DiscordIcon className="w-5 h-5" />,
      url: "https://discord.gg/sSfMCsz4",
      color: "hover:text-indigo-500"
    },
    {
      name: "Instagram",
      icon: <InstagramIcon className="w-5 h-5" />,
      url: "https://instagram.com/mahmoud.aboellil",
      color: "hover:text-pink-500"
    },
    {
      name: "Twitter",
      icon: <TwitterIcon className="w-5 h-5" />,
      url: "https://twitter.com/MahmoudAboelli3",
      color: "hover:text-blue-400"
    },
    {
      name: "YouTube",
      icon: <YouTubeIcon className="w-5 h-5" />,
      url: "https://youtube.com/channel/UCMYVcvtt0Cs3lYpKGcIO-4g",
      color: "hover:text-red-500"
    },

  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-6 relative">
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>

      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Mahmoud Abuellil
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              MERN Stack & React Native Developer passionate about creating
              exceptional digital experiences that solve real-world problems.
            </p>
            <div className="grid grid-cols-4 gap-3 max-w-xs">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 bg-gray-800 rounded-lg transition-all duration-300 ${social.color} flex items-center justify-center`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-gray-400">
              <p>📧 mr.abuellil@gmail.com</p>
              <p>📱 +20 123 456 7890</p>
              <p>📍 Cairo, Egypt</p>
            </div>

            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">
                  Available for work
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Open to freelance projects and full-time opportunities
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              className="text-gray-400 text-sm flex items-center space-x-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span>© {currentYear} Mahmoud Abuellil. Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>and React</span>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="flex items-center space-x-4 text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span>Built with:</span>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">React</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">TypeScript</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">Tailwind</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">Framer Motion</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Fun Quote */}
        <motion.div
          className="text-center mt-8 pt-8 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-gray-400 italic">
            "Code is like humor. When you have to explain it, it's bad." - Cory House
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

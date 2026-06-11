import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, Heart, ArrowUp, MessageCircle, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-4 h-4" />,
      url: 'https://github.com/Abu-ellil',
      hover: 'hover:text-white hover:border-gray-500/30',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      url: 'https://www.linkedin.com/in/abu-ellil/',
      hover: 'hover:text-blue-400 hover:border-blue-500/30',
    },
    {
      name: 'Website',
      icon: <Globe className="w-4 h-4" />,
      url: 'https://aboellil.dev',
      hover: 'hover:text-cyan-400 hover:border-cyan-500/30',
    },
    {
      name: 'Mostaql',
      icon: <MessageCircle className="w-4 h-4" />,
      url: 'https://mostaql.com/u/AbuEllil',
      hover: 'hover:text-emerald-400 hover:border-emerald-500/30',
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
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
    <footer className="bg-[#060606] border-t border-white/5 relative">
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 -translate-x-1/2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </motion.button>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text font-['Space_Grotesk']">
                Mahmoud Abuellil
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Full-Stack Engineer specializing in MERN Stack and React Native.
              Building scalable, production-grade applications that solve real-world problems.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-500 ${social.hover} transition-all duration-300`}
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
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-500 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Get In Touch
            </h4>
            <div className="space-y-2 text-sm text-gray-500">
              <p>
                <a href="mailto:mr.abuellil@gmail.com" className="hover:text-white transition-colors">
                  📧 mr.abuellil@gmail.com
                </a>
              </p>
              <p>
                <a href="https://wa.me/201221089249" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  📱 +20 122 108 9249
                </a>
              </p>
              <p>📍 Cairo, Egypt</p>
            </div>

            <div className="mt-4 p-3 bg-white/[0.02] border border-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs font-medium">Available for work</span>
              </div>
              <p className="text-gray-600 text-xs">
                Open to freelance & full-time opportunities
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm flex items-center gap-1">
              <span>© {currentYear} Mahmoud Abuellil. Built with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
              </motion.div>
              <span>using React & TypeScript</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="px-2 py-1 bg-white/[0.03] border border-white/5 rounded">React</span>
              <span className="px-2 py-1 bg-white/[0.03] border border-white/5 rounded">TypeScript</span>
              <span className="px-2 py-1 bg-white/[0.03] border border-white/5 rounded">Tailwind</span>
              <span className="px-2 py-1 bg-white/[0.03] border border-white/5 rounded">Framer Motion</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

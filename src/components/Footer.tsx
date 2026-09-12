import React from 'react';
import { Code2, Mail } from 'lucide-react';
import { IDENTITY, NAV_LINKS } from '../data';

const socialLinks = [
  { name: 'GitHub', url: IDENTITY.github },
  { name: 'LinkedIn', url: IDENTITY.linkedin },
  { name: 'Mostaql', url: IDENTITY.mostaql },
  { name: 'YouTube', url: IDENTITY.youtube },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/5 py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <a href="#home" className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </span>
              <span className="font-semibold font-['Space_Grotesk'] text-white">
                {IDENTITY.name.split(' ')[0]}
                <span className="text-amber-400">.dev</span>
              </span>
            </a>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Full-Stack Engineer building scalable, production-grade web, mobile & desktop
              applications that solve real-world problems.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-amber-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Get In Touch</h4>
            <a
              href={`mailto:${IDENTITY.email}`}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-amber-300 transition-colors mb-2"
            >
              <Mail className="w-4 h-4" /> {IDENTITY.email}
            </a>
            <div className="flex flex-wrap gap-2 mt-4">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-amber-300 hover:border-amber-400/40 transition-all duration-200"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} {IDENTITY.name}. Built with React, Three.js & Tailwind CSS.
          </p>
          <p className="text-sm text-emerald-400/80">Open to freelance & full-time opportunities</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { IDENTITY, NAV_LINKS } from '../data';

const socialLinks = [
  { name: 'Upwork', url: IDENTITY.upwork },
  { name: 'LinkedIn', url: IDENTITY.linkedin },
  { name: 'GitHub', url: IDENTITY.github },
  { name: 'WhatsApp', url: IDENTITY.whatsapp },
  { name: 'YouTube', url: IDENTITY.youtube },
  { name: 'Mostaql', url: IDENTITY.mostaql },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/5 py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-cyan-400">MA</span>
              </div>
              <span className="font-bold text-white text-sm">
                Mahmoud <span className="text-slate-400 font-normal">Abuellil</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6">
              Full-Stack & Mobile AI Engineer building resilient, scalable software products for global remote teams and ambitious startups.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-400">Available for Contract & Freelance</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">Navigation</h4>
            <ul className="space-y-2 text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Direct */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">Direct Contact</h4>
            <a
              href={`mailto:${IDENTITY.email}`}
              className="flex items-center gap-2 text-xs text-slate-300 hover:text-cyan-400 transition-colors mb-2.5"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" /> {IDENTITY.email}
            </a>
            <a
              href={IDENTITY.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-slate-300 hover:text-emerald-400 transition-colors mb-4"
            >
              <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" /> {IDENTITY.phoneDisplay}
            </a>

            <div className="flex flex-wrap gap-1.5">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono px-3 py-1 rounded-md bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Mahmoud Abuellil. Designed with modern minimalism.</p>
          <p className="font-mono text-[11px] text-slate-400">Cairo (UTC+2) · Global Remote</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

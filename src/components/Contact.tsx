import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, ExternalLink, MessageSquare } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { IDENTITY } from '../data';

// Contact submissions are relayed to Telegram through the serverless function
// on the Vercel mirror (api/contact.js). The bot token lives only in Vercel
// env vars — the endpoint URL is the only thing in the client bundle.
const CONTACT_API =
  process.env.REACT_APP_CONTACT_API_URL || 'https://mahmoud-abuellil.vercel.app/api/contact';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [sentVia, setSentVia] = useState<'telegram' | 'mail'>('telegram');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website: honeypot }),
      });
      if (!res.ok) throw new Error(`contact API responded ${res.status}`);
      setSentVia('telegram');
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      // Relay unavailable — fall back to the visitor's mail client so the
      // message is never lost.
      const subject = encodeURIComponent(`Project Inquiry — ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );
      window.location.href = `mailto:${IDENTITY.email}?subject=${subject}&body=${body}`;
      setSentVia('mail');
      setStatus('success');
    } finally {
      setHoneypot('');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contactCards = [
    { icon: <Mail className="w-4 h-4 text-cyan-400" />, label: 'Email Directly', value: IDENTITY.email, href: `mailto:${IDENTITY.email}` },
    { icon: <FaWhatsapp className="w-4 h-4 text-emerald-400" />, label: 'WhatsApp', value: IDENTITY.phoneDisplay, href: IDENTITY.whatsapp },
    { icon: <ExternalLink className="w-4 h-4 text-cyan-400" />, label: 'Upwork Profile', value: 'Hire via Upwork Contract', href: IDENTITY.upwork },
    { icon: <MapPin className="w-4 h-4 text-slate-400" />, label: 'Location', value: IDENTITY.location, href: null },
  ];

  return (
    <section id="contact" className="relative py-28 border-t border-white/5 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-slate-900/60 text-slate-300 text-xs font-mono tracking-wider uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            Let's Talk
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Start a project or contract.
          </h2>
          <p className="text-slate-400 text-base">
            Have an MVP to build or a mobile app to ship? Send a message and let’s discuss your technical requirements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Cards */}
          <div className="lg:col-span-5 space-y-3.5">
            {contactCards.map((card) => {
              const Inner = (
                <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-cyan-500/30 transition-all flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-mono">{card.label}</div>
                    <div className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                      {card.value}
                    </div>
                  </div>
                </div>
              );

              return card.href ? (
                <a key={card.label} href={card.href} target="_blank" rel="noopener noreferrer" className="block">
                  {Inner}
                </a>
              ) : (
                <div key={card.label}>{Inner}</div>
              );
            })}
          </div>

          {/* Right Direct Message Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4">
              {/* Honeypot — spam bots fill it, humans never see it */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">Project Scope / Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your mobile app, timeline, and tech stack requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-xl font-medium text-slate-950 bg-white hover:bg-slate-200 transition-all text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-cyan-500/10"
              >
                {status === 'success' ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    {sentVia === 'telegram' ? 'Message Sent ✓' : 'Opening Mail Client...'}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {status === 'sending' ? 'Sending...' : 'Send Project Inquiry'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

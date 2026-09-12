import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle, Youtube, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { IDENTITY } from '../data';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Honest, dependency-free contact: open the visitor's mail client pre-filled.
    // (No fake "sent" states — the visitor sees exactly what happens.)
    try {
      const subject = encodeURIComponent(`Portfolio Contact — ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );
      window.location.href = `mailto:${IDENTITY.email}?subject=${subject}&body=${body}`;
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contactCards = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: IDENTITY.email, href: `mailto:${IDENTITY.email}` },
    { icon: <Phone className="w-5 h-5" />, label: 'WhatsApp', value: IDENTITY.phoneDisplay, href: IDENTITY.whatsapp },
    { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: IDENTITY.location, href: null },
  ];

  const socials = [
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, url: IDENTITY.github },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: IDENTITY.linkedin },
    { name: 'Mostaql', icon: <MessageCircle className="w-5 h-5" />, url: IDENTITY.mostaql },
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, url: IDENTITY.youtube },
  ];

  return (
    <section id="contact" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-amber-400 tracking-widest uppercase">Contact</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Work Together</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactCards.map((card) => {
              const Inner = (
                <>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-white/10 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform duration-300 shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{card.label}</div>
                    <div className="text-white font-medium">{card.value}</div>
                  </div>
                </>
              );
              return card.href ? (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 hover:bg-white/[0.05] transition-all duration-300"
                >
                  {Inner}
                </a>
              ) : (
                <div key={card.label} className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  {Inner}
                </div>
              );
            })}

            <div className="pt-4">
              <div className="text-sm text-gray-500 mb-3">Find me on</div>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-amber-300 hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400/60 focus:bg-white/[0.07] transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400/60 focus:bg-white/[0.07] transition-all duration-300"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400/60 focus:bg-white/[0.07] transition-all duration-300 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-white bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 disabled:opacity-60 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:-translate-y-0.5"
            >
              {status === 'sending' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {status === 'sending' ? 'Opening mail…' : 'Send Message'}
            </button>
            {status === 'success' && (
              <p className="flex items-center gap-2 text-emerald-400 text-sm">
                <CheckCircle className="w-4 h-4" /> Your mail app opened with the message pre-filled — just hit send.
              </p>
            )}
            {status === 'error' && (
              <p className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" /> Something went wrong. Email me directly at {IDENTITY.email}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

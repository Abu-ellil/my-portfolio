import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { IDENTITY } from '../data';

const WhatsAppButton: React.FC = () => {
  return (
    <motion.a
      href={IDENTITY.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/40 hover:shadow-emerald-500/60 transition-shadow"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping opacity-20" />
    </motion.a>
  );
};

export default WhatsAppButton;

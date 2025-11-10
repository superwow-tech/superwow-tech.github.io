"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { COMPANY } from "../../lib/constants/company";
import { useTranslation } from "../../contexts/LanguageContext";

export function Contact() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCopyLink = async () => {
    const url = `https://${COMPANY.url}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Send email using API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSent(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative pt-32 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" />
      
      <div className="relative mx-auto max-w-4xl px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={t.contact.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm text-xs uppercase tracking-[2px] font-medium text-gray-300">
                {t.contact.tagline}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {t.contact.title}
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              {t.contact.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Contact Form - Centered */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="relative rounded-2xl p-8 md:p-10 bg-gradient-to-br from-black/60 to-black/30 border border-purple-500/30 backdrop-blur-xl max-w-2xl mx-auto"
          style={{
            boxShadow: "0 0 60px rgba(138, 43, 226, 0.15)",
          }}
        >
          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.name}</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-purple-500/30 bg-black/40 px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  placeholder={t.contact.form.namePlaceholder}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.email}</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-purple-500/30 bg-black/40 px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  placeholder={t.contact.form.emailPlaceholder}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.message}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                required
                className="w-full rounded-xl border border-purple-500/30 bg-black/40 px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                placeholder={t.contact.form.messagePlaceholder}
              />
            </div>
            
            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading || sent}
              whileHover={!isLoading && !sent ? { scale: 1.02 } : {}}
              whileTap={!isLoading && !sent ? { scale: 0.98 } : {}}
              className={`w-full rounded-xl text-white font-semibold py-4 shadow-lg transition-all ${
                sent
                  ? 'bg-green-600 shadow-green-500/30'
                  : isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-cyan-500 shadow-purple-500/30 hover:shadow-purple-500/50'
              }`}
            >
              {isLoading ? t.contact.form.sending : sent ? t.contact.form.sent : t.contact.form.send}
            </motion.button>
            
            <p className="text-xs text-gray-500 text-center">
              {t.contact.form.agreement}
            </p>
          </div>
        </motion.form>

        {/* Website link copy button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mt-16"
        >
          <motion.button
            onClick={handleCopyLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm transition-all group cursor-pointer ${
              copied
                ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50'
                : 'bg-gradient-to-br from-magenta-500/10 to-purple-500/10 border border-magenta-500/30 hover:border-magenta-500/60'
            }`}
          >
            {copied ? (
              <>
                <span className="text-green-400 font-medium">{t.contact.copied}</span>
                <Check className="w-4 h-4 text-green-400 transition-all" />
              </>
            ) : (
              <>
                <span className="text-white font-medium">{COMPANY.url}</span>
                <Copy className="w-4 h-4 text-magenta-400 group-hover:scale-110 transition-transform" />
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

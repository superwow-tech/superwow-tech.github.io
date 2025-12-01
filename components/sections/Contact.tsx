"use client";

import { useState } from "react";
import { COMPANY } from "../../lib/constants/company";
import { Link as LinkIcon, Check } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error('Failed to send');

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="border-b border-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left: CTA */}
        <div className="p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-gray-800 flex flex-col justify-start h-full">
          <div>
            <span className="label-mono text-gray-500 block mb-4">{t.contact.section_label}</span>
            <h2 className="text-6xl sm:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8">
              {t.contact.title.split(" ").map((word, i) => <span key={i} className="block">{word}</span>)}
            </h2>
            <p className="text-gray-400 text-xl max-w-md leading-relaxed">
              {t.contact.desc}
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-8 sm:p-12 lg:p-16 bg-black">
          <form onSubmit={handleSubmit} className="space-y-10">

            <div className="group space-y-2">
              <label className="text-xs font-mono uppercase text-gray-500 group-focus-within:text-[var(--color-electric)] transition-colors">
                {t.contact.labels.name}
              </label>
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 font-mono opacity-0 group-focus-within:opacity-100 transition-opacity">
                  {'>'}
                </span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  type="text"
                  className="w-full bg-transparent border-b border-gray-700 py-4 pl-6 text-xl text-white focus:border-[var(--color-electric)] focus:border-b-2 focus:outline-none transition-all rounded-none placeholder-gray-600 font-mono"
                  placeholder={t.contact.placeholders.name}
                />
              </div>
            </div>

            <div className="group space-y-2">
              <label className="text-xs font-mono uppercase text-gray-500 group-focus-within:text-[var(--color-electric)] transition-colors">
                {t.contact.labels.email}
              </label>
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 font-mono opacity-0 group-focus-within:opacity-100 transition-opacity">
                  @
                </span>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  type="email"
                  className="w-full bg-transparent border-b border-gray-700 py-4 pl-6 text-xl text-white focus:border-[var(--color-electric)] focus:border-b-2 focus:outline-none transition-all rounded-none placeholder-gray-600 font-mono"
                  placeholder={t.contact.placeholders.email}
                />
              </div>
            </div>

            <div className="group space-y-2">
              <label className="text-xs font-mono uppercase text-gray-500 group-focus-within:text-[var(--color-electric)] transition-colors">
                {t.contact.labels.project_details}
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-gray-700 py-4 text-xl text-white focus:border-[var(--color-electric)] focus:border-b-2 focus:outline-none transition-all rounded-none resize-none placeholder-gray-800 font-mono"
                  placeholder={t.contact.placeholders.project_details}
                />
              </div>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`w-full py-6 font-bold tracking-widest uppercase text-sm transition-all border border-white hover:bg-[var(--color-electric)] hover:text-black hover:border-[var(--color-electric)]
                  ${status === 'success' ? 'bg-green-500 text-black border-green-500' : 'text-white'}
                `}
              >
                {status === 'loading' ? t.contact.buttons.transmitting : status === 'success' ? t.contact.buttons.completed : t.contact.buttons.transmit}
              </button>
              {status === 'error' && (
                <p className="mt-4 text-red-500 text-sm font-mono">{t.contact.errors.connection}</p>
              )}
            </div>

          </form>
        </div>

      </div>
      <style jsx>{`
        @keyframes flash {
          0% { opacity: 0.5; }
          100% { opacity: 0; }
        }
        .animate-flash {
          animation: flash 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

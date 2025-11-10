"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { COMPANY } from "../../lib/constants/company";
import { useTranslation } from "../../contexts/LanguageContext";

export function Footer() {
  const { t } = useTranslation();

  const navItems = [
    { id: "services", label: t.nav.services },
    { id: "work", label: t.nav.work },
    { id: "stack", label: t.nav.stack },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative border-t border-purple-500/10 bg-black/20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            className="flex items-center group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <Image src="/icon.ico" alt={COMPANY.name} width={48} height={48} />
              <div>
                <span className="font-bold text-white block">{COMPANY.name}</span>
                <AnimatePresence mode="wait">
                  <span key={t.footer.tagline} className="text-xs text-gray-500 block">
                    {t.footer.tagline}
                  </span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
            <div className="flex items-center gap-6">
              {navItems.map((m) => (
                <a
                  key={m.id}
                  href={`#${m.id}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {m.label}
                </a>
              ))}
            </div>
            <div className="h-px w-12 md:h-4 md:w-px w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            <AnimatePresence mode="wait">
              <p key={t.footer.copyright} className="text-gray-500 text-center md:text-left">
                © {new Date().getFullYear()} {COMPANY.name}, MB. {t.footer.copyright}
              </p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </footer>
  );
}

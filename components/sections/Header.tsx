"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { COMPANY, menu } from "../../lib/constants/company";
import { useTranslation } from "../../contexts/LanguageContext";
import { LanguageToggle } from "../ui/LanguageToggle";

export function Header() {
  const { t } = useTranslation();

  const navItems = [
    { id: "services", label: t.nav.services },
    { id: "work", label: t.nav.work },
    { id: "stack", label: t.nav.stack },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-purple-500/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <motion.a 
          href="#" 
          className="flex items-center group"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <Image src="/icon.ico" alt={COMPANY.name} width={38} height={38} />
            <span className="font-semibold tracking-tight text-white">{COMPANY.name}</span>
          </div>
        </motion.a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((m) => (
            <motion.a
              key={m.id}
              href={`#${m.id}`}
              className="relative text-gray-300 hover:text-white transition-colors group"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {m.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <AnimatePresence mode="wait">
            <motion.a
              key={t.nav.getQuote}
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {t.nav.getQuote}
            </motion.a>
          </AnimatePresence>
          <LanguageToggle />
        </nav>
        <div className="md:hidden">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}

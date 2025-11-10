"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CenteredCard } from "../ui/CenteredCard";
import { useTranslation } from "../../contexts/LanguageContext";
import { services } from "../../lib/constants/services";

export function Services() {
  const { t } = useTranslation();

  const serviceItems = [
    { ...services[0], ...t.services.items.design },
    { ...services[1], ...t.services.items.custom },
    { ...services[2], ...t.services.items.ai },
  ];

  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-32">
      <AnimatePresence mode="wait">
        <motion.div
          key={t.services.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {t.services.title}
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="grid sm:grid-cols-3 lg:grid-cols-3 gap-6">
        {serviceItems.map((s, i) => (
          <CenteredCard
            key={s.title}
            delay={i * 0.1}
            className="group relative rounded-2xl p-6 bg-gradient-to-br from-black/40 to-black/20 border border-purple-500/20 hover:border-purple-500/50 backdrop-blur-sm"
            baseStyle={{
              boxShadow: "0 0 0 rgba(138, 43, 226, 0)",
            }}
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 grid place-items-center mb-6 group-hover:scale-110 transition-transform text-purple-400">
              <s.icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-white">{s.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-transparent to-cyan-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </CenteredCard>
        ))}
      </div>
    </section>
  );
}

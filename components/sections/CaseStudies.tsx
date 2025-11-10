"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { CenteredCard } from "../ui/CenteredCard";
import { useTranslation } from "../../contexts/LanguageContext";
import { caseStudies } from "../../lib/constants/case-studies";

export function CaseStudies() {
  const { t } = useTranslation();

  const caseStudyItems = [
    { ...caseStudies[0], ...t.caseStudies.items.motion },
    { ...caseStudies[1], ...t.caseStudies.items.saas },
    { ...caseStudies[2], ...t.caseStudies.items.ai },
  ];

  return (
    <section id="work" className="relative py-16 overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={t.caseStudies.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {t.caseStudies.title}
                </span>
              </h2>
              <p className="text-gray-400">{t.caseStudies.subtitle}</p>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ x: 5 }}
              className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-2 group"
            >
              {t.caseStudies.needSimilar}
              <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </motion.a>
          </motion.div>
        </AnimatePresence>
        
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudyItems.map((c, i) => (
            <CenteredCard
              key={c.name}
              delay={i * 0.15}
              className="group relative rounded-2xl p-6 bg-gradient-to-br from-black/60 to-black/30 border border-cyan-500/20 hover:border-cyan-500/50 backdrop-blur-sm overflow-hidden"
              baseStyle={{
                boxShadow: "0 0 0 rgba(0, 255, 255, 0)",
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-magenta-500/0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{c.logo}</div>
                <h3 className="text-2xl font-bold text-white mb-1">{c.name}</h3>
                <p className="text-gray-400 text-sm mb-6 font-medium">{c.role}</p>
                <ul className="space-y-3 text-sm">
                  {c.impact.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-300">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CenteredCard>
          ))}
        </div>
      </div>
    </section>
  );
}

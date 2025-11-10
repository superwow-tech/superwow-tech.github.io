"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Rocket } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "../../contexts/LanguageContext";
import { TypingText } from "../ui/TypingText";

interface HeroProps {
  mousePosition: { x: number; y: number };
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
}

export function Hero({ mousePosition, onMouseMove }: HeroProps) {
  const { t } = useTranslation();
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    onMouseMove(e);
    
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setCursorPosition({ x, y });
      });
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 pointer-events-none" />
      
      {/* Mouse-Follow Gradient Glow Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 350px at ${cursorPosition.x}% ${cursorPosition.y}%, rgba(138, 43, 226, 0.08) 0%, rgba(0, 255, 255, 0.035) 25%, rgba(138, 43, 226, 0.015) 50%, transparent 75%)`,
          transition: 'background 0.1s ease-out',
          willChange: 'background',
        }}
      />
      
      {/* Animated Background Gradient with Mouse Interaction */}
      <motion.div
        className="absolute inset-0 opacity-20 transition-transform duration-300 ease-out"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(138, 43, 226, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 30%, rgba(138, 43, 226, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(255, 0, 255, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(0, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(138, 43, 226, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(138, 43, 226, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0)`,
        }}
      />

      {/* Secondary gradient layer for depth */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, rgba(138, 43, 226, 0.2) 0%, transparent 60%)`,
          transform: `translate3d(${mousePosition.x * -15}px, ${mousePosition.y * -15}px, 0)`,
          transition: "all 0.3s ease-out",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12 py-20 flex flex-col items-center text-center">
        {/* Tagline Pill */}
        <AnimatePresence mode="wait">
          <motion.div
            key={t.hero.tagline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm mb-8"
          >
            <span className="text-xs uppercase tracking-[2px] font-medium text-gray-300">
              <TypingText text={t.hero.tagline} delay={0} duration={0.6} />
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Headline with Animated Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight"
        >
          <span className="inline-block text-white">Build with </span>
          <br className="md:hidden" />
          <span className="text-gradient-animated text-glow inline-block">
            Superwow Tech
          </span>
        </motion.h1>

        {/* Title */}
        <AnimatePresence mode="wait">
          <motion.p
            key={t.hero.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold max-w-[800px] mb-6 leading-tight"
          >
            <TypingText text={t.hero.title} delay={0.7} duration={0.7} />
          </motion.p>
        </AnimatePresence>

        {/* Subheadline */}
        <AnimatePresence mode="wait">
          <motion.p
            key={t.hero.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg md:text-xl text-gray-400 font-normal max-w-[600px] mb-12 leading-relaxed"
          >
            <TypingText text={t.hero.subtitle} delay={1.5} duration={0.7} />
          </motion.p>
        </AnimatePresence>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <AnimatePresence mode="wait">
            <motion.a
              key={t.hero.startProject}
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative px-8 py-4 rounded-xl font-medium text-white overflow-hidden w-full sm:w-auto"
              style={{
                background: "linear-gradient(90deg, #8A2BE2 0%, #00FFFF 100%)",
                boxShadow: "0 0 20px rgba(138, 43, 226, 0.3)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                {t.hero.startProject}
              </span>
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
              />
            </motion.a>
          </AnimatePresence>

          {/* Secondary CTA */}
          <AnimatePresence mode="wait">
            <motion.a
              key={t.hero.viewCaseStudies}
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative px-8 py-4 rounded-xl font-medium text-white border border-purple-500/30 bg-white/5 backdrop-blur-sm overflow-hidden w-full sm:w-auto"
              style={{
                boxShadow: "0 0 0 rgba(138, 43, 226, 0)",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(138, 43, 226, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0 rgba(138, 43, 226, 0)";
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <ExternalLink className="w-5 h-5" />
                {t.hero.viewCaseStudies}
              </span>
            </motion.a>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

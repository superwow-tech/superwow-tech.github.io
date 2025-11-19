"use client";

import { motion } from "framer-motion";
import { useTranslation } from "../../contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "lt" : "en");
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded-lg border border-purple-500/30 bg-white/5 backdrop-blur-sm text-white font-medium text-sm hover:bg-white/10 transition-colors"
      aria-label={`Switch to ${language === "en" ? "Lithuanian" : "English"}`}
    >
      {language === "en" ? "EN" : "LT"}
    </motion.button>
  );
}


"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import enTranslations from "../locales/en.json";
import ltTranslations from "../locales/lt.json";

type Language = "en" | "lt";

type Translations = typeof enTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: enTranslations,
  lt: ltTranslations,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "lt")) {
        setLanguageState(savedLanguage);
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split("-")[0];
        if (browserLang === "lt") {
          setLanguageState("lt");
          localStorage.setItem("language", "lt");
        } else {
          setLanguageState("en");
          localStorage.setItem("language", "en");
        }
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  // Always provide context, but use default language during SSR
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}


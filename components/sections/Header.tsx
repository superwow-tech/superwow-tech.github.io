"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";
import { COMPANY } from "../../lib/constants/company";
import { useLanguage } from "../../contexts/LanguageContext";
import { MobileMenu } from "./MobileMenu";
import { SuperwowLogo } from "../ui/SuperwowLogo";

// Helper component for Vilnius Time
const VilniusTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Vilnius",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono">{time} VILNIUS</span>;
};

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLang = () => {
    setLanguage(language === 'en' ? 'lt' : 'en');
  };

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      {/* Mobile Layout (Flex) / Desktop Layout (Grid) */}
      <div className="flex md:grid md:grid-cols-4 w-full">
        
        {/* Col 1: Brand */}
        <div className="flex-grow md:flex-grow-0 h-14 sm:h-16 flex items-center px-4 sm:px-6 border-r border-gray-200 overflow-hidden md:col-span-1">
          <Link href="/" className="group">
            <SuperwowLogo className="h-10 w-auto" />
          </Link>
        </div>

        {/* Col 2 (Desktop): Time & Lang */}
        <div className="hidden md:flex h-16 items-center justify-between border-r border-gray-200 px-6 text-xs font-medium tracking-widest md:col-span-1">
          <VilniusTime />
          <button 
              onClick={toggleLang}
              className="font-mono text-xs font-bold tracking-wide ml-4 hover:text-[var(--color-electric)] transition-colors"
          >
              <span className={language === 'en' ? "text-black" : "text-gray-300"}>EN</span>
              <span className="text-gray-300 mx-1">/</span>
              <span className={language === 'lt' ? "text-black" : "text-gray-300"}>LT</span>
          </button>
        </div>

        {/* Col 3 (Desktop): Status */}
        <div className="hidden md:flex h-16 items-center justify-center border-r border-gray-200 px-4 text-xs font-medium tracking-widest uppercase md:col-span-1">
          <span className="mr-2 text-green-500 text-[10px]">●</span>
          {t.header.available}
        </div>

        {/* Col 2 (Mobile): Language Switcher */}
        <div className="flex-none md:hidden h-14 w-16 flex items-center justify-center border-r border-gray-200">
            <button 
                onClick={toggleLang}
                className="font-mono text-xs font-bold tracking-wide"
            >
                <span className={language === 'en' ? "text-black" : "text-gray-300"}>EN</span>
                <span className="text-gray-300 mx-1">/</span>
                <span className={language === 'lt' ? "text-black" : "text-gray-300"}>LT</span>
            </button>
        </div>

        {/* Col 4 (Desktop): Start Button */}
        <motion.a
          href="#contact"
          className="hidden md:flex h-16 items-center justify-center bg-black text-white text-sm font-bold tracking-widest uppercase hover:bg-[var(--color-electric)] hover:text-black transition-colors duration-200 md:col-span-1"
          whileHover={{ scale: 1 }}
        >
          {t.header.start_project}
        </motion.a>

        {/* Col 3 (Mobile): Menu Trigger */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex-none md:hidden h-14 w-16 flex items-center justify-center bg-black text-white hover:text-[var(--color-electric)] transition-colors z-50 relative"
        >
            <Plus className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`} strokeWidth={1.5} />
        </button>

      </div>
    </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

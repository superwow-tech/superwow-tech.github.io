"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { SuperwowLogo } from "../ui/SuperwowLogo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLanguage();

  const links = [
    { id: "01", href: "#services", label: t.services.label },
    { id: "02", href: "#work", label: "PROJECTS" }, // Overriding to "PROJECTS" for design rhythm
    { id: "03", href: "#contact", label: t.contact.section_label },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-40 bg-black text-white pt-14 pb-0 flex flex-col border-b border-gray-800 shadow-2xl"
          >
             <div className="flex flex-col">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={onClose}
                    className="group flex items-center w-full py-6 px-6 border-b border-gray-900 relative overflow-hidden hover:bg-gray-900/50 transition-colors"
                  >
                    <span className="text-xs font-mono text-gray-500 mr-4">{link.id}</span>
                    
                    <span className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white group-hover:text-[var(--color-electric)] transition-colors duration-300">
                      {link.label}
                    </span>

                    <ArrowRight className="ml-auto w-5 h-5 text-[var(--color-electric)] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
             </div>

             <div className="flex justify-center py-8 pointer-events-none opacity-20">
                <SuperwowLogo className="w-full max-w-[300px]" />
             </div>

             <div className="bg-black">
                <div className="p-4 flex justify-center items-center border-b border-gray-900">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    www.superwow.lt
                  </span>
                </div>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

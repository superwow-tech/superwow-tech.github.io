"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDownRight, Plus } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

export function Hero() {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
  };

  // Typewriter Effect Logic
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [activeLine, setActiveLine] = useState(1);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const line1Target = "SUPERWOW";
    const line2Target = "TECH";
    const totalDuration = 2000;
    const totalChars = line1Target.length + line2Target.length;
    const charDelay = totalDuration / totalChars;

    let timeoutId: NodeJS.Timeout;

    const triggerGlitchLoop = () => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
        // Schedule next glitch
        timeoutId = setTimeout(triggerGlitchLoop, 3000);
      }, 400);
    };

    const typeNextChar = (index: number) => {
      // Randomize delay slightly for more natural typing feel
      // +/- 30% variation
      const randomDelay = charDelay * (0.7 + Math.random() * 0.6);

      if (index < line1Target.length) {
        setText1(line1Target.slice(0, index + 1));
        setActiveLine(1);
        timeoutId = setTimeout(() => typeNextChar(index + 1), randomDelay);
      } else if (index < totalChars) {
        const line2Index = index - line1Target.length;
        setText2(line2Target.slice(0, line2Index + 1));
        setActiveLine(2);
        timeoutId = setTimeout(() => typeNextChar(index + 1), randomDelay);
      } else {
        setActiveLine(2);
        // Start the glitch loop after typing finishes
        timeoutId = setTimeout(triggerGlitchLoop, 500);
      }
    };

    // Start typing after a short delay
    timeoutId = setTimeout(() => typeNextChar(0), 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const Cursor = () => (
    <span className="inline-block w-[0.15em] h-[0.85em] bg-[#00FF94] animate-cursor-blink ml-[0.05em] align-baseline mb-[-0.12em]" />
  );

  // Magnetic Button Logic
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.2);
      y.set((e.clientY - centerY) * 0.2);
    }
  };

  const handleMagneticLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      className="pt-14 sm:pt-16 min-h-[60vh] md:min-h-[100dvh] grid grid-cols-1 md:grid-cols-12 grid-rows-[auto_auto] md:grid-rows-[60fr_40fr] relative overflow-hidden bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Vertical Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gray-100 hidden md:block" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gray-100 hidden md:block" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gray-100 hidden md:block" />

        {/* Crosshairs */}
        <div className="absolute top-24 left-6 text-gray-300"><Plus className="w-4 h-4" /></div>
        <div className="absolute top-24 right-6 text-gray-300"><Plus className="w-4 h-4" /></div>
        <div className="absolute bottom-6 left-6 text-gray-300"><Plus className="w-4 h-4" /></div>
        <div className="absolute bottom-6 right-6 text-gray-300"><Plus className="w-4 h-4" /></div>

        {/* Floating Specs */}
        <div className="absolute top-32 right-12 font-mono text-[10px] text-gray-400 tracking-widest hidden md:block text-right">
          <div>{t.hero.status_online} <span className="animate-pulse text-[var(--color-electric)]">█</span></div>
          <div>{t.hero.lat}: 54.6872° N</div>
          <div>{t.hero.lon}: 25.2797° E</div>
        </div>
      </div>

      {/* Main Title Area */}
      <div className="col-span-1 md:col-span-12 border-b-0 md:border-b border-gray-200 px-4 sm:px-10 md:px-20 pt-12 pb-8 md:pt-20 md:pb-20 flex flex-col justify-center items-start relative z-10">
        <div className="relative w-full">
          <h1 className={`hero-headline text-black text-[12vw] leading-[1] font-extrabold ${isGlitching ? 'animate-glitch-fast' : ''}`}>
            <span className="block min-h-[1em]">
              {text1}
              {activeLine === 1 && <Cursor />}
            </span>
            <span className="block text-black min-h-[1em]">
              {text2}
              {activeLine === 2 && <Cursor />}
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom Left: Copy with Highlighted Keywords */}
      <div className="col-span-1 md:col-span-8 border-b md:border-b-0 md:border-r border-gray-200 px-4 sm:px-10 md:px-20 pt-8 pb-12 md:py-12 flex flex-col justify-start relative z-10 bg-white/80 backdrop-blur-sm min-h-[200px] md:min-h-[300px] animate-fade-in">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl leading-relaxed tracking-tight mb-6 text-black">
            <span className="font-black block">{t.hero.subheadline}</span>
            <span className="font-normal"><span className="font-bold">Faster</span>, <span className="font-bold">Smarter</span> and <span className="whitespace-nowrap">Powered by <span className="text-[var(--color-electric)] font-black animate-pulse">AI</span></span></span>
          </h2>
        </div>
      </div>

      {/* Bottom Right: "The Void" / Interactive Zone */}
      <div className="col-span-1 md:col-span-4 relative z-10 group border-b border-gray-200 md:border-b-0 bg-gray-50 hover:bg-gray-100 overflow-hidden h-auto min-h-[120px] md:min-h-[300px] transition-colors duration-300">
        {/* Interactive "Void" Effect Layer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200 via-transparent to-transparent" />

        <motion.div
          ref={ref}
          className="w-full h-full px-4 sm:px-10 md:px-20 pt-6 pb-6 md:pt-10 md:pb-10 flex flex-col justify-between cursor-pointer relative z-20 hover:bg-black hover:text-white transition-colors duration-300"
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          style={{ x: springX, y: springY }}
        >
          <div className="flex justify-between items-start w-full">
            <span className="label-mono text-gray-500 group-hover:text-[var(--color-electric)]">
              {t.hero.est}
            </span>
          </div>

          <div className="mt-8 md:mt-auto flex items-end justify-between w-full">
            <div className="relative z-10">
              <span className="block font-mono text-xs mb-1 text-gray-500 group-hover:text-gray-400 hidden md:block">{t.hero.action}</span>
              <span className="text-xl md:text-3xl font-black tracking-tight group-hover:text-white uppercase block max-w-[200px] md:max-w-none">{t.hero.explore}</span>
            </div>

            <motion.div
              className="hidden md:block"
              whileHover={{ scale: 1.1, rotate: -45 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ArrowDownRight className="w-16 h-16 md:w-24 md:h-24 group-hover:text-[var(--color-electric)] animate-bounce" strokeWidth={1} />
            </motion.div>
            <ArrowDownRight className="w-12 h-12 md:hidden group-hover:text-[var(--color-electric)] animate-bounce" strokeWidth={1} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

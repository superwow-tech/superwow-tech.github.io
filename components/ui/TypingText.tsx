"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface TypingTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export function TypingText({ 
  text, 
  delay = 0, 
  duration = 0.6,
  className = "" 
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsAnimating(true);
    setDisplayText("");
    
    timeoutRef.current = setTimeout(() => {
      let currentIndex = 0;
      const charsPerSecond = Math.max(1, text.length / duration);
      const intervalTime = 1000 / charsPerSecond;
      
      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsAnimating(false);
        }
      }, intervalTime);
    }, delay * 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayText("");
      setIsAnimating(false);
    };
  }, [text, delay, duration]);

  return (
    <motion.span
      key={text}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {displayText}
      {isAnimating && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
    </motion.span>
  );
}

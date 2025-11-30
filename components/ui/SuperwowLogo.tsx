
import React from 'react';

export const SuperwowLogo = ({ className = "h-10" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 240 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 1. The Voltage Block (Background) */}
      <rect width="240" height="120" fill="black" />
      
      {/* 2. The Command Prompt (Neon Green) */}
      {/* Thicker stroke, sharp edges, no glow */}
      <path 
        d="M35 35 L60 60 L35 85" 
        stroke="#00FF94" 
        strokeWidth="10" 
        strokeLinecap="square" 
        strokeLinejoin="miter"
      />
      
      {/* 3. The Text "SW" (Vector Paths for consistency) */}
      {/* Letter S */}
      <path 
        d="M120 38 L75 38 L75 69 L108 69 L108 76 L75 76 L75 88 L120 88 L120 57 L87 57 L87 50 L120 50 Z" 
        fill="white" 
      />
      
      {/* Letter W */}
      <path 
        d="M130 38 L141 38 L141 76 L152 76 L152 38 L163 38 L163 76 L174 76 L174 38 L185 38 L185 88 L130 88 Z" 
        fill="white" 
      />

      {/* 4. The Underscore (The Cursor) */}
      <rect x="195" y="76" width="25" height="10" fill="white" />
    </svg>
  );
};


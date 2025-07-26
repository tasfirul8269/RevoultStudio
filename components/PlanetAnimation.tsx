'use client';

import React, { useEffect, useRef } from 'react';

// Add keyframes for animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes planetRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes streakRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(720deg); }
    }
    
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.85; }
      50% { opacity: 0.6; }
    }
    
    .planet-animation {
      opacity: 0;
      animation: fadeIn 0.8s ease-out forwards;
    }
    
    @keyframes fadeIn {
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

const PlanetAnimation = ({ size = 'large' }: { size?: 'small' | 'medium' | 'large' }) => {
  const planetRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);
  
  const planetSize = size === 'medium' 
    ? 'w-72 h-72' 
    : size === 'small' 
      ? 'w-40 h-40' 
      : 'w-96 h-96';

  // Use CSS custom properties for animation durations
  const animationDurations = {
    planet: '8s',
    streak: '12s',
    pulse: '2s'
  };

  // Pre-compute the SVG path for the streak
  const streakPath = 'M 30 60 Q 100 20 170 140';

  return (
    <div 
      ref={planetRef}
      className={`relative ${planetSize} flex items-center justify-center will-change-transform planet-animation`}
      style={{
        '--planet-duration': animationDurations.planet,
        '--streak-duration': animationDurations.streak,
        '--pulse-duration': animationDurations.pulse,
      } as React.CSSProperties}
    >
      {/* Glowing planet */}
      <div 
        ref={glowRef}
        className="absolute inset-0 rounded-full animate-[pulseGlow_var(--pulse-duration)_ease-in-out_infinite]"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, #a18aff 0%, #3a2e7c 60%, rgba(58,46,124,0.2) 100%)',
          boxShadow: '0 0 80px 40px #a18aff55, 0 0 200px 80px #3a2e7c33',
          opacity: 0.85,
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0,0,0)',
          willChange: 'opacity',
        }}
      />
      
      {/* Comet-like light streak - Optimized with CSS transforms */}
      <div 
        ref={streakRef}
        className="absolute left-1/4 top-1/4 w-[70%] h-[70%] will-change-transform"
        style={{
          animation: 'streakRotate var(--streak-duration) linear infinite',
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0,0,0)',
        }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="streak" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" stopOpacity="0.9" />
              <stop offset="0.5" stopColor="#a18aff" stopOpacity="0.7" />
              <stop offset="1" stopColor="#a18aff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={streakPath}
            stroke="url(#streak)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      
      {/* Soft highlight */}
      <div
        className="absolute left-1/3 top-1/4 w-1/3 h-1/4 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, #fff8 0%, #fff0 80%)',
          opacity: 0.7,
          filter: 'blur(8px)',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0,0,0)',
          willChange: 'opacity',
        }}
      />
      
      {/* Animated rings */}
      <div 
        className="absolute inset-0 rounded-full border border-[#a18aff33]"
        style={{
          animation: 'planetRotate var(--planet-duration) linear infinite',
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0,0,0)',
        }}
      />
      <div 
        className="absolute inset-0 rounded-full border border-[#a18aff1a]"
        style={{
          width: '75%',
          height: '75%',
          margin: '12.5%',
          animation: 'planetRotate calc(var(--planet-duration) * 1.5) linear infinite reverse',
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0,0,0)',
        }}
      />
    </div>
  );
};

export default PlanetAnimation;
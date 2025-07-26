'use client';

import { useEffect, useRef } from 'react';

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      // The scroll progress bar is now purely CSS, no animation or scroll logic.
      // The scaleX property is set to 0 initially, and it will be updated by CSS.
    }
  }, []);

  return (
    <div 
      ref={progressRef}
      className="scroll-indicator"
      style={{ transform: 'scaleX(0)' }}
    />
  );
};

export default ScrollProgress;
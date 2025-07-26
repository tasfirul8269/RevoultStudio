"use client";

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useAnimation, Variant, Variants } from 'framer-motion';

interface ScrollAnimationProps {
  children: ReactNode;
  threshold?: number;
  variants?: Variants;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  once?: boolean;
  duration?: number;
  staggerChildren?: number;
  reduceMotion?: boolean;
}

export default function ScrollAnimation({
  children,
  threshold = 0.1,
  variants,
  className = "",
  delay = 0,
  direction = 'up',
  distance = 30, // Reduced from 50 for better performance
  once = false,
  duration = 0.8, // Slightly slower for smoother animation
  staggerChildren = 0, // No staggering by default
  reduceMotion = false, // Option to further reduce motion for performance
}: ScrollAnimationProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Define default animation variants based on direction
  const getDefaultVariants = (): Variants => {
    // For reduced motion mode, use simpler animations
    if (reduceMotion) {
      return {
        hidden: {
          opacity: 0,
          transition: {
            duration: duration,
            ease: "easeOut"
          }
        },
        visible: {
          opacity: 1,
          transition: {
            duration: duration,
            ease: "easeOut",
            delay: delay,
            staggerChildren: staggerChildren
          }
        }
      };
    }
    
    const directionOffset = {
      up: { y: distance, opacity: 0 },
      down: { y: -distance, opacity: 0 },
      left: { x: distance, opacity: 0 },
      right: { x: -distance, opacity: 0 }
    };

    return {
      hidden: {
        ...directionOffset[direction],
        transition: {
          duration: duration * 0.8, // Slightly faster exit animation
          ease: "easeInOut"
        }
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: duration,
          ease: "easeOut",
          delay: delay,
          staggerChildren: staggerChildren
        }
      }
    };
  };

  const animationVariants = variants || getDefaultVariants();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Use requestIdleCallback where available for performance
    const requestIdleCallbackPolyfill = 
      typeof window !== 'undefined' ? 
      window.requestIdleCallback || 
      ((cb) => setTimeout(cb, 1)) : 
      (cb: any) => cb();

    let isMounted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          requestIdleCallbackPolyfill(() => {
            if (!isMounted) return;
            controls.start("visible");
            if (once) setHasAnimated(true);
          });
        } else {
          if (!once || !hasAnimated) {
            requestIdleCallbackPolyfill(() => {
              if (!isMounted) return;
              controls.start("hidden");
            });
          }
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -80px 0px"
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      isMounted = false;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls, threshold, once, hasAnimated, mounted]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animationVariants}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { ReactNode } from 'react';
import { motion, Variant, Variants } from 'framer-motion';

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  index?: number;
}

export default function StaggerItem({
  children,
  className = "",
  variants,
  delay = 0,
  index = 0,
}: StaggerItemProps) {
  // Default variants for child elements in a staggered animation
  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.4, // Slightly longer for smooth exit
        ease: "easeOut"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: delay + index * 0.1 // Base delay plus staggered delay based on index
      }
    }
  };

  const itemVariants = variants || defaultVariants;

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      // No need for initial or animate props - these are inherited from parent
    >
      {children}
    </motion.div>
  );
}

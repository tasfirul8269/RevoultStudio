'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const WEBSITE_NAME = 'NEXUS';

export default function PageTransition() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timeout = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!show) return null;

  const letters = WEBSITE_NAME.split('');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-[#0a0613] to-[#0c0c7a]/10 transition-opacity duration-500">
      <div className="flex space-x-1">
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.5, type: 'spring', stiffness: 300 }}
            className="text-5xl md:text-7xl font-extrabold tracking-widest gradient-text drop-shadow-lg select-none text-center"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
} 
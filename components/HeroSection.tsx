'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ScrollAnimation from './ScrollAnimation';

// Add keyframes for animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(-20px) translateX(10px); }
    }
    
    .text-glow {
      text-shadow: 0 0 20px rgba(167, 139, 250, 0.5);
    }
    
    .particle {
      position: absolute;
      background: rgba(167, 139, 250, 0.2);
      border-radius: 50%;
      pointer-events: none;
      animation: float 6s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const HeroSection = () => {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{
    width: number;
    height: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Generate particles on client side
    const newParticles = Array.from({ length: 20 }, () => ({
      width: Math.random() * 5 + 2,
      height: Math.random() * 5 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10
    }));
    setParticles(newParticles);

    // Handle video autoplay on mount
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
      });
    }

    // Remove scroll-based parallax effect that was causing brightness changes
    // The effect is now handled by CSS transforms for better performance
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          disablePictureInPicture
          className="w-full h-full object-cover"
        >
          <source src="/heroVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="container mx-auto px-4 flex flex-col items-center justify-center relative z-10 h-full py-20 text-center">
        {/* Content */}
        <div className="space-y-8 w-full max-w-4xl">
          <div className="mx-auto">
              <div ref={titleRef} className="mb-6">
                <ScrollAnimation duration={0.5} delay={0.1} direction="up" once={false}>
                  <div className="flex justify-center">
                    <img 
                      src="/HorizontalLogo.png" 
                      alt="Revoult Studio" 
                      className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain"
                    />
                  </div>
                </ScrollAnimation>
              </div>
            
            <ScrollAnimation duration={0.6} delay={0.4} direction="up" once={false}>
              <p ref={subtitleRef} className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-center">
Transforming visions into stunning visual realities through video editing, web development, 3D animation, and graphic design that captivates and converts.
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation duration={0.7} delay={0.5} direction="up" once={false}>
              <div ref={ctaRef} className="flex justify-center">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="btn-primary group flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform bg-gradient-to-r from-[#a78bfa] to-[#c5b7ec] text-[#1b133f]"
                >
                  <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                  Get Started
                </button>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation duration={0.5} delay={0.6} direction="up" once={false}>
              <div className="flex items-center justify-center gap-4 mt-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>99.9% Uptime</span>
            </div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
            </ScrollAnimation>
        </div>
      </div>
      </div>
    </section>
  );
};

export default HeroSection;
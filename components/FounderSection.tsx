'use client';

import { Linkedin, Twitter, Mail } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const FounderSection = () => {
  // Generate particles effect similar to other sections
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
      duration: Math.random() * 10 + 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#0a0613] to-[#0c0c7a]/10">
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="particle"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute"
          style={{
            top: '10%',
            left: '5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle at 30% 30%, #a78bfa 0%, transparent 70%)',
            opacity: 0.7,
            filter: 'blur(80px)'
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '0%',
            right: '10%',
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle at 70% 70%, #1b1ac7 0%, transparent 70%)',
            opacity: 0.6,
            filter: 'blur(80px)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mt-24">
          <ScrollAnimation duration={0.7} delay={0.1} direction="up" once={false}>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16">
              Meet Our <span className="gradient-text">Founder</span>
            </h2>
          </ScrollAnimation>

          {/* Founder 1 - Image Left */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <ScrollAnimation duration={0.7} delay={0.2} direction="left" once={false}>
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-2xl h-full relative">
                  <Image 
                    src="/Founder.png" 
                    alt="Morshadul Mortoja - CEO & Founder"
                    fill
                    className="object-top object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation duration={0.7} delay={0.3} direction="right" once={false}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Morshadul Mortoja</h3>
                  <p className="text-[#7784e4] text-lg">CEO & Founder</p>
                </div>
                <p className="text-[#b8c5ff] leading-relaxed">
                  Visual Artist, Animator, and 3D Designer with a passion for creating immersive digital experiences. Leading the creative vision with innovative design and animation expertise.
                </p>
                <div className="flex space-x-4 pt-2">
                  <a href="#" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Second founder card hidden as per request */}
          {/* 
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation duration={0.7} delay={0.2} direction="left" once={false} className="lg:order-2">
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-2xl h-full relative">
                  <Image 
                    src="/Founder.png" 
                    alt="Michael Chen - CTO & Co-Founder"
                    fill
                    className="object-top object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation duration={0.7} delay={0.3} direction="right" once={false} className="lg:order-1">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Michael Chen</h3>
                  <p className="text-[#7784e4] text-lg">CTO & Co-Founder</p>
                </div>
                <p className="text-[#b8c5ff] leading-relaxed">
                  A tech visionary with 15+ years in software development, Michael drives our technical innovation. His expertise in emerging technologies and scalable architecture ensures our solutions are built to last and perform at scale.
                </p>
                <div className="flex space-x-4 pt-2">
                  <a href="#" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default FounderSection;

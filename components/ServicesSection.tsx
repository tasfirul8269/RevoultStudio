'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Video, Image, Box, Star } from 'lucide-react';
import PlanetAnimation from './PlanetAnimation';
import ScrollAnimation from './ScrollAnimation';
import StaggerItem from './StaggerItem';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Generate particles effect similar to HeroSection
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  const services = [
    {
      icon: <Video className="w-8 h-8" aria-hidden="true" aria-label="Video Editing Icon" />,
      title: "Video Editing",
      description: "Transform your raw footage into captivating visual stories with our professional video editing services. Perfect for businesses, content creators, and brands looking to make an impact.",
      features: ["4K/8K Video Editing", "Color Grading & Correction", "Motion Graphics & VFX", "Social Media Content"],
      path: "/services/video-editing"
    },
    {
      icon: <Image className="w-8 h-8" aria-hidden="true" aria-label="Graphics Design Icon" />,
      title: "Graphics Design",
      description: "Elevate your brand with stunning visual identities and marketing materials that tell your unique story and connect with your audience.",
      features: ["Logo & Brand Identity", "Print & Digital Marketing", "Social Media Graphics", "UI/UX Design"],
      path: "/services/graphics-design"
    },
    {
      icon: <Star className="w-8 h-8 transform rotate-12 -rotate-y-12" aria-hidden="true" aria-label="3D Animation Icon" />,
      title: "3D Animation",
      description: "Bring your ideas to life with our cutting-edge 3D animation services, from product visualizations to immersive brand experiences.",
      features: ["3D Product Visualization", "Character Animation", "Architectural Walkthroughs", "Motion Graphics"],
      path: "/services/3d-animation"
    },
    {
      icon: <Box className="w-8 h-8" />,
      title: "Website Development",
      description: "Custom-built websites that not only look stunning but also deliver exceptional user experiences and drive conversions.",
      features: ["Responsive Web Design", "E-Commerce Solutions", "Web Applications", "Performance Optimization"],
      path: "/services/website-development"
    }
  ];

  // No scroll-based effects needed

  return (
    <section id="services" ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#0a0613] to-[#0c0c7a]/10">
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
        <div
          className="absolute"
          style={{
            top: '20%',
            left: '40%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle at 50% 50%, #7784e4 0%, transparent 70%)',
            opacity: 0.5,
            filter: 'blur(60px)'
          }}
        />
      </div>
      {/* Background Elements - Static */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 opacity-5">
          <PlanetAnimation size="medium" />
        </div>
        <div className="absolute bottom-20 -left-10 w-32 h-32 border border-[#7784e4]/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4">
        <ScrollAnimation duration={0.7} delay={0.1} direction="up" once={false}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-xl text-[#b8c5ff] max-w-3xl mx-auto opacity-90">
              Comprehensive creative solutions that bring your vision to life
            </p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation duration={0.7} delay={0.2} once={false} staggerChildren={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <StaggerItem key={index} index={index}>
                <Link 
                  href={service.path}
                  className="block h-full group"
                >
                  <div className="flex flex-col h-full bg-[#1a1a2e]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#2a2a45] hover:border-[#3a3a5a] transition-all duration-500 hover:shadow-2xl hover:shadow-[#3a3a5a]/20 hover:-translate-y-1 transform transition-transform duration-300">
                    <div className="text-[#7784e4] mb-6 ">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#7784e4] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-[#b8c5ff] mb-6 leading-relaxed text-center">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-4 flex-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-[#b8c5ff]">
                          <div className="w-1.5 h-1.5 bg-[#7784e4] rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 text-[#7784e4] font-semibold group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                      Click to View
                      <div className="w-4 h-4 border-t-2 border-r-2 border-[#7784e4] transform rotate-45 transition-transform duration-300 group-hover:translate-x-1"></div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ServicesSection;
'use client';

import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import PlanetAnimation from './PlanetAnimation';
import ScrollAnimation from './ScrollAnimation';
import StaggerItem from './StaggerItem';

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
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

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with advanced features and seamless user experience.",
      tech: ["React", "Node.js", "MongoDB"],
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "SaaS Dashboard",
      description: "Comprehensive analytics dashboard with real-time data visualization.",
      tech: ["Vue.js", "Python", "PostgreSQL"],
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Mobile Banking App",
      description: "Secure and intuitive mobile banking application with modern UI.",
      tech: ["React Native", "Firebase", "Node.js"],
      image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  // No scroll-based effects needed

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#0a0613] to-[#0c0c7a]/10">
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
      {/* Static background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0c7a]/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation duration={0.7} delay={0.1} direction="up" once={false}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="text-xl text-[#b8c5ff] max-w-3xl mx-auto opacity-90">
              Showcasing our latest projects and digital innovations
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation duration={0.7} delay={0.2} once={false} staggerChildren={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <StaggerItem key={index} index={index}>
                <div
                  className="relative rounded-2xl overflow-hidden group h-80 flex items-end transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#3a3a5a]/30"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Overlay content with enhanced hover effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-b from-[#040422]/80 via-[#0c0c7a]/90 to-[#040422]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-8 transform group-hover:scale-100 scale-90"
                    onMouseEnter={() => setHoveredProject(index)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <h3 className="text-2xl font-bold mb-2 text-white text-center">
                      {project.title}
                    </h3>
                    <p className="text-[#b8c5ff] mb-6 leading-relaxed text-center transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                      {project.tech.map((tech, techIndex) => {
                        const isHovered = hoveredProject === index;
                        return (
                          <span
                            key={techIndex}
                            className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 ${
                              isHovered 
                                ? 'bg-[#7784e4] text-white border-[#7784e4]' 
                                : 'bg-[#7784e4]/20 text-[#7784e4] border-[#7784e4]/30'
                            }`}
                            style={{
                              transform: isHovered ? 'translateY(-2px)' : 'none',
                              boxShadow: isHovered ? '0 4px 14px rgba(119, 132, 228, 0.3)' : 'none'
                            }}
                          >
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </ScrollAnimation>

        <ScrollAnimation duration={0.7} delay={0.3} direction="up" once={false}>
          <div className="text-center mt-12">
            <button 
              className="relative overflow-hidden group btn-primary hover:scale-105 transition-transform duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View All Projects
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#a78bfa] to-[#c5b7ec] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default PortfolioSection;
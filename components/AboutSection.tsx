'use client';

import { Award, Users, Zap, Target, Linkedin, Twitter, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import ScrollAnimation from './ScrollAnimation';
import StaggerItem from './StaggerItem';

const AboutSection = () => {
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
  const stats = [
    { number: "150+", label: "Projects Completed", icon: <Award className="w-6 h-6" /> },
    { number: "50+", label: "Happy Clients", icon: <Users className="w-6 h-6" /> },
    { number: "5+", label: "Years Experience", icon: <Zap className="w-6 h-6" /> },
    { number: "99%", label: "Success Rate", icon: <Target className="w-6 h-6" /> }
  ];

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
        <ScrollAnimation duration={0.7} delay={0.1} direction="up" once={false}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              About <span className="gradient-text">Revoult Studio</span>
            </h2>
            <p className="text-xl text-[#b8c5ff] max-w-3xl mx-auto opacity-90">
              Where creativity meets technology to bring your vision to life
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Content */}
          <ScrollAnimation duration={0.7} delay={0.2} direction="up" once={false}>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl text-[#b8c5ff] leading-relaxed">
                At Revoult Studio, we're a passionate team of creative professionals dedicated to transforming your ideas into visually stunning realities. Specializing in video editing, website development, 3D animation, and graphic design, we bring a unique blend of technical expertise and artistic vision to every project.
              </p>
              <p className="text-lg text-[#b8c5ff] leading-relaxed">
                From captivating promotional videos to dynamic websites and eye-catching animations, we work closely with our clients to understand their brand and deliver solutions that not only meet but exceed expectations. Our commitment to quality and innovation ensures your brand stands out in today's competitive digital landscape.
              </p>
              <div className="pt-6">
                <button className="btn-primary hover:scale-105">
                  Learn More About Us
                </button>
              </div>
            </div>
          </ScrollAnimation>

          {/* Right side content instead of planet */}
          <ScrollAnimation duration={0.7} delay={0.3} direction="left" once={false}>
            <div className="flex justify-center lg:justify-end">
              <div className="bg-gradient-to-br from-[#040422] to-[#0c0c7a]/20 p-8 rounded-2xl neon-border card-3d">
                <h3 className="text-2xl font-bold text-white mb-6">Our Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-[#7784e4] rounded-full"></div>
                    <span className="text-[#b8c5ff]">Professional Video Editing</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-[#7784e4] rounded-full"></div>
                    <span className="text-[#b8c4ff]">Custom Website Development</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-[#7784e4] rounded-full"></div>
                    <span className="text-[#b8c5ff]">3D Animation & Motion Graphics</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-[#7784e4] rounded-full"></div>
                    <span className="text-[#b8c5ff]">Creative Graphic Design</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        {/* Stats */}
        <ScrollAnimation duration={0.7} delay={0.4} once={false} staggerChildren={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index} index={index}>
                <div className="text-center p-8 bg-gradient-to-br from-[#040422] to-[#0c0c7a]/20 rounded-2xl neon-border card-hover card-3d">
                  <div className="text-[#7784e4] mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-[#b8c5ff] text-sm lg:text-base">
                    {stat.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default AboutSection;
'use client';

'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Palette, Users, Lightbulb, Target, Zap, Award, Sparkles, 
  Eye, Code, Smartphone, Monitor, Layers, ArrowRight, 
  CheckCircle, Star, TrendingUp, Shield, Clock, Globe
} from 'lucide-react';

export default function UIUXPage() {
  // Set up particles with CSS animations
  const [particles] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      animation: `${i % 3 === 0 ? 'float' : i % 3 === 1 ? 'floatReverse' : 'floatSlow'} ${3 + Math.random() * 4}s ease-in-out infinite`,
      animationDelay: Math.random() * 3,
    }))
  );

  // Counter animation for stats
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [countersActive, setCountersActive] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Set up intersection observer for counter animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersActive) {
          setCountersActive(true);
          const targetValues = [150, 98, 45, 24];
          const duration = 2000; // 2 seconds
          const steps = 60; // frames
          const stepValues = targetValues.map(val => val / steps);
          
          let currentStep = 0;
          const interval = setInterval(() => {
            currentStep++;
            setCounters(prev => prev.map((_, i) => 
              Math.min(Math.ceil(stepValues[i] * currentStep), targetValues[i])
            ));
            
            if (currentStep >= steps) {
              clearInterval(interval);
            }
          }, duration / steps);
        }
      });
    }, { threshold: 0.1 });

    const currentStatsRef = statsRef.current;
    if (currentStatsRef) {
      observer.observe(currentStatsRef);
    }

    return () => {
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef);
      }
    };
  }, [countersActive]);



  const stats = [
    { number: 150, label: "Projects Completed", icon: <CheckCircle className="w-6 h-6" /> },
    { number: 98, label: "Client Satisfaction", icon: <Star className="w-6 h-6" /> },
    { number: 45, label: "Design Awards", icon: <Award className="w-6 h-6" /> },
    { number: 24, label: "Hours Saved", icon: <Clock className="w-6 h-6" /> }
  ];

  const portfolioProjects = [
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

  return (
    <>
      <main className="pt-20">
      {/* Hero Section */}
      <section className="section-container parallax-section hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Enhanced background with particles */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#040422] via-[#0a0a0a] to-[#1a1a2e]"></div>
        
        {/* Animated background particles */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-[#1b1ac7]/20 to-transparent"></div>
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#7784e4]/20 to-transparent"></div>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#7784e4] rounded-full opacity-60"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animation: particle.animation,
                animationDelay: `${particle.animationDelay}s`
              }}
            />
          ))}
        </div>
        
        {/* Central glowing arc with enhanced effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-1 bg-gradient-to-r from-transparent via-[#7784e4] to-transparent rounded-full opacity-80 blur-sm shadow-lg shadow-[#7784e4]/50"></div>
        </div>
        
        {/* Additional glow effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7784e4]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#1b1ac7]/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="space-y-12 max-w-5xl mx-auto animate-fade-in-up [&>*]:animate-fade-in-up [&>*:nth-child(1)]:animate-delay-100 [&>*:nth-child(2)]:animate-delay-200 [&>*:nth-child(3)]:animate-delay-300">
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold leading-tight">
                <div className="gradient-text">UI/UX</div>
                <div className="text-white">Design</div>
              </h1>
              <p className="text-xl lg:text-2xl xl:text-3xl text-[#b8c5ff] leading-relaxed max-w-4xl mx-auto opacity-90">
                We craft digital experiences that are not just beautiful, but intuitive, accessible, and conversion-focused.
              </p>
            </div>
            
            {/* Enhanced feature badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1b1ac7]/20 to-[#7784e4]/20 rounded-full border border-[#7784e4]/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[#b8c5ff] font-medium">User-Centered Design</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1b1ac7]/20 to-[#7784e4]/20 rounded-full border border-[#7784e4]/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-[#b8c5ff] font-medium">Accessibility First</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1b1ac7]/20 to-[#7784e4]/20 rounded-full border border-[#7784e4]/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-[#b8c5ff] font-medium">Performance Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[#0c0c7a]/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our <span className="gradient-text">Impact</span> in Numbers
            </h2>
            <p className="text-lg text-[#b8c5ff] max-w-2xl mx-auto">
              Delivering exceptional results through data-driven design
            </p>
          </div>
          <div 
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 [&>*]:animate-fade-in-up [&>*:nth-child(1)]:animate-delay-100 [&>*:nth-child(2)]:animate-delay-200 [&>*:nth-child(3)]:animate-delay-300 [&>*:nth-child(4)]:animate-delay-400"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-8 bg-gradient-to-br from-[#040422]/80 to-[#0c0c7a]/40 rounded-2xl neon-border card-hover card-3d border border-[#7784e4]/20 hover:border-[#7784e4]/40 transition-all duration-500 hover:scale-105">
                <div className="text-[#7784e4] mb-6 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
                  {countersActive ? stat.number : 0}
                </div>
                <div className="text-[#b8c5ff] text-sm lg:text-base font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              What We <span className="gradient-text">Do</span>
            </h2>
            <p className="text-xl text-[#b8c5ff] max-w-4xl mx-auto leading-relaxed">
              We specialize in creating user-centered digital experiences that combine beautiful design with intuitive functionality. Our approach focuses on understanding user needs, business goals, and technical requirements to deliver solutions that drive results.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center [&>*]:animate-fade-in-up [&>*:nth-child(1)]:animate-delay-100 [&>*:nth-child(2)]:animate-delay-200">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  User-Centered Design Philosophy
                </h3>
                <p className="text-lg text-[#b8c5ff] leading-relaxed">
                  Every design decision we make is backed by user research and data. We believe that great design should be invisible - users should focus on their goals, not on how to use the interface.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  Accessibility & Performance
                </h3>
                <p className="text-lg text-[#b8c5ff] leading-relaxed">
                  We ensure our designs are accessible to all users and optimized for performance. Fast loading times and inclusive design practices are at the core of our development process.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  Conversion-Focused Approach
                </h3>
                <p className="text-lg text-[#b8c5ff] leading-relaxed">
                  Beyond aesthetics, we design for business outcomes. Our interfaces are crafted to guide users toward conversion while maintaining an excellent user experience.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#040422]/80 to-[#0c0c7a]/40 rounded-2xl p-8 border border-[#7784e4]/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#1b1ac7] to-[#7784e4] rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">User Research</h4>
                      <p className="text-[#b8c5ff]">In-depth analysis of user behavior and needs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#1b1ac7] to-[#7784e4] rounded-full flex items-center justify-center">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">Visual Design</h4>
                      <p className="text-[#b8c5ff]">Beautiful, functional interfaces that convert</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#1b1ac7] to-[#7784e4] rounded-full flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">Prototyping</h4>
                      <p className="text-[#b8c5ff]">Interactive prototypes for testing and validation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-transparent via-[#0c0c7a]/10 to-[#0c0c7a]/20 relative overflow-hidden">
        {/* Background gradient for edge blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0c7a]/10 to-transparent pointer-events-none z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="text-xl text-[#b8c5ff] max-w-3xl mx-auto">
              Showcasing our best work in UI/UX design and digital experiences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 [&>*]:animate-fade-in-up [&>*:nth-child(1)]:animate-delay-100 [&>*:nth-child(2)]:animate-delay-150 [&>*:nth-child(3)]:animate-delay-200">
            {portfolioProjects.map((project, index) => (
              <div
                key={index}
                className="relative rounded-2xl neon-border card-hover card-3d overflow-hidden group h-80 flex items-end"
                style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                {/* Overlay content, hidden by default, shown on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#040422]/70 to-[#0c0c7a]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-center items-center p-8">
                  <h3 className="text-2xl font-bold mb-2 text-white text-center">
                    {project.title}
                  </h3>
                  <p className="text-[#b8c5ff] mb-4 leading-relaxed text-center">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-[#7784e4]/20 text-[#7784e4] text-sm rounded-full border border-[#7784e4]/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="btn-primary hover:scale-105">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-[#1b1ac7]/10 to-[#7784e4]/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-bold">
              Ready to Transform Your <span className="gradient-text">Digital Experience</span>?
            </h2>
            <p className="text-xl text-[#b8c5ff] leading-relaxed">
              Let&apos;s collaborate to create user experiences that not only look stunning but drive real business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group btn-primary flex items-center gap-3 hover:scale-105">
                <Sparkles size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                Start Your Project
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button className="group border-2 border-[#7784e4] px-10 py-5 rounded-full text-[#7784e4] font-semibold hover:bg-[#7784e4] hover:text-white transition-all duration-500 hover:scale-105 transform">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
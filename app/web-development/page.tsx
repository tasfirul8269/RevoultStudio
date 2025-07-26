'use client';

import { useState } from 'react';
import { Code, Smartphone, Zap, Shield, Globe, Database, Sparkles, Play } from 'lucide-react';
import PlanetAnimation from '../../components/PlanetAnimation';

export default function WebDevelopmentPage() {
  // Set up particles with CSS animations
  const [particles] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      animation: `${i % 3 === 0 ? 'float' : i % 3 === 1 ? 'floatReverse' : 'floatSlow'} ${3 + Math.random() * 4}s ease-in-out infinite`,
      animationDelay: Math.random() * 3,
    }))
  );

  // Portfolio projects (example)
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

  const technologies = [
    "React", "Next.js", "Vue.js", "Angular", "Node.js", "Python",
    "TypeScript", "GraphQL", "MongoDB", "PostgreSQL", "AWS", "Docker"
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized for speed and performance with modern web technologies."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Responsive Design",
      description: "Perfect experience across all devices and screen sizes."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Built with security best practices and robust architecture."
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Scalable Solutions",
      description: "Architecture that grows with your business needs."
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section (UI/UX style) */}
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
          <div className="space-y-12 max-w-5xl mx-auto animate-fade-in-up">
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold leading-tight">
                <div className="gradient-text">Web</div>
                <div className="text-white">Development</div>
              </h1>
              <p className="text-xl lg:text-2xl xl:text-3xl text-[#b8c5ff] leading-relaxed max-w-4xl mx-auto opacity-90">
                Building fast, scalable, and secure web applications using cutting-edge technologies and industry best practices.
              </p>
            </div>
            {/* Enhanced feature badges */}
            <div className="flex flex-wrap justify-center gap-4 [&>*]:animate-fade-in-up" style={{ '--stagger': '0.05s' } as React.CSSProperties}>
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1b1ac7]/20 to-[#7784e4]/20 rounded-full border border-[#7784e4]/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[#b8c5ff] font-medium">Modern Stack</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1b1ac7]/20 to-[#7784e4]/20 rounded-full border border-[#7784e4]/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-[#b8c5ff] font-medium">Performance</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1b1ac7]/20 to-[#7784e4]/20 rounded-full border border-[#7784e4]/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-[#b8c5ff] font-medium">Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About/Description Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Why <span className="gradient-text">Web Development</span> Matters
            </h2>
            <p className="text-xl text-[#b8c5ff] max-w-4xl mx-auto leading-relaxed">
              We build digital products that are fast, scalable, and secure. Our approach combines modern technology, robust architecture, and a focus on user experience to deliver real business value.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side with staggered animations */}
            <div className="space-y-8 [&>*]:animate-fade-in-up [&>*:nth-child(1)]:animate-delay-100 [&>*:nth-child(2)]:animate-delay-200 [&>*:nth-child(3)]:animate-delay-300">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    Modern Technologies
                  </h3>
                  <p className="text-lg text-[#b8c5ff] leading-relaxed">
                    We use the latest frameworks and tools to ensure your application is future-proof and maintainable.
                  </p>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    User Experience
                  </h3>
                  <p className="text-lg text-[#b8c5ff] leading-relaxed">
                    Our designs are intuitive and conversion-focused, ensuring your users love every interaction.
                  </p>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    Security & Performance
                  </h3>
                  <p className="text-lg text-[#b8c5ff] leading-relaxed">
                    We prioritize security and speed, so your business and users are always protected and satisfied.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#040422]/80 to-[#0c0c7a]/40 rounded-2xl p-8 border border-[#7784e4]/20">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#1b1ac7] to-[#7784e4] rounded-full flex items-center justify-center">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Custom Development</h4>
                        <p className="text-[#b8c5ff]">Tailored solutions for your unique business needs</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#1b1ac7] to-[#7784e4] rounded-full flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Mobile Ready</h4>
                        <p className="text-[#b8c5ff]">Responsive design for all devices and platforms</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#1b1ac7] to-[#7784e4] rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Secure by Design</h4>
                        <p className="text-[#b8c5ff]">Best practices for robust, secure applications</p>
                      </div>
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
              Showcasing our best work in web development and digital solutions
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
        </div>
      </section>

      {/* Features Section (enhanced) */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose Our <span className="gradient-text">Development</span> Services?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 [&>*]:animate-fade-in-up [&>*:nth-child(1)]:animate-delay-100 [&>*:nth-child(2)]:animate-delay-150 [&>*:nth-child(3)]:animate-delay-200 [&>*:nth-child(4)]:animate-delay-250">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-[#040422] to-[#0c0c7a]/20 rounded-2xl neon-border card-hover card-3d"
              >
                <div className="text-[#7784e4] mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-[#b8c5ff]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section (enhanced) */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-transparent to-[#0c0c7a]/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Tech Stack</span>
            </h2>
            <p className="text-xl text-[#b8c5ff] max-w-3xl mx-auto">
              We use the latest and most reliable technologies to build your applications
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 [&>*]:animate-fade-in-up [&>*:nth-child(1)]:animate-delay-100 [&>*:nth-child(2)]:animate-delay-150 [&>*:nth-child(3)]:animate-delay-200 [&>*:nth-child(4)]:animate-delay-250">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#040422] to-[#0c0c7a]/20 p-6 rounded-xl neon-border text-center hover:bg-gradient-to-br hover:from-[#1b1ac7]/20 hover:to-[#7784e4]/20 transition-all duration-300 card-3d"
              >
                <div className="text-white font-semibold">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section (enhanced) */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Development <span className="gradient-text">Process</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 [&>*]:animate-fade-in-up [&>*:nth-child(1)]:animate-delay-100 [&>*:nth-child(2)]:animate-delay-150 [&>*:nth-child(3)]:animate-delay-200 [&>*:nth-child(4)]:animate-delay-250">
            {[
              { step: "01", title: "Planning", description: "Requirements analysis and project planning" },
              { step: "02", title: "Design", description: "UI/UX design and architecture planning" },
              { step: "03", title: "Development", description: "Coding and implementation phase" },
              { step: "04", title: "Testing", description: "Quality assurance and deployment" }
            ].map((phase, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-[#040422] to-[#0c0c7a]/20 rounded-2xl neon-border card-hover card-3d"
              >
                <div className="text-4xl font-bold gradient-text mb-4">{phase.step}</div>
                <h3 className="text-xl font-bold text-white mb-4">{phase.title}</h3>
                <p className="text-[#b8c5ff]">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
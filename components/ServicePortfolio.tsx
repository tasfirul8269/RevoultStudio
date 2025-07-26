'use client';

import { useState, useEffect } from 'react';
import ScrollAnimation from './ScrollAnimation';
import StaggerItem from './StaggerItem';

interface PortfolioItem {
  title: string;
  description: string;
  tech: string[];
  image: string;
}

interface ServicePortfolioProps {
  title: string;
  description: string;
  portfolioItems: PortfolioItem[];
}

const ServicePortfolio = ({ title, description, portfolioItems }: ServicePortfolioProps) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  return (
    <section className="py-20 overflow-hidden bg-gradient-to-b from-[#0a0613] to-[#0c0c7a]/10">
      {/* Static background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0c7a]/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation duration={0.7} delay={0.1} direction="up" once={false}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {title} <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="text-xl text-[#b8c5ff] max-w-3xl mx-auto opacity-90">
              {description}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation duration={0.7} delay={0.2} once={false} staggerChildren={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((project, index) => (
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
      </div>
    </section>
  );
};

export default ServicePortfolio;

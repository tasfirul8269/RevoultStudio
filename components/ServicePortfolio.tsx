'use client';

import { useState, useRef } from 'react';
import ScrollAnimation from './ScrollAnimation';
import StaggerItem from './StaggerItem';
import { FiPlay, FiX } from 'react-icons/fi';

interface PortfolioItem {
  title: string;
  description: string;
  tech: string[];
  image: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  fileType?: string;
  projectUrl?: string;
}

interface ServicePortfolioProps {
  title: string;
  description: string;
  portfolioItems: PortfolioItem[];
}

// Video Popup Component
const VideoPopup = ({ videoUrl, isOpen, onClose }: { videoUrl: string; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-[#7784e4] transition-colors"
          aria-label="Close video"
        >
          <FiX className="w-8 h-8" />
        </button>
        <div className="aspect-video w-full">
          <video
            src={videoUrl}
            className="w-full h-full"
            controls
            autoPlay
            playsInline
          />
        </div>
      </div>
    </div>
  );
};

const ServicePortfolio = ({ title, description, portfolioItems }: ServicePortfolioProps) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  
  const handleThumbnailError = (item: any, e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement>) => {
    const target = e.target as HTMLImageElement | HTMLVideoElement;
    const parent = target.parentElement;
    if (!parent) return;
    
    // Hide the broken image/video
    target.style.display = 'none';
    
    // Create a fallback container
    const fallback = document.createElement('div');
    fallback.className = 'w-full h-full flex items-center justify-center bg-gray-900';
    
    const icon = document.createElement('div');
    icon.className = 'text-4xl text-[#7784e4]';
    icon.textContent = item.fileType === 'video' ? '▶️' : '🖼️';
    
    fallback.appendChild(icon);
    parent.appendChild(fallback);
  };
  
  return (
    <>
      {/* Video Popup */}
      <VideoPopup
        videoUrl={selectedVideo || ''}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
      
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
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Video/Image Container */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    {project.fileType === 'video' ? (
                      <div className="relative w-full h-full group">
                        {/* Video Thumbnail - Show poster frame when not hovering */}
                        <div className="absolute inset-0 w-full h-full group-hover:opacity-0 transition-opacity duration-300">
                          {project.thumbnailUrl || project.videoUrl ? (
                            <div className="relative w-full h-full">
                              <video
                                ref={el => {
                                  if (el) {
                                    videoRefs.current[project.title] = el;
                                  }
                                }}
                                src={project.videoUrl}
                                className="w-full h-full object-cover"
                                preload="metadata"
                                muted
                                loop
                                playsInline
                                onError={(e) => handleThumbnailError(project, e)}
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900">
                              <span className="text-4xl">▶️</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Video - Show on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            src={project.videoUrl}
                            onError={(e) => handleThumbnailError(project, e)}
                          />
                        </div>
                      </div>
                    ) : (
                      /* Image Thumbnail */
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${project.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        onError={(e) => handleThumbnailError(project, e as any)}
                      />
                    )}
                  </div>
                  {/* Overlay content with enhanced hover effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-b from-[#040422]/80 via-[#0c0c7a]/90 to-[#040422]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-6 transform group-hover:scale-100 scale-90 z-10"
                  >
                    <h3 className="text-2xl font-bold mb-2 text-white text-center">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-[#b8c5ff] text-center text-sm mb-3">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2 mb-3 max-w-full">
                        {project.tech.map((tech, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 text-xs font-medium text-[#b8c5ff] bg-[#0c0c7a]/50 rounded-full whitespace-nowrap"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Play button for videos */}
                    {project.fileType === 'video' && project.videoUrl && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVideo(project.videoUrl || null);
                        }}
                        className="mt-4 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                        aria-label="Play video"
                      >
                        <FiPlay className="w-5 h-5 text-white ml-1" />
                      </button>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
    </>
  );
};

export default ServicePortfolio;

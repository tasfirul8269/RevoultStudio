'use client';

import { useEffect } from 'react';

const videoPaths = [
  '/PlanetVideo.mp4',
  '/ServiceHero.mp4',
  '/heroVideo.mp4',
  // Add more video paths as needed
];

// Simple video preloader component
export default function VideoPreloader() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Create a simple preload function
    const preloadVideos = () => {
      videoPaths.forEach((src) => {
        try {
          // Preload using link preload (most efficient)
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'video';
          link.href = src;
          document.head.appendChild(link);
          
          // Fallback: Create a hidden video element
          const video = document.createElement('video');
          video.preload = 'auto';
          video.src = src;
          video.style.display = 'none';
          document.body.appendChild(video);
          
          // Clean up after a delay
          setTimeout(() => {
            try {
              if (document.head.contains(link)) {
                document.head.removeChild(link);
              }
              if (document.body.contains(video)) {
                document.body.removeChild(video);
              }
            } catch (e) {
              // Ignore cleanup errors
            }
          }, 10000); // Clean up after 10 seconds
          
        } catch (error) {
          console.error('Error preloading video:', src, error);
        }
      });
    };

    // Use requestIdleCallback if available, otherwise use setTimeout
    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(
        preloadVideos,
        { timeout: 2000 }
      );
      
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as any).cancelIdleCallback(id);
        }
      };
    } else {
      // Fallback for browsers without requestIdleCallback
      const timer = setTimeout(preloadVideos, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return null; // This component doesn't render anything
}

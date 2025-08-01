'use client';

import { useEffect } from 'react';

const videoPaths = [
  '/PlanetVideo.mp4',
  '/ServiceHero.mp4',
  '/heroVideo.mp4',
  // Add more video paths as needed
];

export default function VideoPreloader() {
  useEffect(() => {
    // Function to preload videos
    const preloadVideos = () => {
      videoPaths.forEach((src) => {
        // Create a video element to preload
        const video = document.createElement('video');
        video.preload = 'auto';
        video.src = src;
        video.style.display = 'none';
        
        // Add to document to start preloading
        document.body.appendChild(video);
        
        // Clean up after preloading
        video.onloadeddata = () => {
          document.body.removeChild(video);
        };
        
        // Also preload using link preload
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Only run in browser
    if (typeof window !== 'undefined') {
      // Start preloading when the page is idle
      if (window.requestIdleCallback) {
        window.requestIdleCallback(preloadVideos, { timeout: 2000 });
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(preloadVideos, 2000);
      }
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null; // This component doesn't render anything
}

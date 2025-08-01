'use client';

import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
}

export default function VideoPlayer({
  src,
  className = '',
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
  preload = 'auto',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Preconnect to video sources
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = new URL(src, window.location.origin).origin;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      plays-inline=""
      webkit-playsinline=""
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

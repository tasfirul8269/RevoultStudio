'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ExternalLink } from 'lucide-react';

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  thumbnailUrl?: string;
  projectUrl?: string;
  fileType: 'image' | 'video';
}

interface PortfolioGridProps {
  items: PortfolioItem[];
  className?: string;
}

export default function PortfolioGrid({ items, className = '' }: PortfolioGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {items.map((item) => (
        <PortfolioCard key={item._id} item={item} />
      ))}
    </div>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle video play/pause on hover
  useEffect(() => {
    const video = videoRef.current;
    if (!video || item.fileType !== 'video') return;

    if (isHovered) {
      hoverTimeout.current = setTimeout(() => {
        video.play().catch(console.error);
      }, 300);
    } else {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, [isHovered, item.fileType]);

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video bg-black">
        {item.fileType === 'video' ? (
          <>
            <video
              ref={videoRef}
              src={item.fileUrl}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              preload="metadata"
              poster={item.thumbnailUrl}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white bg-opacity-80 rounded-full p-3">
                <Play className="h-6 w-6 text-gray-900" fill="currentColor" />
              </div>
            </div>
          </>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={item.fileUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
            />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            {item.fileType === 'video' ? 'Video' : 'Image'}
          </span>
          
          {item.projectUrl && (
            <a
              href={item.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              onClick={(e) => e.stopPropagation()}
            >
              View Project
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
    </div>
  );
}

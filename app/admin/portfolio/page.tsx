'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FiPlus, FiImage, FiVideo, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Image from 'next/image';

const handleThumbnailError = (item: any, e: React.SyntheticEvent<HTMLElement>) => {
  // Skip if this is a video without a thumbnail (we handle this case in the JSX)
  if (item.fileType === 'video' && !item.thumbnailUrl) {
    return;
  }
  const target = e.target as HTMLImageElement;
  
  // Hide the broken image
  target.style.display = 'none';
  
  // Get the parent container
  const parent = target.parentElement;
  if (!parent) return;
  
  // Create a container for the error state
  const errorContainer = document.createElement('div');
  errorContainer.className = 'w-full h-full flex flex-col items-center justify-center p-4';
  
  // If this is a video item, create a video preview
  if (item.fileType === 'video' && item.fileUrl) {
    const video = document.createElement('video');
    video.src = item.fileUrl;
    video.className = 'w-full h-full object-cover';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    
    // Create a play button overlay
    const playButton = document.createElement('div');
    playButton.className = 'absolute inset-0 flex items-center justify-center bg-black bg-opacity-30';
    playButton.innerHTML = `
      <div class="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    `;
    
    // Play video on click
    playButton.onclick = () => {
      playButton.style.display = 'none';
      video.play().catch(console.error);
    };
    
    // Pause video when not hovering
    video.onpause = () => {
      playButton.style.display = 'flex';
    };
    
    const videoContainer = document.createElement('div');
    videoContainer.className = 'relative w-full h-full';
    videoContainer.appendChild(video);
    videoContainer.appendChild(playButton);
    
    parent.appendChild(videoContainer);
    return;
  }
  
  // For non-video items or when video preview fails
  const message = document.createElement('span');
  message.className = 'text-xs text-[#b8c5ff] text-center';
  message.textContent = item.thumbnailUrl ? 'Thumbnail failed to load' : 'No thumbnail available';
  
  // Create a simple icon using SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'w-12 h-12 text-[#7784e4]');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  
  if (item.fileType === 'video') {
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '23 7 16 12 23 17 23 7');
    svg.appendChild(polygon);
  }
  
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '1');
  rect.setAttribute('y', '5');
  rect.setAttribute('width', '22');
  rect.setAttribute('height', '14');
  rect.setAttribute('rx', '2');
  rect.setAttribute('ry', '2');
  svg.appendChild(rect);
  
  // Add elements to container
  errorContainer.appendChild(svg);
  errorContainer.appendChild(message);
  
  // Add view button if file URL exists
  if (item.fileUrl) {
    const button = document.createElement('button');
    button.className = 'mt-2 text-xs text-[#7784e4] hover:underline';
    button.textContent = `View ${item.fileType === 'video' ? 'Video' : 'File'}`;
    button.onclick = () => window.open(item.fileUrl, '_blank');
    errorContainer.appendChild(button);
  }
  
  parent.appendChild(errorContainer);
};

interface PortfolioItem {
  id: string;
  _id?: string; // For backward compatibility
  title: string;
  description: string;
  fileUrl: string;
  thumbnailUrl?: string;
  service: string;
  technologies: string[];
  fileType?: 'image' | 'video';
  type?: 'image' | 'video';
  createdAt?: string;
  updatedAt?: string;
}

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();
  
  // Function to fetch portfolio items
  const fetchPortfolioItems = async () => {
    try {
      const response = await fetch('/api/portfolio/items');
      const data = await response.json();
      
      if (data.success) {
        const processedItems = await Promise.all(data.data.map(async (item: any) => {
          const isVideo = item.fileUrl?.match(/\.(mp4|webm|mov|avi)$/i);
          const processed: PortfolioItem = {
            id: item._id || item.id,
            _id: item._id || item.id, // Keep _id for backward compatibility
            title: item.title,
            type: (item.type || (isVideo ? 'video' : 'image')) as 'image' | 'video',
            fileType: item.fileType || (isVideo ? 'video' : 'image'),
            fileUrl: item.fileUrl,
            thumbnailUrl: item.thumbnailUrl || (isVideo ? await generateVideoThumbnail(item.fileUrl) : item.fileUrl),
            service: item.service,
            description: item.description,
            technologies: item.technologies || [],
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          };
          return processed;
        }));
        setPortfolioItems(processedItems);
      } else {
        console.error('Failed to fetch portfolio items:', data.message);
        toast.error('Failed to load portfolio items');
      }
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      toast.error('Error loading portfolio items');
    } finally {
      setLoading(false);
    }
  };
  
  // Function to generate a thumbnail from video
  const generateVideoThumbnail = (videoUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.preload = 'metadata';
      
      // Set video to load the first frame
      video.currentTime = 0.1;
      
      video.onloadeddata = () => {
        // Create a canvas to capture the thumbnail
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions to video dimensions
        canvas.width = video.videoWidth || 300;
        canvas.height = video.videoHeight || 200;
        
        // Draw video frame to canvas
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL
        const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(thumbnailUrl);
      };
      
      video.onerror = () => {
        // Fallback to a default video thumbnail if we can't generate one
        resolve('/video-thumbnail-fallback.jpg');
      };
      
      video.src = videoUrl;
    });
  };

  // Fetch portfolio items on component mount
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const response = await fetch('/api/portfolio/items');
        const data = await response.json();
        if (data.success) {
          const processedItems = await Promise.all(data.data.map(async (item: any) => {
            const isVideo = item.fileUrl?.match(/\.(mp4|webm|mov|avi)$/i);
            const processed: PortfolioItem = {
              id: item._id || item.id,
              _id: item._id || item.id, // Keep _id for backward compatibility
              title: item.title,
              type: (item.type || (isVideo ? 'video' : 'image')) as 'image' | 'video',
              fileType: item.fileType || (isVideo ? 'video' : 'image'),
              fileUrl: item.fileUrl,
              thumbnailUrl: item.thumbnailUrl || (isVideo ? await generateVideoThumbnail(item.fileUrl) : item.fileUrl),
              service: item.service,
              description: item.description,
              technologies: item.technologies || [],
              createdAt: item.createdAt,
              updatedAt: item.updatedAt
            };
            return processed;
          }));
          setPortfolioItems(processedItems);
        } else {
          console.error('Failed to fetch portfolio items:', data.message);
          toast.error('Failed to load portfolio items');
        }
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
        toast.error('Error loading portfolio items');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolioItems();
  }, []);

  const handleDelete = async (id: string) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this portfolio item?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await fetch(`/api/portfolio/items/${id}`, {
                method: 'DELETE',
              });
              
              if (response.ok) {
                // Remove the deleted item from the state
                setPortfolioItems(prevItems => prevItems.filter(item => item.id !== id));
                toast.success('Portfolio item deleted successfully');
              } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete portfolio item');
              }
            } catch (error) {
              console.error('Error deleting portfolio item:', error);
              toast.error(error instanceof Error ? error.message : 'Failed to delete portfolio item');
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7784e4]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio Management</h1>
          <p className="text-[#b8c5ff]">
            Manage your portfolio items
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/portfolio/add')}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-[#1a1a2e] rounded-lg text-sm font-medium text-white bg-[#1a1a2e] hover:bg-[#24243d] transition-colors"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add New Item
        </button>
      </div>

      {portfolioItems.length === 0 ? (
        <div className="text-center py-16 bg-[#0a0613] bg-opacity-50 border border-[#1a1a2e] rounded-xl">
          <div className="mx-auto h-16 w-16 bg-[#1a1a2e] rounded-full flex items-center justify-center text-[#7784e4] mb-4">
            <FiImage className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-white">No portfolio items yet</h3>
          <p className="mt-1 text-sm text-[#b8c5ff] max-w-md mx-auto">
            You haven&apos;t added any portfolio items yet. Get started by adding your first item.
          </p>
          <div className="mt-6">
            <button
              onClick={() => router.push('/admin/portfolio/add')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1a1a2e] hover:bg-[#24243d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7784e4] transition-colors"
            >
              <FiPlus className="-ml-1 mr-2 h-5 w-5" />
              Add Your First Item
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div key={item._id} className="bg-[#0a0613] bg-opacity-50 border border-[#1a1a2e] rounded-xl overflow-hidden hover:border-[#7784e4] transition-colors">
              <div className="relative aspect-video bg-[#1a1a2e] group overflow-hidden">
                {item.fileType === 'video' ? (
                  <div className="relative w-full h-full">
                    {/* Video Thumbnail */}
                    <div className="absolute inset-0 w-full h-full group-hover:opacity-0 transition-opacity duration-300">
                      {item.thumbnailUrl || item.fileUrl ? (
                        <div className="relative w-full h-full">
                          {item.fileType === 'video' ? (
                            <div className="relative w-full h-full group">
                              <video
                                ref={el => { videoRefs.current[item.id] = el; }}
                                src={item.fileUrl}
                                className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0"
                                preload="metadata"
                                muted
                                loop
                                playsInline
                                onPlay={() => {}}
                                onError={(e) => {
                                  const target = e.target as HTMLVideoElement;
                                  target.style.display = 'none';
                                  const errorEvent = {
                                    ...e,
                                    target: e.target as unknown as HTMLElement
                                  } as unknown as React.SyntheticEvent<HTMLElement>;
                                  handleThumbnailError(item, errorEvent);
                                }}
                                onLoadedData={(e) => {
                                  // Once video is loaded, we can use it to generate a thumbnail
                                  if (!item.thumbnailUrl) {
                                    const video = e.target as HTMLVideoElement;
                                    const canvas = document.createElement('canvas');
                                    const ctx = canvas.getContext('2d');
                                    if (!ctx) return;
                                    
                                    canvas.width = video.videoWidth;
                                    canvas.height = video.videoHeight;
                                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                                    
                                    const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
                                    
                                    // Update the thumbnail URL in the state
                                    setPortfolioItems(prevItems => 
                                      prevItems.map(prevItem => 
                                        prevItem.id === item.id 
                                          ? { ...prevItem, thumbnailUrl } 
                                          : prevItem
                                      )
                                    );
                                  }
                                }}
                              />
                              <Image
                                src={typeof item.thumbnailUrl === 'string' && item.thumbnailUrl ? item.thumbnailUrl : '/placeholder.png'}
                                alt={`${item.title} thumbnail`}
                                className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300"
                                width={600}
                                height={400}
                                crossOrigin="anonymous"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const video = target.parentElement?.querySelector('video');
                                  if (video) {
                                    video.style.opacity = '1';
                                    video.play().catch(console.error);
                                  }
                                }}
                              />
                            </div>
                          ) : (
                            <Image
                              src={typeof item.thumbnailUrl === 'string' && item.thumbnailUrl ? item.thumbnailUrl : (typeof item.fileUrl === 'string' && item.fileUrl ? item.fileUrl : '/placeholder.png')}
                              alt={`${item.title} thumbnail`}
                              className="w-full h-full object-cover"
                              width={600}
                              height={400}
                              crossOrigin="anonymous"
                              onLoad={(e) => {
                                const target = e.target as HTMLImageElement;
                              }}
                              onError={(e) => {
                                handleThumbnailError(item, e);
                              }}
                            />
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a2e] rounded-lg p-4">
                          <FiVideo className="w-12 h-12 text-[#7784e4]" />
                          <span className="text-xs mt-2 text-[#b8c5ff] text-center">
                            No thumbnail available
                          </span>
                          {item.fileUrl && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(item.fileUrl, '_blank');
                              }}
                              className="mt-2 text-xs text-[#7784e4] hover:underline"
                            >
                              View Video
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Video Player (shows on hover) */}
                    <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <video
                        key={`video-${item._id}`}
                        src={item.fileUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay
                        controls={false}
                        preload="metadata"
                        onError={(e) => {
                          const target = e.target as HTMLVideoElement;
                          target.style.display = 'none';
                          const parent = target.parentElement?.parentElement;
                          if (parent) {
                            const errorDiv = document.createElement('div');
                            errorDiv.className = 'w-full h-full flex flex-col items-center justify-center bg-red-900/20';
                            errorDiv.innerHTML = `
                              <FiVideo className="w-8 h-8 text-red-400 mb-2" />
                              <span class="text-xs text-red-300">Failed to load video</span>
                              <span class="text-[10px] text-red-400 mt-1">${item.fileUrl?.substring(0, 40)}${item.fileUrl?.length > 40 ? '...' : ''}</span>
                            `;
                            parent.appendChild(errorDiv);
                          }
                        }}
                        onLoadedData={() => {}}
                      />
                    </div>
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                        <FiVideo className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Image handling for non-video items */
                  <div className="w-full h-full">
                    {item.fileUrl ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image
                          src={item.fileUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          width={600}
                          height={400}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const icon = document.createElement('div');
                              icon.className = 'w-full h-full flex flex-col items-center justify-center';
                              icon.innerHTML = `
                                <FiImage className="w-12 h-12 text-[#7784e4]" />
                                <span class="text-xs mt-2 text-[#b8c5ff]">Image failed to load</span>
                              `;
                              parent.appendChild(icon);
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-[#7784e4]">
                        <FiImage className="w-12 h-12" />
                        <span className="text-xs mt-2 text-[#b8c5ff]">No image available</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => router.push(`/admin/portfolio/edit/${item.id}`)}
                    className="p-2 bg-[#1a1a2e] rounded-full text-[#b8c5ff] hover:bg-[#24243d] hover:text-white transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-[#1a1a2e] rounded-full text-red-400 hover:bg-red-900/30 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium truncate">{item.title}</h3>
                <p className="text-sm text-[#b8c5ff] mt-1 line-clamp-2">{item.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1a1a2e] text-[#b8c5ff] capitalize">
                    {item.service.replace('-', ' ')}
                  </span>
                  <span className="text-xs text-[#b8c5ff]/70">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }) : 'No date'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

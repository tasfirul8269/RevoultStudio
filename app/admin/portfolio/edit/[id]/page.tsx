'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FiUpload, FiImage, FiVideo, FiArrowLeft, FiX } from 'react-icons/fi';
import Image from 'next/image';

type ServiceType = 'video-editing' | 'graphics-design' | '3d-animation' | 'website-development';

type FormData = {
  service: ServiceType;
  title: string;
  description: string;
  technologies: string;
  thumbnail: File | null;
  video: File | null;
  existingThumbnailUrl?: string;
  existingVideoUrl?: string;
};

export default function EditPortfolioItem() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>() ?? {};
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    service: 'video-editing',
    title: '',
    description: '',
    technologies: '',
    thumbnail: null,
    video: null,
    existingThumbnailUrl: '',
    existingVideoUrl: ''
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // Fetch portfolio item data
  useEffect(() => {
    const fetchPortfolioItem = async () => {
      try {
        const response = await fetch(`/api/portfolio/items/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch portfolio item');
        }
        
        const { data } = await response.json();
        if (!data) throw new Error('No data received');
        
        const isVideo = data.fileType === 'video' || data.type === 'video';
        const thumbnailUrl = data.thumbnailUrl || (!isVideo ? data.fileUrl : '');
        const videoUrl = isVideo ? data.fileUrl : '';
        
        setFormData(prev => ({
          ...prev,
          service: data.service || 'graphics-design',
          title: data.title || '',
          description: data.description || '',
          technologies: Array.isArray(data.technologies) 
            ? data.technologies.join(', ') 
            : data.technologies || '',
          existingThumbnailUrl: thumbnailUrl,
          existingVideoUrl: videoUrl
        }));
        
        if (thumbnailUrl) setThumbnailPreview(thumbnailUrl);
        if (videoUrl) setVideoPreview(videoUrl);
        
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load portfolio item');
        router.push('/admin/portfolio');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchPortfolioItem();
  }, [id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'description' && value.length > 60) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, thumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, video: file }));
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const removeThumbnail = () => {
    setFormData(prev => ({ ...prev, thumbnail: null, existingThumbnailUrl: '' }));
    setThumbnailPreview(null);
  };

  const removeVideo = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setFormData(prev => ({ ...prev, video: null, existingVideoUrl: '' }));
    setVideoPreview(null);
  };

  const isVideoRequired = ['video-editing', '3d-animation'].includes(formData.service);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (isVideoRequired && !formData.video && !formData.existingVideoUrl) {
      toast.error('Please upload a video for this service');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('service', formData.service);
      formDataToSend.append('technologies', formData.technologies);
      
      if (formData.thumbnail) formDataToSend.append('thumbnail', formData.thumbnail);
      if (formData.video) formDataToSend.append('file', formData.video);
      else if (isVideoRequired && formData.existingVideoUrl) {
        formDataToSend.append('keepExistingVideo', 'true');
      }
      
      const response = await fetch(`/api/portfolio/items/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });
      
      if (!response.ok) throw new Error('Failed to update portfolio item');
      
      toast.success('Portfolio item updated');
      router.push('/admin/portfolio');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update portfolio item');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7784e4]"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center text-[#b8c5ff] hover:text-white transition-colors"
      >
        <FiArrowLeft className="mr-2" /> Back to Portfolio
      </button>

      <div className="bg-[#0a0613] bg-opacity-50 border border-[#1a1a2e] rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Edit Portfolio Item</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0a0613] border border-[#1a1a2e] rounded-lg text-white focus:ring-2 focus:ring-[#7784e4] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Description <span className="text-red-500">*</span>
              <span className="text-xs text-[#b8c5ff] ml-2">
                ({formData.description.length}/60 characters)
              </span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              maxLength={60}
              className="w-full px-4 py-2 bg-[#0a0613] border border-[#1a1a2e] rounded-lg text-white focus:ring-2 focus:ring-[#7784e4] focus:border-transparent"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Technologies
              <span className="text-xs text-[#b8c5ff] ml-2">(comma separated)</span>
            </label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0a0613] border border-[#1a1a2e] rounded-lg text-white focus:ring-2 focus:ring-[#7784e4] focus:border-transparent"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          {!isVideoRequired && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Thumbnail Image <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex items-center">
                <label className="cursor-pointer bg-[#1a1a2e] hover:bg-[#24243d] text-white px-4 py-2 rounded-lg border border-[#1a1a2e] hover:border-[#7784e4] transition-colors">
                  <FiUpload className="inline mr-2" />
                  {thumbnailPreview ? 'Change Thumbnail' : 'Upload Thumbnail'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                </label>
                {thumbnailPreview && (
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="ml-2 p-2 text-red-400 hover:text-red-500"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>
              {thumbnailPreview && (
                <div className="mt-2">
                  <Image
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    width={128}
                    height={128}
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          )}

          {isVideoRequired && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Video File <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex items-center">
                <label className="cursor-pointer bg-[#1a1a2e] hover:bg-[#24243d] text-white px-4 py-2 rounded-lg border border-[#1a1a2e] hover:border-[#7784e4] transition-colors">
                  <FiVideo className="inline mr-2" />
                  {videoPreview ? 'Change Video' : 'Upload Video'}
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                  />
                </label>
                {videoPreview && (
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="ml-2 p-2 text-red-400 hover:text-red-500"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>
              {videoPreview && (
                <div className="mt-2">
                  <video
                    src={videoPreview}
                    className="h-48 w-full object-contain rounded-lg bg-black"
                    controls
                  />
                </div>
              )}
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1a1a2e] hover:bg-[#24243d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7784e4] transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Updating...' : 'Update Portfolio Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

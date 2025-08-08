'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
};

const SERVICES = [
  { id: 'video-editing', label: 'Video Editing' },
  { id: 'graphics-design', label: 'Graphics Design' },
  { id: '3d-animation', label: '3D Animation' },
  { id: 'website-development', label: 'Website Development' },
] as const;

export default function AddPortfolioItem() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'service' | 'details'>('service');
  const [formData, setFormData] = useState<FormData>({
    service: 'video-editing',
    title: '',
    description: '',
    technologies: '',
    thumbnail: null,
    video: null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleServiceSelect = (service: ServiceType) => {
    setFormData(prev => ({ ...prev, service }));
    setStep('details');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Enforce max length for description
    if (name === 'description' && value.length > 60) {
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, thumbnail: file }));
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, video: file }));
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const removeThumbnail = () => {
    setFormData(prev => ({ ...prev, thumbnail: null }));
    setThumbnailPreview(null);
  };

  const removeVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setFormData(prev => ({ ...prev, video: null }));
    setVideoPreview(null);
  };

  const isVideoRequired = ['video-editing', '3d-animation'].includes(formData.service);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!isVideoRequired && !formData.thumbnail) {
      toast.error('Please upload a thumbnail');
      return;
    }
    
    if (isVideoRequired && !formData.video) {
      toast.error('Please upload a video');
      return;
    }
    
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    // Technologies are now optional

    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Add all fields
      formDataToSend.append('service', formData.service);
      
      formDataToSend.append('title', formData.title);
      
      formDataToSend.append('description', formData.description);
      
      formDataToSend.append('technologies', formData.technologies);
      
      // Handle file uploads based on service type
      if (isVideoRequired) {
        // For video services (video-editing, 3d-animation)
        if (formData.video) {
          formDataToSend.append('file', formData.video);
          
          // For video services, we'll generate the thumbnail from the video
          // But still allow a custom thumbnail if provided
          if (formData.thumbnail) {
            formDataToSend.append('thumbnail', formData.thumbnail);
          }
        } else {
          throw new Error('Video is required for this service');
        }
      } else {
        // For non-video services (website-development, graphics-design)
        // Use the thumbnail as the main file
        if (formData.thumbnail) {
          formDataToSend.append('file', formData.thumbnail);
        } else {
          throw new Error('Please upload an image');
        }
      }
      
      const res = await fetch('/api/portfolio/items', {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header, let the browser set it with the correct boundary
      });
      
      try {
        const responseData = await res.json();
        
        if (!res.ok) {
          throw new Error(responseData.message || `Failed to add portfolio item: ${res.status} ${res.statusText}`);
        }
        
        // Show success message and refresh the portfolio list
        toast.success('Portfolio item added successfully');
        router.push('/admin/portfolio');
        router.refresh(); // Refresh the page to show the new item
        return responseData;
      } catch (jsonError) {
        const text = await res.text();
        throw new Error(`Invalid response from server: ${text}`);
      }
      
      toast.success('Portfolio item added successfully');
      router.push('/admin/portfolio');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add portfolio item');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const goBack = () => {
    if (step === 'details') {
      setStep('service');
    } else {
      router.push('/admin/portfolio');
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={goBack}
        className="flex items-center text-[#b8c5ff] hover:text-white transition-colors"
      >
        <FiArrowLeft className="mr-2" /> {step === 'service' ? 'Back to Portfolio' : 'Back to Services'}
      </button>

      <div className="bg-[#0a0613] bg-opacity-50 border border-[#1a1a2e] rounded-xl p-6">
        {step === 'service' ? (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Select a Service</h1>
              <p className="text-[#b8c5ff]">Choose the service this portfolio item belongs to</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleServiceSelect(service.id as ServiceType)}
                  className="flex flex-col items-center justify-center p-6 border-2 border-[#1a1a2e] rounded-xl hover:border-[#7784e4] transition-colors text-center h-40"
                >
                  <div className="text-2xl mb-2">
                    {service.id === 'video-editing' && <FiVideo />}
                    {service.id === 'graphics-design' && <FiImage />}
                    {service.id === '3d-animation' && <FiVideo />}
                    {service.id === 'website-development' && <FiImage />}
                  </div>
                  <h3 className="font-medium text-white">{service.label}</h3>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-white mb-2">
              Add New {SERVICES.find(s => s.id === formData.service)?.label} Portfolio Item
            </h1>
            <p className="text-[#b8c5ff] mb-6">
              Fill in the details for your portfolio item
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Media Uploads */}
                <div className="space-y-6">
                  {/* Thumbnail Upload - Only show for non-video services */}
                  {!isVideoRequired && (
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Thumbnail <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg border-[#1a1a2e]">
                        <div className="space-y-1 text-center">
                          {thumbnailPreview ? (
                            <div className="relative">
                              <Image
                                src={thumbnailPreview}
                                alt="Thumbnail preview"
                                width={200}
                                height={100}
                                className="max-h-48 mx-auto rounded"
                              />
                              <button
                                type="button"
                                onClick={removeThumbnail}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <FiX className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <FiImage className="mx-auto h-12 w-12 text-[#b8c5ff]" />
                              <div className="flex text-sm text-[#b8c5ff] justify-center">
                                <label className="relative cursor-pointer rounded-md font-medium text-[#7784e4] hover:text-[#5f6bc9]">
                                  <span>Upload a thumbnail</span>
                                  <input
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleThumbnailChange}
                                    required={!isVideoRequired}
                                  />
                                </label>
                              </div>
                              <p className="text-xs text-[#b8c5ff]/70">
                                PNG, JPG up to 5MB
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Video Upload (conditionally shown) */}
                  {isVideoRequired && (
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Video <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg border-[#1a1a2e]">
                        <div className="space-y-1 text-center">
                          {videoPreview ? (
                            <div className="relative">
                              <video src={videoPreview} controls className="max-h-48 mx-auto rounded" />
                              <button
                                type="button"
                                onClick={removeVideo}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <FiX className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <FiVideo className="mx-auto h-12 w-12 text-[#b8c5ff]" />
                              <div className="flex text-sm text-[#b8c5ff] justify-center">
                                <label className="relative cursor-pointer rounded-md font-medium text-[#7784e4] hover:text-[#5f6bc9]">
                                  <span>Upload a video</span>
                                  <input
                                    type="file"
                                    className="sr-only"
                                    accept="video/*"
                                    onChange={handleVideoChange}
                                  />
                                </label>
                              </div>
                              <p className="text-xs text-[#b8c5ff]/70">
                                MP4, WebM up to 50MB
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Form Fields */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#0a0613] border border-[#1a1a2e] rounded-lg text-white focus:ring-2 focus:ring-[#7784e4] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
                      Description <span className="text-red-500">*</span>
                      <span className="text-xs text-[#b8c5ff]/70 ml-2">
                        {formData.description.length}/60 characters
                      </span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      maxLength={60}
                      rows={3}
                      className="w-full px-4 py-2 bg-[#0a0613] border border-[#1a1a2e] rounded-lg text-white focus:ring-2 focus:ring-[#7784e4] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="technologies" className="block text-sm font-medium text-white mb-1">
                      Technologies
                      <span className="text-xs text-[#b8c5ff]/70 ml-2">
                        Comma separated (e.g., React, Node.js, Photoshop) - Optional
                      </span>
                    </label>
                    <input
                      type="text"
                      id="technologies"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleInputChange}
                      placeholder="React, Node.js, Photoshop (optional)"
                      className="w-full px-4 py-2 bg-[#0a0613] border border-[#1a1a2e] rounded-lg text-white focus:ring-2 focus:ring-[#7784e4] focus:border-transparent"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1a1a2e] hover:bg-[#24243d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7784e4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Adding...' : 'Add to Portfolio'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock service data - in a real app, this would come from your API or context
const services = {
  'video-editing': {
    name: 'Video Editing',
    type: 'video',
  },
  'graphics-design': {
    name: 'Graphics Design',
    type: 'image',
  },
  '3d-animation': {
    name: '3D Animation',
    type: 'video',
  },
  'website-development': {
    name: 'Website Development',
    type: 'image',
  },
};

// Define the component as async and use React.use() to unwrap params
export default function AddPortfolioItem({ params }: { params: Promise<{ service: string }> }) {
  const { service: serviceSlug } = React.use(params);
  
  const [serviceData, setServiceData] = useState<{name: string; type: string} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    file: null as File | null,
    thumbnail: null as File | null,
  });
  
  const router = useRouter();
  
  useEffect(() => {
    // Access the unwrapped serviceSlug
    const service = services[serviceSlug as keyof typeof services];
    setServiceData(service || null);
  }, [serviceSlug]);

  if (!serviceData) {
    return <div>Loading service information...</div>;
  }

  const service = serviceData;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const maxSizeMB = 10; // 10MB max file size
      const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
      
      if (file.size > maxSizeBytes) {
        setError(`File size too large. Maximum allowed size is ${maxSizeMB}MB.`);
        e.target.value = ''; // Clear the file input
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('service', serviceSlug);
      formDataToSend.append('projectUrl', formData.url || '');
      
      if (!formData.file) {
        throw new Error('Please select a file to upload');
      }
      
      formDataToSend.append('file', formData.file);
      
      if (formData.thumbnail) {
        formDataToSend.append('thumbnail', formData.thumbnail);
      }
      
      const response = await fetch('/api/portfolio/items', {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header, let the browser set it with the correct boundary
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || result.error || `Server responded with status ${response.status}`);
      }

      // Show success message and redirect
      alert('Portfolio item saved successfully!');
      router.push(`/admin/services/${serviceSlug}`);
      router.refresh();
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : typeof error === 'string' 
          ? error 
          : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/admin/services/${serviceSlug}`);
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0613] via-[#0c0c7a]/10 to-[#0a0613] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading service information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0613] via-[#0c0c7a]/10 to-[#0a0613] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Add New {service.name} Portfolio Item
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Fill in the details below to add a new item to your {service.name.toLowerCase()} portfolio.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-300">Error</h3>
                <div className="mt-2 text-sm text-red-200">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-gray-800/50">
          <form onSubmit={handleSubmit} className="p-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Portfolio Item Details</h2>
              <p className="text-gray-400 mb-6">
                Provide the details for your new portfolio item.
              </p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter project title"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="A brief description of the project"
                    required
                  />
                </div>

                <div className="space-y-6">
                  {service.type === 'video' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Video File *
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-400">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file"
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                required
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-400">MP4, WebM up to 50MB</p>
                          {formData.file && (
                            <p className="text-sm text-green-400 mt-2">
                              {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(1)} MB)
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Image File *
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-400">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                          {formData.file && (
                            <p className="text-sm text-green-400 mt-2">
                              {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(1)} MB)
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Thumbnail (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex text-sm text-gray-400">
                        <label
                          htmlFor="thumbnail-upload"
                          className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a thumbnail</span>
                          <input
                            id="thumbnail-upload"
                            name="thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                      {formData.thumbnail && (
                        <p className="text-sm text-green-400 mt-2">
                          {formData.thumbnail.name} ({(formData.thumbnail.size / 1024 / 1024).toFixed(1)} MB)
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Optional - A thumbnail will be generated from the {service.type} if not provided
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-300 mb-2">
                    Project URL (Optional)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 sm:text-sm">https://</span>
                    </div>
                    <input
                      type="url"
                      name="projectUrl"
                      id="projectUrl"
                      value={formData.url}
                      onChange={handleInputChange}
                      className="block w-full pl-16 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="example.com"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    Optional link to the live project
                  </p>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Project'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

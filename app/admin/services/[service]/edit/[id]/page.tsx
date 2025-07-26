'use client';

import { useState, useEffect } from 'react';
import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

type PortfolioItem = {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  thumbnailUrl?: string;
  projectUrl?: string;
  fileType: 'image' | 'video';
};

// Define the type for the params
interface EditPortfolioItemParams {
  service: string;
  id: string;
}

// Create a wrapper component to handle the async params
function EditPortfolioItemContent({ params }: { params: { service: string; id: string } }) {
  const router = useRouter();
  const { service, id } = params;
  
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    projectUrl: string;
    file: File | null;
    thumbnail: File | null;
    removeThumbnail: boolean;
  }>({
    title: '',
    description: '',
    projectUrl: '',
    file: null,
    thumbnail: null,
    removeThumbnail: false,
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  // Fetch portfolio item data
  useEffect(() => {
    const fetchPortfolioItem = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/portfolio/items/${id}`);
        if (!response.ok) throw new Error('Failed to fetch portfolio item');
        
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        
        const item = data.data;
        setFormData({
          title: item.title,
          description: item.description,
          projectUrl: item.projectUrl || '',
          file: null,
          thumbnail: null,
          removeThumbnail: false,
        });
        
        setPreviewUrl(item.fileUrl);
        if (item.thumbnailUrl) {
          setThumbnailPreview(item.thumbnailUrl);
        }
      } catch (error) {
        console.error('Error fetching portfolio item:', error);
        toast.error('Failed to load portfolio item');
        router.push(`/admin/services/${service}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPortfolioItem();
    }
  }, [id, router, service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file,
      }));

      // Create preview URL
      const fileUrl = URL.createObjectURL(file);
      if (name === 'file') {
        setPreviewUrl(fileUrl);
      } else if (name === 'thumbnail') {
        setThumbnailPreview(fileUrl);
        setFormData(prev => ({
          ...prev,
          removeThumbnail: false,
        }));
      }
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnailPreview('');
    setFormData(prev => ({
      ...prev,
      thumbnail: null,
      removeThumbnail: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (formData.projectUrl) {
        formDataToSend.append('projectUrl', formData.projectUrl);
      }
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }
      if (formData.thumbnail) {
        formDataToSend.append('thumbnail', formData.thumbnail);
      }
      if (formData.removeThumbnail) {
        formDataToSend.append('removeThumbnail', 'true');
      }

      const response = await fetch(`/api/portfolio/items/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update portfolio item');
      }

      toast.success('Portfolio item updated successfully');
      router.push(`/admin/services/${service}`);
    } catch (error) {
      console.error('Error updating portfolio item:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update portfolio item');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Portfolio Item</h1>
        <Link
          href={`/admin/services/${service}`}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Back to Portfolio
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700">
                  Project URL (optional)
                </label>
                <input
                  type="url"
                  name="projectUrl"
                  id="projectUrl"
                  value={formData.projectUrl}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Current File
                </label>
                <div className="mt-1 flex items-center">
                  {previewUrl && (
                    <div className="mt-2">
                      {previewUrl.includes('image') ? (
                        <img
                          src={previewUrl}
                          alt="Current file preview"
                          className="h-32 w-auto object-cover rounded"
                        />
                      ) : (
                        <video
                          src={previewUrl}
                          controls
                          className="h-32 w-auto rounded"
                        />
                      )}
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Upload a new file to replace the current one (optional)
                </p>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Thumbnail
                </label>
                {thumbnailPreview ? (
                  <div className="mt-2">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="h-32 w-auto object-cover rounded"
                    />
                    <div className="mt-2 flex space-x-2">
                      <button
                        type="button"
                        onClick={handleRemoveThumbnail}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Remove Thumbnail
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="thumbnail"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="thumbnail"
                            name="thumbnail"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Updating...' : 'Update Portfolio Item'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function EditPortfolioItem() {
  const router = useRouter();
  
  // Get params using React.use() for Next.js 14+
  const params = useParams();
  
  // Use React.use to unwrap the params
  const unwrappedParams = React.use<{ service: string; id: string }>(
    Promise.resolve({
      service: Array.isArray(params?.service) ? params.service[0] : params?.service || '',
      id: Array.isArray(params?.id) ? params.id[0] : params?.id || ''
    })
  );
  
  // Add null checks for params and its properties
  if (!unwrappedParams.service || !unwrappedParams.id) {
    router.push('/admin/services');
    return null;
  }
  
  return <EditPortfolioItemContent params={unwrappedParams} />;
  
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    projectUrl: string;
    file: File | null;
    thumbnail: File | null;
    removeThumbnail: boolean;
  }>({
    title: '',
    description: '',
    projectUrl: '',
    file: null,
    thumbnail: null,
    removeThumbnail: false,
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  // Fetch portfolio item data
  useEffect(() => {
    const fetchPortfolioItem = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/portfolio/items/${id}`);
        if (!response.ok) throw new Error('Failed to fetch portfolio item');
        
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        
        const item = data.data;
        setFormData({
          title: item.title,
          description: item.description,
          projectUrl: item.projectUrl || '',
          file: null,
          thumbnail: null,
          removeThumbnail: false,
        });
        
        setPreviewUrl(item.fileUrl);
        if (item.thumbnailUrl) {
          setThumbnailPreview(item.thumbnailUrl);
        }
      } catch (error) {
        console.error('Error fetching portfolio item:', error);
        toast.error('Failed to load portfolio item');
        router.push(`/admin/services/${service}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPortfolioItem();
    }
  }, [id, router, service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file,
      }));

      // Create preview URL
      const fileUrl = URL.createObjectURL(file);
      if (name === 'file') {
        setPreviewUrl(fileUrl);
      } else if (name === 'thumbnail') {
        setThumbnailPreview(fileUrl);
        setFormData(prev => ({
          ...prev,
          removeThumbnail: false,
        }));
      }
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnailPreview('');
    setFormData(prev => ({
      ...prev,
      thumbnail: null,
      removeThumbnail: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (formData.projectUrl) {
        formDataToSend.append('projectUrl', formData.projectUrl);
      }
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }
      if (formData.thumbnail) {
        formDataToSend.append('thumbnail', formData.thumbnail);
      }
      if (formData.removeThumbnail) {
        formDataToSend.append('removeThumbnail', 'true');
      }

      const response = await fetch(`/api/portfolio/items/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update portfolio item');
      }

      toast.success('Portfolio item updated successfully');
      router.push(`/admin/services/${service}`);
    } catch (error) {
      console.error('Error updating portfolio item:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update portfolio item');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Portfolio Item</h1>
        <Link
          href={`/admin/services/${service}`}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Back to Portfolio
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700">
                  Project URL (optional)
                </label>
                <input
                  type="url"
                  name="projectUrl"
                  id="projectUrl"
                  value={formData.projectUrl}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Current File
                </label>
                <div className="mt-1 flex items-center">
                  {previewUrl && (
                    <div className="mt-2">
                      {previewUrl.includes('image') ? (
                        <img
                          src={previewUrl}
                          alt="Current file preview"
                          className="h-32 w-auto object-cover rounded"
                        />
                      ) : (
                        <video
                          src={previewUrl}
                          controls
                          className="h-32 w-auto rounded"
                        />
                      )}
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Upload a new file to replace the current one (optional)
                </p>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Thumbnail
                </label>
                {thumbnailPreview ? (
                  <div className="mt-2">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="h-32 w-auto object-cover rounded"
                    />
                    <div className="mt-2 flex space-x-2">
                      <button
                        type="button"
                        onClick={handleRemoveThumbnail}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Remove Thumbnail
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="thumbnail"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="thumbnail"
                            name="thumbnail"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Updating...' : 'Update Portfolio Item'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import dbConnect from '@/lib/db';
import Portfolio from '@/models/Portfolio';

// Service configuration
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

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'image' | 'video';
  thumbnailUrl?: string;
  projectUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Fixed PageProps type for Next.js 15
type PageProps = {
  params: Promise<{ service: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ServicePortfolio({ params }: PageProps) {
  // Await the params Promise
  const { service } = use(params);
  const serviceConfig = services[service as keyof typeof services];

  if (!serviceConfig) {
    notFound();
  }

  // Return the client component with the resolved service
  return <ServicePortfolioClient service={service} serviceConfig={serviceConfig} />;
}

// Separate client component for the interactive parts
function ServicePortfolioClient({ 
  service, 
  serviceConfig 
}: { 
  service: string; 
  serviceConfig: { name: string; type: string } 
}) {
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch portfolio items
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/portfolio/items?service=${service}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio items: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('Error fetching portfolio items:', errorMessage);
        setError(errorMessage);
        toast.error('Failed to load portfolio items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [service]);

  const handleDelete = (id: string) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await fetch(`/api/portfolio/items/${id}`, {
                method: 'DELETE',
              });
              
              if (!response.ok) throw new Error('Failed to delete item');
              
              // Remove the item from the local state
              setItems(prevItems => prevItems.filter(item => item._id !== id));
              toast.success('Portfolio item deleted successfully');
            } catch (error) {
              console.error('Error deleting portfolio item:', error);
              toast.error('Failed to delete portfolio item');
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{serviceConfig.name} Portfolio</h1>
          <p className="text-[#b8c5ff]">
            Manage your {serviceConfig.name.toLowerCase()} portfolio items
          </p>
        </div>
        <Link
          href={`/admin/services/${service}/add`}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-[#1a1a2e] rounded-lg text-sm font-medium text-white bg-[#1a1a2e] hover:bg-[#24243d] transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Item
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7784e4]"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No portfolio items</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new {serviceConfig.name.toLowerCase()} item.
          </p>
          <div className="mt-6">
            <Link
              href={`/admin/services/${service}/add`}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              New Item
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item._id} className="rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <Link href={`#`} className="block p-4 hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {item.fileType === 'video' ? (
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-sm text-gray-500 truncate">{item.description}</p>
                  </div>
                </div>
              </Link>
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <div className="flex justify-end">
                  <button 
                    className="text-sm text-red-600 hover:text-red-900 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleDelete(item._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
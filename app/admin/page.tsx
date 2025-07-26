import Link from 'next/link';

const services = [
  {
    name: 'Video Editing',
    slug: 'video-editing',
    type: 'video',
    description: 'Manage video editing portfolio items',
  },
  {
    name: 'Graphics Design',
    slug: 'graphics-design',
    type: 'image',
    description: 'Manage graphics design portfolio items',
  },
  {
    name: '3D Motion',
    slug: '3d-animation',
    type: 'video',
    description: 'Manage 3D animation portfolio items',
  },
  {
    name: 'Website Development',
    slug: 'website-development',
    type: 'image',
    description: 'Manage website development portfolio items',
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Services Management</h2>
        <p className="text-gray-600">Select a service to manage its portfolio items</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link 
            key={service.slug}
            href={`/admin/services/${service.slug}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  {service.type === 'video' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">{service.name}</h3>
              </div>
              <p className="text-gray-600 text-sm">{service.description}</p>
              <div className="mt-4 text-sm text-indigo-600 font-medium">
                Manage portfolio →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

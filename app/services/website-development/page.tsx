import { Metadata } from 'next';
import ServiceHero from '@/components/ServiceHero';
import ServiceFeatures from '@/components/ServiceFeatures';
import ServiceDescription from '@/components/ServiceDescription';
import ServicePortfolio from '@/components/ServicePortfolio';
import { getPortfolioItems } from '@/lib/portfolio-utils';

// Define metadata for the page
export const metadata: Metadata = {
  title: 'Professional Website Development Services',
  description: 'Custom website development services including responsive design, e-commerce solutions, web applications, and SEO optimization',
};

// Features specific to Website Development service
const features = [
  {
    title: 'Responsive Design',
    description: 'Websites that look and function perfectly on all devices and screen sizes',
    icon: '📱',
  },
  {
    title: 'E-Commerce',
    description: 'Custom online stores with secure payment processing',
    icon: '🛒',
  },
  {
    title: 'Web Applications',
    description: 'Interactive and dynamic web applications tailored to your needs',
    icon: '💻',
  },
  {
    title: 'SEO Optimization',
    description: 'Websites built with search engine optimization in mind',
    icon: '🔍',
  },
  {
    title: 'Performance',
    description: 'Lightning-fast loading times and optimized performance',
    icon: '⚡',
  },
  {
    title: 'Security',
    description: 'Robust security measures to protect your website',
    icon: '🛡️',
  },
  {
    title: 'CMS Integration',
    description: 'Easy-to-use content management systems',
    icon: '📝',
  },
  {
    title: 'Maintenance',
    description: 'Ongoing support and maintenance services',
    icon: '🔧',
  },
];

// Service description content
const serviceDescription = {
  title: 'Custom Website Development',
  subtitle: 'Building digital experiences that drive results',
  description: [
    'Our website development services are designed to create powerful online presences that not only look stunning but also deliver exceptional user experiences. We combine cutting-edge technology with creative design to build websites that drive engagement and conversions.',
    'Whether you need a simple business website, a complex web application, or an e-commerce platform, our team has the expertise to bring your vision to life. We focus on performance, security, and scalability to ensure your website grows with your business.',
    'Our development process is collaborative and transparent, keeping you involved at every stage. From initial concept to final deployment, we ensure your website meets your business objectives and exceeds your expectations.'
  ],
  image: '/services/website-dev.jpg',
  features: [
    'Custom website design and development',
    'E-commerce solutions',
    'Content Management System (CMS) integration',
    'Responsive and mobile-first approach',
    'Search Engine Optimization (SEO)',
    'Website maintenance and support',
    'Performance optimization',
    'Security implementation',
  ],
};

export default async function WebsiteDevelopmentPage() {
  // Fetch portfolio items for Website Development
  const portfolioData = await getPortfolioItems('website-development');

  return (
    <main className="min-h-screen">
      <ServiceHero 
        title="Professional Website Development"
        description="From responsive business websites to complex web applications, we create custom solutions that drive results and help your business thrive in the digital world."
        videoSrc="/ServiceHero.mp4"
      />
      
      <ServiceDescription
        title="Comprehensive Web Development Solutions"
        description="From concept to deployment, we&apos;ve got you covered"
        content={
          <div className="space-y-6">
            <p>Our expert development team delivers professional web solutions tailored to your needs. Whether you&apos;re looking for a stunning business website, a powerful e-commerce platform, or a custom web application, we combine creativity with technical expertise to bring your vision to life.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Web Development Services</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Custom website design and development</li>
                  <li>E-commerce solutions and online stores</li>
                  <li>Web application development</li>
                  <li>Content Management System (CMS) integration</li>
                  <li>Website maintenance and support</li>
                  <li>Website redesign and optimization</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Our Approach</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Responsive and mobile-first design</li>
                  <li>Search Engine Optimization (SEO) friendly</li>
                  <li>Fast loading and high performance</li>
                  <li>Secure and scalable solutions</li>
                  <li>User experience focused</li>
                  <li>Ongoing support and maintenance</li>
                </ul>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <h3 className="text-xl font-semibold text-white">Technologies We Use</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">⚛️</div>
                    <p className="text-sm font-medium">React</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">🅰️</div>
                    <p className="text-sm font-medium">Angular</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">🌐</div>
                    <p className="text-sm font-medium">Next.js</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">💎</div>
                    <p className="text-sm font-medium">Node.js</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
      
      <ServicePortfolio 
        title="Our Web Development Work"
        description="Explore our portfolio of web development projects"
        portfolioItems={portfolioData}
        showViewMore={true}
      />
    </main>
  );
}

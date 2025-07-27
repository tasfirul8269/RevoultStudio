import { Metadata } from 'next';
import ServiceHero from '@/components/ServiceHero';
import ServiceFeatures from '@/components/ServiceFeatures';
import ServiceDescription from '@/components/ServiceDescription';
import ServicePortfolio from '@/components/ServicePortfolio';

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

// Portfolio items specific to Website Development
const portfolioItems = [
  {
    title: 'Business Website',
    description: 'A modern, responsive website for a local business',
    image: 'https://cdn.discordapp.com/attachments/1318942694890016828/1399051355628372058/photo-1461749280684-dccba630e2f6.png?ex=6887979c&is=6886461c&hm=f5d801bae03c2135740cea737e1d1da6629f99eff085edc4cc47f95cb3b9391a&',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Node.js']
  },
  {
    title: 'E-Commerce Store',
    description: 'A full-featured online store with product catalog and checkout',
    image: 'https://cdn.discordapp.com/attachments/1318942694890016828/1399051395826585793/photo-1467232004584-a241de8bcf5d.png?ex=688797a5&is=68864625&hm=f5a52d4e6f32d52ac581f168a13830e435a5b08d3f8c0deba315c835ebe5b20e&',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS3']
  },
  {
    title: 'Web Application',
    description: 'Custom web application with user authentication and dashboard',
    image: 'https://images.unsplash.com/photo-1558174685-430919a96c8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHdlYnNpdGV8ZW58MHx8MHx8fDA%3D',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB']
  },
  {
    title: 'Web Application',
    description: 'Custom web application with user authentication and dashboard',
    image: 'https://cdn.discordapp.com/attachments/1318942694890016828/1399051559702233088/photo-1519222970733-f546218fa6d7.png?ex=688797cc&is=6886464c&hm=b57c48874346157bdcce1011efb638d9eebc176d741e6e692b3a20d8d60dae91&',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB']
  },
  {
    title: 'Web Application',
    description: 'Custom web application with user authentication and dashboard',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-w=64&mark-align=top%2Cleft&mark-pad=50&h=630&w=1200&crop=faces%2Cedges&blend-w=1&blend=000000&blend-mode=normal&blend-alpha=10&auto=format&fit=crop&q=60&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzUzNjMzNzMwfA&ixlib=rb-4.1.0',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB']
  },
  {
    title: 'Web Application',
    description: 'Custom web application with user authentication and dashboard',
    image: 'https://cdn.discordapp.com/attachments/1318942694890016828/1399066568528498738/photo-1547658719-da2b51169166.png?ex=6887a5c7&is=68865447&hm=00e558ef090913d51bedaa498b27b5cc48f4f83f1a40791fc641cb005f600b74&',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB']
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

export default function WebsiteDevelopmentPage() {
  return (
    <main className="min-h-screen">
      <ServiceHero 
        title="Professional Website Development"
        description="From responsive business websites to complex web applications, we create custom solutions that drive results and help your business thrive in the digital world."
        videoSrc="/b2.mp4"
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
        title="Our Recent Web Projects"
        description="Explore our successful website development projects"
        portfolioItems={portfolioItems}
      />
    </main>
  );
}

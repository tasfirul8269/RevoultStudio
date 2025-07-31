import { Metadata } from 'next';
import ServiceHero from '@/components/ServiceHero';
import ServiceFeatures from '@/components/ServiceFeatures';
import ServiceDescription from '@/components/ServiceDescription';
import ServicePortfolio from '@/components/ServicePortfolio';
import { getPortfolioItems } from '@/lib/portfolio-utils';

// Define metadata for the page
export const metadata: Metadata = {
  title: 'Graphics Design Services',
  description: 'Professional graphics design services including logo design, branding, and digital graphics',
};

// Features specific to Graphics Design service
const features = [
  {
    title: 'Website Banners & Headers',
    description: 'Eye-catching banners and headers for your website',
    icon: '🌐',
  },
  {
    title: 'Logo Design',
    description: 'All types of unique and memorable logos',
    icon: '🎨',
  },
  {
    title: 'Infographics',
    description: 'Visual representations of information and data',
    icon: '📊',
  },
  {
    title: 'Flyers & Brochures',
    description: 'Professional print materials for marketing',
    icon: '📝',
  },
  {
    title: 'Youtube Banners',
    description: 'Custom YouTube channel art and banners',
    icon: '▶️',
  },
  {
    title: 'Posters & Covers',
    description: 'Stunning posters and cover designs',
    icon: '📰',
  },
  {
    title: 'Podcast Covers',
    description: 'Professional cover art for podcasts',
    icon: '🎙️',
  },
  {
    title: 'Facebook Covers',
    description: 'Custom Facebook cover photos',
    icon: '👍',
  },
  {
    title: 'Clothing Design',
    description: 'All types of clothing and merchandise designs',
    icon: '👕',
  },
  {
    title: 'Social Media Ads',
    description: 'Engaging ads for social platforms',
    icon: '📱',
  },
  {
    title: 'Photo Editing',
    description: 'Professional photo retouching and manipulation',
    icon: '🖼️',
  },
];

export default async function GraphicsDesignPage() {
  // Fetch portfolio items for Graphics Design
  const portfolioData = await getPortfolioItems('graphics-design');

  return (
    <>
      <ServiceHero 
        title="Professional Graphics Design"
        description="Comprehensive design solutions for all your branding and marketing needs. From logos and social media graphics to print materials and photo editing, we bring your vision to life with creativity and precision."
        videoSrc="/servicehero.mp4"
      />
      
      <ServiceDescription
        title="Comprehensive Design Solutions"
        description="From concept to final design, we&apos;ve got you covered"
        content={
          <div className="space-y-6">
            <p>Our expert design team delivers professional graphics solutions tailored to your needs. Whether you&apos;re looking for a stunning logo, engaging social media content, or professional print materials, we combine creativity with technical expertise to bring your vision to life.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Print & Digital Design</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Custom logo design and branding</li>
                  <li>Business cards, flyers, and brochures</li>
                  <li>Infographics and data visualization</li>
                  <li>Poster and cover designs</li>
                  <li>Clothing and merchandise design</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Digital & Social Media</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Website banners and headers</li>
                  <li>YouTube and social media banners</li>
                  <li>Podcast cover art</li>
                  <li>Social media ads and posts</li>
                  <li>Email marketing graphics</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Photo Editing Services</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Background removal</li>
                  <li>Clipping path and masking</li>
                  <li>Photo retouching</li>
                  <li>Color correction</li>
                  <li>Photo manipulation</li>
                </ul>
              </div>
            </div>
            
            <p className="mt-6">Using industry-standard tools like Adobe Photoshop, Illustrator, and InDesign, we ensure your designs are professional, on-brand, and effective. Our team works closely with you to understand your goals and deliver designs that exceed your expectations.</p>
          </div>
        }
        image="https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      
      <ServicePortfolio 
        title="Our Graphics Design Work"
        description="Explore our portfolio of stunning graphics design projects"
        portfolioItems={portfolioData}
      />
    </>
  );
}

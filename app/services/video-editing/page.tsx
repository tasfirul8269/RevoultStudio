import { Metadata } from 'next';
import ServiceHero from '@/components/ServiceHero';
import ServiceFeatures from '@/components/ServiceFeatures';
import ServiceDescription from '@/components/ServiceDescription';
import ServicePortfolio from '@/components/ServicePortfolio';
import { getPortfolioItems } from '@/lib/portfolio-utils';

// Define metadata for the page
export const metadata: Metadata = {
  title: 'Professional Video Editing Services',
  description: 'Comprehensive video editing services including motion graphics, animation, vlog editing, and more',
};

// Features specific to Video Editing service
const features = [
  {
    title: 'Motion Graphics',
    description: 'Dynamic and eye-catching motion graphics for all your digital needs',
    icon: '✨',
  },
  {
    title: 'Animation',
    description: 'Engaging animations that bring your ideas to life',
    icon: '🎬',
  },
  {
    title: 'Podcast Editing',
    description: 'Professional podcast production and post-production',
    icon: '🎙️',
  },
  {
    title: 'Vlog Editing',
    description: 'Professional editing for engaging vlog content',
    icon: '🎥',
  },
  {
    title: 'Intro/Outro Creation',
    description: 'Custom branded intros and outros for your videos',
    icon: '🎞️',
  },
  {
    title: 'Gaming Edits',
    description: 'Highlight reels and montages for gaming content',
    icon: '🎮',
  },
  {
    title: 'Documentary Editing',
    description: 'Professional editing for documentary storytelling',
    icon: '📽️',
  },
  {
    title: 'Website Animation',
    description: 'Engaging animations for web interfaces',
    icon: '🌐',
  },
  {
    title: 'Product Promos',
    description: 'Showcase your products with professional video',
    icon: '🛍️',
  },
  {
    title: 'Wedding Videos',
    description: 'Beautifully edited wedding memories',
    icon: '💍',
  },
  {
    title: 'Promotional Ads',
    description: 'High-converting video advertisements',
    icon: '📢',
  },
  {
    title: 'Short Form Content',
    description: 'TikTok, Reels, and Shorts editing',
    icon: '⏱️',
  },
  {
    title: 'Logo Animation',
    description: 'Bring your logo to life with animation',
    icon: '🎨',
  },
  {
    title: 'Green Screen',
    description: 'Professional green screen removal and keying',
    icon: '🟢',
  }
];



export default async function VideoEditingPage() {
  // Fetch portfolio items for video editing
  const portfolioData = await getPortfolioItems('video-editing');
  return (
    <>
      <ServiceHero 
        title="Professional Video Editing Services"
        description="Comprehensive video editing solutions for all your needs. From motion graphics and animations to vlog editing and promotional content, we deliver high-quality video production services tailored to your vision."
        videoSrc="/ServiceHero.mp4"
      />
      
      <ServiceDescription
        title="Complete Video Editing Solutions"
        description="Professional editing services for all types of video content"
        content={
          <div className="space-y-6">
            <p>Our expert team delivers professional video editing and motion graphics services tailored to your needs. Whether you&apos;re looking for engaging social media content, professional product promos, or cinematic wedding videos, we bring your vision to life with creativity and technical excellence.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Video Editing Services</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Professional podcast production & editing</li>
                  <li>Vlog editing for content creators</li>
                  <li>Cinematic wedding video editing</li>
                  <li>Documentary storytelling</li>
                  <li>Gaming highlight reels & montages</li>
                  <li>Social media short-form content (TikTok, Reels, Shorts)</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Motion Graphics & Effects</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>2D/3D animation</li>
                  <li>Custom intro/outro creation</li>
                  <li>Logo animation & branding</li>
                  <li>Website animations</li>
                  <li>Product promotional videos</li>
                  <li>Green screen & visual effects</li>
                </ul>
              </div>
            </div>
            
            <p className="mt-6">Using industry-standard software like Adobe After Effects, Premiere Pro, and Cinema 4D, we ensure your content stands out with professional quality and creative flair. Our team works closely with you to understand your vision and deliver results that exceed your expectations.</p>
          </div>
        }
        image="https://images.pexels.com/photos/1038277/pexels-photo-1038277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      
      <ServicePortfolio 
        title="Our Video Editing Work"
        description="Explore our portfolio of stunning video editing projects"
        portfolioItems={portfolioData}
        showViewMore={true}
      />
    </>
  );
}

import { Metadata } from 'next';
import ServiceHero from '@/components/ServiceHero';
import ServiceFeatures from '@/components/ServiceFeatures';
import ServiceDescription from '@/components/ServiceDescription';
import ServicePortfolio from '@/components/ServicePortfolio';
import { getPortfolioItems } from '@/lib/portfolio-utils';

// Define metadata for the page
export const metadata: Metadata = {
  title: '3D Animation Services',
  description: 'Professional 3D animation and modeling services for immersive visual experiences',
};

// Features specific to 3D Animation service
const features = [
  {
    title: '3D Animation',
    description: 'Professional 3D animations for various applications',
    icon: '🎬',
  },
  {
    title: '3D Design',
    description: 'Custom 3D models and designs',
    icon: '🎨',
  },
  {
    title: 'Character Modeling',
    description: 'Detailed 3D character creation',
    icon: '👤',
  },
  {
    title: 'Environment Modeling',
    description: 'Immersive 3D environments',
    icon: '🏞️',
  },
  {
    title: 'Character Animation',
    description: 'Lifelike character movements',
    icon: '🕺',
  },
  {
    title: '3D Promotional Videos',
    description: 'Engaging 3D video content',
    icon: '📹',
  },
];

export default async function ThreeDAnimationPage() {
  // Fetch portfolio items for 3D Animation
  const portfolioData = await getPortfolioItems('3d-animation');

  return (
    <>
      <ServiceHero 
        title="3D Animation & Design"
        description="Transform your ideas into stunning 3D reality. Our expert team delivers high-quality 3D animations, models, and visualizations for games, films, architecture, and more."
        videoSrc="/b2.mp4"
      />
      
      <ServiceDescription
        title="Expert 3D Animation Services"
        description="From concept to final render, we bring your vision to life"
        content={
          <div className="space-y-6">
            <p>Our 3D animation studio specializes in creating stunning visual content that captivates and engages audiences. With expertise in the latest 3D technologies and a passion for storytelling, we transform ideas into immersive experiences that leave lasting impressions.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">3D Animation Services</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Character animation and rigging</li>
                  <li>3D product visualization</li>
                  <li>Architectural visualization</li>
                  <li>Medical and scientific animation</li>
                  <li>Game asset creation</li>
                  <li>Virtual reality experiences</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Our Process</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Concept development and storyboarding</li>
                  <li>3D modeling and texturing</li>
                  <li>Rigging and animation</li>
                  <li>Lighting and rendering</li>
                  <li>Visual effects and compositing</li>
                  <li>Final delivery in your preferred format</li>
                </ul>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <h3 className="text-xl font-semibold text-white">Technologies We Use</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">💻</div>
                    <p className="text-sm font-medium">Blender</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">🎨</div>
                    <p className="text-sm font-medium">Maya</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">🔹</div>
                    <p className="text-sm font-medium">3ds Max</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">✨</div>
                    <p className="text-sm font-medium">Cinema 4D</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="mt-6">Whether you need a simple 3D model or a complete animated production, our team has the skills and experience to deliver exceptional results. We work closely with clients to understand their vision and bring it to life with creativity and technical excellence.</p>
          </div>
        }
        image="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1478&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        reversed
      />
      
      <ServicePortfolio 
        title="Our 3D Animation Work"
        description="Explore our portfolio of stunning 3D animation projects"
        portfolioItems={portfolioData}
      />
    </>
  );
}

import { Metadata } from 'next';
import ServiceHero from '@/components/ServiceHero';
import ServiceFeatures from '@/components/ServiceFeatures';
import ServiceDescription from '@/components/ServiceDescription';
import ServicePortfolio from '@/components/ServicePortfolio';

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

// 3D Animation portfolio items
const portfolioItems = [
  {
    title: "Architectural Visualization",
    description: "Realistic 3D models and renders for architectural projects.",
    tech: ["3ds Max", "V-Ray", "Photoshop"],
    image: "https://images.pexels.com/photos/873217/pexels-photo-873217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: "Character Animation",
    description: "Dynamic character animations for video games and films.",
    tech: ["Maya", "Blender", "Zbrush"],
    image: "https://images.pexels.com/photos/276792/pexels-photo-276792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: "Product Rendering",
    description: "High-quality product renders for marketing and advertising.",
    tech: ["Cinema 4D", "KeyShot", "Illustrator"],
    image: "https://images.pexels.com/photos/1212405/pexels-photo-1212405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: "3D Character Design",
    description: "Custom 3D character creation for games and animations.",
    tech: ["ZBrush", "Maya", "Substance Painter"],
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: "Medical Animation",
    description: "Accurate 3D medical visualizations for education and training.",
    tech: ["Maya", "Blender", "After Effects"],
    image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: "3D Environment Design",
    description: "Immersive 3D environments for games and virtual reality.",
    tech: ["Unreal Engine", "Blender", "Substance Painter"],
    image: "https://images.pexels.com/photos/176851/pexels-photo-176851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export default function ThreeDAnimationPage() {
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
        image="https://images.pexels.com/photos/239525/pexels-photo-239525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        reversed
      />
      
<ServicePortfolio 
        title="3D Animation Portfolio"
        description="Explore our collection of 3D animation and modeling projects"
        portfolioItems={portfolioItems}
      />
    </>
  );
}

import { Metadata } from 'next';
import ServiceHero from '@/components/ServiceHero';
import ServiceFeatures from '@/components/ServiceFeatures';
import ServiceDescription from '@/components/ServiceDescription';
import ServicePortfolio from '@/components/ServicePortfolio';

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

// Video Editing portfolio items
const portfolioItems = [
  {
    title: "Brand Animation",
    description: "Animated logo and brand identity package for a tech startup.",
    tech: ["After Effects", "Cinema 4D", "Illustrator"],
    image: "https://images.unsplash.com/photo-1574717024239-25253f4ef40a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlkZW8lMjBlZGl0aW5nfGVufDB8fDB8fHww"
  },
  {
    title: "Explainer Video",
    description: "Engaging explainer animation for a new financial app.",
    tech: ["After Effects", "Premiere Pro", "Illustrator"],
    image: "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmlkZW8lMjBlZGl0aW5nfGVufDB8fDB8fHww"
  },
  {
    title: "Social Media Animation",
    description: "Series of short animated clips for social media marketing campaign.",
    tech: ["After Effects", "Photoshop", "Audition"],
    image: "https://cdn.discordapp.com/attachments/1318942694890016828/1399048628047188139/photo-1490810194309-344b3661ba39.png?ex=68879511&is=68864391&hm=9bd5f737611d2246db091f9f5bb836b30a9ea03df96c7888c9ec39b9c40287a1&"
  },
  {
    title: "Corporate Video Production",
    description: "Professional corporate video highlighting company culture and values.",
    tech: ["Premiere Pro", "DaVinci Resolve", "Audition"],
    image: "https://cdn.discordapp.com/attachments/1318942694890016828/1399048693352759410/photo-1574717024757-c1ec4d86ae82.png?ex=68879521&is=688643a1&hm=287f52af63e2abf3ec14aa1770cfa842821947c095ede253f9de95b7a7af9e96&"
  },
  {
    title: "Product Demo Video",
    description: "Showcase video for a new product launch with dynamic visuals.",
    tech: ["After Effects", "Cinema 4D", "Premiere Pro"],
    image: "https://cdn.discordapp.com/attachments/1318942694890016828/1399048893424996462/photo-1607112812619-182cb1c7bb61.png?ex=68879551&is=688643d1&hm=f6aa10d4086481e6124c01c9ba87e06488ee0ab452dfcfb1a0f206290bdb9b5a&"
  },
  {
    title: "Event Highlights Reel",
    description: "Compelling highlights reel from a major industry conference.",
    tech: ["Premiere Pro", "After Effects", "Audition"],
    image: "https://cdn.discordapp.com/attachments/1318942694890016828/1399049037629493361/photo-1531178625044-cc2a0fb353a9.png?ex=68879573&is=688643f3&hm=73c19b9c5692fb996e0b019be214f1df3ca27d9151cd9d07818f9d8ac810d1e9&"
  }
];

export default function VideoEditingPage() {
  return (
    <>
      <ServiceHero 
        title="Professional Video Editing Services"
        description="Comprehensive video editing solutions for all your needs. From motion graphics and animations to vlog editing and promotional content, we deliver high-quality video production services tailored to your vision."
        videoSrc="/b2.mp4"
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
        title="Video Editing"
        description="Explore our collection of professional video editing projects"
        portfolioItems={portfolioItems}
      />
    </>
  );
}

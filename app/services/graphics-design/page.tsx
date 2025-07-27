import { Metadata } from 'next';
import ServiceHero from '@/components/ServiceHero';
import ServiceFeatures from '@/components/ServiceFeatures';
import ServiceDescription from '@/components/ServiceDescription';
import ServicePortfolio from '@/components/ServicePortfolio';

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

// Graphics Design portfolio items
const portfolioItems = [
  {
    title: "Corporate Branding",
    description: "Comprehensive branding project for a multinational corporation.",
    tech: ["Photoshop", "Illustrator", "InDesign"],
    image: "https://cdn.discordapp.com/attachments/1318942694890016828/1399049191183089874/premium_photo-1661382011487-cd3d6b1d9dff.png?ex=68879598&is=68864418&hm=87f7cd5a3de02ef808a3a78ea6068b81e04aa4ab96f5b8d65f3434bbbbc6f6ff&"
  },
  {
    title: "E-commerce Website Design",
    description: "User-centric website design for an online clothing store.",
    tech: ["Sketch", "Figma", "Adobe XD"],
    image: "https://cdn.discordapp.com/attachments/1318942694890016828/1399049239346020464/photo-1600869009498-8d429f88d4f5.png?ex=688795a3&is=68864423&hm=dc46c7a67a9ce4d22830c16be0c3c67fd45a36d21c3b31864233637d09da7693&"
  },
  {
    title: "Social Media Campaign",
    description: "Eye-catching graphics for a successful social media marketing campaign.",
    tech: ["Canva", "Photoshop", "Illustrator"],
    image: "https://cdn.discordapp.com/attachments/1318942694890016828/1399049292932448266/photo-1685661242103-888850e9b8b8.png?ex=688795b0&is=68864430&hm=da5c0b05d841673948546b72212bf09c054dd43d0b988418a26afaa72e2ce548&"
  },
  {
    title: "Product Packaging",
    description: "Innovative packaging design that stands out on the shelves.",
    tech: ["Illustrator", "InDesign", "Dimension"],
    image: "https://plus.unsplash.com/premium_photo-1716205759651-e357bb33a257?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "UI/UX Design",
    description: "Intuitive user interface design for web and mobile applications.",
    tech: ["Figma", "Sketch", "Adobe XD"],
    image: "https://cdn.discordapp.com/attachments/1318942694890016828/1399049654393503866/photo-1681164315734-355fb1131685.png?ex=68879606&is=68864486&hm=d4c9aeaeb250e0bdd4e206871aa6b4edcda5730594174146865d3aa6237ad83d&"
  },
  {
    title: "Print Advertisement",
    description: "Creative print ads for magazines and outdoor advertising.",
    tech: ["InDesign", "Photoshop", "Illustrator"],
    image: "https://cdn.discordapp.com/attachments/1318942694890016828/1399049680477880331/photo-1681164315747-ce3114015a55.png?ex=6887960c&is=6886448c&hm=6f190a1879c1409c6cef9d0019a6e86acba3c5738910b3b65cada2aff0771154&"
  }
];

export default function GraphicsDesignPage() {
  return (
    <>
      <ServiceHero 
        title="Professional Graphics Design"
        description="Comprehensive design solutions for all your branding and marketing needs. From logos and social media graphics to print materials and photo editing, we bring your vision to life with creativity and precision."
        videoSrc="/b2.mp4"
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
        title="Design Portfolio"
        description="Explore our collection of professional design work"
        portfolioItems={portfolioItems}
      />
    </>
  );
}

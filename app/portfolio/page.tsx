import { Metadata } from 'next';
import { getPortfolioItems } from '@/lib/portfolio-utils';
import ServicePortfolio from '@/components/ServicePortfolio';

export const metadata: Metadata = {
  title: 'Our Portfolio - Revoult Studio',
  description: 'Explore our diverse portfolio of web development, 3D animation, and design projects.',
};

export default async function PortfolioPage() {
  // Get all portfolio items across all services
  const allPortfolioItems = await getPortfolioItems();
  
  // Filter out any undefined or null items
  const validPortfolioItems = allPortfolioItems.filter(item => item !== null) as any[];

  return (
    <main className="min-h-screen bg-[#0a0613] text-white flex flex-col">
      <div className="flex-grow">
        <ServicePortfolio 
          title="Our" 
          description="Explore our collection of work across all services"
          portfolioItems={validPortfolioItems}
          showViewMore={false}
          showTitle={true}
        />
      </div>
    </main>
  );
}

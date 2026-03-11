import { Metadata } from 'next';
import { getPortfolioItems } from '@/lib/portfolio-utils';
import ServicePortfolio from '@/components/ServicePortfolio';

export const metadata: Metadata = {
  title: 'Our Portfolio - Revoult Studio',
  description: 'Explore our diverse portfolio of web development, 3D animation, and design projects.',
};

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  // Get portfolio items (filtered by service if provided)
  const allPortfolioItems = await getPortfolioItems(service);

  // Filter out any undefined or null items
  const validPortfolioItems = allPortfolioItems.filter(item => item !== null) as any[];

  // Dynamic title based on service
  const displayTitle = service
    ? `Our ${service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Projects`
    : "Our Projects";

  return (
    <main className="min-h-screen bg-[#0a0613] text-white flex flex-col">
      <div className="flex-grow">
        <ServicePortfolio
          title={displayTitle}
          description={service ? `Explore our collection of ${service.replace('-', ' ')} work` : "Explore our collection of work across all services"}
          portfolioItems={validPortfolioItems}
          showViewMore={false}
          showTitle={true}
        />
      </div>
    </main>
  );
}

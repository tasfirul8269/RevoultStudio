// Types
type ApiPortfolioItem = {
  _id: string;
  title: string;
  description: string;
  service: string;
  fileUrl: string;
  thumbnailUrl?: string;
  projectUrl?: string;
  technologies?: string[] | string;
  fileType?: string;
  publicId?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

type PortfolioItem = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  videoUrl?: string;
  projectUrl?: string;
};

// Function to fetch portfolio items from the API
export async function getPortfolioItems(service: string): Promise<PortfolioItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4000';
    const apiUrl = `${baseUrl}/api/portfolio/items?service=${encodeURIComponent(service)}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    try {
      const res = await fetch(apiUrl, {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to fetch ${service} portfolio items (${res.status} ${res.statusText}):`, errorText);
        return [];
      }
      
      const data = await res.json();
      
      if (!Array.isArray(data.data)) {
        console.error(`Invalid data format received for ${service} portfolio items:`, data);
        return [];
      }
      
      const items = data.data || [];
      
      // Transform the data to match the expected format
      return items.map((item: ApiPortfolioItem) => {
        // Ensure technologies is always an array of strings
        const technologies = (() => {
          if (Array.isArray(item.technologies)) {
            return item.technologies.filter((t): t is string => typeof t === 'string');
          } else if (typeof item.technologies === 'string') {
            return item.technologies
              .split(',')
              .map((t: string) => t.trim())
              .filter(Boolean);
          }
          return [];
        })();
        
        return {
          title: item.title || 'Untitled Project',
          description: item.description || 'No description available',
          tech: technologies,
          image: item.thumbnailUrl || item.fileUrl || '/placeholder-image.jpg',
          videoUrl: item.fileUrl,
          fileType: item.fileType,
          projectUrl: item.projectUrl,
          // Include the raw data for debugging
          _rawItem: item
        };
      });
      
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error) {
        console.error(`Error in fetch for ${service} portfolio items:`, {
          name: fetchError.name,
          message: fetchError.message,
          stack: fetchError.stack,
        });
      } else {
        console.error(`Unknown error in fetch for ${service} portfolio items:`, fetchError);
      }
      return [];
    }
  } catch (error) {
    console.error(`Unexpected error in getPortfolioItems for ${service}:`, error);
    return [];
  }
}

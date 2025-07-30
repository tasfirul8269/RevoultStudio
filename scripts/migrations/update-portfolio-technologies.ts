import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

// Configure environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env.local') });

// Import with dynamic import
const { default: dbConnect } = await import('@/lib/db');
const { default: Portfolio } = await import('@/models/Portfolio');

// Map of service types to default technologies
const DEFAULT_TECHNOLOGIES: Record<string, string[]> = {
  'video-editing': ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro'],
  'graphics-design': ['Adobe Photoshop', 'Illustrator', 'InDesign', 'Figma'],
  '3d-animation': ['Blender', 'Maya', 'Cinema 4D', '3ds Max'],
  'website-development': ['HTML/CSS', 'JavaScript', 'React', 'Next.js', 'Node.js']
};

async function updatePortfolioTechnologies() {
  try {
    await dbConnect();
    
    const items = await Portfolio.find({});
    
    let updatedCount = 0;
    
    for (const item of items) {
      // Skip if technologies already exist
      if (item.technologies && item.technologies.length > 0) {
        continue;
      }
      
      // Get default technologies for the service type
      const defaultTechs = DEFAULT_TECHNOLOGIES[item.service] || ['General'];
      
      // Update the item with default technologies
      item.technologies = defaultTechs;
      await item.save();
      
      updatedCount++;
    }
    
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Run the migration
updatePortfolioTechnologies();

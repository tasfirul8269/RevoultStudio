const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

// MongoDB connection URI from your environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'revoult-studio';

// Default technologies by service
const DEFAULT_TECHNOLOGIES = {
  'video-editing': ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve'],
  'graphics-design': ['Adobe Photoshop', 'Illustrator', 'Figma'],
  '3d-animation': ['Blender', 'Maya', 'Cinema 4D'],
  'website-development': ['HTML/CSS', 'JavaScript', 'React', 'Next.js']
};

async function updatePortfolios() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const portfolios = db.collection('portfolios');
    
    // Get all services we need to update
    const services = Object.keys(DEFAULT_TECHNOLOGIES);
    
    for (const service of services) {
      const result = await portfolios.updateMany(
        { 
          service: service,
          $or: [
            { technologies: { $exists: false } },
            { technologies: { $eq: [] } },
            { technologies: { $eq: null } }
          ]
        },
        { $set: { technologies: DEFAULT_TECHNOLOGIES[service] } }
      );
      
      console.log(`\nService: ${service}`);
      console.log(`Matched: ${result.matchedCount}`);
      console.log(`Modified: ${result.modifiedCount}`);
    }
    
    // Get summary
    const summary = await portfolios.aggregate([
      { $group: { _id: '$service', count: { $sum: 1 } } }
    ]).toArray();
    
    console.log('\nPortfolio items by service:');
    summary.forEach(item => {
      console.log(`${item._id}: ${item.count} items`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

// Run the update
updatePortfolios();

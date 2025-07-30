const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const dbName = 'RevoultStudio';
const collectionName = 'portfolios';

// Default technologies by service type
const DEFAULT_TECHNOLOGIES = {
  'video-editing': ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve'],
  'graphics-design': ['Adobe Photoshop', 'Illustrator', 'Figma'],
  '3d-animation': ['Blender', 'Maya', 'Cinema 4D'],
  'website-development': ['HTML/CSS', 'JavaScript', 'React', 'Next.js']
};

async function updatePortfolios() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
  });
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    // Get all services we need to update
    const services = Object.keys(DEFAULT_TECHNOLOGIES);
    
    console.log('\nUpdating portfolio items...');
    
    for (const service of services) {
      const result = await collection.updateMany(
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
    const summary = await collection.aggregate([
      { $group: { _id: '$service', count: { $sum: 1 } } }
    ]).toArray();
    
    console.log('\nPortfolio items by service:');
    summary.forEach(item => {
      console.log(`${item._id}: ${item.count} items`);
    });
    
    // Show a sample of updated items
    console.log('\nSample updated items:');
    const sampleItems = await collection.find({}).limit(2).toArray();
    sampleItems.forEach((item, index) => {
      console.log(`\nItem ${index + 1}:`);
      console.log(`- Title: ${item.title}`);
      console.log(`- Service: ${item.service}`);
      console.log(`- Technologies: ${item.technologies ? item.technologies.join(', ') : 'None'}`);
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

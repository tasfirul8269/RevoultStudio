require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const path = require('path');

// Database connection
const dbConnect = require(path.join(__dirname, '../lib/db'));
const Portfolio = require(path.join(__dirname, '../models/Portfolio'));

async function updatePortfolioTechnologies() {
  try {
    await dbConnect();
    console.log('Connected to database');

    // Update video editing portfolios
    await Portfolio.updateMany(
      { service: 'video-editing', technologies: { $exists: false } },
      { $set: { technologies: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"] } }
    );

    // Update graphics design portfolios
    await Portfolio.updateMany(
      { service: 'graphics-design', technologies: { $exists: false } },
      { $set: { technologies: ["Adobe Photoshop", "Illustrator", "Figma"] } }
    );

    // Update 3D animation portfolios
    await Portfolio.updateMany(
      { service: '3d-animation', technologies: { $exists: false } },
      { $set: { technologies: ["Blender", "Maya", "Cinema 4D"] } }
    );

    // Update website development portfolios
    await Portfolio.updateMany(
      { service: 'website-development', technologies: { $exists: false } },
      { $set: { technologies: ["HTML/CSS", "JavaScript", "React", "Next.js"] } }
    );

    console.log('Successfully updated portfolio items with default technologies');
    
    // Show summary
    const summary = await Portfolio.aggregate([
      { $group: { _id: '$service', count: { $sum: 1 } } }
    ]);
    
    console.log('\nPortfolio items by service:');
    summary.forEach(item => {
      console.log(`${item._id}: ${item.count} items`);
    });
    
  } catch (error) {
    console.error('Error updating portfolio items:', error);
  } finally {
    mongoose.connection.close();
  }
}

updatePortfolioTechnologies();

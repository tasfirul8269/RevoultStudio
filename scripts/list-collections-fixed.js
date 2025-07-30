const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const dbName = 'RevoultStudio'; // Using the exact database name we found

async function listCollections() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
  });
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    console.log(`\nDatabase: ${dbName}`);
    
    const collections = await db.listCollections().toArray();
    
    console.log('\nCollections:');
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`- ${collection.name} (${count} documents)`);
      
      // For the first document in each collection, show some sample data
      if (count > 0) {
        const sample = await db.collection(collection.name).findOne();
        console.log('  Sample fields:', Object.keys(sample).join(', '));
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

listCollections();

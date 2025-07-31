require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function listUsers() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    // List all collections to verify we're connected to the right database
    const collections = await db.listCollections().toArray();
    console.log('\n📋 Collections in database:');
    console.log(collections.map(c => c.name));
    
    // Check users collection specifically
    const usersCollection = db.collection('users');
    const adminUser = await usersCollection.findOne({ email: 'admin@example.com' });
    
    console.log('\n🔍 Admin user:');
    console.log(adminUser ? '✅ Found admin user' : '❌ Admin user not found');
    
    if (adminUser) {
      console.log('\n📝 User details:');
      console.log(JSON.stringify({
        _id: adminUser._id,
        email: adminUser.email,
        createdAt: adminUser.createdAt,
        hasPassword: !!adminUser.password,
        passwordLength: adminUser.password ? adminUser.password.length : 0
      }, null, 2));
    }
    
  } catch (err) {
    console.error('❌ Error listing users:', err);
  } finally {
    await client.close();
    process.exit(0);
  }
}

listUsers();

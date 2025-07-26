const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  // Connection URI - update this with your MongoDB connection string
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname';
  
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const usersCollection = db.collection('users');

    // Check if admin exists
    const existingAdmin = await usersCollection.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await usersCollection.insertOne({
      email: 'admin@example.com',
      password: hashedPassword,
      createdAt: new Date()
    });

    console.log('✅ Admin user created successfully');
    console.log('👉 Email: admin@example.com');
    console.log('👉 Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change this password after first login!');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

createAdmin();

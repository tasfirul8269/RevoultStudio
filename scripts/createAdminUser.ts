import dbConnect from '../lib/db';
import User from '../models/User';
import bcrypt from 'bcryptjs';

async function createAdminUser() {
  try {
    await dbConnect();

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      process.exit(0);
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = new User({
      email: 'admin@example.com',
      password: hashedPassword,
    });

    await adminUser.save();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    console.log('Attempting to connect to database...');
    await dbConnect();
    console.log('Database connected, fetching users...');
    
    const users = await User.find({}).select('-password').lean().exec();
    console.log(`Found ${users.length} users`);
    
    // Ensure we're returning proper JSON data
    const response = users.map(user => ({
      ...user,
      _id: user._id.toString(), // Convert ObjectId to string
      createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : null
    }));
    
    const headers = {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store'
    };
    
    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in GET /api/admin/list-users:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch users',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { createApiResponse, createApiError } from '@/lib/apiUtils';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    
    return createApiResponse(response);
  } catch (error) {
    console.error('Error in GET /api/admin/list-users:', error);
    return createApiError(
      'Failed to fetch users',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

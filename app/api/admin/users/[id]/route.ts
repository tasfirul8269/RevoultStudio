import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// GET: Get user by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const { id } = params;
    
    // Find the user
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT: Update user
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const { id } = params;
    const data = await request.json();
    
    // Check if the current user is an admin or the same user
    const currentUser = await User.findOne({ email: session.user?.email });
    const isAdmin = currentUser?.isAdmin;
    const isSameUser = currentUser?._id.toString() === id;
    
    // Only allow admins or the user themselves to update the password
    if (!isAdmin && !isSameUser) {
      return NextResponse.json(
        { success: false, message: 'You do not have permission to update this user' },
        { status: 403 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    
    // Only update email if it's provided and the user is an admin
    if (data.email && isAdmin) {
      updateData.email = data.email;
    }

    // Update password if provided
    if (data.password && data.password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(data.password, salt);
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE: Delete user
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const { id } = await params;
    
    // Prevent deleting your own account
    if (session.user?.email) {
      const currentUser = await User.findOne({ email: session.user.email });
      if (currentUser?._id.toString() === id) {
        return NextResponse.json(
          { success: false, message: 'You cannot delete your own account' },
          { status: 400 }
        );
      }
    }

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

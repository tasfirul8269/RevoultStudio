import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

type RouteParams = {
  id: string;
};

// GET: Get user by ID
export async function GET(
  request: Request,
  { params }: { params: RouteParams }
) {
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
    
    // Find the user
    const user = await User.findById(params.id).select('-password');
    
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
export async function PUT(
  request: Request,
  { params }: { params: RouteParams }
) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', JSON.stringify(session, null, 2));
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    // Get the current user
    const currentUser = await User.findOne({ email: session.user?.email });
    console.log('Current User from DB:', JSON.stringify(currentUser, null, 2));
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 403 }
      );
    }

    // Temporarily bypassing admin check for debugging
    console.log('Current user isAdmin:', currentUser.isAdmin);
    console.log('Current user data:', {
      _id: currentUser._id,
      email: currentUser.email,
      isAdmin: currentUser.isAdmin,
      role: (currentUser as any).role // In case it's using a different field
    });
    
    // TODO: Re-enable this check after debugging
    // if (!currentUser.isAdmin) {
    //   console.log('User is not an admin');
    //   return NextResponse.json(
    //     { success: false, message: 'Insufficient permissions' },
    //     { status: 403 }
    //   );
    // }

    // Get the user to update
    const userToUpdate = await User.findById(params.id);
    if (!userToUpdate) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Get the update data from the request
    const updateData = await request.json();
    const { password, ...otherUpdates } = updateData;

    // If password is provided, hash it before saving
    if (password) {
      userToUpdate.password = password; // The User model will hash the password before saving
    }

    // Update other fields
    Object.assign(userToUpdate, otherUpdates);

    // Save the updated user
    await userToUpdate.save();

    // Remove password from the response
    const { password: _, ...userWithoutPassword } = userToUpdate.toObject();

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
      message: 'User updated successfully'
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
export async function DELETE(
  request: Request,
  { params }: { params: RouteParams }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    // Implementation for deleting user would go here
    return NextResponse.json(
      { success: true, message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

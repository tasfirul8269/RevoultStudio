import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Portfolio from '@/models/Portfolio';
import { uploadFile, deleteFile } from '@/lib/fileUpload';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params Promise (Next.js 15 requirement)
    const { id } = await params;
    
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const projectUrl = formData.get('projectUrl') as string;
    const file = formData.get('file') as File | null;
    const thumbnail = formData.get('thumbnail') as File | null;
    const removeThumbnail = formData.get('removeThumbnail') === 'true';

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    // Find the existing portfolio item
    const existingItem = await Portfolio.findById(id);
    if (!existingItem) {
      return NextResponse.json(
        { success: false, message: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    // Handle file uploads if new files are provided
    let fileUrl = existingItem.fileUrl;
    let thumbnailUrl = existingItem.thumbnailUrl;

    if (file) {
      // Delete old file
      if (existingItem.publicId) {
        await deleteFile(existingItem.publicId, existingItem.fileType);
      }
      
      // Upload new file
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const fileType = existingItem.fileType;
      const uploadResult = await uploadFile(fileBuffer, existingItem.service, fileType);
      fileUrl = uploadResult.url;
    }

    if (thumbnail) {
      // Delete old thumbnail if exists
      if (existingItem.thumbnailPublicId) {
        await deleteFile(existingItem.thumbnailPublicId, 'image');
      }
      
      // Upload new thumbnail
      const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
      const uploadResult = await uploadFile(thumbnailBuffer, `${existingItem.service}/thumbnails`);
      thumbnailUrl = uploadResult.url;
    } else if (removeThumbnail) {
      // Remove thumbnail if requested
      if (existingItem.thumbnailPublicId) {
        await deleteFile(existingItem.thumbnailPublicId, 'image');
        thumbnailUrl = undefined;
      }
    }

    // Update the portfolio item
    const updatedItem = await Portfolio.findByIdAndUpdate(
      id,
      {
        title,
        description,
        fileUrl,
        thumbnailUrl,
        projectUrl: projectUrl || null,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params Promise (Next.js 15 requirement)
    const { id } = await params;
    
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    // Find the portfolio item
    const portfolioItem = await Portfolio.findById(id);
    if (!portfolioItem) {
      return NextResponse.json(
        { success: false, message: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    // Delete files from Cloudinary
    if (portfolioItem.publicId) {
      await deleteFile(portfolioItem.publicId, portfolioItem.fileType);
    }
    if (portfolioItem.thumbnailPublicId) {
      await deleteFile(portfolioItem.thumbnailPublicId, 'image');
    }

    // Delete from database
    await Portfolio.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Portfolio item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
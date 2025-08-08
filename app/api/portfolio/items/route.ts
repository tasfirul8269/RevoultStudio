import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Portfolio from '@/models/Portfolio';
import { v2 as cloudinary } from 'cloudinary';
import { Readable, Transform } from 'stream';

// Type for file upload progress event
type UploadProgressEvent = {
  type: 'progress';
  progress: number;
  file: 'main' | 'thumbnail';
} | {
  type: 'complete';
  fileUrl: string;
  thumbnailUrl: string;
} | {
  type: 'error';
  message: string;
};

// Helper function to handle file upload with progress
const uploadToCloudinary = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        resource_type: file.type.startsWith('video/') ? 'video' : 'image',
        folder: 'portfolio',
        chunk_size: 6 * 1024 * 1024, // 6MB chunks for better progress tracking
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }
        if (!result?.secure_url) {
          return reject(new Error('Failed to upload file'));
        }
        resolve(result.secure_url);
      }
    );
    
    // Create a readable stream from buffer
    const readable = new Readable();
    readable._read = () => {}; // _read is required but you can noop it
    readable.push(buffer);
    readable.push(null);
    
    // Track upload progress
    let uploadedBytes = 0;
    const totalBytes = buffer.length;
    
    const progressStream = new Transform({
      transform(chunk: Buffer, encoding: string, callback: () => void) {
        uploadedBytes += chunk.length;
        if (onProgress) {
          const progress = Math.round((uploadedBytes / totalBytes) * 100);
          onProgress(progress);
        }
        this.push(chunk);
        callback();
      }
    });
    
    // Pipe the file through progress tracking to Cloudinary
    readable.pipe(progressStream).pipe(uploadStream);
  });
};

export async function POST(request: Request) {
  // Check Cloudinary configuration
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { error: 'Cloudinary configuration is missing' },
      { status: 500 }
    );
  }

  // Configure Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const service = formData.get('service') as string;
    const projectUrl = formData.get('projectUrl') as string;
    const technologiesRaw = formData.get('technologies') as string | null;
    const file = formData.get('file') as File | null;
    const thumbnail = formData.get('thumbnail') as File | null;

    // Validate required fields
    if (!title || !description || !service || !file) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate service type
    const validServices = ['video-editing', 'graphics-design', '3d-animation', 'website-development'];
    if (!validServices.includes(service)) {
      return NextResponse.json(
        { success: false, message: 'Invalid service type' },
        { status: 400 }
      );
    }

    // Determine file type
    const fileType = service === 'video-editing' || service === '3d-animation' ? 'video' : 'image';

    // Upload files to Cloudinary
    let fileUploadResult = null;
    try {
      // Read file buffer
      const fileBuffer = await file.arrayBuffer().then(buf => Buffer.from(buf));
      // Upload to Cloudinary
      fileUploadResult = await uploadFile(fileBuffer, service, fileType);
    } catch (uploadError) {
      console.error('=== File upload failed ===');
      console.error('Error details:', {
        name: uploadError instanceof Error ? uploadError.name : 'UnknownError',
        message: uploadError instanceof Error ? uploadError.message : String(uploadError),
        stack: uploadError instanceof Error ? uploadError.stack : undefined
      });
      
      // If this is a known Cloudinary error, provide more context
      if (uploadError instanceof Error && 'http_code' in uploadError) {
        const cloudinaryError = uploadError as any;
        console.error('Cloudinary API Error:', {
          http_code: cloudinaryError.http_code,
          name: cloudinaryError.name,
          details: cloudinaryError.message
        });
      }
      
      throw new Error(`File upload failed: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`);
    }

    let thumbnailUploadResult = null;
    if (thumbnail) {
      try {
        const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
        thumbnailUploadResult = await uploadFile(thumbnailBuffer, `${service}/thumbnails`);
      } catch (uploadError) {
        console.error('Error uploading thumbnail to Cloudinary:', uploadError);
        // Continue without thumbnail if upload fails
      }
    }

    // Save to database
    await dbConnect();
    
    // Create portfolio item with the publicId from Cloudinary
    const portfolioItem = new Portfolio({
      title,
      description,
      service,
      fileUrl: fileUploadResult.url, // Using url from uploadFile result
      publicId: fileUploadResult.publicId, // Using publicId from uploadFile result
      fileType,
      projectUrl: projectUrl || undefined,
      technologies, // Add technologies array
      ...(thumbnailUploadResult && {
        thumbnailUrl: thumbnailUploadResult.url, // Using url for thumbnail
        thumbnailPublicId: thumbnailUploadResult.publicId // Using publicId for thumbnail
      })
    });

    await portfolioItem.save();

    return NextResponse.json(
      { 
        success: true, 
        data: portfolioItem,
        message: 'Portfolio item created successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Internal server error',
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // No authentication required for public access to portfolio items

    await dbConnect();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service');
    
    // Build query
    const query: any = {};
    if (service) {
      query.service = service;
    }
    
    // Get portfolio items with optional filtering
    const items = await Portfolio.find(query).sort({ createdAt: -1 }).lean();
    
    // Convert _id to string for serialization
    const serializedItems = items.map(item => ({
      ...item,
      _id: item._id.toString(),
      createdAt: item.createdAt?.toISOString(),
      updatedAt: item.updatedAt?.toISOString()
    }));

    return NextResponse.json({
      success: true,
      data: serializedItems,
    });
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

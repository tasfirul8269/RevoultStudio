import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    console.log('Received file:', {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified
    });

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log('File converted to buffer, size:', buffer.length);

    // Verify Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing Cloudinary configuration');
      throw new Error('Server configuration error');
    }

    // Upload to Cloudinary
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      try {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'test-uploads',
            resource_type: 'auto',
            chunk_size: 6 * 1024 * 1024, // 6MB chunks
          },
          (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(new Error(error.message || 'Upload failed'));
              return;
            }
            if (!result) {
              console.error('Cloudinary returned no result');
              reject(new Error('Upload failed: No result from Cloudinary'));
              return;
            }
            console.log('Cloudinary upload successful:', result.public_id);
            resolve(result);
          }
        );

        // Create a readable stream from buffer
        const readable = new Readable();
        readable._read = () => {}; // _read is required but you can noop it
        readable.push(buffer);
        readable.push(null);
        
        // Handle stream errors
        uploadStream.on('error', (error) => {
          console.error('Upload stream error:', error);
          reject(error);
        });
        
        readable.pipe(uploadStream);
      } catch (error) {
        console.error('Error during upload setup:', error);
        reject(error);
      }
    });

    console.log('File uploaded successfully:', {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes
    });

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      result: {
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        bytes: result.bytes
      }
    });

  } catch (error) {
    console.error('Upload test error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined;
    
    // Log detailed error for server-side debugging
    const errorDetails: Record<string, any> = {
      message: errorMessage,
      timestamp: new Date().toISOString()
    };

    if (process.env.NODE_ENV === 'development') {
      errorDetails.stack = errorStack;
      
      try {
        // Try to get file info if possible
        const formDataClone = await request.formData().catch(() => null);
        if (formDataClone) {
          const file = formDataClone.get('file') as File | null;
          if (file) {
            errorDetails.fileInfo = {
              name: file.name,
              type: file.type,
              size: file.size
            };
            return;
          }
        }
      } catch (e) {
        console.error('Error getting file info:', e);
      }
      
      errorDetails.fileInfo = 'No file info available';
    }

    console.error('Error details:', errorDetails);

    return NextResponse.json(
      {
        success: false,
        message: 'Upload failed',
        error: errorMessage,
        ...(process.env.NODE_ENV === 'development' && { stack: errorStack })
      },
      { status: 500 }
    );
  }
}

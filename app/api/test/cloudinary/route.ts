import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export async function GET() {
  try {
    // Test Cloudinary configuration by making a simple API call
    const result = await cloudinary.api.ping();
    
    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Cloudinary',
      cloudinaryStatus: result,
      config: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ? '*** Configured ***' : 'Missing',
        apiKey: process.env.CLOUDINARY_API_KEY ? '*** Configured ***' : 'Missing',
        apiSecret: process.env.CLOUDINARY_API_SECRET ? '*** Configured ***' : 'Missing'
      }
    });
  } catch (error) {
    console.error('Cloudinary test error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to connect to Cloudinary',
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined,
        config: {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME ? '*** Configured ***' : 'Missing',
          apiKey: process.env.CLOUDINARY_API_KEY ? '*** Configured ***' : 'Missing',
          apiSecret: process.env.CLOUDINARY_API_SECRET ? '*** Configured ***' : 'Missing'
        }
      },
      { status: 500 }
    );
  }
}

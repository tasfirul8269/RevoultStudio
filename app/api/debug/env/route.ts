import { NextResponse } from 'next/server';

export async function GET() {
  // Only expose non-sensitive information
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    isCloudinaryConfigured: !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET),
    isMongoDBConfigured: !!process.env.MONGODB_URI,
    // Don't expose actual values of sensitive environment variables
    cloudinaryConfigured: {
      hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
      hasApiKey: !!process.env.CLOUDINARY_API_KEY,
      hasApiSecret: !!process.env.CLOUDINARY_API_SECRET
    },
    mongoDBConfigured: {
      hasMongoURI: !!process.env.MONGODB_URI,
      mongoHost: process.env.MONGODB_URI ? new URL(process.env.MONGODB_URI).hostname : null
    },
    nextAuthConfigured: {
      hasSecret: !!process.env.NEXTAUTH_SECRET,
      hasUrl: !!process.env.NEXTAUTH_URL
    }
  });
}

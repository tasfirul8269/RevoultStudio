import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFile(
  fileBuffer: Buffer,
  folder: string,
  resourceType: 'image' | 'video' = 'image'
): Promise<{ url: string; publicId: string }> {

  // Verify Cloudinary configuration
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    const error = new Error('Cloudinary configuration is missing');
    console.error('Configuration error:', error);
    throw error;
  }

  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: `portfolio/${folder}`,
      resource_type: resourceType,
      timeout: 30000, // 30 seconds timeout
      chunk_size: 6000000, // 6MB chunks for larger files
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', {
            error: error.message,
            http_code: error.http_code,
            name: error.name,
            details: error
          });
          return reject(new Error(`Cloudinary upload failed: ${error.message}`));
        }
        
        if (!result) {
          const error = new Error('No result received from Cloudinary');
          console.error(error);
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    // Handle stream errors
    uploadStream.on('error', (error) => {
      console.error('Upload stream error:', error);
      reject(new Error(`Upload stream error: ${error.message}`));
    });

    // Create and pipe the readable stream
    try {
      const readableStream = new Readable();
      readableStream.push(fileBuffer);
      readableStream.push(null); // Signal end of data
      
      // Handle stream events for debugging
      readableStream.on('error', (error) => {
        console.error('Readable stream error:', error);
        reject(new Error(`Readable stream error: ${error.message}`));
      });
      
      readableStream.pipe(uploadStream);
    } catch (error) {
      console.error('Error creating readable stream:', error);
      reject(new Error(`Failed to create readable stream: ${error instanceof Error ? error.message : 'Unknown error'}`));
    }
  });
}

export async function deleteFile(publicId: string, resourceType: 'image' | 'video' = 'image') {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    // Don't throw error, as we might want to continue even if deletion fails
  }
}

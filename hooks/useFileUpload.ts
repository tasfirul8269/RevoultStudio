import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

type UploadResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = useCallback(
    async (file: File, endpoint: string, formData: Record<string, any> = {}): Promise<UploadResponse> => {
      setIsUploading(true);
      setProgress(0);

      const data = new FormData();
      data.append('file', file);

      // Append additional form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          data.append(key, value);
        }
      });

      try {
        const xhr = new XMLHttpRequest();
        
        const promise = new Promise<UploadResponse>((resolve, reject) => {
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const percentComplete = Math.round((event.loaded / event.total) * 100);
              setProgress(percentComplete);
            }
          });

          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                  resolve({ success: true, data: response.data });
                } else {
                  reject(new Error(response.message || 'Upload failed'));
                }
              } catch (error) {
                reject(new Error('Failed to parse server response'));
              }
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          });

          xhr.addEventListener('error', () => {
            reject(new Error('Network error during upload'));
          });

          xhr.addEventListener('abort', () => {
            reject(new Error('Upload was cancelled'));
          });
        });

        xhr.open('POST', endpoint, true);
        xhr.send(data);

        return await promise;
      } catch (error) {
        console.error('Upload error:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
      } finally {
        setIsUploading(false);
        setProgress(0);
      }
    },
    []
  );

  const cancelUpload = useCallback(() => {
    // This would be used to cancel the upload if needed
    // The actual implementation would depend on your upload method
    // For now, we'll just reset the state
    setIsUploading(false);
    setProgress(0);
  }, []);

  return {
    uploadFile,
    cancelUpload,
    isUploading,
    progress,
  };
}

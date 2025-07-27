import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import Image from 'next/image';

type FileType = 'image' | 'video';

interface FileInputProps {
  id: string;
  label: string;
  accept: string;
  fileType: FileType;
  value?: File | string | null;
  onChange: (file: File | null, previewUrl?: string) => void;
  maxSizeMB?: number;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function FileInput({
  id,
  label,
  accept,
  fileType,
  value,
  onChange,
  maxSizeMB = 10,
  className = '',
  required = false,
  disabled = false,
}: FileInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set initial preview if value is a URL
  useEffect(() => {
    if (typeof value === 'string') {
      setPreviewUrl(value);
    } else if (value === null) {
      setPreviewUrl(null);
    }
  }, [value]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      onChange(null);
      setPreviewUrl(null);
      setError(null);
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Validate file type
    if (!accept.split(',').some((type) => file.type.match(type.replace('*', '.*')))) {
      setError(`Invalid file type. Please upload a ${fileType} file.`);
      return;
    }

    setError(null);
    
    // Create preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    
    // Pass file and preview URL to parent
    onChange(file, preview);
  };

  const handleRemove = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setError(null);
    onChange(null);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
        {!previewUrl ? (
          <div className="space-y-1 text-center">
            <div className="flex justify-center">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor={id}
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id={id}
                  ref={fileInputRef}
                  name={id}
                  type="file"
                  className="sr-only"
                  accept={accept}
                  onChange={handleFileChange}
                  required={required}
                  disabled={disabled}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              {fileType === 'image' 
                ? 'PNG, JPG, GIF up to 10MB' 
                : 'MP4, WebM up to 100MB'}
            </p>
          </div>
        ) : (
          <div className="relative group">
            {fileType === 'image' ? (
              <div className="relative w-full h-64">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="rounded-md object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <video
                src={previewUrl}
                className="max-h-64 max-w-full rounded-md object-cover"
                controls={false}
                muted
                loop
                playsInline
              />
            )}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      
      {previewUrl && (
        <button
          type="button"
          onClick={handleRemove}
          className="mt-1 text-sm text-red-600 hover:text-red-500"
        >
          Remove file
        </button>
      )}
    </div>
  );
}

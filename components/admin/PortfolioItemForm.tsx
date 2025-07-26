'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Loader2, Save, X } from 'lucide-react';

import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import FileInput from '@/components/ui/FileInput';
import { useFileUpload } from '@/hooks/useFileUpload';

type FileInputValue = File | string | null;

type PortfolioItemFormData = {
  title: string;
  description: string;
  projectUrl: string;
  file: File | string;
  thumbnail?: File | string | null;
};

const portfolioItemSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().min(1, 'Description is required').max(500, 'Description is too long'),
  projectUrl: z.string().url('Please enter a valid URL').or(z.literal('')),
  file: z.union([z.instanceof(File), z.string()]).refine(
    (file) => !!file,
    'File is required'
  ),
  thumbnail: z.union([z.instanceof(File), z.string()]).nullable().optional(),
});

type PortfolioItemFormValues = z.infer<typeof portfolioItemSchema>;

interface PortfolioItemFormProps {
  service: string;
  initialData?: {
    id?: string;
    title: string;
    description: string;
    fileUrl: string;
    thumbnailUrl?: string;
    projectUrl?: string;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function PortfolioItemForm({
  service,
  initialData,
  onSuccess,
  onCancel,
}: PortfolioItemFormProps) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadFile, isUploading, progress } = useFileUpload();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PortfolioItemFormData>({
    resolver: zodResolver(portfolioItemSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      projectUrl: initialData?.projectUrl || '',
      file: initialData?.fileUrl || '',
      thumbnail: initialData?.thumbnailUrl || null,
    },
  });

  const fileType = ['video-editing', '3d-animation'].includes(service) ? 'video' : 'image';
  const fileAccept = fileType === 'video' ? 'video/*' : 'image/*';

  const handleFileChange = (file: File | null, previewUrl?: string) => {
    if (file) {
      setValue('file', file, { shouldValidate: true });
    } else if (previewUrl) {
      setValue('file', previewUrl, { shouldValidate: true });
    } else {
      setValue('file', '', { shouldValidate: true });
    }
  };

  const handleThumbnailChange = (file: File | null, previewUrl?: string) => {
    if (file) {
      setValue('thumbnail', file, { shouldValidate: true });
    } else if (previewUrl) {
      setValue('thumbnail', previewUrl, { shouldValidate: true });
    } else {
      setValue('thumbnail', null, { shouldValidate: true });
    }
  };

  // Safely get the watched values with proper types
  const fileValue = watch('file');
  const thumbnailValue = watch('thumbnail');

  const onSubmit: SubmitHandler<PortfolioItemFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('service', service);
      
      // If it's an edit, include the ID
      if (isEdit && initialData?.id) {
        formData.append('id', initialData.id);
      }
      
      if (data.projectUrl) {
        formData.append('projectUrl', data.projectUrl);
      }

      // Handle file upload if it's a new file
      if (data.file instanceof File) {
        formData.append('file', data.file);
      }

      // Handle thumbnail upload if it's a new file
      if (data.thumbnail instanceof File) {
        formData.append('thumbnail', data.thumbnail);
      } else if (data.thumbnail === null) {
        // This indicates the user wants to remove the thumbnail
        formData.append('removeThumbnail', 'true');
      }

      const url = isEdit 
        ? `/api/portfolio/items/${initialData.id}`
        : '/api/portfolio/items';
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }

      const result = await response.json();
      
      toast.success(isEdit ? 'Portfolio item updated successfully' : 'Portfolio item created successfully');
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/admin/services/${service}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            type="text"
            className="mt-1 block w-full"
            {...register('title')}
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="description"
            className="mt-1 block w-full"
            rows={4}
            {...register('description')}
            disabled={isSubmitting}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700">
            Project URL (optional)
          </label>
          <Input
            id="projectUrl"
            type="url"
            className="mt-1 block w-full"
            placeholder="https://example.com"
            {...register('projectUrl')}
            disabled={isSubmitting}
          />
          {errors.projectUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.projectUrl.message}</p>
          )}
        </div>

        <div>
          <FileInput
            id="file"
            label={`${fileType === 'video' ? 'Video' : 'Image'} File`}
            accept={fileAccept}
            fileType={fileType}
            value={fileValue}
            onChange={handleFileChange}
            required
            disabled={isSubmitting}
          />
          {errors.file && (
            <p className="mt-1 text-sm text-red-600">{errors.file.message as string}</p>
          )}
        </div>

        {fileType === 'video' && (
          <div>
            <FileInput
              id="thumbnail"
              label="Thumbnail Image (optional)"
              accept="image/*"
              fileType="image"
              value={thumbnailValue}
              onChange={handleThumbnailChange}
              disabled={isSubmitting}
            />
            {errors.thumbnail && (
              <p className="mt-1 text-sm text-red-600">{errors.thumbnail.message as string}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel || (() => router.back())}
          disabled={isSubmitting}
          className="flex items-center"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || isUploading}
          className="flex items-center"
        >
          {isSubmitting || isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isUploading ? `Uploading... ${progress}%` : 'Saving...'}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {isEdit ? 'Update' : 'Create'} Portfolio Item
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

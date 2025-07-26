import { Types } from 'mongoose';

export interface PortfolioItem {
  _id: Types.ObjectId;
  service: 'video-editing' | 'graphics-design' | '3d-animation' | 'website-development';
  title: string;
  description: string;
  fileUrl: string;
  thumbnailUrl?: string;
  projectUrl?: string;
  fileType: 'image' | 'video';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePortfolioItemInput {
  title: string;
  description: string;
  file: File;
  thumbnail?: File;
  projectUrl?: string;
}

export interface UpdatePortfolioItemInput extends Partial<CreatePortfolioItemInput> {
  id: string;
}

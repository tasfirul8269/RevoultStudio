import mongoose, { Document, Model, Schema, Types } from 'mongoose';

const PortfolioSchema = new Schema<IPortfolio>(
  {
    service: {
      type: String,
      required: [true, 'Please provide a service name'],
      enum: ['video-editing', 'graphics-design', '3d-animation', 'website-development'],
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    fileUrl: {
      type: String,
      required: [true, 'Please provide a file URL'],
    },
    publicId: {
      type: String,
      required: [true, 'Public ID is required'],
    },
    thumbnailUrl: {
      type: String,
    },
    thumbnailPublicId: {
      type: String,
    },
    projectUrl: {
      type: String,
    },
    fileType: {
      type: String,
      required: [true, 'Please provide a file type'],
      enum: ['image', 'video'],
    },
    technologies: {
      type: [String],
      default: [],
      validate: {
        validator: function(techs: string[]) {
          return techs.every(tech => typeof tech === 'string' && tech.trim().length > 0);
        },
        message: 'Technologies must be an array of non-empty strings'
      }
    },
  },
  {
    timestamps: true,
  }
);

export interface IPortfolio extends Document {
  service: 'video-editing' | 'graphics-design' | '3d-animation' | 'website-development';
  technologies: string[];
  title: string;
  description: string;
  fileUrl: string;
  publicId: string;
  thumbnailUrl?: string;
  thumbnailPublicId?: string;
  projectUrl?: string;
  fileType: 'image' | 'video';
  createdAt: Date;
  updatedAt: Date;
}

const Portfolio: Model<IPortfolio> = mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);

export default Portfolio;

// src/models/blog.model.ts
import mongoose, { Schema } from 'mongoose';
import { IBlog } from '../types';

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isPublished: { type: Boolean, default: true }
}, {
  timestamps: true
});

export const Blog = mongoose.model<IBlog>('Blog', blogSchema);

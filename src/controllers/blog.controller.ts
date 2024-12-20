
// src/controllers/blog.controller.ts
import { Response, NextFunction , Request } from 'express';
import { Blog } from '../models/blog.model';
import { CustomError } from '../utils/error';
import { blogSchema } from '../utils/validators';
import { CustomRequest } from '../types';

export const createBlog = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = blogSchema.parse(req.body);
    
    const blog = await Blog.create({
      ...validatedData,
      author: req.user!._id
    });

    const populatedBlog = await Blog.findById(blog._id)
      .populate('author', 'name email');

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      statusCode: 201,
      data: populatedBlog
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = blogSchema.parse(req.body);
    
    const blog = await Blog.findOne({
      _id: req.params.id,
      author: req.user!._id
    });

    if (!blog) {
      throw new CustomError('Blog not found or unauthorized', 404);
    }

    Object.assign(blog, validatedData);
    await blog.save();

    const updatedBlog = await Blog.findById(blog._id)
      .populate('author', 'name email');

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      statusCode: 200,
      data: updatedBlog
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: req.user!._id
    });

    if (!blog) {
      throw new CustomError('Blog not found or unauthorized', 404);
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      statusCode: 200
    });
  } catch (error) {
    next(error);
  }
};


export const getBlogs = async (
  req: Request<{}, {}, {}, {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filter?: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = req.query;

    let query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    if (filter) {
      query.author = filter;
    }

    const blogs = await Blog.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .populate('author', 'name email');

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      statusCode: 200,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};
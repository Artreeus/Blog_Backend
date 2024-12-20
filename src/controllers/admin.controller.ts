
// src/controllers/admin.controller.ts
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { Blog } from '../models/blog.model';
import { CustomError } from '../utils/error';

export const blockUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    user.isBlocked = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User blocked successfully",
      statusCode: 200
    });
  } catch (error) {
    next(error);
  }
};

export const adminDeleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      throw new CustomError('Blog not found', 404);
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

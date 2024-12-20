
// src/middleware/auth.middleware.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/error';
import { User } from '../models/user.model';
import { CustomRequest } from '../types';

export const auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new CustomError('Authentication required', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new CustomError('Authentication failed', 401);
    }

    if (user.isBlocked) {
      throw new CustomError('User is blocked', 403);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const adminAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.role !== 'admin') {
      throw new CustomError('Admin access required', 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};
// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { CustomError } from '../utils/error';
import { loginSchema, registerSchema } from '../utils/validators';

// Make sure both functions are properly exported
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    
    const user = await User.findOne({ email: validatedData.email });
    if (!user || !(await user.comparePassword(validatedData.password))) {
      throw new CustomError('Invalid credentials', 401);
    }

    if (user.isBlocked) {
      throw new CustomError('User is blocked', 403);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

    res.status(200).json({
      success: true,
      message: "Login successful",
      statusCode: 200,
      data: { token }
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      throw new CustomError('Email already registered', 400);
    }

    const user = await User.create(validatedData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      statusCode: 201,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};
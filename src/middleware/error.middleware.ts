
// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/error';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode,
      error: err.details,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      statusCode: 400,
      error: err.errors,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    statusCode: 500,
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

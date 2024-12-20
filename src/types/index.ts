// src/types/index.ts
import { Request } from 'express';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  author: IUser | string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomRequest extends Request {
  user?: IUser;
}

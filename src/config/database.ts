// src/config/database.ts
import mongoose from 'mongoose';
import { CustomError } from '../utils/error';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new CustomError('MongoDB URI is not defined', 500);
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected Successfully');

    mongoose.connection.on('error', (error : any) => {
      console.error('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
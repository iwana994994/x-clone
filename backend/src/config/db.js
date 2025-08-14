import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
try {
    await mongoose.connect(process.env.MONGO_URI,{
      
       serverSelectionTimeoutMS: 20000 
    });
    console.log('❤  MongoDB connected successfully! ❤');
    
} catch (error) 
{
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
    
}





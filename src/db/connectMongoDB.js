import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectMongoDB() {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
        throw new Error('MONGO_URL is not defined in environment variables');
    }

    await mongoose.connect(mongoUrl);

    console.log('✅ MongoDB connection established successfully');
}

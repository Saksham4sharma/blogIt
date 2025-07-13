import mongoose from "mongoose";

let isConnected = false;

export const ConnectDB = async () => {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-app';
        
        const db = await mongoose.connect(mongoUri, {
            bufferCommands: false,
        });
        
        isConnected = db.connections[0].readyState === 1;
        console.log("DB Connected");
    } catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Failed to connect to database");
    }
};
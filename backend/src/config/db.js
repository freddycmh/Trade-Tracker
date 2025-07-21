
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod = null;

export const connectDB = async () => {
    try {
        let mongoUri;
        
        if (process.env.NODE_ENV === 'production') {
            if (!process.env.MONGO_URI) {
                throw new Error("MONGO_URI environment variable is not set for production");
            }
            mongoUri = process.env.MONGO_URI;
        } else {
            // Use in-memory MongoDB for development
            console.log("🔄 Starting in-memory MongoDB for development...");
            mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
        }
        
        await mongoose.connect(mongoUri);
        console.log(`✅ MongoDB Connected successfully`);
        
        if (process.env.NODE_ENV !== 'production') {
            console.log("📝 Using in-memory database - data will not persist between restarts");
        }
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export const closeDB = async () => {
    try {
        await mongoose.connection.close();
        if (mongod) {
            await mongod.stop();
        }
    } catch (error) {
        console.error("Error closing database:", error);
    }
};

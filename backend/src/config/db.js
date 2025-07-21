
import mongoose from "mongoose";

let mongod = null;

export const connectDB = async () => {
    try {
        let mongoUri;
        
        if (process.env.NODE_ENV === 'production') {
            if (!process.env.MONGO_URI) {
                throw new Error("MONGO_URI environment variable is not set for production");
            }
            mongoUri = process.env.MONGO_URI;
            console.log("🔄 Connecting to production MongoDB...");
        } else {
            // Use in-memory MongoDB for development only if the package is available
            try {
                const { MongoMemoryServer } = await import("mongodb-memory-server");
                console.log("🔄 Starting in-memory MongoDB for development...");
                mongod = await MongoMemoryServer.create();
                mongoUri = mongod.getUri();
            } catch (error) {
                // Fallback to local MongoDB if mongodb-memory-server is not available
                console.log("⚠️  mongodb-memory-server not available, using local MongoDB");
                mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/tradetracker";
            }
        }
        
        await mongoose.connect(mongoUri);
        console.log(`✅ MongoDB Connected successfully`);
        
        if (process.env.NODE_ENV !== 'production') {
            console.log("📝 Using development database");
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

import mongoose from "mongoose";

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
            // For development, use local MongoDB or environment variable
            mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/tradetracker";
            console.log("🔄 Connecting to development MongoDB...");
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
        console.log("📝 Database connection closed");
    } catch (error) {
        console.error("Error closing database:", error);
    }
};
import express from "express";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import tradeRoutes from "./src/routes/tradeRoutes.js";
import authRoutes from "./src/routes/auth.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// middleware - simplified CORS for development
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://your-replit-domain.replit.app']
    : true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(express.json());

// Routes
app.use("/api/trades", tradeRoutes);
app.use("/api/auth", authRoutes);

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const distPath = path.join(__dirname, '../frontend/dist');

  app.use(express.static(distPath));

  // Only catch non-API routes for SPA routing
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

console.log("🔄 Starting backend server...");
console.log("📦 Environment:", process.env.NODE_ENV);
console.log("🔌 Port:", PORT);

connectDB().then(() => {
  const host = "0.0.0.0"; // Use 0.0.0.0 for Replit compatibility
  app.listen(PORT, host, () => {
    console.log(`🚀 Server running on ${host}:${PORT}`);
    console.log(`📍 Backend accessible at: http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("❌ Failed to start server:", err);
});
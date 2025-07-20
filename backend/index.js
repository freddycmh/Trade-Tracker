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

const PORT = process.env.PORT || 5005;

// middleware
app.use(cors());
app.use(express.json());

//routes

// Routes
app.use("/api/trades", tradeRoutes);
app.use("/api/auth", authRoutes); // ✅ match your frontend route



// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const distPath = path.join(__dirname, '../frontend/dist');
  
  app.use(express.static(distPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log("Server running on port:", PORT);
  });
});

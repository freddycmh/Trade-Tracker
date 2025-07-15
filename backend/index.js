import express from "express";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import tradeRoutes from "./src/routes/tradeRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5005;

// middleware
app.use(cors());
app.use(express.json());

//routes

// Routes
app.use("/api/trades", tradeRoutes);



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
  });
});

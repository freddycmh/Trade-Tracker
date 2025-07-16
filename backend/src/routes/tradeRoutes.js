import express from "express";
import {
  getAllTrades,
  getTradeById,
  updateTrade,
  deleteTrade,
  createTrade,
} from "../controllers/tradeControllers.js";
import { verifyToken } from "../middleware/auth.js"; 

const router = express.Router();

// 🔒 Require login for all trade routes
router.use(verifyToken);

// Get all trades for logged-in user
router.get("/", getAllTrades);
// Get one trade (must belong to user)
router.get("/:id", getTradeById);
// Create new trade for user
router.post("/", createTrade);
// Update user's trade
router.put("/:id", updateTrade);
// Delete user's trade
router.delete("/:id", deleteTrade);

export default router;
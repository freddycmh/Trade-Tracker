import Trade from "../models/Trade.js";
import { validateTrade, sanitizeString } from "../utils/validation.js";

export const getAllTrades = async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.userId }).sort({ tradeDate: -1 });
    res.json(trades);
  } catch (err) {
    console.error("Error fetching trades:", err);
    res.status(500).json({ message: "Failed to fetch trades" });
  }
};

export async function getTradeById(req, res) {
  try {
    const trade = await Trade.findOne({ _id: req.params.id, user: req.userId });
    if (!trade) return res.status(404).json({ message: "Trade not found" });
    res.status(200).json(trade);
  } catch (error) {
    console.error("Error getting trade:", error);
    res.status(500).json({ message: error.message });
  }
}

export async function createTrade(req, res) {
  try {
    // Validate trade data
    const validation = validateTrade(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors
      });
    }

    // Sanitize and convert data types
    const sanitizedData = {
      ...req.body,
      ticker: req.body.ticker?.trim().toUpperCase(),
      strike: Number(req.body.strike),
      entryPrice: Number(req.body.entryPrice),
      exitPrice: Number(req.body.exitPrice),
      quantity: Number(req.body.quantity),
      notes: sanitizeString(req.body.notes),
      user: req.userId,
    };

    const trade = await Trade.create(sanitizedData);
    res.status(201).json(trade);
  } catch (error) {
    console.error("❌ Error creating trade:", error);
    res.status(500).json({ message: error.message });
  }
}

export async function updateTrade(req, res) {
  try {
    // Validate trade data if provided
    const validation = validateTrade(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors
      });
    }

    // Sanitize and convert data types
    const sanitizedData = {
      ...req.body,
      ticker: req.body.ticker?.trim().toUpperCase(),
      strike: Number(req.body.strike),
      entryPrice: Number(req.body.entryPrice),
      exitPrice: Number(req.body.exitPrice),
      quantity: Number(req.body.quantity),
      notes: sanitizeString(req.body.notes),
    };

    const trade = await Trade.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      sanitizedData,
      { new: true, runValidators: true }
    );
    if (!trade) return res.status(404).json({ message: "Trade not found" });
    res.status(200).json(trade);
  } catch (error) {
    console.error("Error updating trade:", error);
    res.status(500).json({ message: error.message });
  }
}

export async function deleteTrade(req, res) {
  try {
    const trade = await Trade.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!trade) return res.status(404).json({ message: "Trade not found" });
    res.status(200).json({ message: "Trade deleted" });
  } catch (error) {
    console.log("error deleting trade", error);
    res.status(500).json({ message: error.message });
  }
}
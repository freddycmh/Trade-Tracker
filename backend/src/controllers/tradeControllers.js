import Trade from "../models/Trade.js";

export const getAllTrades = async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.userId }).sort({ tradeDate: -1 });
    res.json(trades);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trades" });
  }
};

export async function getTradeById(req, res) {
  try {
    const trade = await Trade.findOne({ _id: req.params.id, user: req.userId });
    if (!trade) return res.status(404).json({ message: "Trade not found" });
    res.status(200).json(trade);
  } catch (error) {
    console.log("error getting trade", error);
    res.status(500).json({ message: error.message });
  }
}

export async function createTrade(req, res) {
  try {
    const trade = await Trade.create({
      ...req.body,
      user: req.userId, // 👈 attach user ID from token
    });
    res.status(201).json(trade);
  } catch (error) {
    console.error("❌ Error creating trade:", error); // <--- check this log
    res.status(500).json({ message: error.message });
  }
}

export async function updateTrade(req, res) {
  try {
    const trade = await Trade.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!trade) return res.status(404).json({ message: "Trade not found" });
    res.status(200).json(trade);
  } catch (error) {
    console.log("error updating trade", error);
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
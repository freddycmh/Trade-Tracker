import Trade from "../models/Trade.js";

export async function getAllTrades(req, res) {
  try {
    const trades = await Trade.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(trades);
  } catch (error) {
    console.log("error getting all trades", error);
    res.status(500).json({ message: error.message });
  }
}

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
    const trade = await Trade.create({ ...req.body, user: req.userId });
    res.status(201).json(trade);
  } catch (error) {
    console.log("error creating trade", error);
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
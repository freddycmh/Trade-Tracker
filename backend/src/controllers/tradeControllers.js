import Trade from "../models/Trade.js";

export async function getAllTrades(req, res) {
    try {
        const trades = await Trade.find();
        res.status(200).json(trades);
    } catch (error) {
        console.log("error getting all trades", error); 
        res.status(500).json({ message: error.message });
    }
}

export async function getTradeById(req, res) {
    try {
        const trade = await Trade.findById(req.params.id);
        res.status(200).json(trade);
    } catch (error) {
        console.log("error getting trade", error); 
        res.status(500).json({ message: error.message });
    }
}

export async function createTrade(req, res) {
    try {
        const trade = await Trade.create(req.body);
        res.status(201).json(trade);
    } catch (error) {
        console.log("error creating trade", error); 
        res.status(500).json({ message: error.message });
    }
}

export async function updateTrade(req, res) {
    try {
        const trade = await Trade.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(trade);
    } catch (error) {
        console.log("error updating trade", error); 
        res.status(500).json({ message: error.message });
    }
}

export async function deleteTrade(req, res) {
    try {
        const trade = await Trade.findByIdAndDelete(req.params.id);
        res.status(200).json(trade);
    } catch (error) {
        console.log("error deleting trade", error); 
        res.status(500).json({ message: error.message });
    }
}
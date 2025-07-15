import express from "express"
import {getAllTrades, getTradeById, updateTrade, deleteTrade, createTrade} from "../controllers/tradeControllers.js";

const router = express.Router()

//get all
router.get("/", getAllTrades);
// get one
router.get("/:id", getTradeById);
//create
router.post("/", createTrade);
//update
router.put("/:id", updateTrade); 
//delete
router.delete("/:id", deleteTrade);

export default router;



import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Trade from "../models/Trade.js";
import bcrypt from "bcryptjs";

dotenv.config();

const dummyTrades = [
  {
    ticker: "SPY",
    optionType: "Call",
    strike: 450,
    expiration: "2025-11-15",
    entryPrice: 3.50,
    exitPrice: 5.20,
    quantity: 10,
    tradeType: "Day",
    notes: "Strong uptrend breakout",
  },
  {
    ticker: "AAPL",
    optionType: "Put",
    strike: 180,
    expiration: "2025-12-20",
    entryPrice: 2.80,
    exitPrice: 1.50,
    quantity: 5,
    tradeType: "Swing",
    notes: "Resistance rejection",
  },
  {
    ticker: "TSLA",
    optionType: "Call",
    strike: 250,
    expiration: "2025-10-18",
    entryPrice: 8.00,
    exitPrice: 12.50,
    quantity: 3,
    tradeType: "Day",
    notes: "Earnings play",
  },
  {
    ticker: "NVDA",
    optionType: "Call",
    strike: 500,
    expiration: "2025-11-01",
    entryPrice: 15.00,
    exitPrice: 22.00,
    quantity: 2,
    tradeType: "Swing",
    notes: "AI sector momentum",
  },
  {
    ticker: "QQQ",
    optionType: "Put",
    strike: 380,
    expiration: "2025-10-25",
    entryPrice: 4.20,
    exitPrice: 3.00,
    quantity: 8,
    tradeType: "Day",
    notes: "Market downturn hedge",
  },
  {
    ticker: "AMD",
    optionType: "Call",
    strike: 120,
    expiration: "2025-12-15",
    entryPrice: 5.50,
    exitPrice: 8.00,
    quantity: 6,
    tradeType: "Swing",
    notes: "Chip sector rally",
  },
  {
    ticker: "MSFT",
    optionType: "Call",
    strike: 350,
    expiration: "2025-11-08",
    entryPrice: 6.00,
    exitPrice: 4.50,
    quantity: 4,
    tradeType: "Day",
    notes: "Took profit early",
  },
  {
    ticker: "META",
    optionType: "Put",
    strike: 320,
    expiration: "2025-10-30",
    entryPrice: 7.80,
    exitPrice: 10.50,
    quantity: 3,
    tradeType: "Swing",
    notes: "Tech pullback",
  },
  {
    ticker: "GOOGL",
    optionType: "Call",
    strike: 140,
    expiration: "2025-12-01",
    entryPrice: 4.00,
    exitPrice: 6.20,
    quantity: 7,
    tradeType: "Day",
    notes: "Support bounce",
  },
  {
    ticker: "IWM",
    optionType: "Call",
    strike: 200,
    expiration: "2025-11-22",
    entryPrice: 3.20,
    exitPrice: 2.80,
    quantity: 10,
    tradeType: "Scalp",
    notes: "Small cap rotation",
  },
  {
    ticker: "AMC",
    optionType: "Call",
    strike: 5,
    expiration: "2025-10-15",
    entryPrice: 0.50,
    exitPrice: 1.20,
    quantity: 20,
    tradeType: "Scalp",
    notes: "Meme stock momentum",
  },
  {
    ticker: "DIA",
    optionType: "Put",
    strike: 350,
    expiration: "2025-11-12",
    entryPrice: 5.00,
    exitPrice: 7.50,
    quantity: 5,
    tradeType: "Day",
    notes: "Market correction play",
  },
  {
    ticker: "COIN",
    optionType: "Call",
    strike: 200,
    expiration: "2025-12-10",
    entryPrice: 10.00,
    exitPrice: 15.00,
    quantity: 2,
    tradeType: "Swing",
    notes: "Crypto rally correlation",
  },
  {
    ticker: "PLTR",
    optionType: "Call",
    strike: 25,
    expiration: "2025-10-20",
    entryPrice: 2.00,
    exitPrice: 3.50,
    quantity: 15,
    tradeType: "Day",
    notes: "AI contracts news",
  },
  {
    ticker: "BA",
    optionType: "Put",
    strike: 180,
    expiration: "2025-11-05",
    entryPrice: 6.50,
    exitPrice: 5.00,
    quantity: 4,
    tradeType: "Swing",
    notes: "Industry headwinds",
  },
];

async function seedDummyData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Find or create the user with email hello@gmail.com
    let user = await User.findOne({ email: "hello@gmail.com" });

    if (!user) {
      console.log("📝 Creating user hello@gmail.com...");
      const hashedPassword = await bcrypt.hash("password123", 10);
      user = await User.create({
        email: "hello@gmail.com",
        password: hashedPassword,
      });
      console.log("✅ User created");
    } else {
      console.log("✅ User found");
    }

    // Delete existing trades for this user
    const deleteResult = await Trade.deleteMany({ user: user._id });
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing trades`);

    // Insert dummy trades
    const tradesWithUser = dummyTrades.map((trade) => ({
      ...trade,
      user: user._id,
    }));

    const insertedTrades = await Trade.insertMany(tradesWithUser);
    console.log(`✅ Inserted ${insertedTrades.length} dummy trades`);

    console.log("\n📊 Summary:");
    console.log(`   Email: hello@gmail.com`);
    console.log(`   Password: password123`);
    console.log(`   Total trades: ${insertedTrades.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedDummyData();

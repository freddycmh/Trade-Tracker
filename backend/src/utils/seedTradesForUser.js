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
    tradeDate: "2025-09-15",
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
    tradeDate: "2025-09-18",
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
    tradeDate: "2025-09-20",
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
    tradeDate: "2025-09-22",
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
    tradeDate: "2025-09-25",
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
    tradeDate: "2025-09-28",
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
    tradeDate: "2025-09-30",
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
    tradeDate: "2025-10-01",
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
    tradeDate: "2025-10-03",
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
    tradeDate: "2025-10-04",
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
    tradeDate: "2025-10-05",
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
    tradeDate: "2025-10-06",
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
    tradeDate: "2025-10-07",
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
    tradeDate: "2025-10-08",
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
    tradeDate: "2025-10-09",
    notes: "Industry headwinds",
  },
  {
    ticker: "JPM",
    optionType: "Call",
    strike: 150,
    expiration: "2025-11-20",
    entryPrice: 4.50,
    exitPrice: 6.80,
    quantity: 8,
    tradeType: "Day",
    tradeDate: "2025-09-12",
    notes: "Financial sector strength",
  },
  {
    ticker: "WMT",
    optionType: "Call",
    strike: 160,
    expiration: "2025-10-27",
    entryPrice: 3.00,
    exitPrice: 4.20,
    quantity: 12,
    tradeType: "Swing",
    tradeDate: "2025-09-14",
    notes: "Retail earnings beat",
  },
  {
    ticker: "DIS",
    optionType: "Put",
    strike: 90,
    expiration: "2025-11-18",
    entryPrice: 3.80,
    exitPrice: 2.50,
    quantity: 6,
    tradeType: "Day",
    tradeDate: "2025-09-17",
    notes: "Streaming concerns",
  },
  {
    ticker: "NFLX",
    optionType: "Call",
    strike: 420,
    expiration: "2025-12-05",
    entryPrice: 12.00,
    exitPrice: 18.50,
    quantity: 3,
    tradeType: "Swing",
    tradeDate: "2025-09-19",
    notes: "Content release catalyst",
  },
  {
    ticker: "INTC",
    optionType: "Put",
    strike: 35,
    expiration: "2025-10-22",
    entryPrice: 2.20,
    exitPrice: 3.40,
    quantity: 10,
    tradeType: "Day",
    tradeDate: "2025-09-21",
    notes: "Competitive pressure",
  },
];

async function seedTradesForUser(userEmail) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Find or create the user
    let user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log(`📝 Creating user ${userEmail}...`);
      const hashedPassword = await bcrypt.hash("password123", 10);
      user = await User.create({
        email: userEmail,
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
    console.log(`   Email: ${userEmail}`);
    console.log(`   Password: password123`);
    console.log(`   Total trades: ${insertedTrades.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

// Get email from command line argument or use default
const userEmail = process.argv[2] || "hi@gmail.com";
seedTradesForUser(userEmail);

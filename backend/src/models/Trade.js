import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema({
    ticker: {
    type: String,
    required: true,
    uppercase: true,
  },
  optionType: {
    type: String,
    required: true,
    enum: ["Call", "Put"],
    set: (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(),
  },
  strike: {
    type: Number,
    required: true,
  },
  expiration: {
    type: Date,
    required: true,
  },
  entryPrice: {
    type: Number,
    required: true,
  },
  exitPrice: {
    type: Number,
    required: true,
  },
  profitLoss: {
    type: Number,
    default: function () {
      if (this.entryPrice != null && this.exitPrice != null && this.quantity != null) {
        return (this.exitPrice - this.entryPrice) * 100 * this.quantity;
      }
      return 0;
    },
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  tradeType: {
    type: String,
    enum: ["Day", "Swing", "Scalp", "Other"],
    default: "Other",
  },
  tradeDate: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});

const Trade = mongoose.model("Trade", tradeSchema);
export default Trade;

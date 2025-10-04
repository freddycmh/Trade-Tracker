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
    default: Date.now,
  },
  notes: {
    type: String,
    default: "",
  },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
}, {
  timestamps: true,
});

// Pre-save hook to calculate profitLoss before saving
tradeSchema.pre('save', function(next) {
  if (this.entryPrice != null && this.exitPrice != null && this.quantity != null) {
    this.profitLoss = (this.exitPrice - this.entryPrice) * 100 * this.quantity;
  } else {
    this.profitLoss = 0;
  }
  next();
});

// Pre-update hook to recalculate profitLoss when updating
tradeSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();

  // Get the fields that might be updated
  const entryPrice = update.entryPrice || update.$set?.entryPrice;
  const exitPrice = update.exitPrice || update.$set?.exitPrice;
  const quantity = update.quantity || update.$set?.quantity;

  // If any of the relevant fields are being updated, recalculate profitLoss
  if (entryPrice !== undefined || exitPrice !== undefined || quantity !== undefined) {
    // We need to fetch the current document to get missing values
    this.model.findOne(this.getFilter()).then(doc => {
      if (doc) {
        const finalEntry = entryPrice !== undefined ? entryPrice : doc.entryPrice;
        const finalExit = exitPrice !== undefined ? exitPrice : doc.exitPrice;
        const finalQuantity = quantity !== undefined ? quantity : doc.quantity;

        if (finalEntry != null && finalExit != null && finalQuantity != null) {
          const calculatedPL = (finalExit - finalEntry) * 100 * finalQuantity;

          if (update.$set) {
            update.$set.profitLoss = calculatedPL;
          } else {
            update.profitLoss = calculatedPL;
          }
        }
      }
      next();
    }).catch(err => next(err));
  } else {
    next();
  }
});

const Trade = mongoose.model("Trade", tradeSchema);
export default Trade;

import mongoose from "mongoose"

const financialAccountSchema = new mongoose.Schema({
  accountName: { type: String, required: true },
  accountType: { 
    type: String, 
    enum: ["Cash", "Bank", "Credit Card", "E-Wallet", "Other"], 
    required: true 
  },
  accountNumber: String,
  bankName: String,
  balance: { type: Number, default: 0 },
  currency: { type: String, default: "KWD" },
  branchId: mongoose.Schema.Types.ObjectId,
  isActive: { type: Boolean, default: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model("FinancialAccount", financialAccountSchema, "financialaccounts")

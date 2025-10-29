import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema(
  {
    expenseNumber: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    description: { type: String },
    paymentMethod: { type: String, enum: ["cash", "card", "bank_transfer", "cheque", "other"] },
    status: { type: String, enum: ["pending", "approved", "rejected", "paid"], default: "pending" },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attachments: [{ type: String }],
  },
  { timestamps: true },
)

export default mongoose.model("Expense", expenseSchema, "expenses")

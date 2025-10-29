import mongoose from "mongoose"

const inventoryVoucherSchema = new mongoose.Schema({
  voucherNumber: { type: String, required: true, unique: true },
  voucherType: { 
    type: String, 
    enum: ["Receipt", "Issue", "Transfer", "Adjustment"], 
    required: true 
  },
  date: { type: Date, default: Date.now },
  branchId: mongoose.Schema.Types.ObjectId,
  toBranchId: mongoose.Schema.Types.ObjectId,
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    productName: String,
    quantity: Number,
    unitPrice: Number,
    total: Number,
  }],
  totalAmount: Number,
  status: { 
    type: String, 
    enum: ["Draft", "Approved", "Completed", "Cancelled"], 
    default: "Draft" 
  },
  approvedBy: String,
  approvedDate: Date,
  notes: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model("InventoryVoucher", inventoryVoucherSchema, "inventoryvouchers")

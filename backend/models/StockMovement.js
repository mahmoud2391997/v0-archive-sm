import mongoose from "mongoose"

const stockMovementSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  branchId: mongoose.Schema.Types.ObjectId,
  movementType: { 
    type: String, 
    enum: ["Receipt", "Issue", "Transfer In", "Transfer Out", "Adjustment", "Return"], 
    required: true 
  },
  quantity: { type: Number, required: true },
  unitPrice: Number,
  totalValue: Number,
  fromLocation: String,
  toLocation: String,
  referenceDocument: String,
  referenceNumber: String,
  transactionDate: { type: Date, default: Date.now },
  performedBy: String,
  approvedBy: String,
  status: { 
    type: String, 
    enum: ["Pending", "Approved", "Completed", "Cancelled"], 
    default: "Pending" 
  },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

stockMovementSchema.index({ productId: 1, transactionDate: -1 })
stockMovementSchema.index({ branchId: 1, transactionDate: -1 })

export default mongoose.model("StockMovement", stockMovementSchema, "stockmovements")

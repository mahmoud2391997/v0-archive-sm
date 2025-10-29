import mongoose from "mongoose"

const branchInventorySchema = new mongoose.Schema({
  branchId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, default: 0 },
  minStock: { type: Number, default: 0 },
  maxStock: Number,
  reorderPoint: Number,
  location: String,
  lastRestockDate: Date,
  expiryDate: Date,
  batchNumber: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

branchInventorySchema.index({ branchId: 1, productId: 1 }, { unique: true })

export default mongoose.model("BranchInventory", branchInventorySchema, "branchinventories")

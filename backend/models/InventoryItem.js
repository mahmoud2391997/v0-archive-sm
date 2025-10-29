import mongoose from "mongoose"

const inventoryItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    quantity: { type: Number, required: true, default: 0 },
    minStockLevel: { type: Number, default: 0 },
    maxStockLevel: { type: Number },
    reorderPoint: { type: Number },
    location: { type: String },
    lastRestocked: { type: Date },
  },
  { timestamps: true },
)

inventoryItemSchema.index({ productId: 1, branchId: 1 }, { unique: true })

export default mongoose.model("InventoryItem", inventoryItemSchema, "inventoryitems")

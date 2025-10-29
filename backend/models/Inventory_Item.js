import mongoose from "mongoose"

const inventory_itemSchema = new mongoose.Schema(
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

inventory_itemSchema.index({ branchId: 1, productId: 1 })

export default mongoose.model("Inventory_Item", inventory_itemSchema, "inventory_items")

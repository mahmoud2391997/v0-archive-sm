import mongoose from "mongoose"

const inventoryItemAltSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  alternativeProductId: { type: mongoose.Schema.Types.ObjectId, required: true },
  priority: { type: Number, default: 1 },
  notes: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model("InventoryItemAlt", inventoryItemAltSchema, "inventoryitemalts")

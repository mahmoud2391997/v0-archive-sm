import mongoose from "mongoose"

const productComponentSchema = new mongoose.Schema({
  parentProductId: { type: mongoose.Schema.Types.ObjectId, required: true },
  componentProductId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  unit: String,
  notes: String,
  isOptional: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

productComponentSchema.index({ parentProductId: 1, componentProductId: 1 }, { unique: true })

export default mongoose.model("ProductComponent", productComponentSchema, "productcomponents")

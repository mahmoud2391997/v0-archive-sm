import mongoose from "mongoose"

const supplyChainItemSchema = new mongoose.Schema({
  supplyChainId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  currentLocation: String,
  currentNodeId: mongoose.Schema.Types.ObjectId,
  status: { 
    type: String, 
    enum: ["Ordered", "In Transit", "At Warehouse", "Delivered", "Cancelled"], 
    default: "Ordered" 
  },
  trackingNumber: String,
  estimatedArrival: Date,
  actualArrival: Date,
  milestones: [{
    location: String,
    timestamp: Date,
    status: String,
    notes: String,
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

supplyChainItemSchema.index({ supplyChainId: 1, productId: 1 })
supplyChainItemSchema.index({ trackingNumber: 1 })

export default mongoose.model("SupplyChainItem", supplyChainItemSchema, "supplychainitems")

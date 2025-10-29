import mongoose from "mongoose"

const scanSchema = new mongoose.Schema({
  code: { type: String, required: true },
  codeType: { 
    type: String, 
    enum: ["Barcode", "QR", "NFC"], 
    required: true 
  },
  productId: mongoose.Schema.Types.ObjectId,
  scannedBy: String,
  scannedAt: { type: Date, default: Date.now },
  location: {
    latitude: Number,
    longitude: Number,
  },
  branchId: mongoose.Schema.Types.ObjectId,
  purpose: { 
    type: String, 
    enum: ["Inventory Check", "Sale", "Receipt", "Verification", "Other"] 
  },
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
})

scanSchema.index({ code: 1, scannedAt: -1 })
scanSchema.index({ productId: 1, scannedAt: -1 })

export default mongoose.model("Scan", scanSchema, "scans")

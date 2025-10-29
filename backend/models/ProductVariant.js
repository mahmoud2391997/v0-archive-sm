import mongoose from "mongoose"

const productVariantSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  variantName: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  barcode: String,
  attributes: mongoose.Schema.Types.Mixed,
  price: Number,
  compareAtPrice: Number,
  costPerItem: Number,
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: String,
  },
  image: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model("ProductVariant", productVariantSchema, "productvariants")

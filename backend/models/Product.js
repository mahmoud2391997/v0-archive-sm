import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    barcode: { type: String },
    category: { type: String },
    description: { type: String },
    unit: { type: String, default: "piece" },
    costPrice: { type: Number, default: 0 },
    sellingPrice: { type: Number, required: true },
    taxRate: { type: Number, default: 0 },
    type: { type: String, enum: ["product", "raw_material", "finished_good", "service"], default: "product" },
    status: { type: String, enum: ["active", "inactive", "discontinued"], default: "active" },
    images: [{ type: String }],
    specifications: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true },
)

export default mongoose.model("Product", productSchema, "products")

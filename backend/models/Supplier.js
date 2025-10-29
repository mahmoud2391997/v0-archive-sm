import mongoose from "mongoose"

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    taxId: { type: String },
    paymentTerms: { type: String },
    creditLimit: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    notes: { type: String },
  },
  { timestamps: true },
)

export default mongoose.model("Supplier", supplierSchema, "suppliers")

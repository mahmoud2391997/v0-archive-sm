import mongoose from "mongoose"

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    taxId: { type: String },
    creditLimit: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    type: { type: String, enum: ["individual", "business"], default: "individual" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    notes: { type: String },
  },
  { timestamps: true },
)

export default mongoose.model("Customer", customerSchema, "customers")

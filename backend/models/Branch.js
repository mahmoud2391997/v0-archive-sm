import mongoose from "mongoose"

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    address: { type: String },
    city: { type: String },
    phone: { type: String },
    email: { type: String },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["active", "inactive", "closed"], default: "active" },
    businessType: { type: String, enum: ["retail", "wholesale", "manufacturing", "warehouse", "office"] },
  },
  { timestamps: true },
)

export default mongoose.model("Branch", branchSchema, "branches")

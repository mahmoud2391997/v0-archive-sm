import mongoose from "mongoose"

const saleSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        total: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["pending", "partial", "paid", "overdue"], default: "pending" },
    paymentMethod: { type: String, enum: ["cash", "card", "bank_transfer", "cheque", "other"] },
    notes: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
)

export default mongoose.model("Sale", saleSchema, "sales")

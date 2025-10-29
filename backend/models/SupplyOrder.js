import mongoose from "mongoose"

const supplyOrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  supplyChainId: mongoose.Schema.Types.ObjectId,
  supplierId: { type: mongoose.Schema.Types.ObjectId, required: true },
  orderDate: { type: Date, default: Date.now },
  requiredDate: Date,
  deliveryDate: Date,
  status: { 
    type: String, 
    enum: ["Draft", "Submitted", "Confirmed", "Shipped", "Delivered", "Cancelled"], 
    default: "Draft" 
  },
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    productName: String,
    quantity: Number,
    unitPrice: Number,
    total: Number,
  }],
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  totalAmount: Number,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  trackingNumber: String,
  carrier: String,
  notes: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model("SupplyOrder", supplyOrderSchema, "supplyorders")

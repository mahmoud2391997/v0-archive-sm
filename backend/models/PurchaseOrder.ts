import mongoose, { Schema, type Document, type Model } from "mongoose"
import { type IPurchaseOrder, type IPurchaseOrderItem, PaymentStatus } from "../types"

export interface IPurchaseOrderDocument extends Omit<IPurchaseOrder, "_id">, Document {}

const purchaseOrderItemSchema = new Schema<IPurchaseOrderItem>(
  {
    productId: Schema.Types.ObjectId,
    productName: String,
    quantity: Number,
    unitPrice: Number,
    total: Number,
  },
  { _id: false },
)

const purchaseOrderSchema = new Schema<IPurchaseOrderDocument>({
  branchId: Schema.Types.ObjectId,
  supplierId: Schema.Types.ObjectId,
  orderNumber: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  expectedDeliveryDate: Date,
  totalAmount: Number,
  paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.PENDING },
  items: [purchaseOrderItemSchema],
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const PurchaseOrderModel: Model<IPurchaseOrderDocument> = mongoose.model<IPurchaseOrderDocument>(
  "PurchaseOrder",
  purchaseOrderSchema,
  "purchaseorders",
)

export default PurchaseOrderModel

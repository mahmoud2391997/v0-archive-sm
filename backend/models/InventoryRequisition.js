import mongoose from "mongoose"

const inventoryRequisitionSchema = new mongoose.Schema({
  requisitionNumber: { type: String, required: true, unique: true },
  requestedBy: { type: String, required: true },
  requestDate: { type: Date, default: Date.now },
  branchId: mongoose.Schema.Types.ObjectId,
  fromBranchId: mongoose.Schema.Types.ObjectId,
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    productName: String,
    requestedQuantity: Number,
    approvedQuantity: Number,
    unitPrice: Number,
  }],
  status: { 
    type: String, 
    enum: ["Pending", "Approved", "Rejected", "Fulfilled", "Cancelled"], 
    default: "Pending" 
  },
  priority: { 
    type: String, 
    enum: ["Low", "Normal", "High", "Urgent"], 
    default: "Normal" 
  },
  approvedBy: String,
  approvedDate: Date,
  fulfilledDate: Date,
  notes: String,
  rejectionReason: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model("InventoryRequisition", inventoryRequisitionSchema, "inventoryrequisitions")

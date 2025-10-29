import mongoose from "mongoose"

const inventoryMovementSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  branchId: mongoose.Schema.Types.ObjectId,
  movementType: { 
    type: String, 
    enum: ["In", "Out", "Transfer", "Adjustment", "Return", "Damage", "Loss"], 
    required: true 
  },
  quantity: { type: Number, required: true },
  fromBranchId: mongoose.Schema.Types.ObjectId,
  toBranchId: mongoose.Schema.Types.ObjectId,
  referenceType: { 
    type: String, 
    enum: ["Sale", "Purchase", "Transfer", "Adjustment", "Return", "Manufacturing"] 
  },
  referenceId: mongoose.Schema.Types.ObjectId,
  referenceNumber: String,
  reason: String,
  notes: String,
  performedBy: String,
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
})

inventoryMovementSchema.index({ productId: 1, date: -1 })
inventoryMovementSchema.index({ branchId: 1, date: -1 })

export default mongoose.model("InventoryMovement", inventoryMovementSchema, "inventorymovements")

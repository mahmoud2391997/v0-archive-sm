import mongoose from "mongoose"

// Alternative collection name without underscore - points to same schema as ManufacturingOrder
const manufacturingOrdersSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productName: String,
  branchId: mongoose.Schema.Types.ObjectId,
  quantity: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["Draft", "Pending", "In Progress", "Completed", "Cancelled"], 
    default: "Draft" 
  },
  priority: { 
    type: String, 
    enum: ["Low", "Normal", "High", "Urgent"], 
    default: "Normal" 
  },
  startDate: Date,
  targetDate: Date,
  completedDate: Date,
  formula: [{
    materialId: mongoose.Schema.Types.ObjectId,
    materialName: String,
    quantity: Number,
    unit: String,
  }],
  packagingItems: [{
    productId: mongoose.Schema.Types.ObjectId,
    productName: String,
    quantity: Number,
  }],
  assignedTo: String,
  notes: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model("ManufacturingOrders", manufacturingOrdersSchema, "manufacturingorders")

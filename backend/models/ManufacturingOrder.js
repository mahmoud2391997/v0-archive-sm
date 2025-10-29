import mongoose from "mongoose"

const manufacturingOrderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    status: {
      type: String,
      enum: ["pending", "in_progress", "quality_check", "completed", "cancelled"],
      default: "pending",
    },
    startDate: { type: Date },
    completionDate: { type: Date },
    expectedCompletionDate: { type: Date },
    formula: {
      ingredients: [
        {
          materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          quantity: { type: Number },
          unit: { type: String },
        },
      ],
      concentration: { type: String },
      batchSize: { type: Number },
    },
    qualityControl: {
      result: { type: String, enum: ["pending", "passed", "failed"] },
      testedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      testDate: { type: Date },
      notes: { type: String },
    },
    notes: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
)

export default mongoose.model("ManufacturingOrder", manufacturingOrderSchema, "manufacturingorders")

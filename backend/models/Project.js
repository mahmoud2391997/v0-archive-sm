import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    status: { type: String, enum: ["planning", "active", "on_hold", "completed", "cancelled"], default: "planning" },
    startDate: { type: Date },
    endDate: { type: Date },
    budget: { type: Number },
    actualCost: { type: Number, default: 0 },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
  },
  { timestamps: true },
)

export default mongoose.model("Project", projectSchema, "projects")

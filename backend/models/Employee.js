import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    employeeId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    position: { type: String },
    department: { type: String },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    salary: { type: Number },
    hireDate: { type: Date },
    status: { type: String, enum: ["active", "inactive", "terminated"], default: "active" },
  },
  { timestamps: true },
)

export default mongoose.model("Employee", employeeSchema, "employees")

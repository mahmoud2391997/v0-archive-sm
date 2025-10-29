import mongoose from "mongoose";

const supplyChainSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // numeric identifier
  sku: { type: String, trim: true }, // stock keeping unit
  gtin: { type: String, trim: true }, // global trade item number
  batchNumber: { type: String, trim: true },
  serialNumber: { type: String, trim: true },
  productName: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  unit: { type: String, trim: true },
  manufacturer: { type: String, trim: true },
  originCountry: { type: String, trim: true },
  manufactureDate: { type: Date },
  expiryDate: { type: Date },
  currentStatus: {
    type: String,
    enum: ["In Transit", "Stored", "Delivered", "Returned", "Expired", "Damaged"],
    default: "Stored",
  },
  transportMode: {
    type: String,
    enum: ["Air", "Sea", "Road", "Rail", "None"],
    default: "None",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Automatically update "updated_at" on every save
supplyChainSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model("SupplyChain", supplyChainSchema, "supplychains")

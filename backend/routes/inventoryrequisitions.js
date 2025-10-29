import express from "express"
import InventoryItem from "../models/InventoryItem.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

// Inventory Requisitions - requests for inventory items
router.get("/", authenticate, async (req, res) => {
  try {
    const requisitions = await InventoryItem.find({ requisitionStatus: { $exists: true } }).populate("productId branchId")
    res.json({ success: true, data: requisitions })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.get("/:id", authenticate, async (req, res) => {
  try {
    const requisition = await InventoryItem.findById(req.params.id).populate("productId branchId")
    res.json({ success: true, data: requisition })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const reqData = { ...req.body, requisitionStatus: req.body.requisitionStatus || "pending" }
    const requisition = new InventoryItem(reqData)
    await requisition.save()
    res.status(201).json({ success: true, data: requisition })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const requisition = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: requisition })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await InventoryItem.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Requisition deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

import express from "express"
import InventoryItem from "../models/InventoryItem.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

// Inventory Vouchers - documents for inventory adjustments
router.get("/", authenticate, async (req, res) => {
  try {
    const vouchers = await InventoryItem.find({ voucherType: { $exists: true } }).populate("productId branchId")
    res.json({ success: true, data: vouchers })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.get("/:id", authenticate, async (req, res) => {
  try {
    const voucher = await InventoryItem.findById(req.params.id).populate("productId branchId")
    res.json({ success: true, data: voucher })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const voucherData = { ...req.body, voucherType: req.body.voucherType || "adjustment" }
    const voucher = new InventoryItem(voucherData)
    await voucher.save()
    res.status(201).json({ success: true, data: voucher })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const voucher = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: voucher })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await InventoryItem.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Voucher deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

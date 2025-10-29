import express from "express"
import InventoryItem from "../models/InventoryItem.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", authenticate, async (req, res) => {
  try {
    const inventory = await InventoryItem.find().populate("productId branchId")
    res.json({ success: true, data: inventory })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.get("/branch/:branchId", authenticate, async (req, res) => {
  try {
    const inventory = await InventoryItem.find({ branchId: req.params.branchId }).populate("productId")
    res.json({ success: true, data: inventory })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const item = new InventoryItem(req.body)
    await item.save()
    res.status(201).json({ success: true, data: item })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: item })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

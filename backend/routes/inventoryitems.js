import express from "express"
import InventoryItem from "../models/Inventory_Item.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", authenticate, async (req, res) => {
  try {
    const items = await InventoryItem.find().populate("productId branchId")
    res.json({ success: true, data: items })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.get("/:id", authenticate, async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id).populate("productId branchId")
    res.json({ success: true, data: item })
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

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await InventoryItem.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Item deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

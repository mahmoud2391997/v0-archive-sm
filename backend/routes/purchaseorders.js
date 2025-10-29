import express from "express"
import PurchaseInvoice from "../models/PurchaseInvoice.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

// Purchase Orders - using PurchaseInvoice model with status filtering
router.get("/", authenticate, async (req, res) => {
  try {
    const orders = await PurchaseInvoice.find({ status: "pending" }).populate("supplierId branchId")
    res.json({ success: true, data: orders })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.get("/:id", authenticate, async (req, res) => {
  try {
    const order = await PurchaseInvoice.findById(req.params.id).populate("supplierId branchId")
    res.json({ success: true, data: order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const orderData = { ...req.body, status: "pending" }
    const order = new PurchaseInvoice(orderData)
    await order.save()
    res.status(201).json({ success: true, data: order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const order = await PurchaseInvoice.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await PurchaseInvoice.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Order deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

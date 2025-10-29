import express from "express"
import ManufacturingOrder from "../models/ManufacturingOrder.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", authenticate, async (req, res) => {
  try {
    const orders = await ManufacturingOrder.find().populate("branchId responsibleEmployeeId")
    res.json({ success: true, data: orders })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.get("/:id", authenticate, async (req, res) => {
  try {
    const order = await ManufacturingOrder.findById(req.params.id).populate("branchId responsibleEmployeeId")
    res.json({ success: true, data: order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const order = new ManufacturingOrder(req.body)
    await order.save()
    res.status(201).json({ success: true, data: order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const order = await ManufacturingOrder.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await ManufacturingOrder.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Order deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

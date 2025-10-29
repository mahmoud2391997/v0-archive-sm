import express from "express"
import PurchaseInvoice from "../models/PurchaseInvoice.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", authenticate, async (req, res) => {
  try {
    const purchases = await PurchaseInvoice.find().populate("supplierId branchId")
    res.json({ success: true, data: purchases })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const purchase = new PurchaseInvoice(req.body)
    await purchase.save()
    res.status(201).json({ success: true, data: purchase })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const purchase = await PurchaseInvoice.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: purchase })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

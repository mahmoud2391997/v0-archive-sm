import express from "express"
import PurchaseInvoice from "../models/PurchaseInvoice.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", authenticate, async (req, res) => {
  try {
    const invoices = await PurchaseInvoice.find().populate("supplierId branchId")
    res.json({ success: true, data: invoices })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.get("/:id", authenticate, async (req, res) => {
  try {
    const invoice = await PurchaseInvoice.findById(req.params.id).populate("supplierId branchId")
    res.json({ success: true, data: invoice })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const invoice = new PurchaseInvoice(req.body)
    await invoice.save()
    res.status(201).json({ success: true, data: invoice })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const invoice = await PurchaseInvoice.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: invoice })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await PurchaseInvoice.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Invoice deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

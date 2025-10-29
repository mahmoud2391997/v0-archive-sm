import express from "express"
import Sale from "../models/Sale.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", authenticate, async (req, res) => {
  try {
    const sales = await Sale.find().populate("customerId branchId")
    res.json({ success: true, data: sales })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const sale = new Sale(req.body)
    await sale.save()
    res.status(201).json({ success: true, data: sale })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: sale })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

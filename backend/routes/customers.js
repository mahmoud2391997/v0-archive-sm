import express from "express"
import Customer from "../models/Customer.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", authenticate, async (req, res) => {
  try {
    const customers = await Customer.find()
    res.json({ success: true, data: customers })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const customer = new Customer(req.body)
    await customer.save()
    res.status(201).json({ success: true, data: customer })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: customer })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

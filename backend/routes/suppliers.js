import express from "express"
import Supplier from "../models/Supplier.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", authenticate, async (req, res) => {
  try {
    const suppliers = await Supplier.find()
    res.json({ success: true, data: suppliers })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const supplier = new Supplier(req.body)
    await supplier.save()
    res.status(201).json({ success: true, data: supplier })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: supplier })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

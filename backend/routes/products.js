import express from "express"
import Product from "../models/Product.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", authenticate, async (req, res) => {
  try {
    const products = await Product.find()
    res.json({ success: true, data: products })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.get("/:id", authenticate, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ success: false, message: "Product not found" })
    res.json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Product deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

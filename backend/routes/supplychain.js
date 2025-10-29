import express from "express"
import SupplyChain from "../models/SupplyChain.js"

const router = express.Router()

// 🟢 Get all supply chains
router.get("/", async (req, res) => {
  try {
    const chains = await SupplyChain.find()
    res.json({ success: true, data: chains })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// 🟢 Get a single supply chain by ID
router.get("/:id", async (req, res) => {
  try {
    const chain = await SupplyChain.findById(req.params.id)
    if (!chain)
      return res.status(404).json({ success: false, message: "Supply chain not found" })
    res.json({ success: true, data: chain })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// 🟡 Create a new supply chain
router.post("/", async (req, res) => {
  try {
    const chain = new SupplyChain(req.body)
    await chain.save()
    res.status(201).json({ success: true, data: chain })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// 🟠 Update an existing supply chain
router.put("/:id", async (req, res) => {
  try {
    const chain = await SupplyChain.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!chain)
      return res.status(404).json({ success: false, message: "Supply chain not found" })
    res.json({ success: true, data: chain })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// 🔴 Delete a supply chain
router.delete("/:id", async (req, res) => {
  try {
    const chain = await SupplyChain.findByIdAndDelete(req.params.id)
    if (!chain)
      return res.status(404).json({ success: false, message: "Supply chain not found" })
    res.json({ success: true, message: "Supply chain deleted successfully" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

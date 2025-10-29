import express from "express"
import mongoose from "mongoose"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

// Create a simple FinancialAccount schema if not exists
const financialAccountSchema = new mongoose.Schema({
  accountName: String,
  accountCode: String,
  accountType: String,
  balance: { type: Number, default: 0 },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const FinancialAccount = mongoose.model("FinancialAccount", financialAccountSchema)

router.get("/", authenticate, async (req, res) => {
  try {
    const accounts = await FinancialAccount.find()
    res.json({ success: true, data: accounts })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.get("/:id", authenticate, async (req, res) => {
  try {
    const account = await FinancialAccount.findById(req.params.id)
    res.json({ success: true, data: account })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const account = new FinancialAccount(req.body)
    await account.save()
    res.status(201).json({ success: true, data: account })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const account = await FinancialAccount.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: account })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await FinancialAccount.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Account deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

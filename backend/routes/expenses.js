import express from "express"
import Expense from "../models/Expense.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", authenticate, async (req, res) => {
  try {
    const expenses = await Expense.find().populate("branchId paidFromAccountId")
    res.json({ success: true, data: expenses })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const expense = new Expense(req.body)
    await expense.save()
    res.status(201).json({ success: true, data: expense })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: expense })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

import express from "express"
import Employee from "../models/Employee.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", authenticate, async (req, res) => {
  try {
    const employees = await Employee.find().populate("branchId")
    res.json({ success: true, data: employees })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const employee = new Employee(req.body)
    await employee.save()
    res.status(201).json({ success: true, data: employee })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: employee })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

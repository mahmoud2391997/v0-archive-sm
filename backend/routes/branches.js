import express from "express"
import Branch from "../models/Branch.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", authenticate, async (req, res) => {
  try {
    const branches = await Branch.find()
    res.json({ success: true, data: branches })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const branch = new Branch(req.body)
    await branch.save()
    res.status(201).json({ success: true, data: branch })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: branch })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router

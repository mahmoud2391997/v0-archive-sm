import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

/*
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" })
    }

    const user = new User({ name, email, password, role })
    await user.save()

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || "secret", {
      expiresIn: "7d",
    })

    res.status(201).json({ success: true, token, user: { id: user._id, name, email, role } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})
*/

/*
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || "secret", {
      expiresIn: "7d",
    })

    res.json({ success: true, token, user: { id: user._id, name: user.name, email, role: user.role } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})
*/

export default router

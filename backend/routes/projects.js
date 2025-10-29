import express from "express"
import Project from "../models/Project.js"

const router = express.Router()

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
    res.json({ success: true, data: projects })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// GET single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" })
    }
    res.json({ success: true, data: project })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// POST create project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json({ success: true, data: project })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// PUT update project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" })
    }
    res.json({ success: true, data: project })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// DELETE project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" })
    }
    res.json({ success: true, data: {} })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

export default router

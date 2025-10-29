import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/products.js"
import purchaseRoutes from "./routes/purchases.js"
import salesRoutes from "./routes/sales.js"
import inventoryRoutes from "./routes/inventory.js"
import employeeRoutes from "./routes/employees.js"
import branchRoutes from "./routes/branches.js"
import supplierRoutes from "./routes/suppliers.js"
import customerRoutes from "./routes/customers.js"
import expenseRoutes from "./routes/expenses.js"
import manufacturingRoutes from "./routes/manufacturing.js"
import inventoryItemsRoutes from "./routes/inventoryitems.js"
import manufacturingOrdersRoutes from "./routes/manufacturing_orders.js"
import purchaseInvoicesRoutes from "./routes/purchaseinvoices.js"
import purchaseOrdersRoutes from "./routes/purchaseorders.js"
import inventoryVouchersRoutes from "./routes/inventoryvouchers.js"
import inventoryRequisitionsRoutes from "./routes/inventoryrequisitions.js"
import financialAccountsRoutes from "./routes/financialaccounts.js"
import projectRoutes from "./routes/projects.js"
import supplyChainsRoutes from "./routes/supplychain.js"
dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: "50mb", extended: true }))

let cachedDb = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/inventory-system", {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    cachedDb = connection
    console.log("MongoDB connected")
    return connection
  } catch (err) {
    console.error("MongoDB connection error:", err)
    throw err
  }
}

app.use(async (req, res, next) => {
  try {
    await connectToDatabase()
    next()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    })
  }
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/purchases", purchaseRoutes)
app.use("/api/sales", salesRoutes)
app.use("/api/inventory", inventoryRoutes)
app.use("/api/employees", employeeRoutes)
app.use("/api/branches", branchRoutes)
app.use("/api/suppliers", supplierRoutes)
app.use("/api/customers", customerRoutes)
app.use("/api/expenses", expenseRoutes)
app.use("/api/manufacturing", manufacturingRoutes)
app.use("/api/inventoryitems", inventoryItemsRoutes)
app.use("/api/manufacturing_orders", manufacturingOrdersRoutes)
app.use("/api/purchaseinvoices", purchaseInvoicesRoutes)
app.use("/api/purchaseorders", purchaseOrdersRoutes)
app.use("/api/inventoryvouchers", inventoryVouchersRoutes)
app.use("/api/inventoryrequisitions", inventoryRequisitionsRoutes)
app.use("/api/financialaccounts", financialAccountsRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/supplychains", supplyChainsRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? err : {},
  })
})

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

export default app

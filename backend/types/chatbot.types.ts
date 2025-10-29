// Chatbot and AI context types
import type { Sale } from "./sales.types"
import type { PurchaseInvoice } from "./purchase.types"
import type { Product } from "./common.types"
import type { InventoryItem } from "./inventory.types"
import type { Customer } from "./common.types"
import type { EmployeeData } from "./employee.types"
import type { Branch } from "./common.types"
import type { Expense } from "./finance.types"
import type { Supplier } from "./common.types"

export interface ChatbotDataContext {
  sales: Sale[]
  purchases: PurchaseInvoice[]
  products: Product[]
  inventory: InventoryItem[]
  customers: Customer[]
  employees: EmployeeData[]
  branches: Branch[]
  expenses: Expense[]
  suppliers: Supplier[]
}

export interface DailyBriefingContext {
  today: string
  yesterdaySalesTotal: number
  yesterdayInvoiceCount: number
  topSellingProducts: { name: string; quantity: number; revenue: number }[]
  lowStockItemsCount: number
  criticalLowStockItems: { name: string; quantity: number; minStock: number }[]
  pendingHRRequests: number
  upcomingRenewals: { name: string; daysUntilExpiry: number }[]
}

export interface PurchaseOrderSuggestionContext {
  branchName: string
  forecastDays: number
  inventory: {
    productId: number
    productName: string
    sku: string
    currentStock: number
    minStock: number
    salesVelocityPerDay: number
  }[]
}

export interface FormulaSuggestionContext {
  prompt: string
  rawMaterials: {
    id: number
    name: string
    sku: string
    baseUnit: "g" | "ml"
    availableQuantity: number
  }[]
}

export interface NewProductIdeaContext {
  prompt: string
  rawMaterials: {
    id: number
    name: string
    sku: string
    baseUnit: "g" | "ml"
    availableQuantity: number
  }[]
}

export interface NewProductIdeaResponse {
  productName: string
  fragranceNotes: {
    top: string
    middle: string
    base: string
  }
  formula: FormulaLine[]
}

export interface SuggestedPurchaseOrderItem {
  productId: number
  productName: string
  sku: string
  currentStock: number
  recommendedQuantity: number
  reasoning: string
}

// Import FormulaLine from manufacturing types
import type { FormulaLine } from "./manufacturing.types"

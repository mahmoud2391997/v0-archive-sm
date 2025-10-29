// Supply Chain module types

export interface Supply {
  id: number
  name: string
  sku: string
  category: string
  unitPrice: number
  baseUnit: "pcs" | "g" | "ml" | "kg" | "l"
  supplierId: number
  description?: string
  density?: number
  minStock?: number
  reorderPoint?: number
  leadTime?: number
  createdAt: string
  updatedAt: string
}

export interface SupplyChainItem {
  id: number
  sku?: string
  gtin?: string
  batchNumber?: string
  serialNumber?: string
  productName: string
  quantity: number
  unit?: string
  manufacturer?: string
  originCountry?: string
  manufactureDate?: string
  expiryDate?: string
  currentStatus?: string
  transportMode?: string
  created_at?: string
  updated_at?: string
}

export interface SupplyInventory {
  id?: number
  supplyId: number
  branchId: number
  quantity: number
  minStock?: number
  reorderPoint?: number
  lastMovementDate?: string
}

export interface SupplyMovement {
  id: number
  supplyId: number
  branchId: number
  type: "IN" | "OUT" | "TRANSFER" | "ADJUSTMENT"
  quantity: number
  date: string
  referenceType?: "PURCHASE" | "PRODUCTION" | "INVENTORY_ADJUSTMENT" | "TRANSFER"
  referenceId?: number
  notes?: string
  createdBy: number
}

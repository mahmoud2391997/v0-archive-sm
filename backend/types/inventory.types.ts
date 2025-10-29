// Inventory module types

export interface InventoryItem {
  branchId: number
  productId: number
  quantity: number
  minStock: number
  lotNumber?: string
  expiryDate?: string
}

export type AdjustmentReason =
  | "Damaged Goods"
  | "Stock Count Correction"
  | "Initial Stock"
  | "Return to Supplier"
  | "Other"

export interface InventoryAdjustmentLog {
  id: number
  date: string
  branchId: number
  productId: number
  adjustedByUserId: number
  oldQuantity: number
  newQuantity: number
  reason: AdjustmentReason
  notes?: string
}

export interface InventoryMovement {
  id: string | number
  date: string
  type: string
  quantityChange: number
  quantityAfter: number
  relatedDoc?: string
  user?: string
  branchId: number
}

export interface InventoryVoucher {
  id: string
  date: string
  status: "تمت الموافقة"
  description: string
  details: string
  createdBy: string
  branch: string
  type: "up" | "down"
}

export interface InventoryRequisitionItem {
  productId: number
  quantity: number
}

export interface InventoryRequisition {
  id: string
  date: string
  type: "Purchase" | "Transfer"
  warehouseId: string
  items: InventoryRequisitionItem[]
  notes?: string
  attachments?: any[]
}

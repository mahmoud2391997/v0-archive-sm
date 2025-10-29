// Purchase module types
import type { DocStatus, PaymentMethod } from "./common.types"

export interface PurchaseInvoiceItem {
  id: number
  productId: number
  description?: string
  quantity: number
  unitPrice: number
  discountPercent?: number
  taxId?: number
  total: number
}

export interface PurchaseInvoice {
  id: number
  invoiceNumber: string
  date: string
  supplierId: number
  items: PurchaseInvoiceItem[]
  totalAmount: number
  status: DocStatus
  paymentStatus: "Unpaid" | "Partially Paid" | "Paid"
  dueDate?: string
  notes?: string
  attachment?: string
  createdBy: number
  createdAt: string
  updatedAt: string
}

export interface PurchaseRequestItem {
  id: number
  productId: number
  quantity: number
  estimatedUnitPrice?: number
  notes?: string
}

export interface PurchaseRequest {
  id: number
  requestNumber: string
  date: string
  requesterUserId: number
  branchId: number
  items: PurchaseRequestItem[]
  status: DocStatus
  approvedBy?: number
  approvedAt?: string
  notes?: string
  attachment?: string
  createdAt: string
  updatedAt: string
}

export interface PurchaseOrderItem {
  id: number
  productId: number
  description?: string
  quantity: number
  unitPrice: number
  discountPercent?: number
  taxId?: number
  total: number
}

export interface PurchaseOrder {
  id: number
  orderNumber: string
  date: string
  supplierId: number
  items: PurchaseOrderItem[]
  totalAmount: number
  status: DocStatus
  expectedDeliveryDate?: string
  notes?: string
  attachment?: string
  purchaseRequestIds?: number[]
  createdBy: number
  createdAt: string
  updatedAt: string
}

export interface PurchaseReturnItem {
  id: number
  productId: number
  quantity: number
  reason: string
}

export interface PurchaseReturn {
  id: number
  returnNumber: string
  date: string
  supplierId: number
  originalInvoiceId: number
  items: PurchaseReturnItem[]
  totalAmount: number
  status: DocStatus
  notes?: string
  createdBy: number
  createdAt: string
  updatedAt: string
}

export interface DebitNoteItem {
  id: number
  productId: number
  description?: string
  quantity: number
  unitPrice: number
  discountPercent?: number
  taxId?: number
  total: number
}

export interface DebitNote {
  id: number
  date: string
  supplierId: number
  items: DebitNoteItem[]
  amount: number
  reason: string
  debitNoteNumber?: string
  notes?: string
  purchaseReturnId?: number
}

export interface RequestForQuotationItem {
  productId: number
  quantity: number
}

export interface RequestForQuotation {
  id: number
  date: string
  code?: string
  supplierIds: number[]
  items: RequestForQuotationItem[]
  deadline: string
  dueDate?: string
  status: "Draft" | "Sent" | "Closed"
  notes?: string
  attachment?: string
  purchaseRequestIds?: number[]
}

export interface PurchaseQuotationItem {
  productId: number
  description?: string
  quantity: number
  unitPrice: number
  discountPercent?: number
  taxId?: number
  total: number
}

export interface PurchaseQuotation {
  id: number
  rfqId: number
  supplierId: number
  date: string
  items: PurchaseQuotationItem[]
  totalAmount: number
  status: "Received" | "Accepted" | "Rejected"
  notes?: string
  shippingCost?: number
  discountAmount?: number
}

export interface SupplierPayment {
  id: number
  date: string
  supplierId: number
  amount: number
  paymentMethod: PaymentMethod
  notes?: string
}

export interface PurchaseApprovalTier {
  id: number
  minAmount: number
  approverRole: string
}

export interface PurchaseSettings {
  defaultPaymentTermsDays: number
  defaultShippingPreference: "Collect" | "Delivery"
  isApprovalWorkflowEnabled: boolean
  approvalTiers: PurchaseApprovalTier[]
}

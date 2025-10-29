// Sales module types
import type { PaymentMethod } from "./common.types"

export interface SaleItem {
  id: number
  productName: string
  productId: number
  quantity: number
  unitPrice: number
  total: number
}

export interface Sale {
  id: number
  branchId: number
  brand: "Arabiva" | "Generic"
  invoiceNumber: string
  customerId?: number
  customerName: string
  date: string
  totalAmount: number
  paymentMethod: PaymentMethod
  paymentStatus: "Paid" | "Pending" | "Overdue"
  items: SaleItem[]
  sessionId?: number
  quotationId?: number
}

export interface SalesQuotationItem {
  productId: number
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

export interface SalesQuotation {
  id: number
  quoteNumber: string
  customerId: number
  date: string
  expiryDate: string
  items: SalesQuotationItem[]
  totalAmount: number
  status: "Draft" | "Sent" | "Accepted" | "Rejected" | "Expired"
}

export interface SalesReturnItem {
  productId: number
  quantity: number
  reason: string
}

export interface SalesReturn {
  id: number
  returnNumber: string
  date: string
  originalInvoiceId: number
  customerId: number
  items: SalesReturnItem[]
  totalReturnedAmount: number
  status: "Draft" | "Returned" | "Completed"
}

export interface CreditNote {
  id: number
  noteNumber: string
  date: string
  salesReturnId?: number
  customerId: number
  amount: number
  reason: string
  status: "Open" | "Applied" | "Void"
}

export interface RecurringInvoice {
  id: number
  customerId: number
  startDate: string
  frequency: "Monthly" | "Quarterly" | "Yearly"
  items: SaleItem[]
  totalAmount: number
  nextInvoiceDate: string
  status: "Active" | "Paused" | "Ended"
}

export interface CustomerPayment {
  id: number
  paymentNumber: string
  date: string
  customerId: number
  amount: number
  paymentMethod: PaymentMethod
  appliedToInvoiceId?: number
  notes?: string
}

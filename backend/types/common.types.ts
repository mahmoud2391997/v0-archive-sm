// Common types used across modules

export type Role = string // Placeholder declaration for Role
export type Permission = string // Placeholder declaration for Permission

export interface User {
  id: number
  username: string
  email: string
  role: Role
  permissions: Permission[]
  branchId?: number
  projectId?: number
  isActive: boolean
  lastLogin?: string
}

export interface Project {
  id: number
  name: string
  description?: string
  startDate: string
  endDate?: string
  status: "Active" | "Completed" | "On Hold"
  manager: string
}

export interface Branch {
  id: number
  name: string
  address: string
  phone: string
  email?: string
  manager?: string
  isHeadOffice: boolean
  isActive: boolean
}

export interface Customer {
  id?: number | string
  _id?: string
  name: string
  email: string
  phone: string
  address: string
  balance: number
  branchId?: number
  projectId?: number
  addedBy: string
}

export interface Supplier {
  id: number
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  taxNumber?: string
  paymentTerms?: string
  notes?: string
}

export interface Currency {
  code: string
  name: string
  symbol: string
  exchangeRate: number
}

export enum DocStatus {
  Draft = "Draft",
  Submitted = "Submitted",
  Approved = "Approved",
  Rejected = "Rejected",
  Cancelled = "Cancelled",
  Completed = "Completed",
}

export type PaymentMethod = "Cash" | "Card" | "K-Net" | "Credit" | "MyFatoorah"

export interface Product {
  id: number
  _id?: string
  name: string
  sku: string
  category: string
  unitPrice: number
  baseUnit: "pcs" | "g" | "ml"
  productLine?: string
  fragranceNotes?: { top: string; middle: string; base: string }
  components?: { productId: number; quantity: number }[]
  barcode?: string
  density?: number
  description?: string
  brand?: string
  unitTemplate?: string
  purchasePrice?: number
  taxId?: number
  isTaxable?: boolean
  lowestSellingPrice?: number
  discountPercent?: number
  hasExpiryDate?: boolean
  trackInventory?: boolean
  trackingType?: "None" | "Quantity"
  alertQuantity?: number
  internalNotes?: string
  tags?: string
  status?: "Active" | "Inactive"
  supplierProductCode?: string
  image?: string
}

export interface Comment {
  id: number
  userId: number
  userName: string
  timestamp: string
  text: string
}

export enum BranchStatus {
  Active = "Active",
  Inactive = "Inactive",
  Suspended = "Suspended",
}

export enum BusinessType {
  Retail = "Retail",
  Wholesale = "Wholesale",
  Manufacturing = "Manufacturing",
  Service = "Service",
  Distribution = "Distribution",
}

export enum AttachmentType {
  Image = "Image",
  Document = "Document",
  PDF = "PDF",
  Spreadsheet = "Spreadsheet",
  Other = "Other",
}

export enum PaymentStatus {
  Paid = "Paid",
  Pending = "Pending",
  Overdue = "Overdue",
  PartiallyPaid = "PartiallyPaid",
  Cancelled = "Cancelled",
}

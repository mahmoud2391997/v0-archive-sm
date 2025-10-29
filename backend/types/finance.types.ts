// Finance module types

export enum ExpenseCategory {
  Utilities = "Utilities",
  Rent = "Rent",
  Salaries = "Salaries",
  MarketingBranding = "Marketing & Branding",
  RawMaterials = "Raw Materials",
  Packaging = "Packaging",
  EcommerceFees = "E-commerce Fees",
  LabSupplies = "Lab Supplies",
  ShippingDelivery = "Shipping & Delivery",
  GovernmentFees = "Government Fees",
  Maintenance = "Maintenance",
  Other = "Other",
}

export interface Expense {
  id: number
  date: string
  branchId: number
  category: ExpenseCategory
  amount: number
  description: string
  paidFromAccountId: number
}

export interface FinancialAccount {
  id: number
  name: string
  type: "Bank" | "Cash"
  branchId?: number
  balance: number
}

export type AccountType = "Asset" | "Liability" | "Equity" | "Revenue" | "Expense"

export interface Account {
  id: string
  name: string
  type: AccountType
  children?: Account[]
}

export interface GeneralLedgerEntry {
  id: string
  date: string
  account: string
  description: string
  debit: number
  credit: number
  sourceType: "Sale" | "Purchase" | "Expense" | "Other"
  sourceId: number | string
}

export interface JournalVoucherLine {
  id: number
  accountId: string
  debit: number
  credit: number
  description?: string
}

export interface JournalVoucher {
  id: number
  date: string
  reference: string
  lines: JournalVoucherLine[]
}

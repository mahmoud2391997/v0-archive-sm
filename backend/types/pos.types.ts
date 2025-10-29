// Point of Sale module types

export interface POSSession {
  id: number
  startTime: string
  endTime?: string
  status: "Open" | "Closed"
  openingBalance: number
  closingBalance?: number
  totalSalesValue: number
  salesIds: number[]
  branchId: number
}

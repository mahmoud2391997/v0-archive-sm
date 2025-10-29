// Employee and HR module types

export type EmployeeAttachmentType = "Passport" | "ID" | "CV" | "Other"

export interface EmployeeAttachment {
  id: number
  name: string
  type: EmployeeAttachmentType
  file: File
  uploadDate: string
}

export interface EmployeeBenefit {
  title: string
  description: string
  icon: string
}

export interface EmployeeData {
  id: number
  name: string
  position: string
  branchId: number
  salary: number
  allowances: number
  advances: number
  hireDate: string
  annualLeaveDays: number
  attachments?: EmployeeAttachment[]
  benefits?: EmployeeBenefit[]
}

export type LeaveType = "Annual" | "Sick" | "Emergency" | "Unpaid"
export type RequestStatus = "Pending" | "Approved" | "Rejected"

export interface LeaveRequest {
  id: number
  employeeId: number
  leaveType: LeaveType
  startDate: string
  endDate: string
  totalDays: number
  reason: string
  status: RequestStatus
}

export interface AdvanceRequest {
  id: number
  employeeId: number
  amount: number
  reason: string
  requestDate: string
  status: RequestStatus
}

export type GeneralRequestType = "Salary Certificate" | "Experience Certificate" | "Information Update" | "Other"

export interface GeneralRequest {
  id: number
  employeeId: number
  type: GeneralRequestType | string
  details: string
  requestDate: string
  status: RequestStatus
}

export type AttendanceStatus = "Present" | "Late" | "Absent"

export interface AttendanceRecord {
  id: number
  employeeId: number
  date: string
  status: AttendanceStatus
  lateMinutes?: number
}

export interface JournalEntry {
  account: string
  debit: number
  credit: number
}

export interface SalaryPayment {
  id: string
  employeeId: number
  month: number
  year: number
  basicSalary: number
  allowances: number
  grossSalary: number
  deductions: {
    advances: number
    lateness: number
    absence: number
    unpaidLeave: number
    total: number
  }
  netSalary: number
  paidDate: string
  journalEntries: JournalEntry[]
}

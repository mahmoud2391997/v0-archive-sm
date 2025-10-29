// Manufacturing module types
import type { Comment } from "./common.types"

export enum ManufacturingType {
  INTERNAL = "INTERNAL",
  CONTRACT = "CONTRACT",
}

export enum ConcentrationType {
  EDT_15 = "EDT_15",
  EDP_20 = "EDP_20",
  EXTRAIT_15 = "EXTRAIT_30",
  OIL_100 = "OIL_100",
}

export enum MaterialKind {
  AROMA_OIL = "AROMA_OIL",
  ETHANOL = "ETHANOL",
  DI_WATER = "DI_WATER",
  FIXATIVE = "FIXATIVE",
  COLOR = "COLOR",
  ADDITIVE = "ADDITIVE",
}

export enum ClarityLevel {
  Clear = "Clear",
  SlightHaze = "Slight Haze",
  Hazy = "Hazy",
}

export enum QCResult {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  REWORK = "REWORK",
}

export enum ManufacturingStatus {
  DRAFT = "DRAFT",
  IN_PROGRESS = "IN_PROGRESS",
  MACERATING = "MACERATING",
  QC = "QC",
  PACKAGING = "PACKAGING",
  DONE = "DONE",
  CLOSED = "CLOSED",
}

export type ProductionOrderStatus_Legacy = "Pending" | "In Progress" | "Completed"

export interface ProductionOrder_Legacy {
  id: number
  productId: number
  quantity: number
  branchId: number
  status: ProductionOrderStatus_Legacy
  creationDate: string
}

export type ProductionTaskStatus = "To Do" | "In Progress" | "Completed"

export interface ProductionTask {
  id: number
  name: string
  productionOrderId: string
  assignedToEmployeeId?: number
  deadline?: string
  status: ProductionTaskStatus
  notes?: string
  comments?: Comment[]
}

// Perfume Manufacturing Types
export type Concentration = "EDT_15" | "EDP_20" | "EXTRAIT_30" | "OIL_100"

export type FormulaLine = {
  id: string
  materialId: number
  materialName: string
  materialSku: string
  kind: "AROMA_OIL" | "ETHANOL" | "DI_WATER" | "FIXATIVE" | "COLOR" | "ADDITIVE"
  percentage: number
  density?: number
}

export type ProcessLoss = {
  mixingLossPct: number
  filtrationLossPct: number
  fillingLossPct: number
}

export type QCCheck = {
  appearance: string
  clarity: "Clear" | "Slight Haze" | "Hazy"
  density?: number
  refractiveIndex?: number
  odorMatch: "Pass" | "Borderline" | "Fail"
  stabilityNotes?: string
  result: "APPROVED" | "REJECTED" | "REWORK"
  attachments?: string[]
}

export type PackagingItem = {
  productId: number
  name: string
  qtyPerUnit: number
}

export interface ManufacturingOrder {
  id: string
  productName: string
  manufacturingType: "INTERNAL" | "CONTRACT"
  responsibleEmployeeId?: number
  concentration: Concentration
  bottleSizeMl: number
  unitsRequested: number
  batchCode: string
  branchId: number
  manufacturingDate?: string
  expiryDate?: string
  dueAt?: string
  formula: FormulaLine[]
  processLoss: ProcessLoss
  macerationDays: number
  chilling?: { hours: number; temperatureC: number }
  filtration?: { stages: number; micron: number }
  qc?: QCCheck
  packagingItems: PackagingItem[]
  costs: {
    materials: number
    labor: number
    overhead: number
    packaging: number
    other: number
    total: number
    perMl: number
    perBottle: number
    suggestedRetail: number
  }
  yield: {
    theoreticalMl: number
    expectedMl: number
    actualMl?: number
    expectedUnits: number
    actualUnits?: number
    yieldPercentage?: number
  }
  distribution?: { id: string; locationName: string; units: number }[]
  status: "DRAFT" | "IN_PROGRESS" | "MACERATING" | "QC" | "PACKAGING" | "DONE" | "CLOSED"
}

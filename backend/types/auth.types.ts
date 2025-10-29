// Authentication and Authorization types

export enum Role {
  Admin = "Admin",
  Manager = "Manager",
  Employee = "Employee",
  Accountant = "Accountant",
  Cashier = "Cashier",
  Supervisor = "Supervisor",
  InventoryManager = "InventoryManager",
  ProductionManager = "ProductionManager",
  SalesManager = "SalesManager",
  PurchaseManager = "PurchaseManager",
  HRManager = "HRManager",
}

export enum Permission {
  // User management
  UserCreate = "user:create",
  UserRead = "user:read",
  UserUpdate = "user:update",
  UserDelete = "user:delete",

  // Product management
  ProductCreate = "product:create",
  ProductRead = "product:read",
  ProductUpdate = "product:update",
  ProductDelete = "product:delete",

  // Inventory management
  InventoryCreate = "inventory:create",
  InventoryRead = "inventory:read",
  InventoryUpdate = "inventory:update",
  InventoryDelete = "inventory:delete",

  // Sales management
  SaleCreate = "sale:create",
  SaleRead = "sale:read",
  SaleUpdate = "sale:update",
  SaleDelete = "sale:delete",

  // Purchase management
  PurchaseCreate = "purchase:create",
  PurchaseRead = "purchase:read",
  PurchaseUpdate = "purchase:update",
  PurchaseDelete = "purchase:delete",

  // Supplier management
  SupplierCreate = "supplier:create",
  SupplierRead = "supplier:read",
  SupplierUpdate = "supplier:update",
  SupplierDelete = "supplier:delete",

  // Customer management
  CustomerCreate = "customer:create",
  CustomerRead = "customer:read",
  CustomerUpdate = "customer:update",
  CustomerDelete = "customer:delete",

  // Report management
  ReportCreate = "report:create",
  ReportRead = "report:read",

  // Branch management
  BranchCreate = "branch:create",
  BranchRead = "branch:read",
  BranchUpdate = "branch:update",
  BranchDelete = "branch:delete",

  // Project management
  ProjectCreate = "project:create",
  ProjectRead = "project:read",
  ProjectUpdate = "project:update",
  ProjectDelete = "project:delete",

  // Employee management
  EmployeeCreate = "employee:create",
  EmployeeRead = "employee:read",
  EmployeeUpdate = "employee:update",
  EmployeeDelete = "employee:delete",

  // Expense management
  ExpenseCreate = "expense:create",
  ExpenseRead = "expense:read",
  ExpenseUpdate = "expense:update",
  ExpenseDelete = "expense:delete",

  // Finance management
  FinanceCreate = "finance:create",
  FinanceRead = "finance:read",
  FinanceUpdate = "finance:update",
  FinanceDelete = "finance:delete",

  // Manufacturing management
  ManufacturingCreate = "manufacturing:create",
  ManufacturingRead = "manufacturing:read",
  ManufacturingUpdate = "manufacturing:update",
  ManufacturingDelete = "manufacturing:delete",

  // POS management
  POSCreate = "pos:create",
  POSRead = "pos:read",
  POSUpdate = "pos:update",
  POSDelete = "pos:delete",

  // Settings management
  SettingsUpdate = "settings:update",
  SettingsRead = "settings:read",

  // Supply management
  SuppliesCreate = "supplies:create",
  SuppliesRead = "supplies:read",
  SuppliesUpdate = "supplies:update",
  SuppliesDelete = "supplies:delete",
}

export interface Report {
  name: string
  description: string
  requiredPermission: Permission
}

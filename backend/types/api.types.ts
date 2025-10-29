/**
 * API Request and Response Types
 * Complete documentation of all API endpoints with their request/response bodies
 */

import type {
  Sale,
  PurchaseInvoice,
  InventoryItem,
  ManufacturingOrder,
  Employee,
  Branch,
  Customer,
  Supplier,
  Product,
  Project,
  Expense,
  PurchaseOrder,
  InventoryRequisition,
} from "./index"

// ============================================
// COMMON API RESPONSE TYPES
// ============================================

export interface ApiSuccessResponse<T = any> {
  success: true
  data: T
  message?: string
}

export interface ApiErrorResponse {
  success: false
  message: string
  errors?: Record<string, string[]>
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse

// ============================================
// AUTHENTICATION API
// ============================================

export namespace AuthAPI {
  // POST /api/auth/register
  export interface RegisterRequest {
    name: string
    email: string
    password: string
    role?: "admin" | "manager" | "employee"
  }

  export interface RegisterResponse {
    success: true
    token: string
    user: {
      id: string
      name: string
      email: string
      role: string
    }
  }

  // POST /api/auth/login
  export interface LoginRequest {
    email: string
    password: string
  }

  export interface LoginResponse {
    success: true
    token: string
    user: {
      id: string
      name: string
      email: string
      role: string
    }
  }
}

// ============================================
// SALES API
// ============================================

export namespace SalesAPI {
  // GET /api/sales
  export interface GetAllSalesResponse extends ApiSuccessResponse<Sale[]> {}

  // POST /api/sales
  export interface CreateSaleRequest extends Omit<Sale, "_id" | "createdAt" | "updatedAt"> {}
  export interface CreateSaleResponse extends ApiSuccessResponse<Sale> {}

  // PUT /api/sales/:id
  export interface UpdateSaleRequest extends Partial<Omit<Sale, "_id" | "createdAt" | "updatedAt">> {}
  export interface UpdateSaleResponse extends ApiSuccessResponse<Sale> {}

  // GET /api/sales/:id
  export interface GetSaleResponse extends ApiSuccessResponse<Sale> {}

  // DELETE /api/sales/:id
  export interface DeleteSaleResponse extends ApiSuccessResponse<{ message: string }> {}
}

// ============================================
// PURCHASE INVOICE API
// ============================================

export namespace PurchaseInvoiceAPI {
  // GET /api/purchaseinvoices
  export interface GetAllPurchaseInvoicesResponse extends ApiSuccessResponse<PurchaseInvoice[]> {}

  // POST /api/purchaseinvoices
  export interface CreatePurchaseInvoiceRequest extends Omit<PurchaseInvoice, "_id" | "createdAt" | "updatedAt"> {}
  export interface CreatePurchaseInvoiceResponse extends ApiSuccessResponse<PurchaseInvoice> {}

  // PUT /api/purchaseinvoices/:id
  export interface UpdatePurchaseInvoiceRequest
    extends Partial<Omit<PurchaseInvoice, "_id" | "createdAt" | "updatedAt">> {}
  export interface UpdatePurchaseInvoiceResponse extends ApiSuccessResponse<PurchaseInvoice> {}

  // GET /api/purchaseinvoices/:id
  export interface GetPurchaseInvoiceResponse extends ApiSuccessResponse<PurchaseInvoice> {}
}

// ============================================
// PURCHASE ORDER API
// ============================================

export namespace PurchaseOrderAPI {
  // GET /api/purchaseorders
  export interface GetAllPurchaseOrdersResponse extends ApiSuccessResponse<PurchaseOrder[]> {}

  // POST /api/purchaseorders
  export interface CreatePurchaseOrderRequest extends Omit<PurchaseOrder, "_id" | "createdAt" | "updatedAt"> {}
  export interface CreatePurchaseOrderResponse extends ApiSuccessResponse<PurchaseOrder> {}

  // PUT /api/purchaseorders/:id
  export interface UpdatePurchaseOrderRequest extends Partial<Omit<PurchaseOrder, "_id" | "createdAt" | "updatedAt">> {}
  export interface UpdatePurchaseOrderResponse extends ApiSuccessResponse<PurchaseOrder> {}
}

// ============================================
// INVENTORY API
// ============================================

export namespace InventoryAPI {
  // GET /api/inventory
  export interface GetAllInventoryResponse extends ApiSuccessResponse<InventoryItem[]> {}

  // GET /api/inventory/branch/:branchId
  export interface GetBranchInventoryResponse extends ApiSuccessResponse<InventoryItem[]> {}

  // POST /api/inventory
  export interface CreateInventoryItemRequest extends Omit<InventoryItem, "_id" | "createdAt" | "updatedAt"> {}
  export interface CreateInventoryItemResponse extends ApiSuccessResponse<InventoryItem> {}

  // PUT /api/inventory/:id
  export interface UpdateInventoryItemRequest extends Partial<Omit<InventoryItem, "_id" | "createdAt" | "updatedAt">> {}
  export interface UpdateInventoryItemResponse extends ApiSuccessResponse<InventoryItem> {}
}

// ============================================
// INVENTORY REQUISITION API
// ============================================

export namespace InventoryRequisitionAPI {
  // GET /api/inventoryrequisitions
  export interface GetAllRequisitionsResponse extends ApiSuccessResponse<InventoryRequisition[]> {}

  // POST /api/inventoryrequisitions
  export interface CreateRequisitionRequest extends Omit<InventoryRequisition, "_id" | "createdAt" | "updatedAt"> {}
  export interface CreateRequisitionResponse extends ApiSuccessResponse<InventoryRequisition> {}

  // PUT /api/inventoryrequisitions/:id
  export interface UpdateRequisitionRequest
    extends Partial<Omit<InventoryRequisition, "_id" | "createdAt" | "updatedAt">> {}
  export interface UpdateRequisitionResponse extends ApiSuccessResponse<InventoryRequisition> {}
}

// ============================================
// MANUFACTURING ORDER API
// ============================================

export namespace ManufacturingOrderAPI {
  // GET /api/manufacturing_orders
  export interface GetAllOrdersResponse extends ApiSuccessResponse<ManufacturingOrder[]> {}

  // GET /api/manufacturing_orders/:id
  export interface GetOrderResponse extends ApiSuccessResponse<ManufacturingOrder> {}

  // POST /api/manufacturing_orders
  export interface CreateOrderRequest extends Omit<ManufacturingOrder, "_id" | "createdAt" | "updatedAt"> {}
  export interface CreateOrderResponse extends ApiSuccessResponse<ManufacturingOrder> {}

  // PUT /api/manufacturing_orders/:id
  export interface UpdateOrderRequest extends Partial<Omit<ManufacturingOrder, "_id" | "createdAt" | "updatedAt">> {}
  export interface UpdateOrderResponse extends ApiSuccessResponse<ManufacturingOrder> {}

  // DELETE /api/manufacturing_orders/:id
  export interface DeleteOrderResponse extends ApiSuccessResponse<{ message: string }> {}
}

// ============================================
// EMPLOYEE API
// ============================================

export namespace EmployeeAPI {
  // GET /api/employees
  export interface GetAllEmployeesResponse extends ApiSuccessResponse<Employee[]> {}

  // POST /api/employees
  export interface CreateEmployeeRequest extends Omit<Employee, "_id" | "createdAt" | "updatedAt"> {}
  export interface CreateEmployeeResponse extends ApiSuccessResponse<Employee> {}

  // PUT /api/employees/:id
  export interface UpdateEmployeeRequest extends Partial<Omit<Employee, "_id" | "createdAt" | "updatedAt">> {}
  export interface UpdateEmployeeResponse extends ApiSuccessResponse<Employee> {}

  // GET /api/employees/:id
  export interface GetEmployeeResponse extends ApiSuccessResponse<Employee> {}
}

// ============================================
// BRANCH API
// ============================================

export namespace BranchAPI {
  // GET /api/branches
  export interface GetAllBranchesResponse extends ApiSuccessResponse<Branch[]> {}

  // POST /api/branches
  export interface CreateBranchRequest extends Omit<Branch, "_id" | "createdAt" | "updatedAt"> {}
  export interface CreateBranchResponse extends ApiSuccessResponse<Branch> {}

  // PUT /api/branches/:id
  export interface UpdateBranchRequest extends Partial<Omit<Branch, "_id" | "createdAt" | "updatedAt">> {}
  export interface UpdateBranchResponse extends ApiSuccessResponse<Branch> {}

  // GET /api/branches/:id
  export interface GetBranchResponse extends ApiSuccessResponse<Branch> {}
}

// ============================================
// CUSTOMER API
// ============================================

export namespace CustomerAPI {
  // GET /api/customers
  export interface GetAllCustomersResponse extends ApiSuccessResponse<Customer[]> {}

  // POST /api/customers
  export interface CreateCustomerRequest extends Omit<Customer, "_id" | "createdAt" | "updatedAt"> {}
  export interface CreateCustomerResponse extends ApiSuccessResponse<Customer> {}

  // PUT /api/customers/:id
  export interface UpdateCustomerRequest extends Partial<Omit<Customer, "_id" | "createdAt" | "updatedAt">> {}
  export interface UpdateCustomerResponse extends ApiSuccessResponse<Customer> {}

  // GET /api/customers/:id
  export interface GetCustomerResponse extends ApiSuccessResponse<Customer> {}
}

// ============================================
// SUPPLIER API
// ============================================

export namespace SupplierAPI {
  // GET /api/suppliers
  export interface GetAllSuppliersResponse extends ApiSuccessResponse<Supplier[]> {}

  // POST /api/suppliers
  export interface CreateSupplierRequest extends Omit<Supplier, "_id" | "createdAt" | "updatedAt"> {}
  export interface CreateSupplierResponse extends ApiSuccessResponse<Supplier> {}

  // PUT /api/suppliers/:id
  export interface UpdateSupplierRequest extends Partial<Omit<Supplier, "_id" | "createdAt" | "updatedAt">> {}
  export interface UpdateSupplierResponse extends ApiSuccessResponse<Supplier> {}

  // GET /api/suppliers/:id
  export interface GetSupplierResponse extends ApiSuccessResponse<Supplier> {}
}

// ============================================
// PRODUCT API
// ============================================

export namespace ProductAPI {
  // GET /api/products
  export interface GetAllProductsResponse extends ApiSuccessResponse<Product[]> {}

  // POST /api/products
  export interface CreateProductRequest extends Omit<Product, "_id" | "createdAt" | "updatedAt"> {}
  export interface CreateProductResponse extends ApiSuccessResponse<Product> {}

  // PUT /api/products/:id
  export interface UpdateProductRequest extends Partial<Omit<Product, "_id" | "createdAt" | "updatedAt">> {}
  export interface UpdateProductResponse extends ApiSuccessResponse<Product> {}

  // GET /api/products/:id
  export interface GetProductResponse extends ApiSuccessResponse<Product> {}
}

// ============================================
// PROJECT API
// ============================================

export namespace ProjectAPI {
  // GET /api/projects
  export interface GetAllProjectsResponse extends ApiSuccessResponse<Project[]> {}

  // POST /api/projects
  export interface CreateProjectRequest extends Omit<Project, "_id" | "createdAt" | "updatedAt"> {}
  export interface CreateProjectResponse extends ApiSuccessResponse<Project> {}

  // PUT /api/projects/:id
  export interface UpdateProjectRequest extends Partial<Omit<Project, "_id" | "createdAt" | "updatedAt">> {}
  export interface UpdateProjectResponse extends ApiSuccessResponse<Project> {}

  // GET /api/projects/:id
  export interface GetProjectResponse extends ApiSuccessResponse<Project> {}
}

// ============================================
// EXPENSE API
// ============================================

export namespace ExpenseAPI {
  // GET /api/expenses
  export interface GetAllExpensesResponse extends ApiSuccessResponse<Expense[]> {}

  // POST /api/expenses
  export interface CreateExpenseRequest extends Omit<Expense, "_id" | "createdAt" | "updatedAt"> {}
  export interface CreateExpenseResponse extends ApiSuccessResponse<Expense> {}

  // PUT /api/expenses/:id
  export interface UpdateExpenseRequest extends Partial<Omit<Expense, "_id" | "createdAt" | "updatedAt">> {}
  export interface UpdateExpenseResponse extends ApiSuccessResponse<Expense> {}

  // GET /api/expenses/:id
  export interface GetExpenseResponse extends ApiSuccessResponse<Expense> {}
}

// ============================================
// QUERY PARAMETERS
// ============================================

export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: "asc" | "desc"
}

export interface DateRangeParams {
  startDate?: string
  endDate?: string
}

export interface FilterParams {
  status?: string
  branchId?: string
  customerId?: string
  supplierId?: string
  employeeId?: string
}

// ============================================
// BULK OPERATIONS
// ============================================

export interface BulkCreateRequest<T> {
  items: T[]
}

export interface BulkUpdateRequest<T> {
  updates: Array<{ id: string; data: Partial<T> }>
}

export interface BulkDeleteRequest {
  ids: string[]
}

export interface BulkOperationResponse {
  success: true
  created?: number
  updated?: number
  deleted?: number
  failed?: number
  errors?: Array<{ id: string; error: string }>
}

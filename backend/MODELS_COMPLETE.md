# Server Models - Collection Mapping ✅

All 28 MongoDB collections are now properly configured with explicit collection names.

## Complete Model List

| # | Collection Name | Model File | Model Name | Status |
|---|----------------|------------|------------|--------|
| 1 | `branches` | Branch.js | Branch | ✅ Updated |
| 2 | `branchinventories` | BranchInventory.js | BranchInventory | ✅ New |
| 3 | `customers` | Customer.js | Customer | ✅ Updated |
| 4 | `employees` | Employee.js | Employee | ✅ Updated |
| 5 | `expenses` | Expense.js | Expense | ✅ Updated |
| 6 | `financialaccounts` | FinancialAccount.js | FinancialAccount | ✅ New |
| 7 | `inventory_items` | Inventory_Item.js | Inventory_Item | ✅ New |
| 8 | `inventoryitemalts` | InventoryItemAlt.js | InventoryItemAlt | ✅ New |
| 9 | `inventoryitems` | InventoryItem.js | InventoryItem | ✅ Updated |
| 10 | `inventorymovements` | InventoryMovement.js | InventoryMovement | ✅ New |
| 11 | `inventoryrequisitions` | InventoryRequisition.js | InventoryRequisition | ✅ New |
| 12 | `inventoryvouchers` | InventoryVoucher.js | InventoryVoucher | ✅ New |
| 13 | `manufacturing_orders` | ManufacturingOrder.js | ManufacturingOrder | ✅ Updated |
| 14 | `manufacturingorders` | ManufacturingOrders.js | ManufacturingOrders | ✅ New |
| 15 | `productcomponents` | ProductComponent.js | ProductComponent | ✅ New |
| 16 | `products` | Product.js | Product | ✅ Updated |
| 17 | `productvariants` | ProductVariant.js | ProductVariant | ✅ New |
| 18 | `projects` | Project.js | Project | ✅ New |
| 19 | `purchaseinvoices` | PurchaseInvoice.js | PurchaseInvoice | ✅ Updated |
| 20 | `purchaseorders` | PurchaseOrder.js | PurchaseOrder | ✅ New |
| 21 | `sales` | Sale.js | Sale | ✅ Updated |
| 22 | `scans` | Scan.js | Scan | ✅ New |
| 23 | `stockmovements` | StockMovement.js | StockMovement | ✅ New |
| 24 | `suppliers` | Supplier.js | Supplier | ✅ Updated |
| 25 | `supplychainitems` | SupplyChainItem.js | SupplyChainItem | ✅ New |
| 26 | `supplychains` | SupplyChain.js | SupplyChain | ✅ New |
| 27 | `supplyorders` | SupplyOrder.js | SupplyOrder | ✅ New |
| 28 | `users` | User.js | User | ✅ Updated |

## Model Export Format

All models now use the explicit collection name format:

\`\`\`javascript
export default mongoose.model("ModelName", schema, "collectionname")
\`\`\`

### Example:
\`\`\`javascript
// Product.js
export default mongoose.model("Product", productSchema, "products")

// InventoryVoucher.js
export default mongoose.model("InventoryVoucher", inventoryVoucherSchema, "inventoryvouchers")
\`\`\`

## Changes Made

### Updated Existing Models (11)
Added explicit collection names to:
- Branch.js → `"branches"`
- Customer.js → `"customers"`
- Employee.js → `"employees"`
- Expense.js → `"expenses"`
- InventoryItem.js → `"inventoryitems"`
- ManufacturingOrder.js → `"manufacturing_orders"`
- Product.js → `"products"`
- PurchaseInvoice.js → `"purchaseinvoices"`
- Sale.js → `"sales"`
- Supplier.js → `"suppliers"`
- User.js → `"users"`

### Created New Models (17)
- BranchInventory.js → `"branchinventories"`
- FinancialAccount.js → `"financialaccounts"`
- Inventory_Item.js → `"inventory_items"` (underscore format)
- InventoryItemAlt.js → `"inventoryitemalts"`
- InventoryMovement.js → `"inventorymovements"`
- InventoryRequisition.js → `"inventoryrequisitions"`
- InventoryVoucher.js → `"inventoryvouchers"`
- ManufacturingOrders.js → `"manufacturingorders"` (no underscore)
- ProductComponent.js → `"productcomponents"`
- ProductVariant.js → `"productvariants"`
- Project.js → `"projects"`
- PurchaseOrder.js → `"purchaseorders"`
- Scan.js → `"scans"`
- StockMovement.js → `"stockmovements"`
- SupplyChain.js → `"supplychains"`
- SupplyChainItem.js → `"supplychainitems"`
- SupplyOrder.js → `"supplyorders"`

## Verification

To verify all collections are accessible:

\`\`\`bash
# Start MongoDB shell
mongosh inventory-system

# List all collections
show collections

# Count documents in each collection
db.products.countDocuments()
db.branches.countDocuments()
db.inventoryitems.countDocuments()
# ... etc
\`\`\`

## Redux Integration

All these collection names are already configured in the Redux store at:
`asas-system/redux-store/store/slices.ts`

The Redux store can now fetch from all 28 collections using:
\`\`\`tsx
dispatch(slices.products.thunks.list(undefined))
dispatch(slices.branches.thunks.list(undefined))
dispatch(slices.inventoryitems.thunks.list(undefined))
// ... etc
\`\`\`

## API Endpoints

All collections are accessible via REST API:
- `GET /api/products` - List all products
- `GET /api/branches` - List all branches
- `GET /api/inventoryitems` - List all inventory items
- ... (and so on for all 28 collections)

---

**Status:** ✅ All 28 models configured with correct collection names  
**Date:** 2025-10-27

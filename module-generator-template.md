# Laravel Module Generator Template

## Usage Instructions
Replace the following placeholders with your desired values:
- `{MODULE_NAME}` - Module name (e.g., Branch, Product, User)
- `{module_name}` - Lowercase module name (e.g., branch, product, user)
- `{MODULE_TITLE}` - Display title (e.g., Branch Management, Product Catalog)
- `{ICON_NAME}` - Lucide icon name (e.g., Building2, Package, Users)
- `{FIELDS}` - Replace with your specific fields

## Example Field Definitions
```
// Branch Module Fields:
branch_name: string (required)
address: text (required)
city: string (required)
state: string (required)
country: string (required)
zip_code: string (required)
status: enum[active,inactive] (default: active)

// Product Module Fields:
product_name: string (required)
description: text
price: decimal (required)
category_id: integer (foreign key)
status: enum[active,inactive] (default: active)
```

## Generated Files Structure
```
Modules/{MODULE_NAME}/
├── app/
│   ├── Http/
│   │   ├── Controllers/{MODULE_NAME}Controller.php
│   │   ├── Requests/Store{MODULE_NAME}Request.php
│   │   └── Requests/Update{MODULE_NAME}Request.php
│   ├── Models/{MODULE_NAME}.php
│   ├── Services/{MODULE_NAME}Service.php
│   └── Providers/{MODULE_NAME}ServiceProvider.php
├── database/
│   ├── migrations/create_{module_name}s_table.php
│   └── factories/{MODULE_NAME}Factory.php
├── resources/assets/js/pages/{MODULE_NAME}/
│   ├── Index.tsx
│   ├── Create.tsx
│   ├── Edit.tsx
│   └── Show.tsx
└── routes/web.php
```

## Key Features Generated
✅ Full CRUD operations (Create, Read, Update, Delete)
✅ React Hook Form integration
✅ Ziggy route management
✅ Proper validation (frontend & backend)
✅ Search and filtering
✅ Responsive design with Tailwind CSS
✅ Modern UI components (shadcn/ui)
✅ TypeScript support
✅ Inertia.js integration
✅ Service layer architecture
✅ Factory and seeder support

## Instructions for Cascade AI
When user provides:
1. MODULE_NAME (e.g., "Product")
2. FIELDS specification (e.g., "name:string, price:decimal, status:enum")

Generate complete module with:
- Backend: Controller, Model, Service, Requests, Migration, Factory
- Frontend: Index, Create, Edit, Show components with React Hook Form
- Routes: Web routes with Ziggy integration
- Sidebar: Add menu item to AdminLayout
- All files follow the exact same patterns as Branch module

## Field Type Mappings
- `string` → VARCHAR(255), Input component
- `text` → TEXT, Textarea component  
- `integer` → INTEGER, Input type="number"
- `decimal` → DECIMAL(10,2), Input type="number" step="0.01"
- `boolean` → BOOLEAN, Checkbox component
- `enum[val1,val2]` → ENUM, Select component
- `date` → DATE, Input type="date"
- `datetime` → TIMESTAMP, Input type="datetime-local"
- `foreign_key` → BIGINT UNSIGNED, Select with relationship

## Validation Rules
- `required` → Laravel: required, React: { required: 'Field is required' }
- `min:3` → Laravel: min:3, React: { minLength: { value: 3, message: 'Min 3 chars' }}
- `max:255` → Laravel: max:255, React: { maxLength: { value: 255, message: 'Max 255 chars' }}
- `email` → Laravel: email, React: { pattern: { value: /email/, message: 'Invalid email' }}

## Example Usage
```
MODULE_NAME: Product
FIELDS:
- product_name: string (required, max:255)
- description: text
- price: decimal (required, min:0)
- category_id: integer (foreign key to categories)
- status: enum[active,inactive,draft] (default: draft)
- featured: boolean (default: false)
- launch_date: date
```

This will generate a complete Product module with all CRUD operations, validation, and UI components following the exact same patterns as the Branch module.

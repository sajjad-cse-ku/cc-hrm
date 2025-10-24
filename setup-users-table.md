# User Management Table Setup

## Database Setup Commands

Run these commands in your terminal to set up the user management table:

```bash
# Run the migration to add new columns to users table
php artisan migrate

# Seed the database with sample user data
php artisan db:seed --class=UserTableSeeder

# Or run all seeders
php artisan db:seed
```

## Database Structure

The users table now includes:
- `username` (string, unique) - User's unique username
- `name` (string) - User's full name  
- `email` (string, unique) - User's email address
- `phone_number` (string, nullable) - User's phone number
- `status` (enum) - active, inactive, invited, suspended
- `role` (enum) - superadmin, admin, manager, cashier
- `email_verified_at` (timestamp) - Email verification timestamp
- `created_at` (timestamp) - Account creation date

## Features Implemented

### Frontend (React/TypeScript)
- ✅ Server-side rendered table with Inertia.js
- ✅ Advanced filtering by status and role
- ✅ Real-time search across username, name, email, phone
- ✅ Sortable columns
- ✅ Pagination with customizable rows per page
- ✅ Responsive design matching your reference image
- ✅ Action dropdowns for each user (View, Edit, Delete)
- ✅ Status and role badges with proper styling
- ✅ Column visibility controls

### Backend (Laravel)
- ✅ Optimized database queries with select() for performance
- ✅ Server-side filtering and pagination
- ✅ Search functionality across multiple fields
- ✅ Proper validation and security
- ✅ RESTful API endpoints
- ✅ Database migration for new columns
- ✅ Sample data seeder

## Usage

1. Navigate to `/admin/users` to view the user management table
2. Use the search bar to filter users by username, name, email, or phone
3. Use dropdown filters to filter by status or role  
4. Click the View dropdown to show/hide columns
5. Use pagination controls to navigate through pages
6. Click the action menu (⋯) to view, edit, or delete users

## API Endpoints

- `GET /admin/users` - List users with filtering and pagination
- `GET /admin/users/{id}` - View single user
- `GET /admin/users/create` - Create user form
- `POST /admin/users` - Store new user
- `GET /admin/users/{id}/edit` - Edit user form  
- `PUT /admin/users/{id}` - Update user
- `DELETE /admin/users/{id}` - Delete user

All data is server-side rendered and comes directly from your Laravel database with optimized queries for performance.

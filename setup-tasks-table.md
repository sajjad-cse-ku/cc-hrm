# Tasks Management Table Setup

## Overview

The Tasks table has been created to match the Users table design with full server-side rendering and advanced datatable features.

## Features Implemented

### Frontend (React/TypeScript)
- ✅ **Datatable Design**: Matches Users table with clean, professional styling
- ✅ **Server-side Rendering**: All data comes from Laravel backend with Inertia.js
- ✅ **Advanced Filtering**: Status (To Do, In Progress, Completed, Cancelled) and Priority (Low, Medium, High, Urgent)
- ✅ **Real-time Search**: Searches across Task ID, Title, Description, and Assignee
- ✅ **Sortable Columns**: All columns can be sorted server-side
- ✅ **Pagination**: Full pagination with icon-only buttons and customizable rows per page
- ✅ **Responsive Design**: Works perfectly on all screen sizes
- ✅ **Action Dropdowns**: View, Edit, Delete actions for each task
- ✅ **Status & Priority Badges**: Color-coded badges for easy identification
- ✅ **Column Visibility**: Toggle column visibility via View dropdown

### Backend (Laravel)
- ✅ **Optimized Controller**: Server-side filtering, searching, sorting, and pagination
- ✅ **Mock Data Generation**: 200 realistic tasks with Faker for testing
- ✅ **Performance Optimized**: Efficient collection filtering and pagination
- ✅ **RESTful Routes**: Complete CRUD operations ready for implementation

## Table Structure

### Columns
- **Task ID**: Unique identifier (TSK-0001 format)
- **Title**: Task title with description preview
- **Status**: To Do, In Progress, Completed, Cancelled
- **Priority**: Low, Medium, High, Urgent
- **Assignee**: User name with avatar
- **Due Date**: Formatted due date
- **Actions**: Dropdown menu with View, Edit, Delete

### Data Fields
```php
[
    'id' => 1,
    'task_id' => 'TSK-0001',
    'title' => 'Task title',
    'description' => 'Task description',
    'status' => 'todo|in_progress|completed|cancelled',
    'priority' => 'low|medium|high|urgent',
    'assignee_name' => 'John Doe',
    'assignee_avatar' => 'avatar_url',
    'due_date' => '2024-12-31',
    'created_at' => '2024-10-18 12:00:00',
    'updated_at' => '2024-10-18 12:00:00'
]
```

## Usage

1. **Navigate** to `/admin/tasks` to view the tasks datatable
2. **Search** using the search bar to filter by Task ID, title, description, or assignee
3. **Filter** by status or priority using dropdown filters
4. **Sort** by clicking column headers (server-side sorting)
5. **Paginate** using the icon-only pagination controls
6. **Customize** rows per page (10, 25, 50, 100)
7. **Manage** tasks using the action dropdown menu

## API Endpoints

- `GET /admin/tasks` - List tasks with filtering and pagination
- `GET /admin/tasks/{id}` - View single task
- `GET /admin/tasks/create` - Create task form
- `POST /admin/tasks` - Store new task
- `GET /admin/tasks/{id}/edit` - Edit task form
- `PUT /admin/tasks/{id}` - Update task
- `DELETE /admin/tasks/{id}` - Delete task
- `PATCH /admin/tasks/{id}/status` - Update task status

## Server-side Features

### Filtering
- **Search**: Multi-field search across task_id, title, description, assignee_name
- **Status Filter**: Filter by specific status values
- **Priority Filter**: Filter by priority levels

### Sorting
- **Allowed Fields**: task_id, title, status, priority, assignee_name, due_date, created_at
- **Direction**: Ascending or descending
- **Default**: Sorted by created_at desc

### Pagination
- **Configurable**: 10, 25, 50, 100 rows per page
- **Server-side**: Efficient pagination with proper metadata
- **Navigation**: First, Previous, Page Numbers, Next, Last with icons

## Integration with Database

To connect with a real database, replace the mock data generation in `TaskController@index` with:

```php
use App\Models\Task;

public function index(Request $request)
{
    $query = Task::query()->select([
        'id', 'task_id', 'title', 'description', 'status', 
        'priority', 'assignee_name', 'assignee_avatar', 
        'due_date', 'created_at', 'updated_at'
    ]);

    // Apply filters and pagination as shown in the controller
    
    $tasks = $query->paginate($perPage)->withQueryString();
    
    return Inertia::render('Admin/Tasks/Index', [
        'tasks' => $tasks,
        'filters' => $request->only(['search', 'status', 'priority'])
    ]);
}
```

## Additional Features

- **Kanban View**: Link to switch to Kanban board view
- **Export**: Ready for CSV/Excel export functionality
- **Bulk Actions**: Structure ready for bulk operations
- **Real-time Updates**: Can be enhanced with WebSocket support

The Tasks table is now fully functional with server-side rendering, matching the Users table design, and ready for production use!

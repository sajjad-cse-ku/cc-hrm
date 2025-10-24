import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  ChevronDown,
  Settings2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'

interface Task {
  id: number
  task_id: string
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee_name: string
  assignee_avatar?: string
  due_date: string
  created_at: string
  updated_at: string
}

interface TasksIndexProps {
  tasks: {
    data: Task[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
  filters: {
    search?: string
    status?: string
    priority?: string
  }
}

export default function TasksIndex({ tasks, filters }: TasksIndexProps) {
  const [search, setSearch] = useState(filters.search || '')

  const handleFilterChange = (key: string, value: string) => {
    router.get('/admin/tasks', { 
      ...filters, 
      [key]: value === 'all' ? undefined : value 
    }, { 
      preserveState: true,
      preserveScroll: true 
    })
  }

  const handleSearch = (value: string) => {
    router.get('/admin/tasks', { 
      ...filters, 
      search: value || undefined 
    }, { 
      preserveState: true,
      preserveScroll: true 
    })
  }

  const handleDelete = (taskId: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      router.delete(`/admin/tasks/${taskId}`)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      todo: { variant: 'secondary' as const, label: 'To Do' },
      in_progress: { variant: 'default' as const, label: 'In Progress' },
      completed: { variant: 'default' as const, label: 'Completed' },
      cancelled: { variant: 'destructive' as const, label: 'Cancelled' }
    }
    return variants[status as keyof typeof variants] || variants.todo
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: { variant: 'secondary' as const, label: 'Low' },
      medium: { variant: 'outline' as const, label: 'Medium' },
      high: { variant: 'destructive' as const, label: 'High' },
      urgent: { variant: 'destructive' as const, label: 'Urgent' }
    }
    return variants[priority as keyof typeof variants] || variants.low
  }

  return (
    <AdminLayout>
      <Head title="Task List" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Task List</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage and track your project tasks here.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/apps/kanban">
                <Calendar className="mr-2 h-4 w-4" />
                Kanban View
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/admin/tasks/create">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Filter tasks..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  const timeoutId = setTimeout(() => {
                    handleSearch(e.target.value)
                  }, 300)
                  return () => clearTimeout(timeoutId)
                }}
                className="pl-10 w-80"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Status
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={!filters.status}
                  onCheckedChange={() => handleFilterChange('status', 'all')}
                >
                  All Status
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.status === 'todo'}
                  onCheckedChange={() => handleFilterChange('status', 'todo')}
                >
                  To Do
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.status === 'in_progress'}
                  onCheckedChange={() => handleFilterChange('status', 'in_progress')}
                >
                  In Progress
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.status === 'completed'}
                  onCheckedChange={() => handleFilterChange('status', 'completed')}
                >
                  Completed
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.status === 'cancelled'}
                  onCheckedChange={() => handleFilterChange('status', 'cancelled')}
                >
                  Cancelled
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings2 className="mr-2 h-4 w-4" />
                  Priority
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={!filters.priority}
                  onCheckedChange={() => handleFilterChange('priority', 'all')}
                >
                  All Priorities
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.priority === 'urgent'}
                  onCheckedChange={() => handleFilterChange('priority', 'urgent')}
                >
                  Urgent
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.priority === 'high'}
                  onCheckedChange={() => handleFilterChange('priority', 'high')}
                >
                  High
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.priority === 'medium'}
                  onCheckedChange={() => handleFilterChange('priority', 'medium')}
                >
                  Medium
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.priority === 'low'}
                  onCheckedChange={() => handleFilterChange('priority', 'low')}
                >
                  Low
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings2 className="mr-2 h-4 w-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Table Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Task ID</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Title</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Priority</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Assignee</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Due Date</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tasks Table */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-medium text-gray-900">Task ID</TableHead>
                <TableHead className="font-medium text-gray-900">Title</TableHead>
                <TableHead className="font-medium text-gray-900">Status</TableHead>
                <TableHead className="font-medium text-gray-900">Priority</TableHead>
                <TableHead className="font-medium text-gray-900">Assignee</TableHead>
                <TableHead className="font-medium text-gray-900">Due Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.data.map((task) => {
                const statusBadge = getStatusBadge(task.status)
                const priorityBadge = getPriorityBadge(task.priority)
                
                return (
                  <TableRow key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <TableCell className="font-medium text-blue-600">
                      {task.task_id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {task.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusBadge.variant} className="text-xs">
                        {statusBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={priorityBadge.variant} className="text-xs">
                        {priorityBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee_avatar} />
                          <AvatarFallback className="text-xs">
                            {task.assignee_name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-900">{task.assignee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(task.due_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/tasks/${task.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/tasks/${task.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(task.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {tasks.data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {tasks.last_page > 1 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select
                value={tasks.per_page.toString()}
                onValueChange={(value) => handleFilterChange('per_page', value)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-600">Rows per page</span>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-600">
                Page {tasks.current_page} of {tasks.last_page}
              </p>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={tasks.current_page === 1}
                  onClick={() => handleFilterChange('page', '1')}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={tasks.current_page === 1}
                  onClick={() => handleFilterChange('page', (tasks.current_page - 1).toString())}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, tasks.last_page) }, (_, i) => {
                  const page = Math.max(1, tasks.current_page - 2) + i
                  if (page > tasks.last_page) return null
                  
                  return (
                    <Button
                      key={page}
                      variant={page === tasks.current_page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFilterChange('page', page.toString())}
                    >
                      {page}
                    </Button>
                  )
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  disabled={tasks.current_page === tasks.last_page}
                  onClick={() => handleFilterChange('page', (tasks.current_page + 1).toString())}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={tasks.current_page === tasks.last_page}
                  onClick={() => handleFilterChange('page', tasks.last_page.toString())}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

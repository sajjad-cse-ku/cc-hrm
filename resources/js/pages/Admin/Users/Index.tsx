import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
  UserPlus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'

interface User {
  id: number
  username: string
  name: string
  email: string
  phone_number?: string
  status: 'active' | 'inactive' | 'invited' | 'suspended'
  role: 'admin' | 'manager' | 'cashier' | 'superadmin'
  email_verified_at: string | null
  created_at: string
}

interface UsersIndexProps {
  users: {
    data: User[]
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
    role?: string
  }
}

export default function UsersIndex({ users, filters }: UsersIndexProps) {
  const [search, setSearch] = useState(filters.search || '')

  const handleFilterChange = (key: string, value: string) => {
    router.get('/admin/users', { 
      ...filters, 
      [key]: value === 'all' ? undefined : value 
    }, { 
      preserveState: true,
      preserveScroll: true 
    })
  }

  const handleSearch = (value: string) => {
    router.get('/admin/users', { 
      ...filters, 
      search: value || undefined 
    }, { 
      preserveState: true,
      preserveScroll: true 
    })
  }

  const handleDelete = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      router.delete(`/admin/users/${userId}`)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: 'default' as const, label: 'Active' },
      inactive: { variant: 'secondary' as const, label: 'Inactive' },
      invited: { variant: 'outline' as const, label: 'Invited' },
      suspended: { variant: 'destructive' as const, label: 'Suspended' }
    }
    return variants[status as keyof typeof variants] || variants.inactive
  }

  const getRoleBadge = (role: string) => {
    const variants = {
      superadmin: { variant: 'default' as const, label: 'Superadmin' },
      admin: { variant: 'secondary' as const, label: 'Admin' },
      manager: { variant: 'outline' as const, label: 'Manager' },
      cashier: { variant: 'secondary' as const, label: 'Cashier' }
    }
    return variants[role as keyof typeof variants] || variants.cashier
  }

  return (
    <AdminLayout>
      <Head title="User List" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">User List</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your users and their roles here.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite User
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Filter users..."
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
                  checked={filters.status === 'active'}
                  onCheckedChange={() => handleFilterChange('status', 'active')}
                >
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.status === 'invited'}
                  onCheckedChange={() => handleFilterChange('status', 'invited')}
                >
                  Invited
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.status === 'suspended'}
                  onCheckedChange={() => handleFilterChange('status', 'suspended')}
                >
                  Suspended
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings2 className="mr-2 h-4 w-4" />
                  Role
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={!filters.role}
                  onCheckedChange={() => handleFilterChange('role', 'all')}
                >
                  All Roles
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.role === 'superadmin'}
                  onCheckedChange={() => handleFilterChange('role', 'superadmin')}
                >
                  Superadmin
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.role === 'admin'}
                  onCheckedChange={() => handleFilterChange('role', 'admin')}
                >
                  Admin
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.role === 'manager'}
                  onCheckedChange={() => handleFilterChange('role', 'manager')}
                >
                  Manager
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.role === 'cashier'}
                  onCheckedChange={() => handleFilterChange('role', 'cashier')}
                >
                  Cashier
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
              <DropdownMenuCheckboxItem checked>Username</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Name</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Email</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Phone Number</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Role</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-medium text-gray-900">Username</TableHead>
                <TableHead className="font-medium text-gray-900">Name</TableHead>
                <TableHead className="font-medium text-gray-900">Email</TableHead>
                <TableHead className="font-medium text-gray-900">Phone Number</TableHead>
                <TableHead className="font-medium text-gray-900">Status</TableHead>
                <TableHead className="font-medium text-gray-900">Role</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.map((user) => {
                const statusBadge = getStatusBadge(user.status)
                const roleBadge = getRoleBadge(user.role)
                
                return (
                  <TableRow key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <TableCell className="font-medium text-blue-600">
                      {user.username}
                    </TableCell>
                    <TableCell className="text-gray-900">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.phone_number || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusBadge.variant} className="text-xs">
                        {statusBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={roleBadge.variant} className="text-xs">
                        {roleBadge.label}
                      </Badge>
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
                            <Link href={`/admin/users/${user.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${user.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(user.id)}
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

          {users.data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {users.last_page > 1 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select
                value={users.per_page.toString()}
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
                Page {users.current_page} of {users.last_page}
              </p>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={users.current_page === 1}
                  onClick={() => handleFilterChange('page', '1')}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={users.current_page === 1}
                  onClick={() => handleFilterChange('page', (users.current_page - 1).toString())}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, users.last_page) }, (_, i) => {
                  const page = Math.max(1, users.current_page - 2) + i
                  if (page > users.last_page) return null
                  
                  return (
                    <Button
                      key={page}
                      variant={page === users.current_page ? "default" : "outline"}
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
                  disabled={users.current_page === users.last_page}
                  onClick={() => handleFilterChange('page', (users.current_page + 1).toString())}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={users.current_page === users.last_page}
                  onClick={() => handleFilterChange('page', users.last_page.toString())}
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

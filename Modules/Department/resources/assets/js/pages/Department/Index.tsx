import { Head, Link, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { useState } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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
  Building,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'

interface Branch {
  id: number
  branch_name: string
}

interface Department {
  id: number
  name: string
  branch_id: number
  branch: Branch
  description: string
  status: 'active' | 'inactive'
  created_at: string
}

interface DepartmentsIndexProps {
  departments: {
    data: Department[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
  branches: Branch[]
  filters: {
    search?: string
    status?: string
    branch_id?: string
  }
}

export default function Index({ departments, branches, filters }: DepartmentsIndexProps) {
  const [search, setSearch] = useState(filters?.search || '')

  const handleFilterChange = (key: string, value: string) => {
    router.get(route('admin.departments.index'), {
      ...filters,
      [key]: value === 'all' ? undefined : value
    }, {
      preserveState: true,
      preserveScroll: true
    })
  }

  const handleSearch = (value: string) => {
    router.get(route('admin.departments.index'), {
      ...filters,
      search: value || undefined
    }, {
      preserveState: true,
      preserveScroll: true
    })
  }

  const handleDelete = (departmentId: number) => {
    if (confirm('Are you sure you want to delete this department?')) {
      router.delete(route('admin.departments.destroy', departmentId))
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: 'default' as const, label: 'Active' },
      inactive: { variant: 'secondary' as const, label: 'Inactive' }
    }
    return variants[status as keyof typeof variants] || variants.inactive
  }

  return (
    <AdminLayout>
      <Head title="Department List" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Department List</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your departments and their branches here.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" asChild>
              <Link href={route('admin.departments.create')}>
                <Plus className="mr-2 h-4 w-4" />
                Add Department
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
                placeholder="Filter departments..."
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
                  checked={!filters?.status}
                  onCheckedChange={() => handleFilterChange('status', 'all')}
                >
                  All Status
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters?.status === 'active'}
                  onCheckedChange={() => handleFilterChange('status', 'active')}
                >
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters?.status === 'inactive'}
                  onCheckedChange={() => handleFilterChange('status', 'inactive')}
                >
                  Inactive
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings2 className="mr-2 h-4 w-4" />
                  Branch
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Filter by Branch</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={!filters?.branch_id}
                  onCheckedChange={() => handleFilterChange('branch_id', 'all')}
                >
                  All Branches
                </DropdownMenuCheckboxItem>
                {branches.map((branch) => (
                  <DropdownMenuCheckboxItem
                    key={branch.id}
                    checked={filters?.branch_id === branch.id.toString()}
                    onCheckedChange={() => handleFilterChange('branch_id', branch.id.toString())}
                  >
                    {branch.branch_name}
                  </DropdownMenuCheckboxItem>
                ))}
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
              <DropdownMenuCheckboxItem checked>Name</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Branch</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Description</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Departments Table */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-medium text-gray-900">Name</TableHead>
                <TableHead className="font-medium text-gray-900">Branch</TableHead>
                <TableHead className="font-medium text-gray-900">Description</TableHead>
                <TableHead className="font-medium text-gray-900">Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.data.map((department) => {
                const statusBadge = getStatusBadge(department.status)

                return (
                  <TableRow key={department.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <TableCell className="font-medium text-blue-600">
                      {department.name}
                    </TableCell>
                    <TableCell className="text-gray-900">
                      {department.branch?.branch_name || '-'}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {department.description ? (
                        <span className="line-clamp-2">{department.description}</span>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusBadge.variant} className="text-xs">
                        {statusBadge.label}
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
                            <Link href={route('admin.departments.show', department.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={route('admin.departments.edit', department.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(department.id)}
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

          {departments.data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No departments found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {departments.total > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select
                value={departments.per_page.toString()}
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
                Page {departments.current_page} of {departments.last_page}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={departments.current_page === 1}
                  onClick={() => handleFilterChange('page', '1')}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={departments.current_page === 1}
                  onClick={() => handleFilterChange('page', (departments.current_page - 1).toString())}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, departments.last_page) }, (_, i) => {
                  const page = Math.max(1, departments.current_page - 2) + i
                  if (page > departments.last_page) return null

                  return (
                    <Button
                      key={page}
                      variant={page === departments.current_page ? "default" : "outline"}
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
                  disabled={departments.current_page === departments.last_page}
                  onClick={() => handleFilterChange('page', (departments.current_page + 1).toString())}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={departments.current_page === departments.last_page}
                  onClick={() => handleFilterChange('page', departments.last_page.toString())}
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

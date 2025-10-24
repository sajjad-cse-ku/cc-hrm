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
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'

interface Branch {
  id: number
  branch_name: string
  address: string
  city: string
  state: string
  country: string
  zip_code: string
  status: 'active' | 'inactive'
  created_at: string
}

interface BranchesIndexProps {
  branches: {
    data: Branch[]
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
    country?: string
  }
}

export default function Index({ branches, filters }: BranchesIndexProps) {
  const [search, setSearch] = useState(filters?.search || '')

  // Demo data if no branches provided
  const demoBranches = {
    data: [
      { 
        id: 1, 
        branch_name: "Main Branch", 
        address: "123 Main Street", 
        city: "New York", 
        state: "NY", 
        country: "USA", 
        zip_code: "10001",
        status: 'active' as const,
        created_at: "2024-01-15"
      },
      { 
        id: 2, 
        branch_name: "Downtown Branch", 
        address: "456 Downtown Ave", 
        city: "Los Angeles", 
        state: "CA", 
        country: "USA", 
        zip_code: "90210",
        status: 'active' as const,
        created_at: "2024-02-20"
      },
      { 
        id: 3, 
        branch_name: "North Branch", 
        address: "789 North Road", 
        city: "Chicago", 
        state: "IL", 
        country: "USA", 
        zip_code: "60601",
        status: 'inactive' as const,
        created_at: "2024-03-10"
      },
    ],
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 3,
    from: 1,
    to: 3
  }

  const branchData = branches || demoBranches

  const handleFilterChange = (key: string, value: string) => {
    router.get('/admin/branches', { 
      ...filters, 
      [key]: value === 'all' ? undefined : value 
    }, { 
      preserveState: true,
      preserveScroll: true 
    })
  }

  const handleSearch = (value: string) => {
    router.get('/admin/branches', { 
      ...filters, 
      search: value || undefined 
    }, { 
      preserveState: true,
      preserveScroll: true 
    })
  }

  const handleDelete = (branchId: number) => {
    if (confirm('Are you sure you want to delete this branch?')) {
      router.delete(route('admin.branches.destroy', branchId))
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
      <Head title="Branch List" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Branch List</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your branches and their locations here.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" asChild>
              <Link href={route('admin.branches.create')}>
                <Plus className="mr-2 h-4 w-4" />
                Add Branch
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
                placeholder="Filter branches..."
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
                  Country
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Filter by Country</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={!filters?.country}
                  onCheckedChange={() => handleFilterChange('country', 'all')}
                >
                  All Countries
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters?.country === 'USA'}
                  onCheckedChange={() => handleFilterChange('country', 'USA')}
                >
                  USA
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters?.country === 'Canada'}
                  onCheckedChange={() => handleFilterChange('country', 'Canada')}
                >
                  Canada
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
              <DropdownMenuCheckboxItem checked>Branch Name</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Address</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>City</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>State</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Country</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Branches Table */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-medium text-gray-900">Branch Name</TableHead>
                <TableHead className="font-medium text-gray-900">Address</TableHead>
                <TableHead className="font-medium text-gray-900">City</TableHead>
                <TableHead className="font-medium text-gray-900">State</TableHead>
                <TableHead className="font-medium text-gray-900">Country</TableHead>
                <TableHead className="font-medium text-gray-900">Zip Code</TableHead>
                <TableHead className="font-medium text-gray-900">Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branchData.data.map((branch) => {
                const statusBadge = getStatusBadge(branch.status)
                
                return (
                  <TableRow key={branch.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <TableCell className="font-medium text-blue-600">
                      {branch.branch_name}
                    </TableCell>
                    <TableCell className="text-gray-900">
                      {branch.address}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {branch.city}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {branch.state}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {branch.country}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {branch.zip_code}
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
                            <Link href={route('admin.branches.show', branch.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={route('admin.branches.edit', branch.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(branch.id)}
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

          {branchData.data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No branches found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {branchData.last_page > 1 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select
                value={branchData.per_page.toString()}
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
                Page {branchData.current_page} of {branchData.last_page}
              </p>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={branchData.current_page === 1}
                  onClick={() => handleFilterChange('page', '1')}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={branchData.current_page === 1}
                  onClick={() => handleFilterChange('page', (branchData.current_page - 1).toString())}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, branchData.last_page) }, (_, i) => {
                  const page = Math.max(1, branchData.current_page - 2) + i
                  if (page > branchData.last_page) return null
                  
                  return (
                    <Button
                      key={page}
                      variant={page === branchData.current_page ? "default" : "outline"}
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
                  disabled={branchData.current_page === branchData.last_page}
                  onClick={() => handleFilterChange('page', (branchData.current_page + 1).toString())}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={branchData.current_page === branchData.last_page}
                  onClick={() => handleFilterChange('page', branchData.last_page.toString())}
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

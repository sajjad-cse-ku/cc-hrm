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

interface DocumentType {
  id: number
  name: string
  description: string
  required: 'required' | 'optional'
  status: 'active' | 'inactive'
  created_at: string
}

interface DocumentTypesIndexProps {
  documentTypes: {
    data: DocumentType[]
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
    required?: string
  }
}

export default function Index({ documentTypes, filters }: DocumentTypesIndexProps) {
  const [search, setSearch] = useState(filters?.search || '')

  const handleFilterChange = (key: string, value: string) => {
    router.get(route('admin.document-types.index'), {
      ...filters,
      [key]: value === 'all' ? undefined : value
    }, {
      preserveState: true,
      preserveScroll: true
    })
  }

  const handleSearch = (value: string) => {
    router.get(route('admin.document-types.index'), {
      ...filters,
      search: value || undefined
    }, {
      preserveState: true,
      preserveScroll: true
    })
  }

  const handleDelete = (documentTypeId: number) => {
    if (confirm('Are you sure you want to delete this document type?')) {
      router.delete(route('admin.document-types.destroy', documentTypeId))
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: 'default' as const, label: 'Active' },
      inactive: { variant: 'secondary' as const, label: 'Inactive' }
    }
    return variants[status as keyof typeof variants] || variants.inactive
  }

  const getRequiredBadge = (required: string) => {
    const variants = {
      required: { variant: 'destructive' as const, label: 'Required' },
      optional: { variant: 'outline' as const, label: 'Optional' }
    }
    return variants[required as keyof typeof variants] || variants.optional
  }

  return (
    <AdminLayout>
      <Head title="Document Types" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Document Types</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage document types for your organization.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" asChild>
              <Link href={route('admin.document-types.create')}>
                <Plus className="mr-2 h-4 w-4" />
                Add Document Type
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
                placeholder="Filter document types..."
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
                  Required
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Filter by Required</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={!filters?.required}
                  onCheckedChange={() => handleFilterChange('required', 'all')}
                >
                  All Types
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters?.required === 'required'}
                  onCheckedChange={() => handleFilterChange('required', 'required')}
                >
                  Required
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters?.required === 'optional'}
                  onCheckedChange={() => handleFilterChange('required', 'optional')}
                >
                  Optional
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
              <DropdownMenuCheckboxItem checked>Name</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Description</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Required</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Document Types Table */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-medium text-gray-900">Name</TableHead>
                <TableHead className="font-medium text-gray-900">Description</TableHead>
                <TableHead className="font-medium text-gray-900">Required</TableHead>
                <TableHead className="font-medium text-gray-900">Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentTypes.data.map((documentType) => {
                const statusBadge = getStatusBadge(documentType.status)
                const requiredBadge = getRequiredBadge(documentType.required)

                return (
                  <TableRow key={documentType.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <TableCell className="font-medium text-blue-600">
                      {documentType.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {documentType.description ? (
                        <span className="line-clamp-2">{documentType.description}</span>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={requiredBadge.variant} className="text-xs">
                        {requiredBadge.label}
                      </Badge>
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
                            <Link href={route('admin.document-types.show', documentType.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={route('admin.document-types.edit', documentType.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(documentType.id)}
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

          {documentTypes.data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No document types found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {documentTypes.total > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select
                value={documentTypes.per_page.toString()}
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
                Page {documentTypes.current_page} of {documentTypes.last_page}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={documentTypes.current_page === 1}
                  onClick={() => handleFilterChange('page', '1')}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={documentTypes.current_page === 1}
                  onClick={() => handleFilterChange('page', (documentTypes.current_page - 1).toString())}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, documentTypes.last_page) }, (_, i) => {
                  const page = Math.max(1, documentTypes.current_page - 2) + i
                  if (page > documentTypes.last_page) return null

                  return (
                    <Button
                      key={page}
                      variant={page === documentTypes.current_page ? "default" : "outline"}
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
                  disabled={documentTypes.current_page === documentTypes.last_page}
                  onClick={() => handleFilterChange('page', (documentTypes.current_page + 1).toString())}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={documentTypes.current_page === documentTypes.last_page}
                  onClick={() => handleFilterChange('page', documentTypes.last_page.toString())}
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

import { Head, Link, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Edit, Trash2, Building2 } from 'lucide-react'

interface Branch {
  id: number
  branch_name: string
  address?: string
  city?: string
}

interface Department {
  id: number
  name: string
  branch_id: number
  branch: Branch
  description: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

interface ShowProps {
  department: Department
}

export default function Show({ department }: ShowProps) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this department?')) {
      router.delete(route('admin.departments.destroy', department.id))
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: 'default' as const, label: 'Active' },
      inactive: { variant: 'secondary' as const, label: 'Inactive' }
    }
    return variants[status as keyof typeof variants] || variants.inactive
  }

  const statusBadge = getStatusBadge(department.status)

  return (
    <AdminLayout>
      <Head title={`Department: ${department.name}`} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Department Details</h1>
            <p className="text-sm text-gray-600 mt-1">
              View department information and details.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href={route('admin.departments.index')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to List
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={route('admin.departments.edit', department.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Department Information Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{department.name}</CardTitle>
                <CardDescription className="mt-2">
                  Department information and status
                </CardDescription>
              </div>
              <Badge variant={statusBadge.variant} className="text-sm px-3 py-1">
                {statusBadge.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department Name */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Department Name</p>
                <p className="text-base text-gray-900">{department.name}</p>
              </div>

              {/* Branch */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Branch</p>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <p className="text-base text-gray-900">
                    {department.branch?.branch_name || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
                <Badge variant={statusBadge.variant} className="text-xs">
                  {statusBadge.label}
                </Badge>
              </div>

              {/* Created At */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Created At</p>
                <p className="text-base text-gray-900">
                  {new Date(department.created_at).toLocaleString()}
                </p>
              </div>

              {/* Updated At */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Last Updated</p>
                <p className="text-base text-gray-900">
                  {new Date(department.updated_at).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Description */}
            {department.description && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                <p className="text-base text-gray-900 whitespace-pre-wrap">
                  {department.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Branch Details Card */}
        {department.branch && (
          <Card>
            <CardHeader>
              <CardTitle>Branch Information</CardTitle>
              <CardDescription>Details about the associated branch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Branch Name</p>
                  <p className="text-base text-gray-900">{department.branch.branch_name}</p>
                </div>
                {department.branch.city && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">City</p>
                    <p className="text-base text-gray-900">{department.branch.city}</p>
                  </div>
                )}
                {department.branch.address && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
                    <p className="text-base text-gray-900">{department.branch.address}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}

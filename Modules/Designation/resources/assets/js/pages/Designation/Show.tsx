import { Head, Link, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Edit, Trash2, Building2 } from 'lucide-react'

interface Department {
  id: number
  name: string
  branch_id?: number
}

interface Designation {
  id: number
  name: string
  department_id: number
  department: Department
  description: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

interface ShowProps {
  designation: Designation
}

export default function Show({ designation }: ShowProps) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this designation?')) {
      router.delete(route('admin.designations.destroy', designation.id))
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: 'default' as const, label: 'Active' },
      inactive: { variant: 'secondary' as const, label: 'Inactive' }
    }
    return variants[status as keyof typeof variants] || variants.inactive
  }

  const statusBadge = getStatusBadge(designation.status)

  return (
    <AdminLayout>
      <Head title={`Designation: ${designation.name}`} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Designation Details</h1>
            <p className="text-sm text-gray-600 mt-1">
              View designation information and details.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href={route('admin.designations.index')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to List
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={route('admin.designations.edit', designation.id)}>
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
                <CardTitle className="text-2xl">{designation.name}</CardTitle>
                <CardDescription className="mt-2">
                  Designation information and status
                </CardDescription>
              </div>
              <Badge variant={statusBadge.variant} className="text-sm px-3 py-1">
                {statusBadge.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Designation Name */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Designation Name</p>
                <p className="text-base text-gray-900">{designation.name}</p>
              </div>

              {/* Department */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Department</p>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <p className="text-base text-gray-900">
                    {designation.department?.name || 'N/A'}
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
                  {new Date(designation.created_at).toLocaleString()}
                </p>
              </div>

              {/* Updated At */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Last Updated</p>
                <p className="text-base text-gray-900">
                  {new Date(designation.updated_at).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Description */}
            {designation.description && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                <p className="text-base text-gray-900 whitespace-pre-wrap">
                  {designation.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Department Details Card */}
        {designation.department && (
          <Card>
            <CardHeader>
              <CardTitle>Department Information</CardTitle>
              <CardDescription>Details about the associated department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Department Name</p>
                  <p className="text-base text-gray-900">{designation.department.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}

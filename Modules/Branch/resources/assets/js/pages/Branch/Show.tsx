import { Head, Link, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Building2, 
  Edit, 
  Trash2, 
  MapPin,
  Globe,
  Calendar
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
  updated_at: string
}

interface Props {
  branch: Branch
}

export default function Show({ branch }: Props) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this branch?')) {
      router.delete(route('admin.branches.destroy', branch.id))
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: 'default' as const, label: 'Active' },
      inactive: { variant: 'secondary' as const, label: 'Inactive' }
    }
    return variants[status as keyof typeof variants] || variants.inactive
  }

  const statusBadge = getStatusBadge(branch.status)

  return (
    <AdminLayout>
      <Head title={`Branch: ${branch.branch_name}`} />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={route('admin.branches.index')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Branches
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">{branch.branch_name}</h1>
            <p className="text-sm text-gray-600 mt-1">
              Branch details and information
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={route('admin.branches.edit', branch.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Branch Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Branch Information
                </CardTitle>
                <CardDescription>
                  Basic details about this branch location
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Branch Name
                      </label>
                      <p className="text-lg text-gray-900">{branch.branch_name}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Address
                      </label>
                      <p className="text-gray-900">{branch.address}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        City
                      </label>
                      <p className="text-gray-900">{branch.city}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        State/Province
                      </label>
                      <p className="text-gray-900">{branch.state}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Country
                      </label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        {branch.country}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Zip/Postal Code
                      </label>
                      <p className="text-gray-900">{branch.zip_code}</p>
                    </div>
                  </div>
                </div>

                {/* Full Address */}
                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Complete Address
                  </label>
                  <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-md">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="text-gray-900">
                      {branch.address}<br />
                      {branch.city}, {branch.state} {branch.zip_code}<br />
                      {branch.country}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status & Metadata */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant={statusBadge.variant} className="text-sm">
                  {statusBadge.label}
                </Badge>
              </CardContent>
            </Card>

            {/* Metadata Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Metadata
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Created At
                  </label>
                  <p className="text-sm text-gray-900">
                    {new Date(branch.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Last Updated
                  </label>
                  <p className="text-sm text-gray-900">
                    {new Date(branch.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Branch ID
                  </label>
                  <p className="text-sm text-gray-900 font-mono">#{branch.id}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

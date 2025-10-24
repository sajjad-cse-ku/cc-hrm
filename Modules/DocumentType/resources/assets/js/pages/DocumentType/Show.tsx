import { Head, Link, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Edit, Trash2, Building2 } from 'lucide-react'

interface DocumentType {
  id: number
  name: string
  description: string
  required: 'required' | 'optional'
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

interface ShowProps {
  documentType: DocumentType
}

export default function Show({ documentType }: ShowProps) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this document type?')) {
      router.delete(route('admin.document-types.destroy', documentType.id))
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: 'default' as const, label: 'Active' },
      inactive: { variant: 'secondary' as const, label: 'Inactive' }
    }
    return variants[status as keyof typeof variants] || variants.inactive
  }

  const statusBadge = getStatusBadge(documentType.status)

  const getRequiredBadge = (required: string) => {
    const variants = {
      required: { variant: 'destructive' as const, label: 'Required' },
      optional: { variant: 'outline' as const, label: 'Optional' }
    }
    return variants[required as keyof typeof variants] || variants.optional
  }

  const requiredBadge = getRequiredBadge(documentType.required)

  return (
    <AdminLayout>
      <Head title={`Document Type: ${documentType.name}`} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Document Type Details</h1>
            <p className="text-sm text-gray-600 mt-1">
              View document type information and details.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href={route('admin.document-types.index')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to List
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={route('admin.document-types.edit', documentType.id)}>
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

        {/* Document Type Information Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{documentType.name}</CardTitle>
                <CardDescription className="mt-2">
                  Document type information and status
                </CardDescription>
              </div>
              <Badge variant={statusBadge.variant} className="text-sm px-3 py-1">
                {statusBadge.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Document Type Name */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Document Type Name</p>
                <p className="text-base text-gray-900">{documentType.name}</p>
              </div>

              {/* Required */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Required</p>
                <Badge variant={requiredBadge.variant} className="text-xs">
                  {requiredBadge.label}
                </Badge>
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
                  {new Date(documentType.created_at).toLocaleString()}
                </p>
              </div>

              {/* Updated At */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Last Updated</p>
                <p className="text-base text-gray-900">
                  {new Date(documentType.updated_at).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Description */}
            {documentType.description && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                <p className="text-base text-gray-900 whitespace-pre-wrap">
                  {documentType.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

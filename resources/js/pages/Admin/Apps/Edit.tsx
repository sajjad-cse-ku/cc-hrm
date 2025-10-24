import { Head, Link, useForm } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'

interface App {
  id: number
  name: string
  description?: string
  category?: string
  status?: string
  version?: string
}

interface AppEditProps {
  app: App
}

export default function AppEdit({ app }: AppEditProps) {
  const { data, setData, put, processing, errors } = useForm({
    name: app.name || '',
    description: app.description || '',
    category: app.category || '',
    status: app.status || 'active',
    version: app.version || '1.0.0',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/admin/apps/${app.id}`)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this application?')) {
      // Handle delete logic here
    }
  }

  return (
    <AdminLayout>
      <Head title={`Edit App: ${app.name}`} />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/apps">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Apps
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Edit App: {app.name}</h1>
              <p className="text-sm text-gray-600 mt-1">
                Update application information and settings
              </p>
            </div>
          </div>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete App
          </Button>
        </div>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
            <CardDescription>
              Update the information below to modify the application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Application Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter application name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    type="text"
                    value={data.version}
                    onChange={(e) => setData('version', e.target.value)}
                    placeholder="1.0.0"
                    className={errors.version ? 'border-red-500' : ''}
                  />
                  {errors.version && (
                    <p className="text-sm text-red-600">{errors.version}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="communication">Communication</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-600">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-sm text-red-600">{errors.status}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  placeholder="Enter application description"
                  rows={4}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button type="submit" disabled={processing}>
                  <Save className="mr-2 h-4 w-4" />
                  {processing ? 'Updating...' : 'Update Application'}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href={`/admin/apps/${app.id}`}>Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* App Information */}
        <Card>
          <CardHeader>
            <CardTitle>Application Information</CardTitle>
            <CardDescription>
              Current application details and metadata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <label className="font-medium text-gray-700">Application ID</label>
                <p className="text-gray-900 mt-1">{app.id}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Created</label>
                <p className="text-gray-900 mt-1">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Last Modified</label>
                <p className="text-gray-900 mt-1">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Current Status</label>
                <p className="text-gray-900 mt-1 capitalize">{app.status || 'Active'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

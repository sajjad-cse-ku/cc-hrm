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
import { ArrowLeft, Save } from 'lucide-react'

export default function AppCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    category: '',
    status: 'active',
    version: '1.0.0',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/admin/apps')
  }

  return (
    <AdminLayout>
      <Head title="Create New App" />
      
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
              <h1 className="text-2xl font-semibold text-gray-900">Create New App</h1>
              <p className="text-sm text-gray-600 mt-1">
                Add a new application to your system
              </p>
            </div>
          </div>
        </div>

        {/* Create Form */}
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
            <CardDescription>
              Fill in the information below to create a new application
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
                  {processing ? 'Creating...' : 'Create Application'}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/apps">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>
              Important notes about creating applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• Application names must be unique across the system</p>
              <p>• Version numbers should follow semantic versioning (e.g., 1.0.0)</p>
              <p>• Applications can be edited after creation</p>
              <p>• Status can be changed at any time to control application availability</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

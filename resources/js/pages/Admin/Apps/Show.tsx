import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Trash2, ExternalLink, Settings, Users, BarChart3 } from 'lucide-react'

interface App {
  id: number
  name: string
  description?: string
  status?: string
  version?: string
  lastUpdated?: string
  users?: number
}

interface AppShowProps {
  app: App
}

export default function AppShow({ app }: AppShowProps) {
  return (
    <AdminLayout>
      <Head title={`App: ${app.name}`} />
      
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
              <h1 className="text-2xl font-semibold text-gray-900">{app.name}</h1>
              <p className="text-sm text-gray-600 mt-1">
                Application details and management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/apps/${app.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* App Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge variant="default" className="text-xs">
                Active
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">
                Application is running
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                Active users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Version</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">v2.1.0</div>
              <p className="text-xs text-muted-foreground">
                Latest version
              </p>
            </CardContent>
          </Card>
        </div>

        {/* App Details */}
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
            <CardDescription>
              Detailed information about this application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">Application ID</label>
                <p className="text-sm text-gray-900 mt-1">{app.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="text-sm text-gray-900 mt-1">{app.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <p className="text-sm text-gray-900 mt-1">
                  {app.description || 'No description provided'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Last Updated</label>
                <p className="text-sm text-gray-900 mt-1">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common actions for this application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <ExternalLink className="h-5 w-5" />
                <span className="text-sm">Launch App</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Settings className="h-5 w-5" />
                <span className="text-sm">Configure</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BarChart3 className="h-5 w-5" />
                <span className="text-sm">Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Apps */}
        <Card>
          <CardHeader>
            <CardTitle>Related Applications</CardTitle>
            <CardDescription>
              Other applications you might be interested in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Kanban Board</h4>
                  <p className="text-sm text-gray-600">Task management system</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/apps/kanban">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Calendar</h4>
                  <p className="text-sm text-gray-600">Event scheduling system</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/apps/calendar">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Mail</h4>
                  <p className="text-sm text-gray-600">Email management system</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/apps/mail">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

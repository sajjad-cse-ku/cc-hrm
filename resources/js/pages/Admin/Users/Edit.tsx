import { Head, Link, useForm } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, User, Mail, Save } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

interface EditUserProps {
  user: User
}

export default function EditUser({ user }: EditUserProps) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/admin/users/${user.id}`)
  }

  return (
    <AdminLayout>
      <Head title={`Edit User - ${user.name}`} />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/users">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
              <p className="text-muted-foreground">
                Update user information for {user.name}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Edit User Form */}
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>
                Update the user's basic information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter full name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.name && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.name}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.email && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.email}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4">
                  <Button type="submit" disabled={processing} className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    {processing ? 'Updating...' : 'Update User'}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/admin/users">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* User Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>
                Additional information about this user account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium">User ID</span>
                  <span className="text-sm text-muted-foreground">#{user.id}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium">Email Verified</span>
                  <span className={`text-sm ${user.email_verified_at ? 'text-green-600' : 'text-red-600'}`}>
                    {user.email_verified_at ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium">Created</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium">Last Updated</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(user.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <h4 className="font-medium">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link href={`/admin/users/${user.id}`}>
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </Link>
                  </Button>
                  
                  {!user.email_verified_at && (
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Mail className="mr-2 h-4 w-4" />
                      Resend Verification
                    </Button>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2 text-red-600">Danger Zone</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Permanently delete this user account. This action cannot be undone.
                </p>
                <Button variant="destructive" size="sm">
                  Delete User
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

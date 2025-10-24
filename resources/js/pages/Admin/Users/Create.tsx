import { Head, Link, useForm } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function CreateUser() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/admin/users', {
      onSuccess: () => {
        reset()
      },
    })
  }

  return (
    <AdminLayout>
      <Head title="Create User" />
      
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
              <h1 className="text-3xl font-bold tracking-tight">Create User</h1>
              <p className="text-muted-foreground">
                Add a new user to the system
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Create User Form */}
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>
                Enter the details for the new user account
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

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={data.password}
                      onChange={(e) => setData('password', e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.password}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password_confirmation">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password_confirmation"
                      type={showPasswordConfirmation ? 'text' : 'password'}
                      placeholder="Confirm password"
                      value={data.password_confirmation}
                      onChange={(e) => setData('password_confirmation', e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                    >
                      {showPasswordConfirmation ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password_confirmation && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.password_confirmation}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4">
                  <Button type="submit" disabled={processing} className="flex-1">
                    {processing ? 'Creating...' : 'Create User'}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/admin/users">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Guidelines Card */}
          <Card>
            <CardHeader>
              <CardTitle>User Guidelines</CardTitle>
              <CardDescription>
                Important information about creating user accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium">Strong Password Required</h4>
                    <p className="text-sm text-muted-foreground">
                      Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium">Unique Email Address</h4>
                    <p className="text-sm text-muted-foreground">
                      Each user must have a unique email address that will be used for login and notifications.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium">Email Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      New users will receive an email verification link to activate their account.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium">Default Permissions</h4>
                    <p className="text-sm text-muted-foreground">
                      New users will have basic permissions. You can modify their roles after creation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Check out our user management documentation for more details.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/help-center">
                    View Documentation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

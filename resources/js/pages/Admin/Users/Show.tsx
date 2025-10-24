import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  Calendar, 
  Shield, 
  Activity,
  User as UserIcon,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

interface ShowUserProps {
  user: User
}

export default function ShowUser({ user }: ShowUserProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <AdminLayout>
      <Head title={`User Profile - ${user.name}`} />
      
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
              <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
              <p className="text-muted-foreground">
                View and manage user information
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href={`/admin/users/${user.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* User Profile Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/avatars/${user.id}.png`} />
                  <AvatarFallback className="text-lg">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="text-base">{user.email}</CardDescription>
                  <div className="flex items-center mt-2">
                    {user.email_verified_at ? (
                      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="mr-1 h-3 w-3" />
                        Unverified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Basic Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">Full Name</span>
                      <span className="text-sm text-muted-foreground">{user.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">Email</span>
                      <span className="text-sm text-muted-foreground">{user.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">User ID</span>
                      <span className="text-sm text-muted-foreground">#{user.id}</span>
                    </div>
                  </div>
                </div>

                {/* Account Status */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    Account Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">Email Verified</span>
                      <span className={`text-sm ${user.email_verified_at ? 'text-green-600' : 'text-red-600'}`}>
                        {user.email_verified_at ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">Account Status</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">Role</span>
                      <Badge variant="secondary">User</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Timeline */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/admin/users/${user.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
                
                {!user.email_verified_at && (
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Verification
                  </Button>
                )}
                
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  View Activity
                </Button>
                
                <Button variant="destructive" className="w-full justify-start">
                  Delete Account
                </Button>
              </CardContent>
            </Card>

            {/* Account Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium">Account Created</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {user.email_verified_at && (
                    <div className="flex items-start space-x-3">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium">Email Verified</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(user.email_verified_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-orange-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(user.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>
              Extended user profile and system information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h4 className="font-medium mb-3">Permissions</h4>
                <div className="space-y-2">
                  <Badge variant="outline">Read Access</Badge>
                  <Badge variant="outline">Write Access</Badge>
                  <Badge variant="secondary">Basic User</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Activity Summary</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Last Login: Never</p>
                  <p>Total Sessions: 0</p>
                  <p>Failed Logins: 0</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">System Info</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Created by: System</p>
                  <p>Updated by: Admin</p>
                  <p>Status: Active</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

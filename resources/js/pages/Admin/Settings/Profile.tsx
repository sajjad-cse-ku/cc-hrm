import { Head, useForm } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Camera, Save, User, Mail, MapPin, Globe } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  bio?: string
  location?: string
  website?: string
  avatar?: string
}

interface ProfileProps {
  user: User
}

export default function Profile({ user }: ProfileProps) {
  const { data, setData, patch, processing, errors } = useForm({
    name: user.name || '',
    email: user.email || '',
    bio: user.bio || '',
    location: user.location || '',
    website: user.website || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    patch('/admin/settings/profile')
  }

  return (
    <AdminLayout>
      <Head title="Profile Settings" />
      
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>
                  Update your profile picture and display name
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-lg">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline">
                      <Camera className="mr-2 h-4 w-4" />
                      Change Picture
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          value={data.name}
                          onChange={(e) => setData('name', e.target.value)}
                          className="pl-10"
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={data.email}
                          onChange={(e) => setData('email', e.target.value)}
                          className="pl-10"
                          placeholder="Enter your email"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={data.bio}
                      onChange={(e) => setData('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                    {errors.bio && (
                      <p className="text-sm text-red-600">{errors.bio}</p>
                    )}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="location"
                          value={data.location}
                          onChange={(e) => setData('location', e.target.value)}
                          className="pl-10"
                          placeholder="City, Country"
                        />
                      </div>
                      {errors.location && (
                        <p className="text-sm text-red-600">{errors.location}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="website"
                          type="url"
                          value={data.website}
                          onChange={(e) => setData('website', e.target.value)}
                          className="pl-10"
                          placeholder="https://example.com"
                        />
                      </div>
                      {errors.website && (
                        <p className="text-sm text-red-600">{errors.website}</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end">
                    <Button type="submit" disabled={processing}>
                      <Save className="mr-2 h-4 w-4" />
                      {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account security and login preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Password</h4>
                    <p className="text-sm text-muted-foreground">
                      Change your password to keep your account secure
                    </p>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your experience and notification settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Theme</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred color scheme
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Light</Button>
                      <Button variant="outline" size="sm">Dark</Button>
                      <Button variant="outline" size="sm">System</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Language</h4>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred language
                    </p>
                    <Button variant="outline" size="sm">English (US)</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

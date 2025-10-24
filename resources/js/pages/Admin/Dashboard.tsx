import { Head } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Package,
  TrendingUp,
  ArrowUpRight,
  Activity
} from 'lucide-react'

interface DashboardProps {
  stats: {
    totalUsers: number
    totalRevenue: number
    totalOrders: number
    totalProducts: number
  }
  recentSales: Array<{
    id: number
    customer: string
    email: string
    amount: number
    date: string
  }>
  chartData: {
    revenue: Array<{
      month: string
      desktop: number
      mobile: number
    }>
  }
}

export default function Dashboard({ stats, recentSales, chartData }: DashboardProps) {
  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>
          <Button>
            <ArrowUpRight className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+20.1%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+4.3%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Revenue Chart */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Monthly revenue comparison between desktop and mobile
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <div className="text-center">
                  <Activity className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Chart component would go here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Install recharts to display revenue chart
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Sales */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made {recentSales.length} sales this week.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`/avatars/0${sale.id}.png`} alt="Avatar" />
                      <AvatarFallback>
                        {sale.customer.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{sale.customer}</p>
                      <p className="text-sm text-muted-foreground">{sale.email}</p>
                    </div>
                    <div className="ml-auto font-medium">+${sale.amount.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts to help you manage your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <ShoppingCart className="h-6 w-6" />
                <span>View Orders</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Package className="h-6 w-6" />
                <span>Add Product</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <TrendingUp className="h-6 w-6" />
                <span>Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

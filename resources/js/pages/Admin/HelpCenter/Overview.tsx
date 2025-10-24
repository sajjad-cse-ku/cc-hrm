import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  BookOpen, 
  Users, 
  Code, 
  HelpCircle, 
  ArrowRight,
  Clock,
  Eye,
  Star
} from 'lucide-react'

interface Article {
  id: number
  title: string
  description: string
  category: string
  readTime: string
  views: number
}

interface Category {
  name: string
  count: number
}

interface HelpCenterOverviewProps {
  articles: Article[]
  categories: Category[]
}

export default function HelpCenterOverview({ articles, categories }: HelpCenterOverviewProps) {
  const categoryIcons = {
    'Basics': BookOpen,
    'Administration': Users,
    'Development': Code,
    'Support': HelpCircle,
  }

  return (
    <AdminLayout>
      <Head title="Help Center" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Help Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to your questions and learn how to make the most of our platform
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for help articles..."
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category.name as keyof typeof categoryIcons] || HelpCircle
            return (
              <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Icon className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.count} articles
                  </p>
                  <Button variant="outline" size="sm">
                    Browse Articles
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Popular Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5" />
              Popular Articles
            </CardTitle>
            <CardDescription>
              Most viewed and helpful articles from our knowledge base
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {articles.map((article) => (
                <Card key={article.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Eye className="mr-1 h-3 w-3" />
                        {article.views.toLocaleString()}
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-2 line-clamp-2">{article.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {article.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {article.readTime}
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Get in touch with our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/admin/help-center/support">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse All Articles
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community</CardTitle>
              <CardDescription>
                Connect with other users and share knowledge
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Join Community Forum
              </Button>
              <Button variant="outline" className="w-full">
                <Code className="mr-2 h-4 w-4" />
                Developer Resources
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>
              Latest additions and improvements to our help documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-medium">New API Documentation</h4>
                  <p className="text-sm text-muted-foreground">
                    Updated REST API documentation with new endpoints and examples
                  </p>
                </div>
                <Badge variant="outline">New</Badge>
              </div>
              
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-medium">User Management Guide</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive guide on managing users and permissions
                  </p>
                </div>
                <Badge variant="outline">Updated</Badge>
              </div>
              
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-medium">Troubleshooting FAQ</h4>
                  <p className="text-sm text-muted-foreground">
                    Common issues and solutions for platform users
                  </p>
                </div>
                <Badge variant="outline">Updated</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

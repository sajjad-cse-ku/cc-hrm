import { Head, router } from '@inertiajs/react'
import { useState } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Mail as MailIcon, 
  Search, 
  Plus, 
  Archive, 
  Trash2, 
  Star, 
  Reply, 
  Forward,
  MoreHorizontal,
  Paperclip,
  Flag,
  Inbox,
  Send,
  FileText,
  AlertCircle
} from 'lucide-react'

interface Email {
  id: number
  from: string
  fromName: string
  subject: string
  preview: string
  date: string
  read: boolean
  starred: boolean
  hasAttachment: boolean
  important: boolean
  category: 'inbox' | 'sent' | 'draft' | 'spam' | 'trash'
}

interface MailProps {
  emails?: {
    data: Email[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  filters?: {
    search?: string
    category?: string
  }
}

export default function Mail({ emails = { data: [], current_page: 1, last_page: 1, per_page: 15, total: 0 }, filters = {} }: MailProps) {
  const [selectedEmails, setSelectedEmails] = useState<number[]>([])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [search, setSearch] = useState(filters.search || '')
  const [activeCategory, setActiveCategory] = useState(filters.category || 'inbox')

  const categories = [
    { id: 'inbox', name: 'Inbox', icon: Inbox, count: 24 },
    { id: 'sent', name: 'Sent', icon: Send, count: 12 },
    { id: 'draft', name: 'Drafts', icon: FileText, count: 3 },
    { id: 'spam', name: 'Spam', icon: AlertCircle, count: 5 },
    { id: 'trash', name: 'Trash', icon: Trash2, count: 8 },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.get('/admin/apps/mail', { search, category: activeCategory }, { preserveState: true })
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    router.get('/admin/apps/mail', { category, search }, { preserveState: true })
  }

  const toggleEmailSelection = (emailId: number) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    )
  }

  const toggleSelectAll = () => {
    setSelectedEmails(
      selectedEmails.length === emails.data.length 
        ? [] 
        : emails.data.map(email => email.id)
    )
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on emails:`, selectedEmails)
    // Implement bulk actions here
    setSelectedEmails([])
  }

  return (
    <AdminLayout>
      <Head title="Mail" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mail</h1>
            <p className="text-muted-foreground">
              Manage your emails and communications
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Compose
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Folders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  <span className="flex-1 text-left">{category.name}</span>
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Email List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg capitalize">{activeCategory}</CardTitle>
                <div className="flex items-center space-x-2">
                  {selectedEmails.length > 0 && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleBulkAction('archive')}>
                        <Archive className="mr-1 h-3 w-3" />
                        Archive
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleBulkAction('delete')}>
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Search */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search emails..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" size="sm">Search</Button>
              </form>
            </CardHeader>
            
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedEmails.length === emails.data.length && emails.data.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="w-24">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emails.data.map((email) => (
                    <TableRow 
                      key={email.id}
                      className={`cursor-pointer ${!email.read ? 'font-medium' : ''} ${
                        selectedEmail?.id === email.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedEmails.includes(email.id)}
                          onCheckedChange={() => toggleEmailSelection(email.id)}
                        />
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <Star className={`h-3 w-3 ${email.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </Button>
                          {email.important && <Flag className="h-3 w-3 text-red-500" />}
                          {email.hasAttachment && <Paperclip className="h-3 w-3 text-muted-foreground" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {email.fromName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="truncate">{email.fromName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="truncate">{email.subject}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {email.preview}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {email.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {emails.data.length === 0 && (
                <div className="text-center py-8">
                  <MailIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-muted-foreground">No emails found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedEmail ? 'Email Preview' : 'Select an Email'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedEmail ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{selectedEmail.subject}</h3>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {selectedEmail.fromName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span>{selectedEmail.fromName}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedEmail.date}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-sm">
                    <p>{selectedEmail.preview}</p>
                    <p className="mt-4 text-muted-foreground">
                      This is a preview of the email content. In a real application, 
                      you would display the full email body here.
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm">
                      <Reply className="mr-1 h-3 w-3" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <Forward className="mr-1 h-3 w-3" />
                      Forward
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MailIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Select an email to preview</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Pagination */}
        {emails.last_page > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {((emails.current_page - 1) * emails.per_page) + 1} to{' '}
              {Math.min(emails.current_page * emails.per_page, emails.total)} of{' '}
              {emails.total} emails
            </p>
            <div className="flex space-x-2">
              {emails.current_page > 1 && (
                <Button
                  variant="outline"
                  onClick={() => router.get('/admin/apps/mail', { 
                    ...filters, 
                    page: emails.current_page - 1 
                  })}
                >
                  Previous
                </Button>
              )}
              {emails.current_page < emails.last_page && (
                <Button
                  variant="outline"
                  onClick={() => router.get('/admin/apps/mail', { 
                    ...filters, 
                    page: emails.current_page + 1 
                  })}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

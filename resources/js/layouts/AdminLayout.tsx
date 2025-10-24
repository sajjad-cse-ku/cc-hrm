import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Grid3X3, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  Menu, 
  Search,
  Bell,
  LogOut,
  ChevronDown,
  ChevronRight,
  Shield,
  AlertCircle,
  Sun,
  Moon,
  Lock,
  UserX,
  FileX,
  Server,
  Wrench,
  Building2,
  Building
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = {
  general: [
    { name: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard },
    { name: 'Tasks', href: route('admin.tasks.index'), icon: CheckSquare },
    { name: 'Users', href: route('admin.users.index'), icon: Users },
    { name: 'Branches', href: route('admin.branches.index'), icon: Building2 },
    { name: 'Departments', href: route('admin.departments.index'), icon: Building },
    { 
      name: 'Apps', 
      href: '#', 
      icon: Grid3X3,
      children: [
        { name: 'Kanban', href: '#' },
      ]
    },
  ],
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { url } = usePage()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState<string[]>([])

  const isActive = (href: string) => {
    if (href === '/admin') {
      return url === '/admin' || url === '/admin/dashboard'
    }
    return url.startsWith(href)
  }

  const hasActiveChild = (item: any) => {
    if (!item.children) return false
    return item.children.some((child: any) => url === child.href)
  }

  const toggleMenu = (itemName: string) => {
    setOpenMenus(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  // Auto-open menus that have active children
  const shouldBeOpen = (item: any) => {
    return openMenus.includes(item.name) || hasActiveChild(item)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const openSidebar = () => {
    setSidebarOpen(true)
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex flex-col gap-2 p-2">
        <div className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-start h-12 text-sm">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <span className="text-sm font-bold">SA</span>
          </div>
          <div className="grid flex-1 text-start text-sm leading-tight">
            <span className="truncate font-semibold">Shadcn Admin</span>
            <span className="truncate text-xs">Vite + Shadcn/ui</span>
          </div>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
        <nav className="flex w-full min-w-0 flex-col gap-2">
          {/* General Section */}
          <div className="relative flex w-full min-w-0 flex-col p-2">
            <div className="text-sidebar-foreground/70 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium">
              General
            </div>
            <ul className="flex w-full min-w-0 flex-col gap-1">
              {navigation.general.map((item: any) => (
                <div key={item.name}>
                  {item.children ? (
                    <Collapsible open={shouldBeOpen(item)} onOpenChange={() => toggleMenu(item.name)}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            'flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-start h-8 text-sm font-medium transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                            isActive(item.href) || hasActiveChild(item)
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                              : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'
                          )}
                        >
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span className="flex-1 truncate">{item.name}</span>
                          <ChevronRight className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-200",
                            shouldBeOpen(item) ? "rotate-90" : "rotate-0"
                          )} />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        <ul className="flex min-w-0 flex-col gap-1 py-0.5">
                          {item.children.map((child: any) => (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                className={cn(
                                  'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex h-8 min-w-0 items-center gap-2 overflow-hidden rounded-md p-2 text-sm transition-all duration-200',
                                  url === child.href
                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                                    : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                )}
                              >
                                {child.icon ? (
                                  <child.icon className="h-4 w-4 shrink-0" />
                                ) : (
                                  <div className="h-4 w-4 shrink-0" />
                                )}
                                <span className="flex-1 truncate">{child.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-start h-8 text-sm font-medium transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                        isActive(item.href)
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                          : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 truncate">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="h-5 w-5 bg-black text-white flex items-center justify-center p-0 text-xs shrink-0">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </ul>
          </div>

        </nav>
      </div>
      
      {/* User Section */}
      <div className="flex flex-col gap-2 p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-start h-12 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src="/avatars/user.png" />
                <AvatarFallback className="bg-muted rounded-lg">
                  SN
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-semibold">satnaing</span>
                <span className="truncate text-xs">satnaingdev@gmail.com</span>
              </div>
              <ChevronDown className="ms-auto size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mb-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/settings/profile" className="cursor-pointer">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/settings/account" className="cursor-pointer">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 cursor-pointer"
              onClick={() => {
                // Add logout functionality here
                console.log('Logout clicked')
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden w-64 border-r border-sidebar-border bg-sidebar lg:block sidebar-transition">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent 
          side="left" 
          className="w-64 p-0 sidebar-transition data-[state=open]:animate-slide-in-from-left data-[state=closed]:animate-slide-out-to-left duration-500"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 sidebar-overlay lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden transition-all duration-500 ease-out">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b bg-background px-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden h-9 w-9"
              onClick={openSidebar}
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search"
                className="h-9 w-80 rounded-md border border-input bg-background pl-10 pr-16 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none rounded border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-4 w-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/avatars/user.png" alt="Avatar" />
                    <AvatarFallback className="text-xs">SN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">satnaing</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      satnaingdev@gmail.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/logout" method="post" as="button" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

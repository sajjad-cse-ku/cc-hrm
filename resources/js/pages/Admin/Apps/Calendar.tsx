import { Head } from '@inertiajs/react'
import { useState } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin,
  Users,
  MoreHorizontal
} from 'lucide-react'

interface Event {
  id: number
  title: string
  start: string
  end: string
  color: string
  description?: string
  location?: string
  attendees?: number
}

interface CalendarProps {
  events?: Event[]
}

export default function Calendar({ events = [] }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getEventsForDay = (day: number) => {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return events.filter(event => {
      const eventDate = new Date(event.start)
      return eventDate.toDateString() === dayDate.toDateString()
    })
  }

  const days = getDaysInMonth(currentDate)

  return (
    <AdminLayout>
      <Head title="Calendar" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">
              Manage your events, meetings, and schedule
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>

        {/* Calendar Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold min-w-[200px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('month')}
            >
              Month
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('week')}
            >
              Week
            </Button>
            <Button
              variant={view === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('day')}
            >
              Day
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Calendar Grid */}
          <Card className="lg:col-span-3">
            <CardContent className="p-0">
              {/* Days of Week Header */}
              <div className="grid grid-cols-7 border-b">
                {daysOfWeek.map(day => (
                  <div key={day} className="p-4 text-center font-medium text-sm text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[120px] border-r border-b p-2 ${
                      day ? 'hover:bg-muted/50 cursor-pointer' : ''
                    }`}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-medium mb-1 ${
                          new Date().toDateString() === 
                          new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()
                            ? 'bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center'
                            : ''
                        }`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {getEventsForDay(day).slice(0, 3).map(event => (
                            <div
                              key={event.id}
                              className="text-xs p-1 rounded truncate"
                              style={{ backgroundColor: event.color + '20', color: event.color }}
                            >
                              {event.title}
                            </div>
                          ))}
                          {getEventsForDay(day).length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{getEventsForDay(day).length - 3} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
              <CardDescription>
                Your next scheduled events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.slice(0, 5).map(event => (
                <div key={event.id} className="space-y-2 p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {new Date(event.start).toLocaleString()}
                    </div>
                    {event.location && (
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {event.location}
                      </div>
                    )}
                    {event.attendees && (
                      <div className="flex items-center">
                        <Users className="mr-1 h-3 w-3" />
                        {event.attendees} attendees
                      </div>
                    )}
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className="text-xs"
                    style={{ borderColor: event.color, color: event.color }}
                  >
                    {event.color === '#3b82f6' ? 'Meeting' : 
                     event.color === '#ef4444' ? 'Deadline' : 'Event'}
                  </Badge>
                </div>
              ))}
              
              {events.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p className="text-sm">No upcoming events</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="mr-2 h-3 w-3" />
                    Add Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

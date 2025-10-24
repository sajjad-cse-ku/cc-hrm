import { Head } from '@inertiajs/react'
import { useState } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react'

interface Task {
  id: number
  title: string
  description: string
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

interface KanbanProps {
  columns?: Column[]
}

export default function Kanban({ columns: initialColumns = [] }: KanbanProps) {
  // Fallback data if no columns provided
  const fallbackColumns = [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 1, title: 'Sample Task 1', description: 'This is a sample task' },
        { id: 2, title: 'Sample Task 2', description: 'Another sample task' }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: 3, title: 'Sample Task 3', description: 'Task in progress' }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 4, title: 'Sample Task 4', description: 'Completed task' }
      ]
    }
  ]
  
  const [columns, setColumns] = useState(
    initialColumns && initialColumns.length > 0 ? initialColumns : fallbackColumns
  )
  
  // Debug logging
  console.log('Kanban received columns:', initialColumns)
  console.log('Kanban state columns:', columns)

  const handleDragStart = (e: React.DragEvent, taskId: number, sourceColumnId: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ taskId, sourceColumnId }))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault()
    const data = JSON.parse(e.dataTransfer.getData('text/plain'))
    const { taskId, sourceColumnId } = data

    if (sourceColumnId === targetColumnId) return

    setColumns(prevColumns => {
      const newColumns = [...prevColumns]
      const sourceColumn = newColumns.find(col => col.id === sourceColumnId)
      const targetColumn = newColumns.find(col => col.id === targetColumnId)
      
      if (sourceColumn && targetColumn) {
        const taskIndex = sourceColumn.tasks.findIndex(task => task.id === taskId)
        if (taskIndex !== -1) {
          const [task] = sourceColumn.tasks.splice(taskIndex, 1)
          targetColumn.tasks.push(task)
        }
      }
      
      return newColumns
    })
  }

  return (
    <AdminLayout>
      <Head title="Kanban Board" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
            <p className="text-muted-foreground">
              Drag and drop tasks between columns to update their status
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {columns.map((column) => (
            <Card 
              key={column.id}
              className="h-fit"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {column.title}
                  </CardTitle>
                  <Badge variant="secondary" className="ml-2">
                    {column.tasks.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {column.tasks.map((task) => (
                  <Card
                    key={task.id}
                    className="cursor-move border-2 border-dashed border-transparent hover:border-border transition-colors"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium leading-none mb-2">
                            {task.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {task.description}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-3 w-3" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-3 w-3" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={`/avatars/${task.id}.png`} />
                          <AvatarFallback className="text-xs">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <Badge variant="outline" className="text-xs">
                          Task #{task.id}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {column.tasks.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
                    <p className="text-xs mt-1">Drag tasks here or add new ones</p>
                  </div>
                )}
                
                <Button 
                  variant="ghost" 
                  className="w-full border-2 border-dashed border-muted-foreground/25 h-10"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Board Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Board Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {columns.find(c => c.id === 'todo')?.tasks.length || 0}
                </div>
                <p className="text-sm text-muted-foreground">To Do Tasks</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {columns.find(c => c.id === 'in-progress')?.tasks.length || 0}
                </div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {columns.find(c => c.id === 'done')?.tasks.length || 0}
                </div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

import { Head, Link } from '@inertiajs/react'
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
  Search, 
  MessageSquare, 
  Users, 
  Phone, 
  Video, 
  MoreHorizontal,
  Send,
  Paperclip,
  Smile
} from 'lucide-react'

interface Chat {
  id: number
  name: string
  avatar: string | null
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  online: boolean
  isGroup?: boolean
}

interface ChatsIndexProps {
  chats: Chat[]
}

export default function ChatsIndex({ chats }: ChatsIndexProps) {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0] || null)
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    
    // Here you would typically send the message via API
    console.log('Sending message:', message)
    setMessage('')
  }

  return (
    <AdminLayout>
      <Head title="Chats" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Chats</h1>
            <p className="text-muted-foreground">
              Communicate with your team and customers
            </p>
          </div>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>

        {/* Chat Interface */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Chat List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Messages</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {filteredChats.map((chat) => (
                  <div key={chat.id}>
                    <div
                      className={`flex items-center space-x-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedChat?.id === chat.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={chat.avatar || undefined} />
                          <AvatarFallback>
                            {chat.isGroup ? (
                              <Users className="h-4 w-4" />
                            ) : (
                              chat.name.split(' ').map(n => n[0]).join('')
                            )}
                          </AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <div className="absolute -bottom-0 -right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium truncate">{chat.name}</p>
                          <p className="text-xs text-muted-foreground">{chat.lastMessageTime}</p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unreadCount > 0 && (
                        <Badge variant="default" className="ml-2">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <Separator />
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedChat.avatar || undefined} />
                        <AvatarFallback>
                          {selectedChat.isGroup ? (
                            <Users className="h-4 w-4" />
                          ) : (
                            selectedChat.name.split(' ').map(n => n[0]).join('')
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedChat.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedChat.online ? 'Online' : 'Last seen recently'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages Area */}
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4">
                      {/* Sample Messages */}
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={selectedChat.avatar || undefined} />
                          <AvatarFallback className="text-xs">
                            {selectedChat.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted rounded-lg p-3 max-w-xs">
                            <p className="text-sm">{selectedChat.lastMessage}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {selectedChat.lastMessageTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 justify-end">
                        <div className="flex-1 flex justify-end">
                          <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                            <p className="text-sm">Thanks for the update! I'll review it shortly.</p>
                          </div>
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">You</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                      <Button type="button" variant="ghost" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" variant="ghost" size="icon">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-[500px]">
                <div className="text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No chat selected</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the sidebar to start messaging
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Chat Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{chats.length}</div>
              <p className="text-xs text-muted-foreground">
                Active chat conversations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
              <Badge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {chats.reduce((sum, chat) => sum + chat.unreadCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Messages waiting for response
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {chats.filter(chat => chat.online).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently online and available
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

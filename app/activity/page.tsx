"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, MessageSquare, UserPlus, Clock, Bell, ActivityIcon } from "lucide-react"

// Mock activity data
const mockActivities = [
  {
    id: 1,
    type: "item_returned",
    title: "Item Returned",
    description: "Camping Tent was returned by Alex Rivera",
    user: { name: "Alex Rivera", avatar: "/placeholder.svg?height=32&width=32", initials: "AR" },
    item: { name: "Camping Tent", id: 3 },
    timestamp: "2024-01-10T14:30:00Z",
    read: false,
  },
  {
    id: 2,
    type: "comment_added",
    title: "New Comment",
    description: 'Sarah Johnson added a comment to MacBook Pro 16"',
    user: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "SJ" },
    item: { name: 'MacBook Pro 16"', id: 1 },
    timestamp: "2024-01-09T16:45:00Z",
    read: true,
  },
  {
    id: 3,
    type: "item_overdue",
    title: "Item Overdue",
    description: "The Design of Everyday Things is now overdue",
    user: { name: "Mike Chen", avatar: "/placeholder.svg?height=32&width=32", initials: "MC" },
    item: { name: "The Design of Everyday Things", id: 2 },
    timestamp: "2024-01-08T09:00:00Z",
    read: true,
  },
  {
    id: 4,
    type: "contact_joined",
    title: "Contact Joined",
    description: "Emma Davis joined BorrowBrain and accepted your connection",
    user: { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32", initials: "ED" },
    timestamp: "2024-01-07T11:20:00Z",
    read: true,
  },
  {
    id: 5,
    type: "item_added",
    title: "Item Added",
    description: "You lent Camera Lens to Sarah Johnson",
    user: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "SJ" },
    item: { name: "Camera Lens", id: 4 },
    timestamp: "2024-01-05T13:15:00Z",
    read: true,
  },
  {
    id: 6,
    type: "reminder",
    title: "Due Date Reminder",
    description: 'MacBook Pro 16" is due in 3 days',
    user: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "SJ" },
    item: { name: 'MacBook Pro 16"', id: 1 },
    timestamp: "2024-01-04T10:00:00Z",
    read: true,
  },
]

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredActivities = mockActivities.filter((activity) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !activity.read
    if (activeTab === "items") return ["item_added", "item_returned", "item_overdue"].includes(activity.type)
    if (activeTab === "comments") return activity.type === "comment_added"
    if (activeTab === "contacts") return ["contact_joined", "contact_invited"].includes(activity.type)
    return true
  })

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "item_added":
      case "item_returned":
        return <Package className="h-4 w-4" />
      case "comment_added":
        return <MessageSquare className="h-4 w-4" />
      case "contact_joined":
        return <UserPlus className="h-4 w-4" />
      case "item_overdue":
        return <Clock className="h-4 w-4 text-red-500" />
      case "reminder":
        return <Bell className="h-4 w-4" />
      default:
        return <ActivityIcon className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "item_returned":
        return "text-green-600"
      case "item_overdue":
        return "text-red-600"
      case "contact_joined":
        return "text-blue-600"
      case "reminder":
        return "text-orange-600"
      default:
        return "text-muted-foreground"
    }
  }

  if (filteredActivities.length === 0 && activeTab === "all") {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <ActivityIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No activity yet</h3>
          <p className="text-muted-foreground mb-6">
            Activity will appear here as you add borrows and interact with contacts
          </p>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Activity</h1>
          <p className="text-muted-foreground">Stay updated with your item activity</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-8">
                <ActivityIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No activities found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredActivities.map((activity) => (
                  <Card key={activity.id} className={`transition-colors ${!activity.read ? "bg-muted/50" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)} bg-muted`}
                        >
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-medium text-sm">{activity.title}</h3>
                                {!activity.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-muted-foreground">{activity.user.name}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimestamp(activity.timestamp)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

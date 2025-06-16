"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Calendar,
  User,
  Package,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  Archive,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data
const mockItems = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    description: "Silver MacBook Pro with M2 chip",
    category: "Electronics",
    type: "lent",
    contact: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "SJ" },
    dueDate: "2024-01-15",
    status: "active",
    thumbnail: "/placeholder.svg?height=80&width=80",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "The Design of Everyday Things",
    description: "Book by Don Norman",
    category: "Books",
    type: "borrowed",
    contact: { name: "Mike Chen", avatar: "/placeholder.svg?height=32&width=32", initials: "MC" },
    dueDate: "2024-01-20",
    status: "active",
    thumbnail: "/placeholder.svg?height=80&width=80",
    createdAt: "2024-01-05",
  },
  {
    id: 3,
    name: "Camping Tent",
    description: "4-person waterproof tent",
    category: "Outdoor",
    type: "lent",
    contact: { name: "Alex Rivera", avatar: "/placeholder.svg?height=32&width=32", initials: "AR" },
    dueDate: null,
    status: "returned",
    thumbnail: "/placeholder.svg?height=80&width=80",
    createdAt: "2023-12-15",
    returnedAt: "2023-12-28",
  },
]

export default function ItemsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  const filteredItems = mockItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contact.name.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && item.status === "active"
    if (activeTab === "returned") return matchesSearch && item.status === "returned"
    if (activeTab === "borrowed") return matchesSearch && item.type === "borrowed"
    if (activeTab === "lent") return matchesSearch && item.type === "lent"

    return matchesSearch
  })

  const handleAddItem = () => {
    router.push("/items/add")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  const getTransactionIcon = (type: string) => {
    return type === "borrowed" ? (
      <ArrowDownLeft className="h-4 w-4 text-blue-600" />
    ) : (
      <ArrowUpRight className="h-4 w-4 text-green-600" />
    )
  }

  const getStatusBadge = (status: string, dueDate?: string) => {
    const isItemOverdue = dueDate && isOverdue(dueDate)

    if (status === "active" && isItemOverdue) {
      return (
        <Badge variant="destructive" className="text-xs">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Overdue
        </Badge>
      )
    }

    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="text-xs bg-blue-600 hover:bg-blue-700">
            <Clock className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "returned":
        return (
          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Returned
          </Badge>
        )
      case "archived":
        return (
          <Badge variant="outline" className="text-xs text-gray-600">
            <Archive className="h-3 w-3 mr-1" />
            Archived
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  if (filteredItems.length === 0 && searchQuery === "" && activeTab === "all") {
    return (
      <MainLayout showFab={true} fabAction={handleAddItem} fabLabel="Add Item">
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No items yet</h3>
          <p className="text-muted-foreground mb-6">Start tracking items you borrow or lend to others</p>
          <Button onClick={handleAddItem}>Add Your First Item</Button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout showFab={true} fabAction={handleAddItem} fabLabel="Add Item">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Items</h1>
          <p className="text-muted-foreground">Track items you've borrowed or lent</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search items, descriptions, or contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
            <TabsTrigger value="lent">Lent</TabsTrigger>
            <TabsTrigger value="returned">Returned</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No items found</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredItems.map((item) => (
                  <Link key={item.id} href={`/items/${item.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{item.description}</p>
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    {item.category}
                                  </Badge>
                                  <div className="flex items-center space-x-1">
                                    {getTransactionIcon(item.type)}
                                    <Badge
                                      variant={item.type === "borrowed" ? "outline" : "outline"}
                                      className={cn(
                                        "text-xs",
                                        item.type === "borrowed"
                                          ? "text-blue-600 border-blue-200 bg-blue-50"
                                          : "text-green-600 border-green-200 bg-green-50",
                                      )}
                                    >
                                      {item.type === "borrowed" ? "Borrowed" : "Lent"}
                                    </Badge>
                                  </div>
                                  {getStatusBadge(item.status, item.dueDate)}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <User className="h-4 w-4" />
                                    <span>{item.contact.name}</span>
                                  </div>
                                  {item.dueDate && item.status === "active" && (
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="h-4 w-4" />
                                      <span className={cn(isOverdue(item.dueDate) && "text-red-600 font-medium")}>
                                        Due {formatDate(item.dueDate)}
                                      </span>
                                    </div>
                                  )}
                                  {item.status === "returned" && item.returnedAt && (
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="h-4 w-4" />
                                      <span>Returned {formatDate(item.returnedAt)}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <Avatar className="h-8 w-8 ml-4">
                                <AvatarImage src={item.contact.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{item.contact.initials}</AvatarFallback>
                              </Avatar>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

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

export default function BorrowsPage() {
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

  const handleAddBorrow = () => {
    router.push("/borrows/add")
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
      <ArrowDownLeft className="h-4 w-4 text-primary" />
    ) : (
      <ArrowUpRight className="h-4 w-4 text-primary" />
    )
  }

  const getStatusBadge = (status: string, dueDate?: string) => {
    const isItemOverdue = dueDate && isOverdue(dueDate)

    if (status === "active" && isItemOverdue) {
      return (
        <Badge className="text-xs status-overdue border rounded-lg font-medium">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Overdue
        </Badge>
      )
    }

    switch (status) {
      case "active":
        return (
          <Badge className="text-xs status-active border rounded-lg font-medium">
            <Clock className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "returned":
        return (
          <Badge className="text-xs status-returned border rounded-lg font-medium">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Returned
          </Badge>
        )
      case "archived":
        return (
          <Badge variant="outline" className="text-xs text-text-secondary border rounded-lg font-medium">
            <Archive className="h-3 w-3 mr-1" />
            Archived
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs rounded-lg font-medium">
            {status}
          </Badge>
        )
    }
  }

  if (filteredItems.length === 0 && searchQuery === "" && activeTab === "all") {
    return (
      <MainLayout showFab={true} fabAction={handleAddBorrow} fabLabel="Add Borrow">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-3">No borrows yet</h3>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Start tracking items you borrow or lend to others. Keep everything organized in one place.
          </p>
          <Button onClick={handleAddBorrow} className="rounded-xl font-medium">
            Add Your First Borrow
          </Button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout showFab={true} fabAction={handleAddBorrow} fabLabel="Add Borrow">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary mb-2">Borrows</h1>
          <p className="text-text-secondary">Track items you've borrowed or lent</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
          <Input
            placeholder="Search borrows, descriptions, or contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl border-border text-text-primary placeholder:text-text-secondary"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-secondary rounded-xl p-1">
            <TabsTrigger value="all" className="rounded-lg font-medium">
              All
            </TabsTrigger>
            <TabsTrigger value="active" className="rounded-lg font-medium">
              Active
            </TabsTrigger>
            <TabsTrigger value="borrowed" className="rounded-lg font-medium">
              Borrowed
            </TabsTrigger>
            <TabsTrigger value="lent" className="rounded-lg font-medium">
              Lent
            </TabsTrigger>
            <TabsTrigger value="returned" className="rounded-lg font-medium">
              Returned
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <p className="text-text-secondary">No borrows found</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredItems.map((item) => (
                  <Link key={item.id} href={`/borrows/${item.id}`}>
                    <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                            <img
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg text-text-primary truncate mb-1">{item.name}</h3>
                                <p className="text-text-secondary text-sm line-clamp-2 mb-3">{item.description}</p>
                                <div className="flex items-center space-x-2 mb-3">
                                  <Badge variant="outline" className="text-xs rounded-lg font-medium border-border">
                                    {item.category}
                                  </Badge>
                                  <div className="flex items-center space-x-1">
                                    {getTransactionIcon(item.type)}
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        "text-xs rounded-lg font-medium",
                                        item.type === "borrowed"
                                          ? "text-primary border-primary/20 bg-primary/5"
                                          : "text-primary border-primary/20 bg-primary/5",
                                      )}
                                    >
                                      {item.type === "borrowed" ? "Borrowed" : "Lent"}
                                    </Badge>
                                  </div>
                                  {getStatusBadge(item.status, item.dueDate)}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                                  <div className="flex items-center space-x-1">
                                    <User className="h-4 w-4" />
                                    <span>{item.contact.name}</span>
                                  </div>
                                  {item.dueDate && item.status === "active" && (
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="h-4 w-4" />
                                      <span className={cn(isOverdue(item.dueDate) && "text-warning font-medium")}>
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
                              <Avatar className="h-10 w-10 ml-4">
                                <AvatarImage src={item.contact.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-primary text-white font-medium">
                                  {item.contact.initials}
                                </AvatarFallback>
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

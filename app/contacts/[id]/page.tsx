"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Edit,
  CheckCircle,
  UserPlus,
  Package,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  Archive,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for contact detail
const mockContact = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=80&width=80",
  initials: "SJ",
  connected: true,
  joinedDate: "2023-06-15",
  lastActivity: "2024-01-10",
  totalItems: 5,
  activeItems: 2,
  returnedItems: 3,
}

const mockSharedItems = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    description: "Silver MacBook Pro with M2 chip",
    category: "Electronics",
    type: "lent",
    status: "active",
    dueDate: "2024-01-15",
    thumbnail: "/placeholder.svg?height=60&width=60",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Camera Lens",
    description: "Canon 50mm f/1.8 lens",
    category: "Photography",
    type: "lent",
    status: "active",
    dueDate: null,
    thumbnail: "/placeholder.svg?height=60&width=60",
    createdAt: "2024-01-05",
  },
  {
    id: 3,
    name: "Camping Tent",
    description: "4-person waterproof tent",
    category: "Outdoor",
    type: "lent",
    status: "returned",
    dueDate: null,
    thumbnail: "/placeholder.svg?height=60&width=60",
    createdAt: "2023-12-15",
    returnedAt: "2023-12-28",
  },
]

export default function ContactDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const handleAddItem = () => {
    router.push(`/borrows/add?contact=${params.id}`)
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

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{mockContact.name}</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/contacts/${params.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={mockContact.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{mockContact.initials}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold mb-2">{mockContact.name}</h2>
                {mockContact.connected ? (
                  <Badge variant="outline" className="mb-4">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="mb-4">
                    <UserPlus className="h-3 w-3 mr-1" />
                    Not Connected
                  </Badge>
                )}
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockContact.email}</span>
                </div>
                {mockContact.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{mockContact.phone}</span>
                  </div>
                )}
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Joined</span>
                    <span>{formatDate(mockContact.joinedDate)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Activity</span>
                    <span>{formatDate(mockContact.lastActivity)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Item Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{mockContact.activeItems}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockContact.totalItems}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{mockContact.returnedItems}</p>
                    <p className="text-xs text-muted-foreground">Returned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Shared Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Shared Items</CardTitle>
                  <Button size="sm" onClick={handleAddItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Borrow
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {mockSharedItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground mb-4">No shared borrows yet</p>
                    <Button onClick={handleAddItem}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Borrow
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockSharedItems.map((item) => (
                      <Link key={item.id} href={`/borrows/${item.id}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                <img
                                  src={item.thumbnail || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h3 className="font-semibold truncate">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                                      {item.description}
                                    </p>
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Badge variant="outline" className="text-xs">
                                        {item.category}
                                      </Badge>
                                      <div className="flex items-center space-x-1">
                                        {getTransactionIcon(item.type)}
                                        <Badge
                                          variant="outline"
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
                                        <Calendar className="h-4 w-4" />
                                        <span>Added {formatDate(item.createdAt)}</span>
                                      </div>
                                      {item.dueDate && item.status === "active" && (
                                        <div className="flex items-center space-x-1">
                                          <span
                                            className={`${isOverdue(item.dueDate) ? "text-red-600 font-medium" : ""}`}
                                          >
                                            Due {formatDate(item.dueDate)}
                                          </span>
                                        </div>
                                      )}
                                      {item.status === "returned" && item.returnedAt && (
                                        <div className="flex items-center space-x-1">
                                          <span>Returned {formatDate(item.returnedAt)}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

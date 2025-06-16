"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ReturnItemDialog, type ReturnData } from "@/components/dialogs/return-item-dialog"
import { ArrowLeft, MessageSquare, Edit, CheckCircle, Clock, Camera, Package2, AlertTriangle } from "lucide-react"

// Mock data for item detail
const mockItem = {
  id: 1,
  name: 'MacBook Pro 16"',
  description:
    "Silver MacBook Pro with M2 chip, 32GB RAM, 1TB SSD. In excellent condition with original charger and box.",
  category: "Electronics",
  type: "lent",
  contact: {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
    email: "sarah@example.com",
    connected: true,
  },
  dueDate: "2024-01-15",
  status: "returned", // Change to "returned" to show the return section
  photos: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  createdAt: "2024-01-01",
  initialComment: "Gave it to you during Pizza dinner at your house",
  // Add return information
  returnedAt: "2024-01-20",
  returnComment: "Thanks for letting me borrow it! Everything worked perfectly.",
  returnPhotos: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
  // For "gone" status items
  goneAt: null,
  goneComment: null,
  gonePhotos: [],
  history: [
    {
      id: 1,
      type: "created",
      user: "You",
      comment: "Gave it to you during Pizza dinner at your house",
      date: "2024-01-01T10:00:00Z",
    },
    {
      id: 2,
      type: "comment",
      user: "Sarah Johnson",
      comment: "Thanks! I'll take good care of it and return it by the 15th.",
      date: "2024-01-01T14:30:00Z",
    },
    {
      id: 3,
      type: "comment",
      user: "You",
      comment: "No rush! Let me know if you need any help setting it up.",
      date: "2024-01-02T09:15:00Z",
    },
    {
      id: 4,
      type: "returned",
      user: "Sarah Johnson",
      comment: "Thanks for letting me borrow it! Everything worked perfectly.",
      date: "2024-01-20T16:00:00Z",
    },
  ],
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const [newComment, setNewComment] = useState("")
  const [isAddingComment, setIsAddingComment] = useState(false)
  const [showReturnDialog, setShowReturnDialog] = useState(false)
  const [itemStatus, setItemStatus] = useState(mockItem.status)
  const router = useRouter()

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    setIsAddingComment(true)
    // Simulate API call
    setTimeout(() => {
      setNewComment("")
      setIsAddingComment(false)
    }, 1000)
  }

  const handleReturnItem = async (returnData: ReturnData) => {
    // In a real app, this would call your API to update the item
    console.log("Returning item with data:", returnData)

    // Update local state to show returned status
    setItemStatus("returned")

    // You could also add the return event to the history
    // and show a success message
  }

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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  const canReturnItem = () => {
    return itemStatus === "active" && (mockItem.type === "lent" || mockItem.type === "borrowed")
  }

  return (
    <MainLayout showFab={true} fabAction={handleAddItem} fabLabel="Add Item">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{mockItem.name}</h1>
          </div>
          <div className="flex space-x-2">
            {canReturnItem() && (
              <Button variant="default" size="sm" onClick={() => setShowReturnDialog(true)}>
                <Package2 className="h-4 w-4 mr-2" />
                Return Item
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <Link href={`/items/${params.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Photos and Details */}
          <div className="space-y-6">
            {/* Photos */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={mockItem.photos[0] || "/placeholder.svg"}
                    alt={mockItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {mockItem.photos.length > 1 && (
                  <div className="p-4">
                    <div className="flex space-x-2 overflow-x-auto">
                      {mockItem.photos.slice(1).map((photo, index) => (
                        <div key={index} className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={photo || "/placeholder.svg"}
                            alt={`${mockItem.name} ${index + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Item Details */}
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{mockItem.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{mockItem.category}</Badge>
                  <Badge variant={mockItem.type === "borrowed" ? "default" : "secondary"}>
                    {mockItem.type === "borrowed" ? "Borrowed" : "Lent"}
                  </Badge>
                  {itemStatus === "active" && (
                    <Badge variant="outline" className="text-green-600">
                      <Clock className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                  {itemStatus === "returned" && (
                    <Badge variant="outline" className="text-blue-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Returned
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">{formatDate(mockItem.createdAt)}</p>
                  </div>
                  {mockItem.dueDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className={`font-medium ${isOverdue(mockItem.dueDate) ? "text-red-600" : ""}`}>
                        {formatDate(mockItem.dueDate)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Return/Gone Information */}
            {itemStatus === "returned" && mockItem.returnedAt && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Item Returned</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Returned Date</p>
                    <p className="font-medium">{formatDate(mockItem.returnedAt)}</p>
                  </div>

                  {mockItem.returnComment && (
                    <div>
                      <p className="text-sm text-muted-foreground">Return Comment</p>
                      <p className="text-sm bg-muted p-3 rounded-md">{mockItem.returnComment}</p>
                    </div>
                  )}

                  {mockItem.returnPhotos && mockItem.returnPhotos.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Return Photos</p>
                      <div className="flex space-x-2 overflow-x-auto">
                        {mockItem.returnPhotos.map((photo, index) => (
                          <div key={index} className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={photo || "/placeholder.svg"}
                              alt={`Return photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {itemStatus === "gone" && mockItem.goneAt && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span>Item Marked as Gone</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date Marked Gone</p>
                    <p className="font-medium">{formatDate(mockItem.goneAt)}</p>
                  </div>

                  {mockItem.goneComment && (
                    <div>
                      <p className="text-sm text-muted-foreground">Comment</p>
                      <p className="text-sm bg-muted p-3 rounded-md">{mockItem.goneComment}</p>
                    </div>
                  )}

                  {mockItem.gonePhotos && mockItem.gonePhotos.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Photos</p>
                      <div className="flex space-x-2 overflow-x-auto">
                        {mockItem.gonePhotos.map((photo, index) => (
                          <div key={index} className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={photo || "/placeholder.svg"}
                              alt={`Gone photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Contact and Activity */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mockItem.contact.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{mockItem.contact.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{mockItem.contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{mockItem.contact.email}</p>
                    {mockItem.contact.connected && (
                      <Badge variant="outline" className="text-xs mt-1">
                        Connected
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/contacts/${mockItem.contact.id}`}>View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Add Comment */}
            {itemStatus === "active" && (
              <Card>
                <CardHeader>
                  <CardTitle>Add Comment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Add a comment about this item..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || isAddingComment}
                      className="flex-1"
                    >
                      {isAddingComment ? "Adding..." : "Add Comment"}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* History */}
            <Card>
              <CardHeader>
                <CardTitle>History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockItem.history.map((entry, index) => (
                    <div key={entry.id}>
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          {entry.type === "created" ? (
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-primary-foreground" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                              <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-sm font-medium">{entry.user}</p>
                            <p className="text-xs text-muted-foreground">{formatDateTime(entry.date)}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{entry.comment}</p>
                        </div>
                      </div>
                      {index < mockItem.history.length - 1 && <Separator className="my-4 ml-11" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Return Item Dialog */}
      <ReturnItemDialog
        open={showReturnDialog}
        onOpenChange={setShowReturnDialog}
        itemName={mockItem.name}
        onReturn={handleReturnItem}
      />
    </MainLayout>
  )
}

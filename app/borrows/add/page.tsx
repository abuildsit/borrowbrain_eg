"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, CalendarIcon, Upload, X, ArrowUpRight, ArrowDownLeft, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// Mock contacts
const mockContacts = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", connected: true },
  { id: 2, name: "Mike Chen", email: "mike@example.com", connected: true },
  { id: 3, name: "Alex Rivera", email: "alex@example.com", connected: false },
  { id: 4, name: "Emma Davis", email: "emma@example.com", connected: false },
]

const categories = [
  "Electronics",
  "Books",
  "Tools",
  "Clothing",
  "Sports Equipment",
  "Kitchen Items",
  "Outdoor Gear",
  "Games",
  "Other",
]

export default function AddBorrowPage() {
  const [itemName, setItemName] = useState("")
  const [description, setDescription] = useState("")
  const [initialComment, setInitialComment] = useState("e.g. Gave it to you during Pizza dinner at your house")
  const [category, setCategory] = useState("")
  const [contactId, setContactId] = useState("")
  const [itemType, setItemType] = useState("lent") // Default to "lent" (Loan To)
  const [dueDate, setDueDate] = useState<Date>()
  const [photos, setPhotos] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      router.push("/borrows")
    }, 1000)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you'd upload these files and get URLs back
      const newPhotos = Array.from(files).map(() => `/placeholder.svg?height=200&width=200`)
      setPhotos([...photos, ...newPhotos].slice(0, 5)) // Max 5 photos
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const toggleItemType = () => {
    setItemType(itemType === "lent" ? "borrowed" : "lent")
    // Update the initial comment based on the type
    if (itemType === "lent") {
      setInitialComment("e.g. Borrowed it from you during our coffee meetup")
    } else {
      setInitialComment("e.g. Gave it to you during Pizza dinner at your house")
    }
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="rounded-lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold text-text-primary">Add Borrow</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction Type - First Card */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">Transaction Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                type="button"
                onClick={toggleItemType}
                className={cn(
                  "w-full h-16 rounded-xl font-medium text-left flex items-center justify-between transition-all duration-200",
                  itemType === "lent"
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-primary text-white hover:bg-primary/90",
                )}
              >
                <div className="flex items-center space-x-3">
                  {itemType === "lent" ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                  <div className="font-semibold text-lg">{itemType === "lent" ? "Loan To" : "Borrowed From"}</div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Contact Selection - Second Card */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact" className="text-text-primary font-medium">
                  Select Contact *
                </Label>
                <Select value={contactId} onValueChange={setContactId}>
                  <SelectTrigger className="h-12 rounded-xl border-border">
                    <SelectValue placeholder="Search and select a contact" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border">
                    {mockContacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id.toString()} className="rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span>{contact.name}</span>
                          {contact.connected && <span className="text-xs text-success">(Connected)</span>}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-xl font-medium border-border"
                onClick={() => router.push("/contacts/add")}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Contact
              </Button>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">Borrow Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="itemName" className="text-text-primary font-medium">
                  Item Name *
                </Label>
                <Input
                  id="itemName"
                  placeholder="e.g. MacBook Pro 16&quot;"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="h-12 rounded-xl border-border"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-text-primary font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the item in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="rounded-xl border-border resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-text-primary font-medium">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-12 rounded-xl border-border">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="rounded-lg">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initialComment" className="text-text-primary font-medium">
                  Initial Comment
                </Label>
                <Textarea
                  id="initialComment"
                  value={initialComment}
                  onChange={(e) => setInitialComment(e.target.value)}
                  rows={2}
                  className="rounded-xl border-border resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square bg-secondary rounded-xl overflow-hidden">
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-lg"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {photos.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="h-6 w-6 text-text-secondary mb-2" />
                    <span className="text-sm text-text-secondary">Add Photo</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Transaction Details */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-text-primary font-medium">Due Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal rounded-xl border-border",
                        !dueDate && "text-text-secondary",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-xl border-border" align="start">
                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12 rounded-xl font-medium border-border"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-xl font-medium"
              disabled={!itemName || !contactId || isSubmitting}
            >
              {isSubmitting ? "Adding Borrow..." : "Add Borrow"}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}

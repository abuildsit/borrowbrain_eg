"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CalendarIcon, X, Camera } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface ReturnItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemName: string
  onReturn: (returnData: ReturnData) => void
}

export interface ReturnData {
  returnDate: Date
  returnComment: string
  returnPhotos: string[]
}

export function ReturnItemDialog({ open, onOpenChange, itemName, onReturn }: ReturnItemDialogProps) {
  const [returnDate, setReturnDate] = useState<Date>(new Date())
  const [returnComment, setReturnComment] = useState("")
  const [returnPhotos, setReturnPhotos] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you'd upload these files and get URLs back
      const newPhotos = Array.from(files).map(() => `/placeholder.svg?height=200&width=200`)
      setReturnPhotos([...returnPhotos, ...newPhotos].slice(0, 5)) // Max 5 photos
    }
  }

  const removePhoto = (index: number) => {
    setReturnPhotos(returnPhotos.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onReturn({
        returnDate,
        returnComment,
        returnPhotos,
      })

      // Reset form
      setReturnDate(new Date())
      setReturnComment("")
      setReturnPhotos([])
      setIsSubmitting(false)
      onOpenChange(false)
    }, 1000)
  }

  const handleCancel = () => {
    // Reset form
    setReturnDate(new Date())
    setReturnComment("")
    setReturnPhotos([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Return Borrow</DialogTitle>
          <DialogDescription>Mark "{itemName}" as returned and add details about the borrow.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Return Date */}
          <div className="space-y-2">
            <Label>Return Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !returnDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={(date) => date && setReturnDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return Comment */}
          <div className="space-y-2">
            <Label htmlFor="returnComment">Return Comment</Label>
            <Textarea
              id="returnComment"
              placeholder="Add any notes about the return (optional)..."
              value={returnComment}
              onChange={(e) => setReturnComment(e.target.value)}
              rows={3}
            />
          </div>

          {/* Return Photos */}
          <div className="space-y-2">
            <Label>Return Photos (Optional)</Label>
            <div className="grid grid-cols-3 gap-3">
              {returnPhotos.map((photo, index) => (
                <div key={index} className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`Return photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {returnPhotos.length < 5 && (
                <label className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                  <Camera className="h-6 w-6 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground text-center">Add Photo</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
                </label>
              )}
            </div>
            {returnPhotos.length > 0 && (
              <p className="text-xs text-muted-foreground">{returnPhotos.length}/5 photos added</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Returning Borrow..." : "Mark Borrow as Returned"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Mail, UserPlus } from "lucide-react"

export default function AddContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [contactType, setContactType] = useState("personal")
  const [inviteMessage, setInviteMessage] = useState(
    "Hey! I'd like to connect with you on BorrowBrain to track items we share.",
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      router.push("/contacts")
    }, 1000)
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Add Contact</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Type */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={contactType} onValueChange={setContactType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal" id="personal" />
                  <Label htmlFor="personal" className="flex-1">
                    <div>
                      <p className="font-medium">Personal Contact</p>
                      <p className="text-sm text-muted-foreground">
                        Add someone for your personal tracking (they won't receive notifications)
                      </p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="invite" id="invite" />
                  <Label htmlFor="invite" className="flex-1">
                    <div>
                      <p className="font-medium">Send Invitation</p>
                      <p className="text-sm text-muted-foreground">
                        Invite them to join BorrowBrain and connect with you
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Invitation Message */}
          {contactType === "invite" && (
            <Card>
              <CardHeader>
                <CardTitle>Invitation Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inviteMessage">Personal Message</Label>
                  <Textarea
                    id="inviteMessage"
                    value={inviteMessage}
                    onChange={(e) => setInviteMessage(e.target.value)}
                    rows={3}
                    placeholder="Add a personal message to your invitation..."
                  />
                </div>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 inline mr-1" />
                    They'll receive an email invitation with your message and a link to join BorrowBrain.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit */}
          <div className="flex space-x-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={!name || !email || isSubmitting}>
              {isSubmitting ? (
                contactType === "invite" ? (
                  "Sending Invitation..."
                ) : (
                  "Adding Contact..."
                )
              ) : (
                <>
                  {contactType === "invite" ? (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Invitation
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Contact
                    </>
                  )}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}

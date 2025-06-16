"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Package, UserPlus, CheckCircle, ExternalLink } from "lucide-react"

// Mock data for invite
const mockInvite = {
  id: "inv_123",
  type: "user_invite", // or 'item_share'
  inviter: {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=60&width=60",
    initials: "SJ",
  },
  message: "Hey! I'd like to connect with you on BorrowBrain to track items we share.",
  item: null, // Would contain item data for item_share invites
  createdAt: "2024-01-10T10:00:00Z",
  expiresAt: "2024-02-10T10:00:00Z",
}

export default function InvitePage() {
  const [invite, setInvite] = useState(mockInvite)
  const [isAccepting, setIsAccepting] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if invite is expired
    const now = new Date()
    const expiryDate = new Date(invite.expiresAt)
    setIsExpired(now > expiryDate)
  }, [invite.expiresAt])

  const handleAcceptInvite = async () => {
    setIsAccepting(true)

    // Simulate API call
    setTimeout(() => {
      setIsAccepted(true)
      setIsAccepting(false)

      // Redirect to app after a short delay
      setTimeout(() => {
        router.push("/items")
      }, 2000)
    }, 1500)
  }

  const handleDeclineInvite = () => {
    // In a real app, this would mark the invite as declined
    router.push("/login")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  if (isAccepted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Welcome to BorrowBrain!</h2>
            <p className="text-muted-foreground mb-4">
              You're now connected with {invite.inviter.name}. Redirecting you to the app...
            </p>
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Invitation Expired</CardTitle>
            <CardDescription>
              This invitation link has expired. Please ask {invite.inviter.name} to send you a new invitation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push("/login")}>
              Go to BorrowBrain
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Package className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">You're Invited!</CardTitle>
          <CardDescription>Join BorrowBrain to track borrowed and lent items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Inviter Info */}
          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src={invite.inviter.avatar || "/placeholder.svg"} />
              <AvatarFallback>{invite.inviter.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{invite.inviter.name}</h3>
              <p className="text-sm text-muted-foreground">{invite.inviter.email}</p>
            </div>
            <Badge variant="outline">
              <UserPlus className="h-3 w-3 mr-1" />
              Inviter
            </Badge>
          </div>

          {/* Message */}
          {invite.message && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm italic">"{invite.message}"</p>
            </div>
          )}

          {/* Item Info (if item share invite) */}
          {invite.item && (
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={invite.item.thumbnail || "/placeholder.svg"}
                    alt={invite.item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{invite.item.name}</h4>
                  <p className="text-sm text-muted-foreground">{invite.item.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Invite Details */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Invited on {formatDate(invite.createdAt)}</p>
            <p>Expires on {formatDate(invite.expiresAt)}</p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full" onClick={handleAcceptInvite} disabled={isAccepting}>
              {isAccepting ? "Accepting..." : "Accept Invitation & Join BorrowBrain"}
            </Button>
            <Button variant="outline" className="w-full" onClick={handleDeclineInvite}>
              Decline
            </Button>
          </div>

          {/* App Info */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">Already have an account?</p>
            <Button variant="ghost" size="sm" asChild>
              <a href="/login">
                <ExternalLink className="h-4 w-4 mr-2" />
                Sign in to BorrowBrain
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

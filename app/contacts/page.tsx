"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, UserPlus, Mail, CheckCircle } from "lucide-react"

// Mock data
const mockContacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
    connected: true,
    activeItems: 2,
    totalItems: 5,
    lastActivity: "2024-01-10",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MC",
    connected: true,
    activeItems: 1,
    totalItems: 3,
    lastActivity: "2024-01-08",
  },
  {
    id: 3,
    name: "Alex Rivera",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AR",
    connected: false,
    activeItems: 0,
    totalItems: 2,
    lastActivity: "2023-12-28",
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ED",
    connected: false,
    activeItems: 1,
    totalItems: 1,
    lastActivity: "2024-01-05",
  },
]

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddContact = () => {
    router.push("/contacts/add")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (filteredContacts.length === 0 && searchQuery === "") {
    return (
      <MainLayout showFab={true} fabAction={handleAddContact} fabLabel="Add Contact">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-3">No contacts yet</h3>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Add contacts to start tracking shared items and keep everything organized.
          </p>
          <Button onClick={handleAddContact} className="rounded-xl font-medium">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Your First Contact
          </Button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout showFab={true} fabAction={handleAddContact} fabLabel="Add Contact">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary mb-2">Contacts</h1>
          <p className="text-text-secondary">Manage your contacts and connections</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl border-border"
          />
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="text-text-secondary">No contacts found</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <Link key={contact.id} href={`/contacts/${contact.id}`}>
                <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary text-white font-medium text-lg">
                          {contact.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg text-text-primary truncate">{contact.name}</h3>
                          {contact.connected && (
                            <Badge className="text-xs rounded-lg font-medium status-returned border">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Connected
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Mail className="h-4 w-4 text-text-secondary" />
                          <p className="text-sm text-text-secondary truncate">{contact.email}</p>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <span>
                            {contact.activeItems} active item{contact.activeItems !== 1 ? "s" : ""}
                          </span>
                          <span>•</span>
                          <span>
                            {contact.totalItems} total item{contact.totalItems !== 1 ? "s" : ""}
                          </span>
                          <span>•</span>
                          <span>Last activity {formatDate(contact.lastActivity)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  )
}

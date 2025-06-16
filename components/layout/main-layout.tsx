"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, Package, Users, Activity, User, LogOut, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Borrows", href: "/borrows", icon: Package },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Activity", href: "/activity", icon: Activity },
  { name: "Account", href: "/account", icon: User },
]

interface MainLayoutProps {
  children: React.ReactNode
  showFab?: boolean
  fabAction?: () => void
  fabLabel?: string
}

export function MainLayout({ children, showFab = false, fabAction, fabLabel = "Add" }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="lg:pl-72">
          {/* Top bar */}
          <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border bg-white px-6 shadow-sm">
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden rounded-lg">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </div>

          {/* Page content */}
          <main className="py-8">
            <div className="px-6 lg:px-8">{children}</div>
          </main>
        </div>

        <SheetContent side="left" className="w-72 p-0 bg-white border-r border-border">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center px-6 border-b border-border">
              <Link href="/borrows" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-text-primary">BorrowBrain</span>
              </Link>
            </div>
            <nav className="flex-1 space-y-2 px-4 py-6">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-text-primary hover:bg-secondary",
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="border-t border-border p-6">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-primary text-white font-medium">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">John Doe</p>
                  <p className="text-xs text-text-secondary truncate">john@example.com</p>
                </div>
                <Button variant="ghost" size="sm" className="rounded-lg">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow border-r border-border bg-white">
          <div className="flex h-16 items-center px-6 border-b border-border">
            <Link href="/borrows" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-text-primary">BorrowBrain</span>
            </Link>
          </div>
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-text-primary hover:bg-secondary",
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-border p-6">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-primary text-white font-medium">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">John Doe</p>
                <p className="text-xs text-text-secondary truncate">john@example.com</p>
              </div>
              <Button variant="ghost" size="sm" className="rounded-lg">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      {showFab && (
        <Button
          onClick={fabAction}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg lg:bottom-8 lg:right-8 bg-primary hover:bg-primary/90 text-white"
          size="icon"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">{fabLabel}</span>
        </Button>
      )}
    </div>
  )
}

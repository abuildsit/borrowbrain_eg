"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Package } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate login
    setTimeout(() => {
      if (email === "demo@example.com" && password === "password") {
        router.push("/borrows")
      } else {
        setError("Invalid email or password")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Package className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold text-text-primary">Welcome to BorrowBrain</CardTitle>
          <CardDescription className="text-text-secondary">
            Sign in to track your borrowed and lent items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert className="border-error/20 bg-error/5 rounded-xl">
                <AlertDescription className="text-error">{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-text-primary font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-text-primary font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl border-border"
                required
              />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl font-medium" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-8 text-center space-y-4">
            <Link
              href="/forgot-password"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Forgot your password?
            </Link>
            <div className="text-sm text-text-secondary">
              {"Don't have an account? "}
              <Link href="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                Sign up
              </Link>
            </div>
          </div>
          <div className="mt-6 p-4 bg-secondary rounded-xl">
            <p className="text-xs text-text-secondary text-center">
              Demo: Use email "demo@example.com" and password "password"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

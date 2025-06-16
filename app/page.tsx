import { redirect } from "next/navigation"

export default function HomePage() {
  // In a real app, check authentication status
  // For demo purposes, redirect to borrows page
  redirect("/borrows")
}

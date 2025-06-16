"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Bell, Save } from "lucide-react"

export default function NotificationPreferencesPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [overdueReminders, setOverdueReminders] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(false)
  const [itemReturned, setItemReturned] = useState(true)
  const [itemBorrowed, setItemBorrowed] = useState(true)
  const [commentsAdded, setCommentsAdded] = useState(true)
  const [contactJoined, setContactJoined] = useState(true)
  const [dueDateReminders, setDueDateReminders] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      // Show success message or navigate back
      router.back()
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
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Notification Preferences</h1>
            <p className="text-muted-foreground">Choose how you want to be notified</p>
          </div>
        </div>

        {/* General Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
              </div>
              <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Item Activity Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Item Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Item Returned</Label>
                <p className="text-sm text-muted-foreground">When someone returns an item to you</p>
              </div>
              <Switch checked={itemReturned} onCheckedChange={setItemReturned} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Item Borrowed</Label>
                <p className="text-sm text-muted-foreground">When someone confirms they received your item</p>
              </div>
              <Switch checked={itemBorrowed} onCheckedChange={setItemBorrowed} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Comments Added</Label>
                <p className="text-sm text-muted-foreground">When someone comments on your items</p>
              </div>
              <Switch checked={commentsAdded} onCheckedChange={setCommentsAdded} />
            </div>
          </CardContent>
        </Card>

        {/* Reminder Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Reminders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Due Date Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded 3 days before items are due</p>
              </div>
              <Switch checked={dueDateReminders} onCheckedChange={setDueDateReminders} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Overdue Reminders</Label>
                <p className="text-sm text-muted-foreground">Get notified when items are overdue</p>
              </div>
              <Switch checked={overdueReminders} onCheckedChange={setOverdueReminders} />
            </div>
          </CardContent>
        </Card>

        {/* Social Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Social</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Contact Joined</Label>
                <p className="text-sm text-muted-foreground">When someone you invited joins BorrowBrain</p>
              </div>
              <Switch checked={contactJoined} onCheckedChange={setContactJoined} />
            </div>
          </CardContent>
        </Card>

        {/* Digest Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Digest</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">Receive a weekly summary of your activity</p>
              </div>
              <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex space-x-4">
          <Button onClick={handleSave} disabled={isSaving} className="flex-1">
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}

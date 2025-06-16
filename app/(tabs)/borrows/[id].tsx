"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router, useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

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
    initials: "SJ",
    email: "sarah@example.com",
    connected: true,
  },
  dueDate: "2024-01-15",
  status: "active",
  photos: [
    "https://via.placeholder.com/400x300",
    "https://via.placeholder.com/400x300",
    "https://via.placeholder.com/400x300",
  ],
  createdAt: "2024-01-01",
  initialComment: "Gave it to you during Pizza dinner at your house",
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
  ],
}

export default function BorrowDetailScreen() {
  const { id } = useLocalSearchParams()
  const [newComment, setNewComment] = useState("")
  const [isAddingComment, setIsAddingComment] = useState(false)

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    setIsAddingComment(true)
    setTimeout(() => {
      setNewComment("")
      setIsAddingComment(false)
      Alert.alert("Success", "Comment added successfully")
    }, 1000)
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200 flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#212121" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900 flex-1" numberOfLines={1}>
            {mockItem.name}
          </Text>
        </View>
        <TouchableOpacity className="ml-2">
          <Ionicons name="ellipsis-horizontal" size={24} color="#212121" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Main Photo */}
        <View className="bg-white mx-4 mt-4 rounded-xl overflow-hidden border border-gray-200">
          <Image source={{ uri: mockItem.photos[0] }} className="w-full h-64" resizeMode="cover" />
          {mockItem.photos.length > 1 && (
            <ScrollView horizontal className="p-4" showsHorizontalScrollIndicator={false}>
              {mockItem.photos.slice(1).map((photo, index) => (
                <Image key={index} source={{ uri: photo }} className="w-16 h-16 rounded-xl mr-2" resizeMode="cover" />
              ))}
            </ScrollView>
          )}
        </View>

        {/* Item Details */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-4 border border-gray-200">
          <Text className="text-xl font-bold text-gray-900 mb-2">{mockItem.name}</Text>
          <Text className="text-gray-600 mb-4 leading-6">{mockItem.description}</Text>

          <View className="flex-row flex-wrap mb-4">
            <View className="bg-gray-100 px-3 py-1 rounded-lg mr-2 mb-2">
              <Text className="text-gray-700 text-sm">{mockItem.category}</Text>
            </View>
            <View
              className={`px-3 py-1 rounded-lg mr-2 mb-2 ${
                mockItem.type === "borrowed" ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              <Text
                className={`text-sm font-medium ${mockItem.type === "borrowed" ? "text-blue-600" : "text-green-600"}`}
              >
                {mockItem.type === "borrowed" ? "Borrowed" : "Lent"}
              </Text>
            </View>
            <View className="bg-primary/10 px-3 py-1 rounded-lg mb-2">
              <Text className="text-primary text-sm font-medium">Active</Text>
            </View>
          </View>

          <View className="flex-row justify-between">
            <View>
              <Text className="text-gray-500 text-sm">Created</Text>
              <Text className="text-gray-900 font-medium">{formatDate(mockItem.createdAt)}</Text>
            </View>
            {mockItem.dueDate && (
              <View>
                <Text className="text-gray-500 text-sm">Due Date</Text>
                <Text className="text-gray-900 font-medium">{formatDate(mockItem.dueDate)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Contact Info */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-4 border border-gray-200">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Contact</Text>
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-primary rounded-full items-center justify-center mr-3">
              <Text className="text-white font-medium">{mockItem.contact.initials}</Text>
            </View>
            <View className="flex-1">
              <Text className="font-medium text-gray-900">{mockItem.contact.name}</Text>
              <Text className="text-gray-600 text-sm">{mockItem.contact.email}</Text>
              {mockItem.contact.connected && (
                <View className="bg-green-100 px-2 py-1 rounded mt-1 self-start">
                  <Text className="text-green-600 text-xs">Connected</Text>
                </View>
              )}
            </View>
            <TouchableOpacity className="bg-gray-100 px-3 py-2 rounded-lg">
              <Text className="text-gray-700 font-medium">View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add Comment */}
        {mockItem.status === "active" && (
          <View className="bg-white mx-4 mt-4 rounded-xl p-4 border border-gray-200">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Add Comment</Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 mb-3"
              placeholder="Add a comment about this borrow..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
            <View className="flex-row">
              <TouchableOpacity
                className={`flex-1 bg-primary rounded-xl py-3 items-center mr-2 ${
                  !newComment.trim() || isAddingComment ? "opacity-50" : ""
                }`}
                onPress={handleAddComment}
                disabled={!newComment.trim() || isAddingComment}
              >
                <Text className="text-white font-medium">{isAddingComment ? "Adding..." : "Add Comment"}</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-100 px-4 py-3 rounded-xl">
                <Ionicons name="camera-outline" size={20} color="#757575" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* History */}
        <View className="bg-white mx-4 mt-4 mb-8 rounded-xl p-4 border border-gray-200">
          <Text className="text-lg font-semibold text-gray-900 mb-4">History</Text>
          {mockItem.history.map((entry, index) => (
            <View key={entry.id} className="flex-row mb-4">
              <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-3 mt-1">
                <Ionicons
                  name={entry.type === "created" ? "checkmark" : "chatbubble-outline"}
                  size={16}
                  color="white"
                />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text className="font-medium text-gray-900 mr-2">{entry.user}</Text>
                  <Text className="text-gray-500 text-xs">{formatDateTime(entry.date)}</Text>
                </View>
                <Text className="text-gray-600 leading-5">{entry.comment}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      {mockItem.status === "active" && (
        <View className="bg-white border-t border-gray-200 p-4 flex-row">
          <TouchableOpacity className="flex-1 bg-primary rounded-xl py-3 items-center mr-2">
            <Text className="text-white font-semibold">Return Borrow</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 px-4 py-3 rounded-xl">
            <Ionicons name="pencil-outline" size={20} color="#757575" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

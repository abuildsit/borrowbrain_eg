"use client"

import { useState, useCallback } from "react"
import { View, Text, FlatList, TouchableOpacity, TextInput, RefreshControl, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

// Mock data
const mockItems = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    description: "Silver MacBook Pro with M2 chip",
    category: "Electronics",
    type: "lent",
    contact: { name: "Sarah Johnson", initials: "SJ" },
    dueDate: "2024-01-15",
    status: "active",
    thumbnail: "https://via.placeholder.com/80x80",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "The Design of Everyday Things",
    description: "Book by Don Norman",
    category: "Books",
    type: "borrowed",
    contact: { name: "Mike Chen", initials: "MC" },
    dueDate: "2024-01-20",
    status: "active",
    thumbnail: "https://via.placeholder.com/80x80",
    createdAt: "2024-01-05",
  },
  {
    id: 3,
    name: "Camping Tent",
    description: "4-person waterproof tent",
    category: "Outdoor",
    type: "lent",
    contact: { name: "Alex Rivera", initials: "AR" },
    dueDate: null,
    status: "returned",
    thumbnail: "https://via.placeholder.com/80x80",
    createdAt: "2023-12-15",
    returnedAt: "2023-12-28",
  },
]

const tabs = ["All", "Active", "Borrowed", "Lent", "Returned"]

export default function BorrowsScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("All")
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }, [])

  const filteredItems = mockItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contact.name.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "All") return matchesSearch
    if (activeTab === "Active") return matchesSearch && item.status === "active"
    if (activeTab === "Returned") return matchesSearch && item.status === "returned"
    if (activeTab === "Borrowed") return matchesSearch && item.type === "borrowed"
    if (activeTab === "Lent") return matchesSearch && item.type === "lent"

    return matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusBadge = (status: string, type: string) => {
    if (status === "active") {
      return (
        <View className="bg-primary/10 px-2 py-1 rounded-lg flex-row items-center">
          <Ionicons name="time-outline" size={12} color="#4DB6AC" />
          <Text className="text-primary text-xs font-medium ml-1">Active</Text>
        </View>
      )
    }
    if (status === "returned") {
      return (
        <View className="bg-green-100 px-2 py-1 rounded-lg flex-row items-center">
          <Ionicons name="checkmark-circle-outline" size={12} color="#66BB6A" />
          <Text className="text-green-600 text-xs font-medium ml-1">Returned</Text>
        </View>
      )
    }
    return null
  }

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="bg-white border border-gray-200 rounded-xl p-4 mb-3 mx-4"
      onPress={() => router.push(`/(tabs)/borrows/${item.id}`)}
    >
      <View className="flex-row">
        <Image source={{ uri: item.thumbnail }} className="w-16 h-16 rounded-xl bg-gray-100" resizeMode="cover" />
        <View className="flex-1 ml-4">
          <Text className="text-lg font-semibold text-gray-900 mb-1">{item.name}</Text>
          <Text className="text-gray-600 text-sm mb-2" numberOfLines={2}>
            {item.description}
          </Text>

          <View className="flex-row items-center mb-2">
            <View className="bg-gray-100 px-2 py-1 rounded-lg mr-2">
              <Text className="text-gray-700 text-xs">{item.category}</Text>
            </View>
            <View className={`px-2 py-1 rounded-lg mr-2 ${item.type === "borrowed" ? "bg-blue-100" : "bg-green-100"}`}>
              <Text className={`text-xs font-medium ${item.type === "borrowed" ? "text-blue-600" : "text-green-600"}`}>
                {item.type === "borrowed" ? "Borrowed" : "Lent"}
              </Text>
            </View>
            {getStatusBadge(item.status, item.type)}
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={14} color="#757575" />
              <Text className="text-gray-600 text-sm ml-1">{item.contact.name}</Text>
            </View>
            {item.dueDate && item.status === "active" && (
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={14} color="#757575" />
                <Text className="text-gray-600 text-sm ml-1">Due {formatDate(item.dueDate)}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  const EmptyState = () => (
    <View className="flex-1 justify-center items-center px-8 py-16">
      <View className="w-20 h-20 bg-primary/10 rounded-3xl items-center justify-center mb-6">
        <Ionicons name="cube-outline" size={40} color="#4DB6AC" />
      </View>
      <Text className="text-xl font-semibold text-gray-900 mb-3">No borrows yet</Text>
      <Text className="text-gray-600 text-center mb-8 leading-6">
        Start tracking items you borrow or lend to others. Keep everything organized in one place.
      </Text>
      <TouchableOpacity className="bg-primary rounded-xl px-6 py-3" onPress={() => router.push("/(tabs)/borrows/add")}>
        <Text className="text-white font-semibold">Add Your First Borrow</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Borrows</Text>
            <Text className="text-gray-600">Track items you've borrowed or lent</Text>
          </View>
          <TouchableOpacity
            className="bg-primary w-12 h-12 rounded-full items-center justify-center"
            onPress={() => router.push("/(tabs)/borrows/add")}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="relative">
          <Ionicons
            name="search-outline"
            size={20}
            color="#757575"
            style={{ position: "absolute", left: 12, top: 12, zIndex: 1 }}
          />
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-900"
            placeholder="Search borrows, descriptions, or contacts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tabs */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={tabs}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`px-4 py-2 rounded-xl mr-2 ${activeTab === item ? "bg-primary" : "bg-gray-100"}`}
              onPress={() => setActiveTab(item)}
            >
              <Text className={`font-medium ${activeTab === item ? "text-white" : "text-gray-700"}`}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Content */}
      {filteredItems.length === 0 && searchQuery === "" && activeTab === "All" ? (
        <EmptyState />
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center py-16">
              <Ionicons name="cube-outline" size={48} color="#757575" />
              <Text className="text-gray-600 mt-4">No borrows found</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  )
}

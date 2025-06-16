"use client"

import { useState, useCallback } from "react"
import { View, Text, FlatList, TouchableOpacity, TextInput, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

const mockContacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
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
    initials: "AR",
    connected: false,
    activeItems: 0,
    totalItems: 2,
    lastActivity: "2023-12-28",
  },
]

export default function ContactsScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }, [])

  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="bg-white border border-gray-200 rounded-xl p-4 mb-3 mx-4"
      onPress={() => router.push(`/(tabs)/contacts/${item.id}`)}
    >
      <View className="flex-row items-center">
        <View className="w-14 h-14 bg-primary rounded-full items-center justify-center mr-4">
          <Text className="text-white font-semibold text-lg">{item.initials}</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text className="text-lg font-semibold text-gray-900 mr-2">{item.name}</Text>
            {item.connected && (
              <View className="bg-green-100 px-2 py-1 rounded-lg">
                <Text className="text-green-600 text-xs font-medium">Connected</Text>
              </View>
            )}
          </View>
          <View className="flex-row items-center mb-2">
            <Ionicons name="mail-outline" size={14} color="#757575" />
            <Text className="text-gray-600 text-sm ml-1">{item.email}</Text>
          </View>
          <View className="flex-row items-center text-sm text-gray-600">
            <Text className="mr-3">
              {item.activeItems} active item{item.activeItems !== 1 ? "s" : ""}
            </Text>
            <Text className="mr-3">•</Text>
            <Text className="mr-3">
              {item.totalItems} total item{item.totalItems !== 1 ? "s" : ""}
            </Text>
            <Text className="mr-3">•</Text>
            <Text>Last activity {formatDate(item.lastActivity)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  const EmptyState = () => (
    <View className="flex-1 justify-center items-center px-8 py-16">
      <View className="w-20 h-20 bg-primary/10 rounded-3xl items-center justify-center mb-6">
        <Ionicons name="people-outline" size={40} color="#4DB6AC" />
      </View>
      <Text className="text-xl font-semibold text-gray-900 mb-3">No contacts yet</Text>
      <Text className="text-gray-600 text-center mb-8 leading-6">
        Add contacts to start tracking shared items and keep everything organized.
      </Text>
      <TouchableOpacity className="bg-primary rounded-xl px-6 py-3" onPress={() => router.push("/(tabs)/contacts/add")}>
        <Text className="text-white font-semibold">Add Your First Contact</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Contacts</Text>
            <Text className="text-gray-600">Manage your contacts and connections</Text>
          </View>
          <TouchableOpacity
            className="bg-primary w-12 h-12 rounded-full items-center justify-center"
            onPress={() => router.push("/(tabs)/contacts/add")}
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
            placeholder="Search contacts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Content */}
      {filteredContacts.length === 0 && searchQuery === "" ? (
        <EmptyState />
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center py-16">
              <Ionicons name="people-outline" size={48} color="#757575" />
              <Text className="text-gray-600 mt-4">No contacts found</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  )
}

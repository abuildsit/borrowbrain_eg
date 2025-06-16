"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import DatePicker from "react-native-date-picker"

const mockContacts = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", connected: true },
  { id: 2, name: "Mike Chen", email: "mike@example.com", connected: true },
  { id: 3, name: "Alex Rivera", email: "alex@example.com", connected: false },
  { id: 4, name: "Emma Davis", email: "emma@example.com", connected: false },
]

const categories = [
  "Electronics",
  "Books",
  "Tools",
  "Clothing",
  "Sports Equipment",
  "Kitchen Items",
  "Outdoor Gear",
  "Games",
  "Other",
]

export default function AddBorrowScreen() {
  const [itemName, setItemName] = useState("")
  const [description, setDescription] = useState("")
  const [initialComment, setInitialComment] = useState("e.g. Gave it to you during Pizza dinner at your house")
  const [category, setCategory] = useState("")
  const [contactId, setContactId] = useState("")
  const [itemType, setItemType] = useState("lent")
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [photos, setPhotos] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showContactPicker, setShowContactPicker] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)

  const handleSubmit = async () => {
    if (!itemName.trim() || !contactId) {
      Alert.alert("Error", "Please fill in required fields")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      router.back()
    }, 1000)
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    })

    if (!result.canceled && result.assets) {
      const newPhotos = result.assets.map((asset) => asset.uri)
      setPhotos([...photos, ...newPhotos].slice(0, 5))
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const toggleItemType = () => {
    setItemType(itemType === "lent" ? "borrowed" : "lent")
    setInitialComment(
      itemType === "lent"
        ? "e.g. Borrowed it from you during our coffee meetup"
        : "e.g. Gave it to you during Pizza dinner at your house",
    )
  }

  const selectedContact = mockContacts.find((c) => c.id.toString() === contactId)
  const selectedCategory = category

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        {/* Header */}
        <View className="bg-white px-4 py-4 border-b border-gray-200 flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#212121" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900">Add Borrow</Text>
        </View>

        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
          {/* Transaction Type */}
          <View className="bg-white mx-4 mt-4 rounded-xl p-4 border border-gray-200">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Transaction Type</Text>
            <TouchableOpacity
              className="bg-primary rounded-xl p-4 flex-row items-center justify-between"
              onPress={toggleItemType}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name={itemType === "lent" ? "arrow-up-outline" : "arrow-down-outline"}
                  size={20}
                  color="white"
                />
                <Text className="text-white font-semibold text-lg ml-3">
                  {itemType === "lent" ? "Loan To" : "Borrowed From"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Contact Selection */}
          <View className="bg-white mx-4 mt-4 rounded-xl p-4 border border-gray-200">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Contact</Text>
            <TouchableOpacity
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-3"
              onPress={() => setShowContactPicker(true)}
            >
              <Text className={selectedContact ? "text-gray-900" : "text-gray-500"}>
                {selectedContact ? selectedContact.name : "Select a contact"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border border-primary rounded-xl p-4 flex-row items-center justify-center"
              onPress={() => router.push("/(tabs)/contacts/add")}
            >
              <Ionicons name="person-add-outline" size={20} color="#4DB6AC" />
              <Text className="text-primary font-medium ml-2">Add New Contact</Text>
            </TouchableOpacity>
          </View>

          {/* Item Information */}
          <View className="bg-white mx-4 mt-4 rounded-xl p-4 border border-gray-200">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Borrow Information</Text>

            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Item Name *</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                placeholder="e.g. MacBook Pro 16&quot;"
                value={itemName}
                onChangeText={setItemName}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Description</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                placeholder="Describe the item in detail..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Category</Text>
              <TouchableOpacity
                className="bg-gray-50 border border-gray-200 rounded-xl p-4"
                onPress={() => setShowCategoryPicker(true)}
              >
                <Text className={selectedCategory ? "text-gray-900" : "text-gray-500"}>
                  {selectedCategory || "Select a category"}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">Initial Comment</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                value={initialComment}
                onChangeText={setInitialComment}
                multiline
                numberOfLines={2}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Photos */}
          <View className="bg-white mx-4 mt-4 rounded-xl p-4 border border-gray-200">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Photos</Text>
            <View className="flex-row flex-wrap">
              {photos.map((photo, index) => (
                <View key={index} className="relative mr-3 mb-3">
                  <Image source={{ uri: photo }} className="w-20 h-20 rounded-xl" />
                  <TouchableOpacity
                    className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 rounded-full items-center justify-center"
                    onPress={() => removePhoto(index)}
                  >
                    <Ionicons name="close" size={14} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
              {photos.length < 5 && (
                <TouchableOpacity
                  className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-xl items-center justify-center"
                  onPress={pickImage}
                >
                  <Ionicons name="camera-outline" size={24} color="#757575" />
                  <Text className="text-xs text-gray-500 mt-1">Add Photo</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Due Date */}
          <View className="bg-white mx-4 mt-4 rounded-xl p-4 border border-gray-200">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Additional Details</Text>
            <View>
              <Text className="text-gray-700 font-medium mb-2">Due Date (Optional)</Text>
              <TouchableOpacity
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex-row items-center"
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={20} color="#757575" />
                <Text className={`ml-3 ${dueDate ? "text-gray-900" : "text-gray-500"}`}>
                  {dueDate ? dueDate.toLocaleDateString() : "Pick a date"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <View className="p-4 pb-8">
            <TouchableOpacity
              className={`bg-primary rounded-xl py-4 items-center ${
                !itemName.trim() || !contactId || isSubmitting ? "opacity-50" : ""
              }`}
              onPress={handleSubmit}
              disabled={!itemName.trim() || !contactId || isSubmitting}
            >
              <Text className="text-white font-semibold text-lg">
                {isSubmitting ? "Adding Borrow..." : "Add Borrow"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Date Picker Modal */}
        <DatePicker
          modal
          open={showDatePicker}
          date={dueDate || new Date()}
          mode="date"
          onConfirm={(date) => {
            setShowDatePicker(false)
            setDueDate(date)
          }}
          onCancel={() => setShowDatePicker(false)}
        />

        {/* Contact Picker Modal */}
        {showContactPicker && (
          <View className="absolute inset-0 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-4 max-h-96">
              <Text className="text-lg font-semibold text-center mb-4">Select Contact</Text>
              <ScrollView>
                {mockContacts.map((contact) => (
                  <TouchableOpacity
                    key={contact.id}
                    className="flex-row items-center p-3 border-b border-gray-100"
                    onPress={() => {
                      setContactId(contact.id.toString())
                      setShowContactPicker(false)
                    }}
                  >
                    <View className="w-10 h-10 bg-primary rounded-full items-center justify-center mr-3">
                      <Text className="text-white font-medium">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="font-medium text-gray-900">{contact.name}</Text>
                      <Text className="text-gray-600 text-sm">{contact.email}</Text>
                    </View>
                    {contact.connected && (
                      <View className="bg-green-100 px-2 py-1 rounded">
                        <Text className="text-green-600 text-xs">Connected</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                className="mt-4 bg-gray-100 rounded-xl py-3 items-center"
                onPress={() => setShowContactPicker(false)}
              >
                <Text className="text-gray-700 font-medium">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Category Picker Modal */}
        {showCategoryPicker && (
          <View className="absolute inset-0 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-4 max-h-96">
              <Text className="text-lg font-semibold text-center mb-4">Select Category</Text>
              <ScrollView>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    className="p-3 border-b border-gray-100"
                    onPress={() => {
                      setCategory(cat)
                      setShowCategoryPicker(false)
                    }}
                  >
                    <Text className="text-gray-900">{cat}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                className="mt-4 bg-gray-100 rounded-xl py-3 items-center"
                onPress={() => setShowCategoryPicker(false)}
              >
                <Text className="text-gray-700 font-medium">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

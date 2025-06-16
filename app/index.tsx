"use client"

import { useEffect } from "react"
import { router } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, ActivityIndicator } from "react-native"

export default function Index() {
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken")
      if (token) {
        router.replace("/(tabs)/borrows")
      } else {
        router.replace("/(auth)/login")
      }
    } catch (error) {
      router.replace("/(auth)/login")
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#4DB6AC" />
    </View>
  )
}

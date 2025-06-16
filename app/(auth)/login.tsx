"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setLoading(true)

    // Simulate login
    setTimeout(async () => {
      if (email === "demo@example.com" && password === "password") {
        await AsyncStorage.setItem("authToken", "demo-token")
        router.replace("/(tabs)/borrows")
      } else {
        Alert.alert("Error", "Invalid email or password")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" className="px-6">
          <View className="flex-1 justify-center py-12">
            {/* Logo */}
            <View className="items-center mb-12">
              <View className="w-20 h-20 bg-primary rounded-3xl items-center justify-center mb-6">
                <Ionicons name="cube-outline" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome to BorrowBrain</Text>
              <Text className="text-gray-600 text-center">Track your borrowed and lent items</Text>
            </View>

            {/* Form */}
            <View className="space-y-6">
              <View>
                <Text className="text-gray-700 font-medium mb-2">Email</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2">Password</Text>
                <View className="relative">
                  <TextInput
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 pr-12 text-gray-900"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity className="absolute right-4 top-4" onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#757575" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                className={`bg-primary rounded-xl py-4 items-center ${loading ? "opacity-70" : ""}`}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-semibold text-lg">Sign In</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Links */}
            <View className="mt-8 items-center space-y-4">
              <TouchableOpacity onPress={() => router.push("/(auth)/forgot-password")}>
                <Text className="text-gray-600">Forgot your password?</Text>
              </TouchableOpacity>

              <View className="flex-row">
                <Text className="text-gray-600">Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                  <Text className="text-primary font-medium">Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Demo Info */}
            <View className="mt-8 bg-gray-50 rounded-xl p-4">
              <Text className="text-xs text-gray-600 text-center">
                Demo: Use email "demo@example.com" and password "password"
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

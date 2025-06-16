import type React from "react"
import { View, type ViewStyle } from "react-native"

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
  className?: string
}

export function Card({ children, style, className }: CardProps) {
  return (
    <View className={`bg-white border border-gray-200 rounded-xl ${className || ""}`} style={style}>
      {children}
    </View>
  )
}

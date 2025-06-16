import { TouchableOpacity, Text, ActivityIndicator, type ViewStyle, type TextStyle } from "react-native"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyle = () => {
    let baseStyle = "rounded-xl items-center justify-center"

    // Size styles
    switch (size) {
      case "sm":
        baseStyle += " px-3 py-2"
        break
      case "lg":
        baseStyle += " px-6 py-4"
        break
      default:
        baseStyle += " px-4 py-3"
    }

    // Variant styles
    switch (variant) {
      case "secondary":
        baseStyle += " bg-gray-100"
        break
      case "outline":
        baseStyle += " border border-gray-300 bg-transparent"
        break
      default:
        baseStyle += " bg-primary"
    }

    if (disabled || loading) {
      baseStyle += " opacity-50"
    }

    return baseStyle
  }

  const getTextStyle = () => {
    let baseStyle = "font-medium"

    // Size styles
    switch (size) {
      case "sm":
        baseStyle += " text-sm"
        break
      case "lg":
        baseStyle += " text-lg"
        break
      default:
        baseStyle += " text-base"
    }

    // Variant styles
    switch (variant) {
      case "secondary":
        baseStyle += " text-gray-900"
        break
      case "outline":
        baseStyle += " text-gray-700"
        break
      default:
        baseStyle += " text-white"
    }

    return baseStyle
  }

  return (
    <TouchableOpacity className={getButtonStyle()} style={style} onPress={onPress} disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "white" : "#4DB6AC"} />
      ) : (
        <Text className={getTextStyle()} style={textStyle}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

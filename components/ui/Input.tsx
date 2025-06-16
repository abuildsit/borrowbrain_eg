import { TextInput, View, Text, type TextInputProps } from "react-native"

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  containerStyle?: any
}

export function Input({ label, error, containerStyle, ...props }: InputProps) {
  return (
    <View style={containerStyle}>
      {label && <Text className="text-gray-700 font-medium mb-2">{label}</Text>}
      <TextInput
        className={`bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 ${
          error ? "border-red-300" : "border-gray-200"
        }`}
        placeholderTextColor="#757575"
        {...props}
      />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  )
}

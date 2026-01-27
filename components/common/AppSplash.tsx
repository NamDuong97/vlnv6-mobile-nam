// src/components/AppSplash.tsx
import { ActivityIndicator, Text, View } from 'react-native'

export const AppSplash = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            {/* Logo / Icon */}
            <View className="mb-6">
                <Text className="text-5xl">🚀</Text>
            </View>

            {/* App name */}
            <Text className="text-xl font-semibold mb-4">
                My App
            </Text>

            {/* Loading */}
            <ActivityIndicator size="large" />

            <Text className="mt-4 text-gray-500">
                Đang khởi động...
            </Text>
        </View>
    )
}

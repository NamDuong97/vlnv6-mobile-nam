// src/components/AppSplash.tsx
import { ActivityIndicator, Text, View } from 'react-native'

export const AppSplash = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            {/* App name */}
            <Text className="text-xl font-semibold mb-4">
                Viec Lam
            </Text>

            {/* Loading */}
            <ActivityIndicator size="large" />

            <Text className="mt-4 text-gray-500">
                Đang khởi động...
            </Text>
        </View>
    )
}

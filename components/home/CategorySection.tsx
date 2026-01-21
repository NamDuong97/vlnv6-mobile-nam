import { mockCategories } from '@/data/mockData'
import { JobCategory } from '@/types'
import { Image } from 'expo-image'
import React from 'react'
import { Text, View } from 'react-native'
import { CategoryCard } from './CategoryCard'

const CategorySection = () => {
    return (
        <View className="bg-white mt-4 mb-4 py-5">
            <View className="flex-row items-center justify-between px-4 mb-4">
                <View className="flex-row items-center">
                    <Image
                        source={require('@/assets/images/find-job-icon.png')}
                        style={{ width: 36, height: 36 }}
                    />
                    <Text className="text-lg font-bold text-gray-800">
                        Tìm việc nhanh theo ngành nghề
                    </Text>
                </View>
            </View>
            <View className="px-4 flex-row flex-wrap justify-between">
                {mockCategories.map((category: JobCategory) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        onPress={() => console.log('Category pressed:', category.name)}
                    />
                ))}
            </View>
        </View>
    )
}

export default CategorySection
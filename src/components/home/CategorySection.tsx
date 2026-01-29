import { useCurrentPageMeta, usePageMetaError, usePageMetaLoading, usePageMetaStore } from '@/store/pageMetaStore'
import { CategoryItem } from '@/types/pageMeta'
import { Image } from 'expo-image'
import React, { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { CategoryCard } from './CategoryCard'

const CategorySection = () => {
    // Lấy state từ store
    const categories = useCurrentPageMeta();
    const loading = usePageMetaLoading();
    const error = usePageMetaError();
    const fetchPageMeta = usePageMetaStore(state => state.fetchPageMeta);

    // Fetch data khi component mount
    useEffect(() => {
        if (categories == null) {
            fetchPageMeta();
        }
    }, []);

    // Xử lý loading
    if (loading && categories == null) {
        return (
            <View className="bg-white mt-4 mb-4 py-5 items-center justify-center">
                <ActivityIndicator size="large" color="#2563EB" />
                <Text className="text-gray-600 mt-2">Đang tải ngành nghề...</Text>
            </View>
        );
    }

    // Xử lý error
    if (error && categories == null) {
        return (
            <View className="bg-white mt-4 mb-4 py-5 items-center justify-center">
                <Text className="text-red-500 mb-2">Lỗi khi tải ngành nghề</Text>
                <Text
                    className="text-blue-600 underline"
                    onPress={() => fetchPageMeta()}
                >
                    Thử lại
                </Text>
            </View>
        );
    }

    const result = categories?.links.filter((item: CategoryItem, index: number) => index <= 4 || item.id === 4002);

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
                {result?.map((category: CategoryItem) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        onPress={() => console.log('Category pressed:', category.name)}
                    />
                ))}

                {/* Loading indicator khi đang refresh */}
                {loading && categories == null && (
                    <View className="py-2 items-center">
                        <ActivityIndicator size="small" color="#2563EB" />
                    </View>
                )}

            </View>
        </View>
    )
}

export default CategorySection
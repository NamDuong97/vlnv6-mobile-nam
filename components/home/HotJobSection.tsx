import { useClassifiedError, useClassifiedLoading, useClassifiedStore, useFeaturedJobs } from '@/store/classifiedStore'
import { UnifiedJobItem } from '@/types/classified'
import { Image } from 'expo-image'
import React from 'react'
import { ActivityIndicator, ImageBackground, Text, View } from 'react-native'
import { JobCard } from './JobCard'

const HotJobSection = () => {
    // Lấy state từ store
    const featuredJobs = useFeaturedJobs()
    const loading = useClassifiedLoading()
    const error = useClassifiedError()
    const fetchFeaturedJobs = useClassifiedStore(state => state.fetchFeaturedJobs)

    // Xử lý loading
    if (loading && featuredJobs.length === 0) {
        return (
            <View className="bg-white mt-4 mb-4 p-4 items-center justify-center">
                <ActivityIndicator size="large" color="#2563EB" />
                <Text className="text-gray-600 mt-2">Đang tải việc làm nổi bật...</Text>
            </View>
        )
    }

    // Xử lý error
    if (error && featuredJobs.length === 0) {
        return (
            <View className="bg-white mt-4 mb-4 p-4 items-center justify-center">
                <Text className="text-red-500 mb-2">Lỗi khi tải việc làm</Text>
                <Text
                    className="text-blue-600 underline"
                    onPress={() => fetchFeaturedJobs()}
                >
                    Thử lại
                </Text>
            </View>
        )
    }

    // Không có data
    if (featuredJobs.length === 0) {
        return (
            <View className="bg-white mt-4 mb-4 p-4 items-center justify-center">
                <Text className="text-gray-500">Chưa có việc làm nổi bật</Text>
            </View>
        )
    }

    // Lấy 6 jobs đầu tiên để hiển thị
    const displayJobs = featuredJobs.slice(0, 3);

    return (
        <View className="bg-white mt-4 mb-4">
            <View className='flex-col rounded-t-xl h-12 w-full'>
                <ImageBackground
                    source={require('@/assets/images/special-job-bg.png')}
                    className="flex-row items-center mb-3 h-full rounded-t-2xl overflow-hidden"
                    resizeMode="cover"
                >
                    <Image
                        source={require('@/assets/images/special-job.svg')}
                        style={{ width: 24, height: 24, marginLeft: 5, marginRight: 3 }}
                        contentFit='contain'
                    />
                    <Text className="text-lg font-bold text-white">Việc làm nổi bật</Text>
                </ImageBackground>
            </View>

            <View className="bg-white gap-4 px-4 py-6">
                {displayJobs.map((job: UnifiedJobItem) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        isHot={true}
                        onPress={() => console.log('Job pressed:', job.title)}
                    />
                ))}
            </View>

            {/* Loading indicator khi đang refresh (nếu đã có data) */}
            {loading && featuredJobs.length > 0 && (
                <View className="py-2 items-center">
                    <ActivityIndicator size="small" color="#2563EB" />
                </View>
            )}
        </View>
    )
}

export default HotJobSection
import { useClassifiedError, useClassifiedLoading, useClassifiedStore, useLatestJobs, useTotalLatestJobs } from '@/store/classifiedStore';
import { UnifiedJobItem } from '@/types/classified';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { JobCard } from './JobCard';

const LastestJobSection = () => {
    // Lấy state từ store
    const latestJobs = useLatestJobs();
    const loading = useClassifiedLoading();
    const error = useClassifiedError();
    const totalLatestJobs = useTotalLatestJobs();
    const fetchLatestJobs = useClassifiedStore(state => state.fetchLatestJobs);

    // Fetch data khi component mount
    useEffect(() => {
        if (latestJobs.length === 0) {
            fetchLatestJobs();
        }
    }, []);

    // Xử lý loading
    if (loading && latestJobs.length === 0) {
        return (
            <View className="bg-white my-1.5 px-4 py-5 items-center justify-center">
                <ActivityIndicator size="large" color="#2563EB" />
                <Text className="text-gray-600 mt-2">Đang tải việc làm mới nhất...</Text>
            </View>
        );
    }

    // Xử lý error
    if (error && latestJobs.length === 0) {
        return (
            <View className="bg-white my-1.5 px-4 py-5 items-center justify-center">
                <Text className="text-red-500 mb-2">Lỗi khi tải việc làm mới nhất</Text>
                <Pressable
                    onPress={() => fetchLatestJobs()}
                    className="bg-blue-600 px-4 py-2 rounded-lg mt-2"
                >
                    <Text className="text-white">Thử lại</Text>
                </Pressable>
            </View>
        );
    }

    // Không có data
    if (latestJobs.length === 0) {
        return (
            <View className="bg-white my-1.5 px-4 py-5 items-center justify-center">
                <Text className="text-gray-500">Chưa có việc làm mới nhất</Text>
            </View>
        );
    }

    // Lấy 6 jobs đầu tiên để hiển thị
    const displayJobs = latestJobs.slice(0, 6);

    return (
        <View className="bg-white my-1.5 px-4 py-5">
            <View className="flex-row items-center mb-3 pb-5">
                <Image
                    source={require('@/assets/images/job-latest-icon-home.svg')}
                    style={{ width: 24, height: 24, marginRight: 4 }}
                />
                <Text className="text-lg font-bold text-gray-800">Việc làm mới nhất</Text>
            </View>

            <View className='gap-2 bottom-4'>
                {displayJobs.map((job: UnifiedJobItem) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        onPress={() => console.log('Job pressed:', job.title)} isHot={false} />
                ))}
            </View>

            {/* Loading indicator khi đang refresh (nếu đã có data) */}
            {loading && latestJobs.length > 0 && (
                <View className="py-2 items-center">
                    <ActivityIndicator size="small" color="#2563EB" />
                </View>
            )}

            <Pressable
                onPress={() => console.log("alo bam vao xem all")}
                className="self-center flex-row items-center justify-center rounded-lg border border-blue-600 py-2 px-4 "
            >
                <Text className="text-blue-600 font-medium mr-1 text-[15px]">
                    Xem thêm {totalLatestJobs} tin tuyển dụng
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#2563EB" />
            </Pressable>
        </View>
    )
}

export default LastestJobSection
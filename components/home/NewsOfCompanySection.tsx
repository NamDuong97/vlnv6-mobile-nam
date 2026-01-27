import { useClassifiedError, useClassifiedLoading, useClassifiedStore, useCompanyJobs } from '@/store/classifiedStore';
import { UnifiedJobItem } from '@/types/classified';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { JobCard } from './JobCard';

const NewsOfCompanySection = () => {
    // Lấy state từ store
    const companyJobs = useCompanyJobs();
    const loading = useClassifiedLoading();
    const error = useClassifiedError();
    const fetchCompanyJobs = useClassifiedStore(state => state.fetchCompanyJobs);

    // Xử lý loading
    if (loading && companyJobs.length === 0) {
        return (
            <View className="bg-white my-4 px-4 py-5 items-center justify-center">
                <ActivityIndicator size="large" color="#2563EB" />
                <Text className="text-gray-600 mt-2">Đang tải tin từ doanh nghiệp...</Text>
            </View>
        );
    }

    // Xử lý error
    if (error && companyJobs.length === 0) {
        return (
            <View className="bg-white my-4 px-4 py-5 items-center justify-center">
                <Text className="text-red-500 mb-2">Lỗi khi tải tin doanh nghiệp</Text>
                <Pressable
                    onPress={() => fetchCompanyJobs()}
                    className="bg-blue-600 px-4 py-2 rounded-lg mt-2"
                >
                    <Text className="text-white">Thử lại</Text>
                </Pressable>
            </View>
        );
    }

    // Không có data
    if (companyJobs.length === 0) {
        return (
            <View className="bg-white my-4 px-4 py-5 items-center justify-center">
                <Text className="text-gray-500">Chưa có tin từ doanh nghiệp</Text>
            </View>
        );
    }

    // Lấy 6 jobs đầu tiên để hiển thị
    const displayJobs = companyJobs.slice(0, 6);
    const remainingJobs = companyJobs.length - 6;
    console.log("displayJobs-company ", displayJobs)

    return (
        <View className="bg-white my-4 px-4 py-5">
            <View className="flex-row items-center mb-3">
                <Image
                    source={require('@/assets/images/business-latest-icon-home.svg')}
                    style={{ width: 24, height: 24, marginRight: 4 }}
                />
                <Text className="text-lg font-bold text-gray-800">Tin từ doanh nghiệp</Text>
            </View>

            {/* Danh sách jobs */}
            {displayJobs.map((job: UnifiedJobItem) => (
                <JobCard
                    key={job.id}
                    job={job}
                    isHot={false}
                    onPress={() => {
                        console.log("Xem tất cả tin doanh nghiệp");
                        // navigation.navigate('AllCompanyJobs');
                    }}
                />
            ))}

            {/* Loading indicator khi đang refresh (nếu đã có data) */}
            {loading && companyJobs.length > 0 && (
                <View className="py-2 items-center">
                    <ActivityIndicator size="small" color="#2563EB" />
                </View>
            )}

            {remainingJobs > 0 && (
                <Pressable
                    onPress={() => console.log("alo bam vao xem all")}
                    className="self-center flex-row items-center justify-center rounded-lg border border-blue-600 py-2 px-4 "
                >
                    <Text className="text-blue-600 font-medium mr-1 text-[15px]">
                        Xem thêm {remainingJobs} tin doanh nghiệp
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color="#2563EB" />
                </Pressable>
            )}
        </View>
    )
}

export default NewsOfCompanySection
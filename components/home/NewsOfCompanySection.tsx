import { mockJobs } from '@/data/mockData';
import { Job } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { JobCard } from './JobCard';

const NewsOfCompanySection = () => {
    return (
        <View className="bg-white my-4 px-4 py-5">
            <View className="flex-row items-center mb-3">
                <Image
                    source={require('@/assets/images/business-latest-icon-home.svg')}
                    style={{ width: 24, height: 24, marginRight: 4 }}
                />
                <Text className="text-lg font-bold text-gray-800">Tin từ doanh nghiệp</Text>
            </View>
            {mockJobs.slice(3, 9).map((job: Job) => (
                <JobCard
                    key={job.id}
                    job={job}
                    onPress={() => console.log('Job pressed:', job.title)}
                />
            ))}

            <Pressable
                onPress={() => console.log("alo bam vao xem all")}
                className="self-center flex-row items-center justify-center rounded-lg border border-blue-600 py-2 px-4 "
            >
                <Text className="text-blue-600 font-medium mr-1 text-[15px]">
                    Xem thêm {mockJobs.length - 6} tin doanh nghiệp
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#2563EB" />
            </Pressable>
        </View>
    )
}

export default NewsOfCompanySection
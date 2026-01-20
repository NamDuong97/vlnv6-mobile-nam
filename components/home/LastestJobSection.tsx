import { mockJobs } from '@/data/mockData';
import { Job } from '@/types';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { JobCard } from './JobCard';

const LastestJobSection = () => {
    return (
        <View className="mt-4 mb-4 px-4">
            <View className="flex-row items-center mb-3">
                <Text className="text-xl mr-2">🆕</Text>
                <Text className="text-lg font-bold text-gray-800">Việc làm mới nhất</Text>
            </View>
            {mockJobs.slice(3, 6).map((job: Job) => (
                <JobCard
                    key={job.id}
                    job={job}
                    onPress={() => console.log('Job pressed:', job.title)}
                />
            ))}

            <TouchableOpacity
                onPress={() => console.log('da bam vao day')}
                className="flex-row bg-white rounded-lg px-6 py-3 border-2 border-blue-500"
                activeOpacity={0.8}
                style={{ width: '70 %' }}
            >
                <Text className="text-blue-800 font-bold text-lg text-center mr-3">
                    Xem thêm 25.161 tim tuyển dụng
                </Text>
                <Image
                    source={require('@/assets/images/arrow-right-blue.svg')}
                    style={{ width: 24, height: 24 }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default LastestJobSection
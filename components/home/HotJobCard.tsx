import { Job } from '@/types';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface HotJobCardProps {
    job: Job;
    onPress?: () => void
}

const HotJobCard = ({ job, onPress }: HotJobCardProps) => {
    return (
        <Pressable
            onPress={onPress}
            className="relative w-full rounded-lg borderborder-[#DADCDF] bg-whitep-3 mb-3"
        >
            {/* TOP ADS BADGE */}
            <View
                className="absolute top-2 left-2 flex-row items-center bg-red-600 rounded-full px-2 py-[2px]"
            >
                <Image
                    source={require('@/assets/images/special-job.svg')}
                    style={{ width: 12, height: 12 }}
                    contentFit="contain"
                />
                <Text className="ml-1 text-white text-xs font-semibold">
                    Top Ads
                </Text>
            </View>

            {/* MAIN CONTENT */}
            <View className="flex-row mt-6">
                {/* LOGO */}
                <Image
                    source={require('@/assets/images/default-logo-business.png')}
                    style={{ width: 48, height: 48 }}
                    contentFit="contain"
                    className="rounded-md mr-3"
                />

                {/* INFO */}
                <View className="flex-1">
                    {/* TITLE */}
                    <Text
                        numberOfLines={2}
                        className="
                            text-[14px]
                            font-semibold
                            text-gray-900
                            leading-[20px]
                        "
                    >
                        {job.title}
                    </Text>

                    {/* SALARY */}
                    <Text className="mt-1 text-red-600 font-semibold text-sm">
                        {job.salary}
                    </Text>

                    {/* META */}
                    <View className="flex-row items-center mt-1">
                        <View className="flex-row items-center mr-4">
                            <Image
                                source={require('@/assets/images/location-black.svg')}
                                style={{ width: 14, height: 14 }}
                            />
                            <Text className="ml-1 text-xs text-gray-600">
                                {job.location}
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <Image
                                source={require('@/assets/images/clock-black.svg')}
                                style={{ width: 14, height: 14 }}
                            />
                            <Text className="ml-1 text-xs text-gray-600">
                                {job.timePosted}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default HotJobCard

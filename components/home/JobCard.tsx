import { Job } from '@/types';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


interface JobCardProps {
  job: Job;
  onPress?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100 relative"
    >
      {job.isHot && (
        <View className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 rounded-full flex-row items-center">
          <Text className="text-white text-xs font-bold mr-1">🔥</Text>
          <Text className="text-white text-xs font-bold">Top Ads</Text>
        </View>
      )}

      <View className="flex-row items-start mb-3 w-full h-12">
        <View className=" bg-gray-100 rounded-lg items-center justify-center mr-3">
          <Image
            source={require('@/assets/images/default-logo-business.png')}
            style={{ width: 54, height: 54, borderWidth: 1, borderRadius: 4 }}
            contentFit="contain"
            className="rounded-md mr-3"
          />
        </View>

        <View className="flex-1 pr-16">
          <Text className="text-base font-semibold text-gray-900 mb-1" numberOfLines={2}>
            {job.title}
          </Text>
          <Text className="text-sm text-gray-600" numberOfLines={1}>
            {job.company}
          </Text>
        </View>
      </View>

      <View className="space-y-2">
        <View className="flex-row items-center">
          <Text className="text-red-600 font-bold text-base">
            {job.salary}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-sm text-gray-600 mr-1">📍</Text>
          <Text className="text-sm text-gray-600">{job.location}</Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-sm text-gray-600 mr-1">🕐</Text>
          <Text className="text-sm text-gray-600">{job.timePosted}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

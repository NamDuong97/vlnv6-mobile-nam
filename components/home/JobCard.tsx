import { Job } from '@/types'
import { Image } from 'expo-image'
import React from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'

interface JobCardProps {
  job: Job
  onPress?: () => void
}

export const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} className="bg-white rounded-xl border border-gray-200 p-3 mb-4 relative">
      {job.isHot && (
        <ImageBackground
          source={require('@/assets/images/special-home-bg-v2.png')}
          className="absolute flex-row items-center justify-center rounded-t-2xl w-28 h-10 bottom-0 right-0 pl-3 pt-4"
          resizeMode="cover"
        >
          <Image
            source={require('@/assets/images/special-job.svg')}
            style={{ width: 16, height: 16, marginLeft: 5, marginRight: 3 }}
            contentFit='contain'
          />
          <Text className="text-sm font-bold text-white">Top Ads</Text>
        </ImageBackground>
      )}

      {/* ROW 1: LOGO + TITLE */}
      <View className="flex-row jus">
        <Image
          source={require('@/assets/images/default-logo-business.png')}
          style={{ width: 54, height: 54, padding: 4 }}
          contentFit="contain"
          className="rounded-md border border-gray-200 mr-3"
        />

        <View className="flex-1">
          <Text numberOfLines={2} className="ml-2 text-[14px] font-semibold text-gray-900 leading-[18px]">
            {job.title}
          </Text>
        </View>
      </View>

      {/* ROW 2: SALARY + LOCATION + TIME (ALIGN WITH LOGO) */}
      <View className="mt-2 ml-0">
        <Text className="text-red-600 font-bold text-sm">
          {job.salary}
        </Text>

        <View className="flex-row items-center mt-2 mb-2">
          <Image
            source={require('@/assets/images/location-black.svg')}
            style={{ width: 16, height: 16, marginRight: 2 }}
            contentFit="cover"
          />
          <Text className="text-xs text-black-700">{job.location}</Text>
        </View>

        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/clock-black.svg')}
            style={{ width: 16, height: 16, marginRight: 2 }}
            contentFit="cover"
          />
          <Text className="text-xs text-black-700">{job.timePosted}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

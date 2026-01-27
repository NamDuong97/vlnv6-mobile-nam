import { UnifiedJobItem } from '@/types/classified'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'

interface JobCardProps {
  job: UnifiedJobItem,
  isHot: boolean,
  onPress?: () => void
}

export const JobCard: React.FC<JobCardProps> = ({ job, isHot, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} className="bg-white rounded-xl border border-gray-200 p-3 mb-4 relative">
      {isHot && <ImageBackground
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
      }

      {/* ROW 1: LOGO + TITLE */}
      <View className="flex-row gap-2">
        {
          job.company_logo ?
            <Image
              source={{ uri: job.company_logo }}
              style={{ width: 58, height: 58, marginRight: 3, padding: 4 }}
              contentFit='cover'
            /> :
            <Image
              source={require('@/assets/images/default-logo-org.svg')}
              style={{ width: 58, height: 58, marginRight: 3, padding: 4 }}
              contentFit='cover'
            />
        }

        <View className="flex-1 gap-1">
          <View>
            <Link href={`${job.url}`}>
              <Text numberOfLines={2} className="ml-2 text-[14px] font-semibold text-grey-200 leading-[18px]">
                {job.title}
              </Text>
            </Link>
          </View>
          {job.is_company && job.company_name &&
            <View className='flex-row items-center'>
              <Text
                numberOfLines={1}
                className='text-[12px] leading-[18px] text-grey-50 flex-shrink'
              >
                {job.company_name || ''}
              </Text>
              <Image
                source={require('@/assets/images/verify-green.svg')}
                style={{ width: 16, height: 16, marginLeft: 2 }}
                contentFit='cover'
              />
            </View>
          }
        </View>
      </View>

      {/* ROW 2: SALARY + LOCATION + TIME (ALIGN WITH LOGO) */}
      <View className="mt-2 ml-0">
        <Text className="text-red-600 font-bold text-sm">
          {job.display_price}
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
          <Text className="text-xs text-black-700">{job.publish_display}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
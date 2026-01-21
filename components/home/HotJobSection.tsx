import { mockJobs } from '@/data/mockData'
import { Job } from '@/types'
import { Image } from 'expo-image'
import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { JobCard } from './JobCard'

const HotJobSection = () => {
    return (
        <View className="bg-white mt-4 mb-4">
            <View className='flex-col rounded-t-xl h-12 w-full'>
                <ImageBackground
                    source={require('@/assets/images/special-job-bg.png')}
                    className="flex-row items-center mb-3 h-full"
                    resizeMode="cover"
                >
                    <Image
                        source={require('@/assets/images/special-job.svg')}
                        style={{ width: 24, height: 24 }}
                        contentFit='contain'
                    />
                    <Text className="text-lg font-bold text-gray-800">Việc làm nổi bật</Text>
                </ImageBackground>
            </View>
            <View className="bg-white px-4 mt-4">
                {mockJobs.slice(0, 3).map((job: Job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        onPress={() => console.log('Job pressed:', job.title)}
                    />
                ))}
            </View>
        </View>
    )
}

export default HotJobSection
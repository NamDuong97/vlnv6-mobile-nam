import { Company } from '@/types';
import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

interface CompanyCardProps {
  company: Company;

}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <TouchableOpacity
      onPress={() => console.log('Da bam vao component companycard')}
      className="bg-white rounded-xl p-4 mr-3 w-full min-w-[280px] border border-gray-200 mb-2"
    >
      <View className="flex-row items-start mb-1">
        <View className="w-20 h-20 bg-white rounded-lg items-center justify-center mr-3 border border-blue-100">
          <Text className="text-2xl ">{company.logo}</Text>
        </View>

        <View className="flex-1 bg-aqua-100 rounded-xl h-[68px] overflow-hidden">
          <ImageBackground
            source={require('@/assets/images/bg-org-card.png')}
            resizeMode="cover"
            className='flex-1 opacity-70 z-[1]'
          >
            <View className="py-1 px-2">
              <View className="flex-row items-center mb-1">
                <Text className="text-base font-bold text-black-900 z-[2]" numberOfLines={2}>
                  {company.name}
                </Text>
              </View>
              <Text className="text-xs text-grey-100 overflow-hidden" numberOfLines={1}>
                {company.industry}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>

      <View className="flex-row items-center justify-between pt-2">
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/job.svg')}
            style={{ width: 16, height: 16, marginRight: 3 }}
            contentFit='contain'
          />
          <Text className="text-sm text-gray-700 font-medium">
            {company.jobCount} công việc
          </Text>
        </View>
        <View className="flex-row items-center">
          {company.isVerified && (
            <Text className="flex-row justify-center align-middle pl-[5px] pb-1 text-white text-[12px] bg-green-700 ml-2 rounded-full w-5 h-5">✓</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

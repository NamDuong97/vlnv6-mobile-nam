import { Company } from '@/types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CompanyCardProps {
  company: Company;

}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <TouchableOpacity
      onPress={() => console.log('Da bam vao component companycard')}
      className="bg-white rounded-xl p-4 mr-3 w-full min-w-[280px] border border-gray-200 mb-2"
    >
      <View className="flex-row items-start mb-3">
        <View className="w-20 h-20 bg-white rounded-lg items-center justify-center mr-3 border border-blue-100">
          <Text className="text-2xl ">{company.logo}</Text>
        </View>

        <View className="flex-1 bg-blue-100 p-2 rounded-xl h-20">
          <View className="flex-row items-center mb-1">
            <Text className="text-base font-bold text-gray-900 flex-1" numberOfLines={2}>
              {company.name}
            </Text>
          </View>
          <Text className="text-xs text-gray-600" numberOfLines={1}>
            {company.industry}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between pt-2">
        <View className="flex-row items-center">
          <Text className="text-sm text-gray-700 mr-1">💼</Text>
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

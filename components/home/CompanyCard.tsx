import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Company } from '../types';

interface CompanyCardProps {
  company: Company;
  onPress?: () => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-blue-50 rounded-xl p-4 mr-3 min-w-[280px] border border-blue-100"
    >
      <View className="flex-row items-start mb-3">
        <View className="w-12 h-12 bg-white rounded-lg items-center justify-center mr-3 shadow-sm">
          <Text className="text-2xl">{company.logo}</Text>
        </View>
        
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text className="text-base font-bold text-gray-900 flex-1" numberOfLines={2}>
              {company.name}
            </Text>
            {company.isVerified && (
              <Text className="text-green-500 ml-2">✓</Text>
            )}
          </View>
          <Text className="text-xs text-gray-600" numberOfLines={1}>
            {company.industry}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between pt-2 border-t border-blue-200">
        <View className="flex-row items-center">
          <Text className="text-sm text-gray-700 mr-1">💼</Text>
          <Text className="text-sm text-gray-700 font-medium">
            {company.jobCount} công việc
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

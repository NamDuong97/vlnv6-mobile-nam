import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { JobCategory } from '../types';

interface CategoryCardProps {
  category: JobCategory;
  onPress?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center justify-center w-[30%] mb-4"
    >
      <View className="bg-white rounded-2xl p-4 items-center justify-center w-full shadow-sm border border-gray-100 relative">
        {category.isHot && (
          <View className="absolute -top-1 -right-1 bg-red-500 px-2 py-0.5 rounded-full z-10">
            <Text className="text-white text-xs font-bold">HOT</Text>
          </View>
        )}
        <Text className="text-4xl mb-2">{category.icon}</Text>
      </View>
      <Text className="text-xs text-gray-700 font-medium mt-2 text-center">
        {category.name}
      </Text>
      {category.jobCount && (
        <Text className="text-xs text-gray-500 text-center">
          {category.jobCount.toLocaleString('vi-VN')} công việc
        </Text>
      )}
    </TouchableOpacity>
  );
};

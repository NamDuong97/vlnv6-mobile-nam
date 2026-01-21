import { IconKey, JobCategory } from '@/types';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CategoryCardProps {
  category: JobCategory;
  onPress?: () => void;
}

const imageSources: Record<IconKey, any> = {
  'job-tet': require('@/assets/images/icon-category-tet.png'),
  'ban-hang-tai-quay': require('@/assets/images/icon-category-buy.png'),
  'tai-xe-lai-xe': require('@/assets/images/icon-category-car.png'),
  'giao-cho-hang': require('@/assets/images/icon-category-item.png'),
  'giup-viec-tap-vu': require('@/assets/images/icon-category-helper.png'),
  'tat-ca-nganh': require('@/assets/images/icon-category-all.png'),
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center justify-center w-[30%] mb-4"
    >
      <View className="bg-white p-3 items-center justify-center w-full relative">
        {category.isHot && (
          <View className="absolute -top-1 -right-1 bg-[rgb(191,29,40)] px-2 py-0.5 rounded-xl z-10">
            <Text className="text-white text-xs font-bold">HOT</Text>
          </View>
        )}
        <Image source={imageSources[category.icon]}
          // className='w-full h-32'
          style={{ width: 42, height: 42 }}
          contentFit='cover'
        />
      </View>
      <Text className="text-[14px] text-black-800 font-medium mt-2 text-center">
        {category.name}
      </Text>
      {category.jobCount && !category.isHot && (
        <Text className="text-[12px] text-black-300 text-center">
          {category.jobCount.toLocaleString('vi-VN')} công việc
        </Text>
      )}
    </TouchableOpacity>
  );
};

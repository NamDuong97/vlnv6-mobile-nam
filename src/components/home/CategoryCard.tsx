import { CategoryItem } from '@/types/pageMeta';
import { ImageBackground } from 'expo-image';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

interface CategoryCardProps {
  category: CategoryItem;
  onPress?: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

// Fix cứng sprite sheet config
const SPRITE_CONFIG = {
  source: require('@/assets/images/category-mobile.png'),
  sheetWidth: 684,
  sheetHeight: 3088,
  iconSize: 42,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  // Detect xem icon_pos là grid hay pixel
  const detectPositionType = () => {
    const x = parseInt(category.icon_pos.x);
    const y = parseInt(category.icon_pos.y);
    return x < 10 && y < 10 ? 'grid' : 'pixel';
  };

  // Tính vị trí
  const calculatePosition = () => {
    const type = detectPositionType();
    const x = parseInt(category.icon_pos.x);
    const y = parseInt(category.icon_pos.y);

    if (type === 'grid') {
      // Grid position: x = col, y = row
      return {
        left: -x * SPRITE_CONFIG.iconSize,
        top: -y * SPRITE_CONFIG.iconSize,
      };
    } else {
      // Pixel position: x, y là tọa độ pixel trong sprite sheet
      return {
        left: -x,
        top: -y,
      };
    }
  };

  const spritePosition = calculatePosition();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center justify-center w-[30%] mb-4"
    >
      <View className="bg-white p-3 items-center justify-center w-full relative">
        {category.hot && (
          <View className="absolute -top-1 -right-1 bg-[rgb(191,29,40)] px-2 py-0.5 rounded-xl z-10">
            <Text className="text-white text-xs font-bold">HOT</Text>
          </View>
        )}

        <View className="w-[42px] h-[42px] overflow-hidden relative">
          <ImageBackground
            source={SPRITE_CONFIG.source}
            className="absolute"
            style={{
              width: SPRITE_CONFIG.sheetWidth,
              height: SPRITE_CONFIG.sheetHeight,
              left: spritePosition.left,
              top: spritePosition.top,
            }}
            contentFit="cover"
          />
        </View>
      </View>

      <Text className="text-[14px] text-black-800 font-medium mt-2 text-center">
        {category.name}
      </Text>

      {category.total && !category.hot && (
        <Text className="text-[12px] text-black-300 text-center">
          {category.total.toLocaleString('vi-VN')} công việc
        </Text>
      )}
    </TouchableOpacity>
  );
};



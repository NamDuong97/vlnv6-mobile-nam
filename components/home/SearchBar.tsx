import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Nhập tên công việc, công ty...',
  onSearch
}) => {
  const popularSearches = [
    'IT', 'Kinh doanh', 'Marketing', 'Kế toán', 'Nhân sự',
    'Bất động sản', 'Bán hàng', 'Kỹ sư', 'Thiết kế', 'Văn phòng'
  ];

  return (
    <View className=" rounded-t-3xl px-4 pt-6 pb-4">
      <View className="space-y-2">
        {/* Ô tìm kiếm công việc */}
        <View className="flex-row items-center border-2 border-blue-500 rounded-xl px-4 py-3 bg-white">
          <Image
            source={require('@/assets/images/search-blue.svg')}
            style={{ width: 20, height: 20, marginRight: 12 }}
          />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#6b7280"
            className="flex-1 text-gray-800 text-base"
          />
        </View>

        {/* Ô chọn địa điểm */}
        <TouchableOpacity
          className="flex-row items-center justify-between border-2 border-blue-500 rounded-xl px-4 py-3 bg-white my-3"
        >
          <View className="flex-row items-center">
            <Image
              source={require('@/assets/images/search-location-blue.svg')}
              style={{ width: 20, height: 20, marginRight: 12 }}
            />
            <Text className="text-gray-800 text-base">Toàn quốc</Text>
          </View>
          <Image
            source={require('@/assets/images/chevron-down.svg')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        {/* Nút tìm kiếm */}
        <TouchableOpacity
          onPress={onSearch}
          className="bg-blue-600 rounded-xl py-3 items-center mt-4"
          activeOpacity={0.8}
        >
          <Text className="text-white font-bold text-lg">Tìm ngay</Text>
        </TouchableOpacity>

        {/* Tiêu đề */}
        <Text className="text-xl font-bold text-blue-800 mt-5">
          Tìm kiếm nhiều nhất hôm nay:
        </Text>

        {/* Hashtags - Scroll ngang */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="my-3"
        >
          <View className="flex-row flex-wrap">
            {popularSearches.map((tag, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row rounded-full pr-4 py-1 mr-2"
              >
                <Image
                  source={require('@/assets/images/dash-icon.svg')}
                  style={{ width: 14, height: 19, marginRight: 4 }}
                />
                <Text className="text-black font-medium">{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

      </View>
    </View>
  );
};
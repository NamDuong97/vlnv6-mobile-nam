import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = 'Nhập tên công việc, công ty...', 
  onSearch 
}) => {
  return (
    <View className="bg-white rounded-xl shadow-md p-4 mx-4">
      <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 mb-3">
        <Text className="text-gray-400 mr-2">🔍</Text>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          className="flex-1 text-gray-700"
        />
      </View>

      <TouchableOpacity className="flex-row items-center justify-between border border-gray-300 rounded-lg px-3 py-3 mb-4">
        <View className="flex-row items-center">
          <Text className="text-gray-400 mr-2">📍</Text>
          <Text className="text-gray-700">Toàn quốc</Text>
        </View>
        <Text className="text-gray-400">▼</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={onSearch}
        className="bg-primary-600 rounded-lg py-3 items-center"
      >
        <Text className="text-white font-bold text-base">Tìm ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

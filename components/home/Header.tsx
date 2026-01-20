import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export const Header: React.FC = () => {
  return (
    <View className="bg-white border-b border-gray-200 px-4 py-3 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Text className="text-2xl font-bold text-primary-600">✓</Text>
        <Text className="text-xl font-bold text-primary-600 ml-1">Việc</Text>
        <Text className="text-xl font-bold text-gray-800">làm</Text>
        <Text className="text-base text-gray-500">.net</Text>
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity className="mr-4 relative">
          <Text className="text-2xl">🔔</Text>
          <View className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </TouchableOpacity>
        
        <TouchableOpacity className="mr-2">
          <Text className="text-2xl">💬</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Text className="text-2xl">☰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

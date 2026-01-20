import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export const Header: React.FC = () => {
  return (
    <View className="bg-white border-b border-gray-200 px-5 py-3 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Link href='#'>
          <Image
            source={require('@/assets/images/vieclam-header.svg')}
            style={{ width: 120, height: 20 }}
          />
        </Link>
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity className="border-1 border-gray-300 bg-gray-100 rounded-full p-3 mr-2">
          <Image
            source={require('@/assets/images/bell.svg')}
            style={{ width: 16, height: 16 }}
          />
        </TouchableOpacity>

        <TouchableOpacity className="border-1 border-gray-300 bg-gray-100 rounded-full p-3 mr-2">
          <Image
            source={require('@/assets/images/message.svg')}
            style={{ width: 16, height: 16 }}
          />
        </TouchableOpacity>

        <TouchableOpacity className="border-1 border-gray-300 bg-gray-100 rounded-full p-3">
          <Image
            source={require('@/assets/images/hamburger.svg')}
            style={{ width: 16, height: 16 }}
          />
        </TouchableOpacity>
      </View>
    </View >
  );
};

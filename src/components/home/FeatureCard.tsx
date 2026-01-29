import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface FeatureCardProps {
  image: keyof typeof imageSources;
  title: string;
  subtitle: string;
  link: string
}

const imageSources = {
  'find-jobseeker': require('@/assets/images/find-jobseeker.png'),
  'manage-jobseeker': require('@/assets/images/manage-jobseeker.png'),
  'classified': require('@/assets/images/classified.png')
};

const FeatureCard: React.FC<FeatureCardProps> = ({ image, title, subtitle, link }) => {
  const onHandlePressCard = () => {
    router.push(link);
  }

  return (
    <TouchableOpacity className="bg-white border-[1px] border-gray-100 rounded-xl overflow-hidden shadow-sm mb-4"
      onPress={onHandlePressCard}
    >
      {/* Image */}
      <Image
        source={imageSources[image]}
        style={{ width: 396, height: 120 }}
        className='w-full'
      />

      {/* Content */}
      <View className="p-4">
        <Text className="text-base font-semibold text-gray-900 mb-2">
          {title}
        </Text>

        <Text className="text-sm text-gray-600 leading-5">
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FeatureCard;
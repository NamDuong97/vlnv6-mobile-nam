import { Tag as TagType } from '@/types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface TagProps {
  tag: TagType;
  onPress?: () => void;
}

export const TagC: React.FC<TagProps> = ({ tag, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-gray-100 rounded-full px-3 py-1.5 mr-2 mb-2"
    >
      {tag.icon && <Text className="text-sm mr-1">{tag.icon}</Text>}
      <Text className="text-sm text-gray-700 font-medium">{tag.name}</Text>
    </TouchableOpacity>
  );
};

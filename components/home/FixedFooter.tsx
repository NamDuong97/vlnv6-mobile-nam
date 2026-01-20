import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FixedFooterProps {
    onPress?: () => void;
    onClose: () => void;
    isClosePostModal: boolean
}

export const FixedFooter: React.FC<FixedFooterProps> = ({ onPress, onClose, isClosePostModal }) => {
    const insets = useSafeAreaInsets();

    if (isClosePostModal) {
        return ''
    }

    return (
        <View
            className="bg-white border-t border-gray-200"
            style={{ paddingBottom: insets.bottom }}
        >
            <View className="px-4 py-4">

                <View className="flex-row justify-between  mb-3">
                    <View className="flex-row">
                        <Text className="text-sm text-gray-600 mb-1 mr-1">
                            Bạn cần tuyển dụng?
                        </Text>
                        <Text className="text-sm text-gray-600 mb-1">
                            Đăng tin miễn phí ngay!
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={onClose}
                        >
                            <Image source={require('@/assets/images/x-button.svg')}
                                className="w-24 h-8"
                                style={{ width: 24, height: 24 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="flex-row">
                    <TouchableOpacity
                        onPress={onPress}
                        className="bg-white rounded-lg px-6 py-2 border-2 border-blue-500 w-full"
                        activeOpacity={0.8}
                    >
                        <Text className="text-blue-800 font-bold text-sm text-center">
                            Đăng tin miễn phí
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

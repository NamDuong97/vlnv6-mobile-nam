import { useSavedStore } from '@/store/saveStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { News } from '../../types/news';

interface NewsCardProps {
    news: News;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
    const router = useRouter();
    const { isSaved, toggleSave } = useSavedStore();
    const saved = isSaved(news.id);

    const handlePress = () => {
        router.push({
            pathname: "/news/[id]",
            params: { id: news.id }
        });
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            className="bg-white rounded-xl mb-4 shadow-sm overflow-hidden"
            activeOpacity={0.7}
        >
            {/* Image */}
            <View className="relative">
                <Image
                    source={{ uri: news.imageUrl }}
                    className="w-full h-48"
                    resizeMode="cover"
                />

                {/* Bookmark Button */}
                <Pressable
                    onPress={() => toggleSave(news)}
                    className="absolute top-2 right-2 bg-white/90 rounded-full p-2"
                >
                    <Ionicons
                        name={saved ? 'bookmark' : 'bookmark-outline'}
                        size={20}
                        color={saved ? '#2563eb' : '#64748b'}
                    />
                </Pressable>

                {/* Category Badge */}
                <View className="absolute bottom-2 left-2 bg-primary px-3 py-1 rounded-full">
                    <Text className="text-white text-xs font-semibold">
                        {news.category}
                    </Text>
                </View>
            </View>

            {/* Content */}
            <View className="p-4">
                <Text className="text-lg font-bold text-text-primary mb-2" numberOfLines={2}>
                    {news.title}
                </Text>

                <Text className="text-sm text-text-secondary mb-3" numberOfLines={2}>
                    {news.description}
                </Text>

                {/* Meta Info */}
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <Ionicons name="person-circle-outline" size={16} color="#64748b" />
                        <Text className="text-xs text-text-secondary ml-1">
                            {news.author}
                        </Text>
                    </View>

                    <View className="flex-row items-center">
                        <Ionicons name="time-outline" size={16} color="#64748b" />
                        <Text className="text-xs text-text-secondary ml-1">
                            {new Date(news.publishedAt).toLocaleDateString('vi-VN')}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
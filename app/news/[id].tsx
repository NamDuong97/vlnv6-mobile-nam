import { useNewsStore } from '@/store/newStore';
import { useSavedStore } from '@/store/saveStore';
import { News } from '@/types/classified';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewsDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { news } = useNewsStore();
    const { isSaved, toggleSave } = useSavedStore();

    const newsItem = news.find((n: News) => n.id === id);

    if (!newsItem) {
        return (
            <SafeAreaView className="flex-1 bg-background items-center justify-center">
                <Text className="text-text-secondary">Không tìm thấy tin tức</Text>
            </SafeAreaView>
        );
    }

    const saved = isSaved(newsItem.id);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#0f172a" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleSave(newsItem)}>
                    <Ionicons
                        name={saved ? 'bookmark' : 'bookmark-outline'}
                        size={24}
                        color={saved ? '#2563eb' : '#64748b'}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView>
                {/* Image */}
                <Image
                    source={{ uri: newsItem.imageUrl }}
                    className="w-full h-64"
                    resizeMode="cover"
                />

                {/* Content */}
                <View className="p-4">
                    {/* Category */}
                    <View className="bg-primary/10 px-3 py-1 rounded-full self-start mb-3">
                        <Text className="text-primary text-xs font-semibold">
                            {newsItem.category}
                        </Text>
                    </View>

                    {/* Title */}
                    <Text className="text-2xl font-bold text-text-primary mb-3">
                        {newsItem.title}
                    </Text>

                    {/* Meta */}
                    <View className="flex-row items-center mb-4 pb-4 border-b border-gray-200">
                        <Ionicons name="person-circle" size={20} color="#64748b" />
                        <Text className="text-sm text-text-secondary ml-2 mr-4">
                            {newsItem.author}
                        </Text>

                        <Ionicons name="time" size={18} color="#64748b" />
                        <Text className="text-sm text-text-secondary ml-2">
                            {new Date(newsItem.publishedAt).toLocaleString('vi-VN')}
                        </Text>
                    </View>

                    {/* Content */}
                    <Text className="text-base text-text-primary leading-6 mb-4">
                        {newsItem.content}
                    </Text>

                    {/* Source */}
                    <View className="bg-gray-50 p-4 rounded-lg">
                        <Text className="text-sm text-text-secondary mb-1">Nguồn:</Text>
                        <Text className="text-sm font-semibold text-primary">
                            {newsItem.source}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
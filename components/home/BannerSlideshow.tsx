import { useBannerError, useBannerLoading, useBannerStore, useHomeBanners } from '@/store/bannerStore';
import { Banner } from '@/types/banner';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Props interface
interface BannerSlideshowProps {
    autoPlayInterval?: number;
    onBannerPress?: (banner: Banner) => void;
}

const BannerSlideshow: React.FC<BannerSlideshowProps> = ({ autoPlayInterval = 3000, onBannerPress }) => {

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const flatListRef = useRef<FlatList<Banner>>(null);
    const storeBanners = useHomeBanners();
    const loading = useBannerLoading();
    const error = useBannerError();
    const { fetchHomeBanners, bannerHydrate } = useBannerStore();

    useEffect(() => {
        const initializeBanners = async () => {
            try {
                // Hydrate từ storage trước
                await bannerHydrate();

                // Nếu không có data trong store hoặc cần refresh
                if (storeBanners.length === 0) {
                    await fetchHomeBanners();
                }
            } catch (error) {
                console.error('Failed to initialize banners:', error);
            }
        };

        initializeBanners();
    }, []);

    // Auto-play slideshow
    useEffect(() => {
        if (storeBanners.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % storeBanners.length;

                flatListRef.current?.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });

                return nextIndex;
            });
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [storeBanners, autoPlayInterval]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        setCurrentIndex(index);
    };

    const handleBannerPress = (banner: Banner): void => {
        if (onBannerPress) {
            onBannerPress(banner);
        }
    };

    const renderBanner = ({ item }: { item: Banner }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleBannerPress(item)}
            className="w-full relative"
            style={{ width }}
        >
            <Image
                source={{ uri: item.media_mobile_url }}
                className="w-full h-56 object-cover"
                resizeMode="cover"
            />
            {storeBanners.length > 1 && (
                <View className="absolute bottom-3 left-0 right-0 flex-row justify-center items-center">
                    {storeBanners.map((_, index) => (
                        <View
                            key={index}
                            className={`h-2 rounded-full mx-1 ${index === currentIndex
                                ? 'w-2 bg-black'
                                : 'w-2 bg-white bg-opacity-60'
                                }`}
                        />
                    ))}
                </View>
            )}
        </TouchableOpacity>
    );

    // Hiển thị loading state
    if (loading && storeBanners.length === 0) {
        return (
            <View className="w-full h-48 justify-center items-center bg-gray-100">
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    // Hiển thị error state
    if (error && storeBanners?.length === 0) {
        return (
            <View className="w-full h-48 justify-center items-center bg-gray-100">
                <Text className="text-red-500">Failed to load banners</Text>
            </View>
        );
    }

    // Không có banners
    if (storeBanners.length === 0) {
        return null;
    }

    return (
        <View className="w-full">
            <FlatList
                ref={flatListRef}
                data={storeBanners}
                renderItem={renderBanner}
                keyExtractor={(item) => String(item.id)}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={width}
                snapToAlignment="center"
            />
        </View>
    );
};

export default BannerSlideshow;
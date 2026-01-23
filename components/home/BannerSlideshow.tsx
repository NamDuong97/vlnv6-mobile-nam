import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Interface cho Banner object
export interface Banner {
    id: string;
    image: string;
    link?: string;
    title?: string;
}

// Props interface
interface BannerSlideshowProps {
    banners?: Banner[];
    autoPlayInterval?: number;
    onBannerPress?: (banner: Banner) => void;
}

// Dữ liệu mẫu - có thể thay thế bằng API sau này
const SAMPLE_BANNERS: Banner[] = [
    {
        id: '1',
        image: 'https://cloud.muaban.net/cdn-cgi/image/width=640,quality=85,format=auto/banners/2025/11/12/233/e740aa2d4fe248feb04f9e6e22267477.png',
        link: 'https://example.com/banner1',
        title: 'Banner 1',
    },
    {
        id: '2',
        image: 'https://blogcdn.vieclam.net/blog/wp-content/uploads/2025/03/25145423/Thumbnail-wiki-1-1.jpg',
        link: 'https://example.com/banner2',
        title: 'Banner 2',
    },
    {
        id: '3',
        image: 'https://blogcdn.vieclam.net/blog/wp-content/uploads/2025/10/08144505/Thumbnail-wiki-4.jpg',
        link: 'https://example.com/banner3',
        title: 'Banner 3',
    },
];

const BannerSlideshow: React.FC<BannerSlideshowProps> = ({ banners = SAMPLE_BANNERS, autoPlayInterval = 3000, onBannerPress }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const flatListRef = useRef<FlatList<Banner>>(null);

    // Auto-play slideshow
    useEffect(() => {
        if (banners.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % banners.length;

                flatListRef.current?.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });

                return nextIndex;
            });
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [banners.length, autoPlayInterval]);

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
                source={{ uri: item.image }}
                className="w-full h-48"
                resizeMode="cover"
            />
            {banners.length > 1 && (
                <View className="absolute bottom-3 left-0 right-0 flex-row justify-center items-center">
                    {banners.map((_, index) => (
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

    return (
        <View className="w-full">
            <FlatList
                ref={flatListRef}
                data={banners}
                renderItem={renderBanner}
                keyExtractor={(item) => item.id}
                horizontal //cho danh sách nằm ngang
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
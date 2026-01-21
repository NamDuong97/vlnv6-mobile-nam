import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const FilterSection = () => {
    const popularSearches = [
        'IT', 'Kinh doanh', 'Marketing', 'Kế toán', 'Nhân sự',
        'Bất động sản', 'Bán hàng', 'Kỹ sư', 'Thiết kế', 'Văn phòng'
    ];

    const handleSearch = () => {
        console.log('Searching...')
    }

    return (
        <View className="py-4 bg-white rounded-t-3xl mb-1">
            {/* Title Section */}
            <View className="px-4 mb-4">
                <Text className="text-[16px] font-bold text-gray-800 mb-1">
                    Việc tìm đúng người
                </Text>
                <Text className="text-[20px] font-bold text-primary-600">
                    Người tìm đúng việc
                </Text>
            </View>

            {/* Search Bar Section */}
            <View className="px-4 py-4">
                <View className="space-y-2">
                    {/* Ô tìm kiếm công việc */}
                    <View className="flex-row items-center border-2 border-blue-500 rounded-xl px-4 py-1 bg-white">
                        <Image
                            source={require('@/assets/images/search-blue.svg')}
                            style={{ width: 20, height: 20, marginRight: 10 }}
                            contentFit='contain'
                        />
                        <TextInput
                            placeholder='Nhập tên công việc, công ty...'
                            placeholderTextColor="#6b7280"
                            className="flex-1 text-gray-900 text-[14px]"
                        />
                    </View>

                    {/* Ô chọn địa điểm */}
                    <TouchableOpacity
                        className="flex-row items-center justify-between border-2 border-blue-500 rounded-xl px-4 py-3 bg-white my-3"
                    >
                        <View className="flex-row items-center">
                            <Image
                                source={require('@/assets/images/search-location-blue.svg')}
                                style={{ width: 20, height: 20, marginRight: 12 }}
                                contentFit='contain'
                            />
                            <Text className="text-gray-800 text-base text-[14px]">Toàn quốc</Text>
                        </View>
                        <Image
                            source={require('@/assets/images/chevron-down.svg')}
                            style={{ width: 24, height: 24 }}
                            contentFit="contain"
                        />
                    </TouchableOpacity>

                    {/* Nút tìm kiếm */}
                    <TouchableOpacity
                        onPress={handleSearch}
                        className="bg-blue-600 rounded-[8px] px-4 py-2.5 items-center"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-bold text-[15px]">Tìm ngay</Text>
                    </TouchableOpacity>

                    {/* Tiêu đề hashtags */}
                    <Text className="text-[15px] font-bold text-blue-700 mt-5">
                        Tìm kiếm nhiều nhất hôm nay:
                    </Text>

                    {/* Hashtags - Scroll ngang */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="my-3"
                    >
                        <View className="flex-row flex-wrap">
                            {popularSearches.map((tag, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className="flex-row rounded-full pr-4 py-1 mr-2"
                                >
                                    <Image
                                        source={require('@/assets/images/dash-icon.svg')}
                                        style={{ width: 14, height: 19, marginRight: 4 }}
                                    />
                                    <Text className="text-[13px] text-black font-medium">{tag}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default FilterSection
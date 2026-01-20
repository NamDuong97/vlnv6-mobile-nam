import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const BenefitsSection = () => {
    return (
        <>
            {/* Call to Action */}
            <View className="mx-4 my-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6" >
                <Text className="text-2xl font-bold text-black mb-2">
                    Bạn đang tìm kiếm việc làm?
                </Text>
                <Text className="text-black mb-4 opacity-90">
                    Tạo hồ sơ ngay để kết nối được với nhiều nhà tuyển dụng hơn, tìm việc làm nhanh chóng tại vieclamnet
                </Text>
                <TouchableOpacity className="bg-primary rounded-lg py-3 items-center">
                    <Text className="text-white font-bold text-base">Tạo hồ sơ ngay</Text>
                </TouchableOpacity>
            </View >

            {/* Benefits Section */}
            <View className="mx-4 mb-8" >
                <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                    <View className="flex-row items-center mb-2">
                        <Image
                            source={require('@/assets/images/create-jobseeker-home-icon-1.svg')}
                            style={{ width: 48, height: 48, marginRight: 15 }}
                        />
                        <Text className="flex-1 font-bold text-gray-800">Tiếp cận nhiều nhà tuyển dụng</Text>
                    </View>
                </View>

                <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                    <View className="flex-row items-center mb-2">
                        <Image
                            source={require('@/assets/images/create-jobseeker-home-icon-2.svg')}
                            style={{ width: 48, height: 48, marginRight: 15 }}
                        />
                        <Text className="flex-1 font-bold text-gray-800">Đánh giá hồ sơ tốt</Text>
                    </View>
                </View>

                <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                    <View className="flex-row items-center mb-2">
                        <Image
                            source={require('@/assets/images/create-jobseeker-home-icon-3.svg')}
                            style={{ width: 48, height: 48, marginRight: 15 }}
                        />
                        <Text className="flex-1 font-bold text-gray-800">Dễ xuất việc làm phù hợp</Text>
                    </View>
                </View>

                <View className="bg-white rounded-xl p-4 shadow-sm">
                    <View className="flex-row items-center mb-2">
                        <Image
                            source={require('@/assets/images/create-jobseeker-home-icon-4.svg')}
                            style={{ width: 48, height: 48, marginRight: 15 }}
                        />
                        <Text className="flex-1 font-bold text-gray-800">Ứng tuyển đi làm ngay</Text>
                    </View>
                </View>
            </View >
        </>
    )
}

export default BenefitsSection
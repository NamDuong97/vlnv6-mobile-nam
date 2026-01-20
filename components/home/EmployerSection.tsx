import React from 'react';
import { Text, View } from 'react-native';
import FeatureCard from './FeatureCard';

export default function EmployerSection() {
    return (
        <View className="bg-white mx-4 rounded-2xl p-6 mb-6">
            <View className="flex-row items-center mb-4">
                {/* <Text className="text-2xl mr-2">🔥</Text> */}
                <Text className="text-xl font-bold text-black">Dành cho nhà tuyển dụng</Text>
            </View>

            <FeatureCard
                image='classified'
                title="Đăng tin & quản lý đăng tin"
                subtitle="Đăng tin dễ dàng cán hơn 1m+ ứng viên tiềm năng. Xem và thống kê hiệu quả trực quan"
                link='/(auth)/sign-in'
            />

            <FeatureCard
                image='find-jobseeker'
                title="Tìm kiếm ứng viên"
                subtitle="Chủ động tìm kiếm ứng viên từ kho hồ sơ với 50,000+ hồ sơ chất lượng cao"
                link='/(auth)/sign-in'
            />

            <FeatureCard
                image='manage-jobseeker'
                title=" Quản lý ứng viên"
                subtitle="Xem lại hồ sơ ứng viên đã mua/ứng tuyển. Đặt trạng thái hồ sơ để phân loại hồ sơ"
                link='/(auth)/sign-in'
            />
        </View>
    );
}
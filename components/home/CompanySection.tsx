// CompanySection.tsx
import { useOrgError, useOrgLoading, useOrgsOutstanding, useOrgStore } from '@/store/orgStore';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import CompanyList from './CompanyList';

interface Props {
    pageSize?: number;
}

const CompanySection: React.FC<Props> = ({ pageSize = 3 }) => {
    // Lấy state từ store
    const companies = useOrgsOutstanding();
    const loading = useOrgLoading();
    const error = useOrgError();
    const fetchOrganizationOutstanding = useOrgStore(state => state.fetchOrganizationOutstanding);

    const [pageIndex, setPageIndex] = useState(0);
    const totalPages = Math.ceil(companies.length / pageSize);

    const visibleCompanies = useMemo(() => {
        const start = pageIndex * pageSize;
        return companies.slice(start, start + pageSize);
    }, [companies, pageIndex, pageSize]);

    const canPrev = pageIndex > 0;
    const canNext = pageIndex < totalPages - 1;

    // Xử lý loading 
    if (loading && companies.length === 0) {
        return (
            <View className="bg-white px-4 py-8 items-center justify-center">
                <ActivityIndicator size="large" color="#2563EB" />
                <Text className="text-gray-600 mt-2">Đang tải doanh nghiệp...</Text>
            </View>
        );
    }

    // Xử lý error error 
    if (error && companies.length === 0) {
        return (
            <View className="bg-white px-4 py-8 items-center justify-center">
                <Text className="text-red-500 mb-2">Lỗi khi tải doanh nghiệp</Text>
                <Pressable
                    onPress={() => fetchOrganizationOutstanding()}
                    className="bg-blue-600 px-4 py-2 rounded-lg"
                >
                    <Text className="text-white">Thử lại</Text>
                </Pressable>
            </View>
        );
    }

    // Không có data
    if (companies.length === 0) {
        return (
            <View className="bg-white px-4 py-8 items-center justify-center">
                <Text className="text-gray-500">Chưa có doanh nghiệp nào</Text>
            </View>
        );
    }

    return (
        <View className="bg-white px-4 py-5">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-3">
                <Text className="text-[18px] font-semibold text-gray-900">
                    Doanh nghiệp nổi bật
                </Text>

                <View className="flex-row space-x-3">
                    <Pressable
                        disabled={!canPrev}
                        onPress={() => setPageIndex((p) => p - 1)}
                    >
                        <Image
                            source={require('@/assets/images/arrow-left-white-bg.svg')}
                            style={{ width: 24, height: 24, marginRight: 2, opacity: canPrev ? 1 : 0.5 }}
                            contentFit='contain'
                        />
                    </Pressable>

                    <Pressable
                        disabled={!canNext}
                        onPress={() => setPageIndex((p) => p + 1)}
                    >
                        <Image
                            source={require('@/assets/images/arrow-right-white-bg.svg')}
                            style={{ width: 24, height: 24, opacity: canNext ? 1 : 0.5 }}
                            contentFit='contain'
                        />
                    </Pressable>
                </View>
            </View>

            {/* Company list */}
            <CompanyList companies={visibleCompanies} />

            {/* Footer */}
            <Pressable
                onPress={() => console.log("alo bam vao xem all")}
                className="mt-2 self-center flex-row items-center justify-center rounded-lg border border-blue-600 py-2 px-4 "
            >
                <Text className="text-blue-600 font-medium mr-1 text-[15px]">
                    Xem tất cả doanh nghiệp
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#2563EB" />
            </Pressable>
        </View>
    );
};

export default CompanySection;
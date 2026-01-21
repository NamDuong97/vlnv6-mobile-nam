// CompanySection.tsx
import { Company } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import CompanyList from './CompanyList';

interface Props {
    companies: Company[];
    pageSize?: number;
}

const CompanySection: React.FC<Props> = ({ companies, pageSize = 3 }) => {
    const [pageIndex, setPageIndex] = useState(0);

    const totalPages = Math.ceil(companies.length / pageSize);

    const visibleCompanies = useMemo(() => {
        const start = pageIndex * pageSize;
        return companies.slice(start, start + pageSize);
    }, [companies, pageIndex, pageSize]);

    const canPrev = pageIndex > 0;
    const canNext = pageIndex < totalPages - 1;

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

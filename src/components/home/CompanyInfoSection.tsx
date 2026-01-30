import { usecurrentSeoJobHome, useSeoError, useSeoLoading, useSeoStore } from '@/store/seoStore';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { extractTable, HtmlTable } from './HtmlTable';

const CompanyInfoSection: React.FC = () => {
    const { width } = useWindowDimensions();
    const [isExpanded, setIsExpanded] = useState(false);
    const currentSeoJobHome = usecurrentSeoJobHome();
    const loading = useSeoLoading();
    const error = useSeoError();

    useEffect(() => {
        if (!currentSeoJobHome) {
            useSeoStore.getState().fetchSeoJobHome();
        }
    }, [currentSeoJobHome]);

    const defaultContent = "<p><span style=\"color: #236fa1\"><strong><a style=\"color: #236fa1\" href=\"https://vieclam.net/\" target=\"_blank\" rel=\"noopener\"><span style=\"color: #3598db\">Vieclam.net</span></a></strong></span> là một sản phẩm mới của Công ty Cổ phần Định Anh, vừa cho ra mắt vào cuối năm 2023. Vieclam.net ra đời nhằm giải quyết vấn đề khó khăn trong quá trình <span style=\"color: #3598db\"><strong><a style=\"color: #3598db\" title=\"tuyển dụng của các doanh nghiệp\" href=\"https://vieclam.net/doanh-nghiep\">tuyển dụng của các doanh nghiệp</a></strong></span> và quá trình <span style=\"color: #3598db\"><strong><a style=\"color: #3598db\" title=\"tìm việc làm\" href=\"https://vieclam.net/tuyen-dung\" target=\"_blank\" rel=\"noopener\">tìm việc làm</a></strong></span> của các ứng viên. Đây là website cung cấp nền tảng để kết nối người tìm việc và doanh nghiệp một cách nhanh chóng và hiệu quả.</p>\n<p>Hiện tại, Vieclam.net có hơn 42 ngành nghề tuyển dụng với đa dạng lĩnh vực từ lao động trí thức đến lao động chân tay. Trong đó, những công việc lao động tri thức có số lượng tin tuyển dụng và ứng tuyển cao nhất bao gồm: Kế toán, kinh doanh, hành chính nhân sự, nhân viên tư vấn, nhân viên marketing… Đối với nhóm ngành nghề <strong><a title=\"lao động phổ thông\" href=\"https://vieclam.net/tuyen-dung-lao-dong-pho-thong-khac\" target=\"_blank\" rel=\"noopener\"><span style=\"color: #c2e0f4\"><span style=\"color: #3598db\">lao động phổ thông</span></span></a></strong><span style=\"color: #3598db\">,</span> số lượng tin tuyển dụng chủ yếu thuộc các ngành nghề: Bán hàng, bảo vệ, giúp việc - tạp vụ, công nhân, lái xe - phụ xe, giao chở hàng, nhân viên khách sạn, thợ cắt tóc gội đầu…</p>\n<p>Với mục tiêu “Trở thành nguồn thông tin tốt nhất cho lao động phổ thông và trở thành đối tác trực tuyến giá trị nhất cho các nhà tuyển dụng”. Hiện tại, Vieclam.net đã có hơn 78.000 tin"

    const { table } = extractTable(currentSeoJobHome?.footer || '');
    const footerHtml = isExpanded ? currentSeoJobHome?.footer : defaultContent;
    const { text } = extractTable(footerHtml || '');

    const handleLoadMore = () => {
        setIsExpanded(!isExpanded);
    };

    // Highlight text đơn giản
    const renderText = (html: string) => {
        return (
            <RenderHTML
                contentWidth={width}
                source={{ html }}
                tagsStyles={{
                    p: { lineHeight: 22 },
                    strong: { fontWeight: '500' },
                    a: { color: '#3598db' },
                    span: { color: '#3598db' }
                }}
            />
        );
    };

    // Xử lý loading
    if (loading) {
        return (
            <View className="bg-white mt-4 mb-4 p-4 items-center justify-center">
                <ActivityIndicator size="large" color="#2563EB" />
                <Text className="text-gray-600 mt-2">Đang tải thông tin công ty...</Text>
            </View>
        )
    }

    // Xử lý error
    if (error) {
        return (
            <View className="bg-white mt-4 mb-4 p-4 items-center justify-center">
                <Text className="text-red-500 mb-2">Lỗi khi tải thông tin công ty</Text>
                <Text
                    className="text-blue-600 underline"
                    onPress={() => useSeoStore.getState().fetchSeoJobHome()}
                >
                    Thử lại
                </Text>
            </View>
        )
    }

    return (
        <View className="mb-8 bg-white px-4 py-4 shadow-sm">
            {/* SEO / Content */}
            <View className="mb-2">
                {footerHtml ? renderText(text) : null}
            </View>

            {isExpanded ? <HtmlTable html={table || ''} /> : ''}

            <TouchableOpacity onPress={handleLoadMore} activeOpacity={0.7}>
                <View className="flex-row items-center justify-center">
                    <Text className="text-primary font-bold mr-2">
                        {isExpanded ? 'Thu nhỏ' : 'Xem thêm'}
                    </Text>
                    <Image
                        source={require('@/assets/images/chevron-down-blue.svg')}
                        style={{
                            width: 24,
                            height: 24,
                            transform: [{ rotate: isExpanded ? '180deg' : '0deg' }]
                        }}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CompanyInfoSection;
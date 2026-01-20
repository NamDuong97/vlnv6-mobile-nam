import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TableLink {
    title: string;
    url: string;
}

interface TableColumn {
    title: string;
    links: TableLink[];
}

interface CompanyInfoSectionProps {
    content?: string;
    fullContent?: string;
    highlights?: string[];
    tableData?: TableColumn[];
}

const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({
    content,
    fullContent,
    highlights = ['Vieclam.net', 'tuyển dụng của các doanh nghiệp', 'tìm việc làm', 'lao động phổ thông', 'Cẩm nang nghề nghiệp'],
    tableData,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Dữ liệu mặc định - có thể thay bằng API sau
    const defaultContent = `Vieclam.net là một sản phẩm mới của Công ty Cổ phần Định Anh, vừa cho ra mắt vào cuối năm 2023. Vieclam.net ra đời nhằm giải quyết vấn đề khó khăn trong quá trình tuyển dụng của các doanh nghiệp và quá trình tìm việc làm của các ứng viên. Đây là website cung cấp nền tảng để kết nối người tìm việc và doanh nghiệp một cách nhanh chóng và hiệu quả.
Hiện tại, Vieclam.net có hơn 42 ngành nghề tuyển dụng với đa dạng lĩnh vực từ lao động trí thức đến lao động chân tay. Trong đó, những công việc lao động trí thức có số lượng tin tuyển dụng và ứng tuyển cao nhất bao gồm: Kế toán, kinh doanh, hành chính nhân sự, nhân viên tư vấn, nhân viên marketing... Đối với nhóm ngành nghề lao động phổ thông, số lượng tin tuyển dụng chủ yếu thuộc các ngành nghề: Bán hàng, bảo vệ, giúp việc - tạp vụ, công nhân, lái xe - phụ xe, giao chữ hàng, nhân viên khách sạn, thợ cắt tóc gội đầu...
Với mục tiêu "Trở thành nguồn thông tin tốt nhất cho lao động phổ thông và trở thành đối tác trực tuyến giá trị nhất cho các nhà tuyển dụng". Hiện tại, Vieclam.net đã có hơn 78.000 tin`;

    const defaultFullContent = `Vieclam.net là một sản phẩm mới của Công ty Cổ phần Định Anh, vừa cho ra mắt vào cuối năm 2023. Vieclam.net ra đời nhằm giải quyết vấn đề khó khăn trong quá trình tuyển dụng của các doanh nghiệp và quá trình tìm việc làm của các ứng viên. Đây là website cung cấp nền tảng để kết nối người tìm việc và doanh nghiệp một cách nhanh chóng và hiệu quả.
Hiện tại, Vieclam.net có hơn 42 ngành nghề tuyển dụng với đa dạng lĩnh vực từ lao động trí thức đến lao động chân tay. Trong đó, những công việc lao động trí thức có số lượng tin tuyển dụng và ứng tuyển cao nhất bao gồm: Kế toán, kinh doanh, hành chính nhân sự, nhân viên tư vấn, nhân viên marketing... Đối với nhóm ngành nghề lao động phổ thông, số lượng tin tuyển dụng chủ yếu thuộc các ngành nghề: Bán hàng, bảo vệ, giúp việc - tạp vụ, công nhân, lái xe - phụ xe, giao chữ hàng, nhân viên khách sạn, thợ cắt tóc gội đầu...
Với mục tiêu "Trở thành nguồn thông tin tốt nhất cho lao động phổ thông và trở thành đối tác trực tuyến giá trị nhất cho các nhà tuyển dụng". Hiện tại, Vieclam.net đã có hơn 78.000 tin đăng tuyển dụng, hơn 65.000 hồ sơ ứng viên với đa dạng ngành nghề. Với số lượng trên, đảm bảo các nhà tuyển dụng có thể dễ dàng tìm kiếm những ứng viên phù hợp với vị trí tuyển dụng của doanh nghiệp.
Bên cạnh đó, trang Cẩm nang nghề nghiệp - Là nơi tổng hợp những chia sẻ hay về công việc, tính cách nghề nghiệp, mẹo tuyển dụng, phát triển bản thân... Là cầu nối giữa nhà tuyển dụng và ứng viên tìm việc. Với những chia sẻ cực kỳ hữu ích từ Blog Vieclam.net sẽ giúp các ứng viên và nhà tuyển dụng hiểu rõ hơn về tình hình và những thông tin liên quan đến thị trường việc làm.`;

    // Table data mặc định
    const defaultTableData: TableColumn[] = [
        {
            title: "Việc làm theo nghề nghiệp",
            links: [
                { title: "Lái xe", url: "/jobs?category=driver" },
                { title: "Giúp việc, tạp vụ", url: "/jobs?category=housekeeper" },
                { title: "Bảo vệ", url: "/jobs?category=security" },
                { title: "Bán hàng", url: "/jobs?category=sales" },
                { title: "Lao động phổ thông", url: "/jobs?category=general" },
            ]
        },
        {
            title: "Việc làm theo khu vực",
            links: [
                { title: "Việc làm TP.HCM", url: "/jobs?location=hcm" },
                { title: "Việc làm Hà Nội", url: "/jobs?location=hanoi" },
                { title: "Việc làm Bình Dương", url: "/jobs?location=binhduong" },
                { title: "Việc làm Đồng Nai", url: "/jobs?location=dongnai" },
                { title: "Việc làm Cần Thơ", url: "/jobs?location=cantho" },
            ]
        },
        {
            title: "Việc làm theo loại hình",
            links: [
                { title: "Việc làm người lớn tuổi", url: "/jobs?type=elder" },
                { title: "Việc làm ca đêm", url: "/jobs?type=night" },
                { title: "Việc làm ca tối", url: "/jobs?type=evening" },
                { title: "Việc làm cho học sinh", url: "/jobs?type=student" },
                { title: "Việc làm thời vụ", url: "/jobs?type=temporary" },
            ]
        }
    ];

    // Sử dụng props nếu có, không thì dùng default
    const displayContent = isExpanded
        ? (fullContent || defaultFullContent)
        : (content || defaultContent);

    const displayTableData = tableData || defaultTableData;

    const handleLoadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLinkPress = (url: string) => {
        // Xử lý navigation - có thể dùng router hoặc Linking
        console.log('Navigate to:', url);
        // Ví dụ: router.push(url) nếu dùng expo-router
        // Hoặc: Linking.openURL(`https://vieclam.net${url}`)
    };

    // Highlight text đơn giản
    const renderText = (text: string) => {
        let result = text;

        // Thay thế các từ cần highlight
        highlights.forEach(word => {
            const regex = new RegExp(word, 'gi');
            result = result.replace(regex, `**${word}**`);
        });

        // Split và render
        return result.split('**').map((part, index) => {
            // Các phần lẻ (1, 3, 5...) là highlighted
            const isHighlighted = index % 2 === 1;

            if (isHighlighted) {
                return (
                    <Text key={index} className="text-primary-600 font-semibold">
                        {part}
                    </Text>
                );
            }

            return <Text key={index}>{part}</Text>;
        });
    };

    const renderTable = () => {
        if (!isExpanded) return null;

        return (
            <View className="mt-2">
                <View className="flex-row flex-wrap justify-between">
                    {displayTableData.map((column, colIndex) => (
                        <View
                            key={colIndex}
                            className="w-[48%] mb-6" // 2 columns trên mobile
                        // Hoặc className="w-[31%] mb-6" cho 3 columns
                        >
                            {/* Tiêu đề cột */}
                            <Text className="font-bold text-gray-700 mb-3 text-base">
                                {column.title}
                            </Text>

                            {/* Danh sách links */}
                            <View className="space-y-2">
                                {column.links.map((link, linkIndex) => (
                                    <TouchableOpacity
                                        key={linkIndex}
                                        onPress={() => handleLinkPress(link.url)}
                                        activeOpacity={0.7}
                                    >
                                        <Text className="text-blue-600 text-sm py-1">
                                            • {link.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View className="mx-4 mb-8 bg-white rounded-xl p-6 shadow-sm">
            <Text className="text-sm text-gray-600 mb-4 leading-6">
                {renderText(displayContent)}
            </Text>

            {/* Hiển thị bảng khi expanded */}
            {renderTable()}

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
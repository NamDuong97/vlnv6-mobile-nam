import { useCommonStore, useFooterData } from '@/store/commonStore';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

const Footer = () => {
    const footerData = useFooterData();
    const commonStore = useCommonStore();

    useEffect(() => {
        const fetchData = async () => {
            if (!footerData) {
                await commonStore.fetchFooter();
            }
        };

        fetchData();
    }, [footerData]);

    return (
        <View className="bg-white px-4 pt-6 pb-16">
            <View className="flex-row items-center mb-4">
                <Image source={require('@/assets/images/vieclam.svg')}
                    className="w-24 h-8"
                    onError={(error) => console.log('Image loading error:', error)}
                    style={{ width: 190, height: 32 }}
                />
            </View>

            {/* Schema */}
            <View className="mb-4">
                <Text className="font-bold text-primary mb-2">Trung tâm hỗ trợ</Text>
                <Text className="text-sm text-gray-600 mb-4">
                    CÔNG TY CỔ PHẦN ĐỊNH ANH
                </Text>
                <Text className="text-sm text-gray-600 mb-1">MST: 0100255844, cấp ngày 11/12/2008</Text>
                <Text className="text-sm text-gray-600 mb-1">Hotline: 028 7300 1234 - 024 7300 1234</Text>
                <Text className="text-sm text-gray-800 mb-1">Văn phòng giao dịch</Text>
                <Text className="text-sm text-gray-600 mb-1">A35 Nam Quang 2, P.Tân Phong, Quận 7, TPHCM</Text>
                <Text className="text-sm text-gray-600 mb-1">38 Cửa Đông, P.Cửa Đông, Quận Hoàn Kiếm, Hà Nội</Text>
            </View>

            {/* About Company And Candidate*/}
            <View className="flex-row justify-between mb-4">
                <View className="flex-1 mr-4">
                    <Text className="font-semibold text-primary mb-2">Về chúng tôi</Text>
                    {commonStore.loading ? (
                        <Text className="text-sm text-gray-600 mb-1">Loading...</Text>
                    ) : footerData?.about.map((item) => (
                        <Link
                            key={item.id}
                            href={item.url}
                            className="text-sm text-gray-600 mb-1"
                        >
                            {item.name}
                        </Link>
                    ))}
                </View>

                <View className="flex-1">
                    <Text className="font-semibold text-primary mb-2">Dành cho ứng viên</Text>
                    {commonStore.loading ? (
                        <Text className="text-sm text-gray-600 mb-1">Loading...</Text>
                    ) : footerData?.candidate.map((item) => (
                        <Link
                            key={item.id}
                            href={item.url}
                            className="text-sm text-gray-600 mb-1"
                        >
                            {item.name}
                        </Link>
                    ))}
                </View>
            </View>

            {/* Employer And Social network*/}
            <View className="flex-row justify-between mb-4">
                <View className="flex-1 mr-4">
                    <Text className="font-semibold text-primary mb-2">Dành cho nhà tuyển dụng</Text>
                    {commonStore.loading ? (
                        <Text className="text-sm text-gray-600 mb-1">Loading...</Text>
                    ) : footerData?.employer.map((item) => (
                        <Link
                            key={item.id}
                            href={item.url}
                            className="text-sm text-gray-600 mb-1"
                        >
                            {item.name}
                        </Link>
                    ))}
                </View>

                <View className="flex-1">
                    <Text className="font-semibold text-primary mb-2">Mạng xã hội</Text>

                    <View className="flex-row mb-2">
                        <Link href={'https://www.tiktok.com/@vieclamnet'} className='mr-2'>
                            <Image
                                source={require('@/assets/images/tiktok.png')}
                                className="w-6 h-6 mr-2"
                                style={{ width: 40, height: 40 }} />
                        </Link>
                        <Link href={'https://www.facebook.com/vieclamnet.official/'} >
                            <Image
                                source={require('@/assets/images/facebook.png')}
                                className="w-6 h-6 mr-2"
                                style={{ width: 40, height: 40 }} />
                        </Link>
                    </View>

                    <View className="flex-row mb-3">
                        <Link href={'https://www.youtube.com/@Vieclam_net'} className='mr-2'>
                            <Image
                                source={require('@/assets/images/youtube.png')}
                                className="w-6 h-6 mr-2"
                                style={{ width: 40, height: 40 }} />
                        </Link>
                        <Link href={'https://zalo.me/vieclamnet'}>
                            <Image
                                source={require('@/assets/images/zalo-footer.png')}
                                className="w-6 h-6 mr-3"
                                style={{ width: 40, height: 40 }} />
                        </Link>
                    </View>

                    <View className="flex-row mb-3">
                        <Link href={'https://www.dmca.com/Protection/Status.aspx?ID=123e32a1-48c0-4151-aa3b-3e80b4d96192&&refurl=https://vieclam.net/'} >
                            <Image
                                source={require('@/assets/images/dmca_protected.png')}
                                className="w-6 h-6 mr-2"
                                style={{ width: 124, height: 24 }} />
                        </Link>
                    </View>

                    <View className="flex-row">
                        <Link href={'http://online.gov.vn/Home/WebDetails/122616?AspxAutoDetectCookieSupport=1'} />
                        <Image
                            source={require('@/assets/images/gov.png')}
                            className="w-6 h-6 mr-2"
                            style={{ width: 127, height: 39 }}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Footer
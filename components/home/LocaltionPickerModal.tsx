import {
    useCitySelectors,
    useCityStore,
    useProvincesWithoutWholeCountry
} from '@/store/cityStore';
import { Image } from 'expo-image';
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface LocationPickerModalProps {
    visible: boolean;
    onClose: () => void;
    onSelectLocation: (location: string) => void;
    currentLocation?: string;
}

export default function LocationPickerModal({
    visible,
    onClose,
    onSelectLocation,
    currentLocation = "Toàn quốc"
}: LocationPickerModalProps) {
    const {
        // State
        citiesMap,
        selectedProvinceId,
        selectedDistrictId,
        loading,
        initialized,
        hydrated,

        // Actions
        setSelectedProvinceId,
        setSelectedDistrictId,
        cityRefresh,

        // Getters
        getCityById,
        getSelectedProvince,
        getSelectedDistrict,
        getDistrictsByProvinceId,
        getFullLocationName,
        isWholeCountrySelected,
    } = useCityStore();
    const selectors = useCitySelectors();
    const provinces = useProvincesWithoutWholeCountry();
    const [step, setStep] = useState<"province" | "district">("province");
    const [previouslySelectedProvinceId, setPreviouslySelectedProvinceId] = useState<number | null>(null);

    // Computed values
    const hasData = useMemo(() =>
        Object.keys(citiesMap).length > 0,
        [citiesMap]
    );

    const selectedProvince = useMemo(() =>
        getSelectedProvince(),
        [selectedProvinceId, citiesMap]
    );

    const selectedDistrict = useMemo(() =>
        getSelectedDistrict(),
        [selectedDistrictId, citiesMap]
    );

    const districts = useMemo(() =>
        selectedProvinceId ? getDistrictsByProvinceId(selectedProvinceId) : [],
        [selectedProvinceId, citiesMap]
    );

    const isWholeCountry = useMemo(() =>
        isWholeCountrySelected(),
        [selectedProvinceId]
    );

    const fullLocationName = useMemo(() =>
        getFullLocationName(),
        [selectedProvinceId, selectedDistrictId, citiesMap]
    );

    // Parse current location khi modal mở - CHỈ chạy 1 lần khi visible thay đổi
    useEffect(() => {
        if (visible && hasData) {
            parseCurrentLocation();
        }
    }, [visible, hasData]);

    const parseCurrentLocation = () => {
        if (currentLocation === "Toàn quốc") {
            setPreviouslySelectedProvinceId(null);
            setSelectedProvinceId(null);
            setSelectedDistrictId(null);
            setStep("province");
            return;
        }

        // Tìm province từ currentLocation
        const foundProvince = provinces.find(province =>
            currentLocation.includes(province.name)
        );

        if (foundProvince) {
            setPreviouslySelectedProvinceId(foundProvince.id);
            setSelectedProvinceId(foundProvince.id);

            // Kiểm tra nếu có district trong currentLocation
            const commaIndex = currentLocation.indexOf(',');
            if (commaIndex > -1) {
                const districtPart = currentLocation.substring(0, commaIndex).trim();
                const districts = getDistrictsByProvinceId(foundProvince.id);
                const foundDistrict = districts.find(d => d.name === districtPart);

                if (foundDistrict) {
                    setSelectedDistrictId(foundDistrict.id);
                    setStep("district");
                } else {
                    setStep("province");
                }
            } else {
                setStep("province");
            }
        } else {
            // Không tìm thấy -> về "Toàn quốc"
            setPreviouslySelectedProvinceId(null);
            setSelectedProvinceId(null);
            setSelectedDistrictId(null);
            setStep("province");
        }
    };

    // Handle province selection
    const handleSelectProvince = (provinceId: number) => {
        const province = getCityById(provinceId);
        if (!province) return;

        setSelectedProvinceId(provinceId);
        setPreviouslySelectedProvinceId(provinceId);
        setSelectedDistrictId(null);
        setStep("district");

        // Cập nhật ngay tỉnh đã chọn
        onSelectLocation(province.name);
    };

    // Handle district selection
    const handleSelectDistrict = (districtId: number | null) => {
        const province = getSelectedProvince();
        if (!province) return;

        if (districtId === null) {
            // Chọn "Tất cả quận/huyện"
            onSelectLocation(province.name);
            setSelectedDistrictId(null);
        } else {
            const district = getCityById(districtId);
            if (district) {
                onSelectLocation(`${district.name}`);
                setSelectedDistrictId(districtId);
            }
        }

        onClose();
    };

    // Handle "Toàn quốc" selection
    const handleSelectWholeCountry = () => {
        setSelectedProvinceId(null);
        setSelectedDistrictId(null);
        onSelectLocation("Toàn quốc");
        onClose();
    };

    const handleBack = () => {
        setStep("province");
    };

    // Handle refresh data
    const handleRefresh = async () => {
        await cityRefresh();
    };

    // Reset step khi modal đóng
    useEffect(() => {
        if (!visible) {
            const timer = setTimeout(() => {
                setStep("province");
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    // Không render nếu không visible
    if (!visible) return null;

    // Loading state
    if (!hydrated) {
        return (
            <View className="absolute top-full mt-1 left-3 right-3 z-50 bg-white rounded-xl border border-gray-200 p-4">
                <View className="items-center justify-center py-8">
                    <Text className="text-gray-600">Đang tải dữ liệu địa điểm...</Text>
                </View>
            </View>
        );
    }

    // Empty state
    if (!hasData && !loading) {
        return (
            <View className="absolute top-full mt-1 left-3 right-3 z-50 bg-white rounded-xl border border-gray-200">
                <View className="px-4 py-3 border-b border-gray-100">
                    <Text className="text-[20px] font-semibold text-gray-900 text-center">
                        Chọn khu vực
                    </Text>
                </View>
                <View className="p-6 items-center justify-center">
                    <Text className="text-gray-500 mb-4">Không có dữ liệu địa điểm</Text>
                    <TouchableOpacity
                        onPress={handleRefresh}
                        className="px-4 py-2 bg-blue-500 rounded-lg"
                    >
                        <Text className="text-white font-medium">Thử lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <>
            {/* Invisible overlay để bắt sự kiện bấm ra ngoài */}
            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                className="absolute inset-0 z-40"
                style={{ backgroundColor: 'transparent' }}
            />

            {/* Modal content */}
            <View
                className="absolute top-full mt-1 left-3 right-3 z-50"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <View className="bg-white rounded-xl border border-gray-200">
                    {/* HEADER */}
                    <View className="px-4 py-3 border-b border-gray-100">
                        {step === "province" ? (
                            <Text className="text-[20px] font-semibold text-gray-900 text-center">
                                Chọn khu vực
                            </Text>
                        ) : (
                            <View className="flex-row items-center">
                                <TouchableOpacity
                                    onPress={handleBack}
                                    className="mr-3 p-1"
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <Image
                                        source={require('@/assets/images/arrow-left.svg')}
                                        style={{ width: 24, height: 24 }}
                                        contentFit="cover"
                                    />
                                </TouchableOpacity>
                                <Text className="text-[20px] font-semibold text-gray-900 flex-1 text-center">
                                    Chọn khu vực
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Loading state cho refresh */}
                    {loading && (
                        <View className="p-4 items-center justify-center">
                            <Text className="text-gray-600">Đang cập nhật...</Text>
                        </View>
                    )}

                    {/* CONTENT */}
                    {!loading && (
                        <ScrollView
                            style={{ maxHeight: 430 }} // Đảm bảo có maxHeight
                            contentContainerStyle={{ flexGrow: 1 }}
                            showsVerticalScrollIndicator={true}
                            nestedScrollEnabled={true}
                        >
                            {step === "province" ? (
                                // DANH SÁCH TỈNH
                                <View> 
                                    {/* "Toàn quốc" option */}
                                    <TouchableOpacity
                                        onPress={handleSelectWholeCountry}
                                        className={`px-4 py-3 flex-row justify-between items-center border-b border-gray-100 active:bg-gray-50`}
                                    >
                                        <Text className={`text-[16px] ${isWholeCountry ? 'text-blue-600 font-medium' : 'text-gray-800'}`}>
                                            Toàn quốc
                                        </Text>
                                        {isWholeCountry && (
                                            <Image
                                                source={require('@/assets/images/tick-blue.svg')}
                                                style={{ width: 16, height: 11 }}
                                                contentFit="cover"
                                            />
                                        )}
                                    </TouchableOpacity>

                                    {/* Danh sách tỉnh */}
                                    {provinces.map((province, index) => {
                                        const isSelected = province.id === previouslySelectedProvinceId ||
                                            province.id === selectedProvinceId;

                                        return (
                                            <TouchableOpacity
                                                key={province.id}
                                                onPress={() => handleSelectProvince(province.id)}
                                                className={`px-4 py-3 flex-row justify-between items-center ${index !== provinces.length - 1 ? 'border-b border-gray-100' : ''
                                                    } active:bg-gray-50`}
                                            >
                                                <Text className={`text-[16px] ${isSelected ? 'text-blue-600 font-medium' : 'text-gray-800'}`}>
                                                    {province.name || 'Không xác định'}
                                                </Text>
                                                <View className="flex-row items-center">
                                                    {isSelected ? (
                                                        <Image
                                                            source={require('@/assets/images/tick-blue.svg')}
                                                            style={{ width: 16, height: 11 }}
                                                            contentFit="cover"
                                                        />
                                                    ) : (
                                                        <Image
                                                            source={require('@/assets/images/arrow-right.svg')}
                                                            style={{ width: 24, height: 24 }}
                                                            contentFit="cover"
                                                        />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            ) : (
                                // DANH SÁCH HUYỆN
                                <View> 
                                    {selectedProvince && (
                                        <>
                                            {/* "Tất cả quận/huyện" option */}
                                            <TouchableOpacity
                                                onPress={() => handleSelectDistrict(null)}
                                                className={`px-4 py-3 flex-row justify-between items-center border-b border-gray-100 active:bg-gray-50`}
                                            >
                                                <Text className={`text-[16px] ${!selectedDistrict ? 'text-blue-600 font-medium' : 'text-gray-800'}`}>
                                                    Tất cả quận / huyện
                                                </Text>
                                                {!selectedDistrict && (
                                                    <Image
                                                        source={require('@/assets/images/tick-blue.svg')}
                                                        style={{ width: 16, height: 11 }}
                                                        contentFit="cover"
                                                    />
                                                )}
                                            </TouchableOpacity>

                                            {/* Danh sách quận/huyện */}
                                            {districts.map((district, index) => {
                                                const isSelected = district.id === selectedDistrictId;

                                                return (
                                                    <TouchableOpacity
                                                        key={district.id}
                                                        onPress={() => handleSelectDistrict(district.id)}
                                                        className={`px-4 py-3 flex-row justify-between items-center ${index !== districts.length - 1 ? 'border-b border-gray-100' : ''
                                                            } active:bg-gray-50`}
                                                    >
                                                        <Text className={`text-[16px] ${isSelected ? 'text-blue-600 font-medium' : 'text-gray-800'}`}>
                                                            {district.name || 'Không xác định'}
                                                        </Text>
                                                        {isSelected && (
                                                            <Image
                                                                source={require('@/assets/images/tick-blue.svg')}
                                                                style={{ width: 16, height: 11 }}
                                                                contentFit="cover"
                                                            />
                                                        )}
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </>
                                    )}
                                </View>
                            )}
                        </ScrollView>
                    )}
                </View>
            </View>
        </>
    );
}
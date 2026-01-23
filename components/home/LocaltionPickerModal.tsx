import { JSX, useState } from "react";
import { FlatList, Modal, Pressable, Text, View, } from "react-native";

type Province = "TP.HCM" | "Hà Nội";

type LocationData = {
    [key in Province]: string[];
};

const DATA: LocationData = {
    "TP.HCM": [
        "Tất cả quận / huyện",
        "Quận 1",
        "Quận 3",
        "Quận 4",
        "Quận 5",
    ],
    "Hà Nội": [
        "Tất cả quận / huyện",
        "Ba Đình",
        "Cầu Giấy",
        "Đống Đa",
    ],
};

export default function LocationPicker(): JSX.Element {
    const [provinceModal, setProvinceModal] = useState<boolean>(true);
    const [districtModal, setDistrictModal] = useState<boolean>(false);

    const [province, setProvince] = useState<Province>("TP.HCM");
    const [district, setDistrict] = useState<string>("Tất cả quận / huyện");

    const closeAll = (): void => {
        setProvinceModal(false);
        setDistrictModal(false);
    };

    return (
        <View className="absolute bg-white rounded-lg z-[100] left-0 top-14 py-4 px-2 w-full h-36">
            {/* ===== MODAL 1: CHỌN TỈNH ===== */}
            <Modal transparent animationType="slide" visible={provinceModal}>
                <Pressable onPress={closeAll} className="flex-1 bg-black/40" />

                <View className="bg-white rounded-t-2xl px-4 pt-4 pb-8 max-h-[70%]">
                    <Text className="text-lg font-semibold mb-4">
                        Chọn tỉnh / thành
                    </Text>

                    <FlatList
                        data={Object.keys(DATA) as Province[]}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => {
                            const isSelected = item === province;

                            return (
                                <Pressable
                                    onPress={() => {
                                        setProvince(item);
                                        setDistrict("Tất cả quận / huyện");
                                        setDistrictModal(true);
                                    }}
                                    className="py-4 border-b border-gray-100 flex-row justify-between items-center"
                                >
                                    <Text className="text-gray-800">{item}</Text>
                                    <Text className="text-gray-400">
                                        {isSelected ? "✓" : "›"}
                                    </Text>
                                </Pressable>
                            );
                        }}
                    />
                </View>
            </Modal>

            {/* ===== MODAL 2: CHỌN HUYỆN ===== */}
            <Modal transparent animationType="slide" visible={districtModal}>
                <Pressable onPress={closeAll} className="flex-1 bg-black/40" />

                <View className="bg-white rounded-t-2xl px-4 pt-4 pb-8 max-h-[70%]">
                    {/* HEADER */}
                    <View className="flex-row items-center mb-4">
                        <Pressable
                            onPress={() => setDistrictModal(false)}
                            className="mr-3"
                        >
                            <Text className="text-blue-500 text-lg">←</Text>
                        </Pressable>

                        <Text className="text-lg font-semibold">
                            Chọn khu vực
                        </Text>
                    </View>

                    <FlatList
                        data={DATA[province]}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => {
                                    setDistrict(item);
                                    closeAll();
                                }}
                                className="py-4 border-b border-gray-100 flex-row justify-between items-center"
                            >
                                <Text>{item}</Text>
                                {item === district && (
                                    <Text className="text-blue-500">✓</Text>
                                )}
                            </Pressable>
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
}

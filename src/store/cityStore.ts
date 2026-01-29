// stores/city.store.ts
import { cityService } from '@/api/services/cityService';
import { CitiesResponse, City } from '@/types/city';
import { storage } from '@/utils/storage';
import { create } from 'zustand';

interface CityState {
    citiesMap: CitiesResponse; // { [id: string]: City }
    provinces: City[]; // Các tỉnh/thành phố (bao gồm "Toàn quốc")
    provincesWithoutWholeCountry: City[]; // Các tỉnh thực sự (bỏ "Toàn quốc")
    districtsByProvince: Map<number, City[]>; // Map tỉnh ID → danh sách quận
    selectedProvinceId: number | null; // Lưu ID thay vì object
    selectedDistrictId: number | null;
    loading: boolean;
    error: string | null;
    initialized: boolean;
    hydrated: boolean

    setCitiesMap: (citiesMap: CitiesResponse) => void;
    setSelectedProvinceId: (provinceId: number | null) => void;
    setSelectedDistrictId: (districtId: number | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setInitialized: (initialized: boolean) => void;
    fetchAllCities: () => Promise<void>;
    getCityById: (id: number) => City | undefined;
    getSelectedProvince: () => City | undefined;
    getSelectedDistrict: () => City | undefined;
    getDistrictsByProvinceId: (provinceId: number) => City[];
    getFullLocationName: () => string;
    isWholeCountrySelected: () => boolean;
    getAllDistricts: () => City[];
    cityHydrate: () => Promise<void> // Hàm này để lưu xuống local
    cityRefresh: () => Promise<void> // Hàm này call api cập nhật UI và local
}

const STORAGE_KEY = 'CITIES'

export const useCityStore = create<CityState>((set, get) => ({
    citiesMap: {},
    provinces: [],
    hydrated: false,
    provincesWithoutWholeCountry: [],
    districtsByProvince: new Map(),
    selectedProvinceId: null,
    selectedDistrictId: null,
    loading: false,
    error: null,
    initialized: false,

    setCitiesMap: (citiesMap) => {
        // Tính toán derived data khi set citiesMap
        const citiesArray = Object.values(citiesMap);

        // Tỉnh/thành phố (bao gồm "Toàn quốc" vì parent = 0)
        const provinces = citiesArray.filter(city => city.parent === 0);

        // Tỉnh thực sự (bỏ "Toàn quốc")
        const provincesWithoutWholeCountry = provinces.filter(city => city.id !== 0);

        // Tạo map tỉnh → quận
        const districtsByProvince = new Map<number, City[]>();

        citiesArray.forEach(city => {
            // Nếu có parent và parent tồn tại trong citiesMap
            if (city.parent !== 0 && citiesMap[city.parent]) {
                if (!districtsByProvince.has(city.parent)) {
                    districtsByProvince.set(city.parent, []);
                }
                districtsByProvince.get(city.parent)!.push(city);
            }
        });

        set({
            citiesMap,
            provinces,
            provincesWithoutWholeCountry,
            districtsByProvince,
        });
    },

    setSelectedProvinceId: (provinceId) => {
        set({
            selectedProvinceId: provinceId,
            selectedDistrictId: null // Reset district khi chọn tỉnh mới
        });
    },

    setSelectedDistrictId: (districtId) => set({ selectedDistrictId: districtId }),

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),

    setInitialized: (initialized) => set({ initialized }),

    fetchAllCities: async () => {
        // Nếu đã initialized, không fetch lại
        if (get().initialized) return;

        set({ loading: true, error: null });

        try {
            const citiesMap = await cityService.getAllCities();
            get().setCitiesMap(citiesMap);

            set({
                loading: false,
                initialized: true,
                error: null
            });
        } catch (error: any) {
            set({
                error: error.message || 'Failed to fetch cities',
                loading: false
            });
        }
    },

    getCityById: (id: number) => {
        return get().citiesMap[id];
    },

    getSelectedProvince: () => {
        const { selectedProvinceId, citiesMap } = get();
        return selectedProvinceId !== null ? citiesMap[selectedProvinceId] : citiesMap[0]; // Trả về "Toàn quốc" nếu null
    },

    getSelectedDistrict: () => {
        const { selectedDistrictId, citiesMap } = get();
        return selectedDistrictId !== null ? citiesMap[selectedDistrictId] : undefined;
    },

    getDistrictsByProvinceId: (provinceId: number) => {
        const { districtsByProvince, citiesMap } = get();

        // Lấy từ map nếu có
        const districts = districtsByProvince.get(provinceId);
        if (districts) return districts;

        // Fallback: lấy từ childs array
        const province = citiesMap[provinceId];
        if (!province || !province.childs) return [];

        return province.childs
            .map(childId => citiesMap[childId])
            .filter((city): city is City => city !== undefined);
    },

    getFullLocationName: () => {
        const { selectedProvinceId, selectedDistrictId, citiesMap } = get();

        // Nếu không chọn tỉnh nào (hoặc chọn "Toàn quốc")
        if (selectedProvinceId === null || selectedProvinceId === 0) {
            return "Toàn quốc";
        }

        const province = citiesMap[selectedProvinceId];
        if (!province) return "Toàn quốc";

        if (selectedDistrictId) {
            const district = citiesMap[selectedDistrictId];
            if (district) {
                return `${district.name}, ${province.name}`;
            }
        }

        return province.name;
    },

    isWholeCountrySelected: () => {
        const { selectedProvinceId } = get();
        return selectedProvinceId === null || selectedProvinceId === 0;
    },

    getAllDistricts: () => {
        const { citiesMap } = get();
        return Object.values(citiesMap).filter(city => city.parent !== 0);
    },

    cityHydrate: async () => {
        const cached = await storage.get<CitiesResponse>(STORAGE_KEY)
        if (cached) {
            get().setCitiesMap(cached)
        }
        set({ hydrated: true })
    },

    cityRefresh: async () => {
        try {
            const citiesMap = await cityService.getAllCities()
            get().setCitiesMap(citiesMap)
            await storage.set(STORAGE_KEY, citiesMap)
        } catch (e) {
            console.warn('Fetch categories failed')
        }
    }
}));

// Selectors Basic
export const useCitiesMap = () => useCityStore(state => state.citiesMap);
export const useProvinces = () => useCityStore(state => state.provinces);
export const useProvincesWithoutWholeCountry = () =>
    useCityStore(state => state.provincesWithoutWholeCountry);
export const useSelectedProvinceId = () =>
    useCityStore(state => state.selectedProvinceId);
export const useSelectedDistrictId = () =>
    useCityStore(state => state.selectedDistrictId);
export const useCityLoading = () => useCityStore(state => state.loading);
export const useCityError = () => useCityStore(state => state.error);
export const useCityInitialized = () => useCityStore(state => state.initialized);
export const useCityHydrated = () => useCityStore(state => state.hydrated);

// Custom selectors
export const useCitySelectors = () => {
    const store = useCityStore();

    return {
        // Get city by ID
        getCityById: (id: number) => store.getCityById(id),

        // Get selected items
        getSelectedProvince: () => store.getSelectedProvince(),
        getSelectedDistrict: () => store.getSelectedDistrict(),

        // Get districts
        getDistrictsByProvinceId: (provinceId: number) =>
            store.getDistrictsByProvinceId(provinceId),

        // Location info
        getFullLocationName: () => store.getFullLocationName(),
        isWholeCountrySelected: () => store.isWholeCountrySelected(),
        getLocationInfo: () => ({
            province: store.getSelectedProvince(),
            district: store.getSelectedDistrict(),
            fullName: store.getFullLocationName(),
            isWholeCountry: store.isWholeCountrySelected()
        }),

        // All districts
        getAllDistricts: () => store.getAllDistricts(),

        // Check if city exists
        cityExists: (id: number) => !!store.getCityById(id),

        // Get child cities
        getChildCities: (parentId: number) => {
            const parent = store.getCityById(parentId);
            if (!parent || !parent.childs) return [];

            return parent.childs
                .map(childId => store.getCityById(childId))
                .filter((city): city is City => city !== undefined);
        }
    };
};
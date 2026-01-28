// stores/banner.store.ts
import { bannerService } from '@/api/services/bannerService';
import { Banner, BannerListResponse } from '@/types/banner';
import { storage } from '@/utils/storage';
import { create } from 'zustand';

interface BannerState {
    // State
    bannersMap: { [id: number]: Banner };
    homeBanners: Banner[];
    loading: boolean;
    error: string | null;
    initialized: boolean;
    hydrated: boolean;
    total: number;

    // Actions
    setBannersMap: (response: BannerListResponse) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setInitialized: (initialized: boolean) => void;

    // Hydrate & Refresh
    bannerHydrate: () => Promise<void>;
    bannerRefresh: () => Promise<void>;

    // API Calls
    fetchHomeBanners: () => Promise<void>;

}

const STORAGE_KEYS = {
    HOME_BANNERS: 'BANNER_HOME',
    CATEGORY_BANNERS: 'BANNER_CATEGORY',
    ALL_BANNERS: 'BANNER_ALL',
};

export const useBannerStore = create<BannerState>((set, get) => ({
    // Initial State
    bannersMap: {},
    homeBanners: [],
    loading: false,
    error: null,
    initialized: false,
    hydrated: false,
    total: 0,

    // Set banners from response
    setBannersMap: (response: BannerListResponse) => {
        const bannersMap: { [id: number]: Banner } = {};
        response.data.forEach(banner => {
            bannersMap[banner.id] = banner;
        });

        set({
            homeBanners: response.data,
            bannersMap,
            total: response.data.length,
            initialized: true,
        });
    },

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),

    setInitialized: (initialized) => set({ initialized }),

    // Get banner by ID
    getBannerById: (id: number) => {
        return get().bannersMap[id];
    },

    // Hydrate from storage
    bannerHydrate: async () => {
        try {
            const [homeBanners] = await Promise.all([
                storage.get<Banner[]>(STORAGE_KEYS.HOME_BANNERS)
            ]);

            const bannersMap: { [id: number]: Banner } = {};

            homeBanners?.forEach(banner => {
                bannersMap[banner.id] = banner;
            });

            set({
                homeBanners: homeBanners || [],
                bannersMap,
                hydrated: true,
            });
        } catch (error) {
            console.warn('Banner hydration failed:', error);
            set({ hydrated: true });
        }
    },

    // Refresh all banners
    bannerRefresh: async () => {
        try {
            const [homeResponse] = await Promise.all([
                bannerService.getHomeBanners()
            ]);

            console.log("homeResponse:", homeResponse);

            const bannersMap: { [id: number]: Banner } = {};
            homeResponse.forEach(banner => {
                bannersMap[banner.id] = banner;
            });

            // Save to storage
            await Promise.all([
                storage.set(STORAGE_KEYS.HOME_BANNERS, homeResponse)
            ]);

            set({
                homeBanners: homeResponse,
                bannersMap,
                total: homeResponse.length,
                loading: false,
                error: null,
            });
        } catch (error) {
            console.warn('Banner refresh failed:', error);
            set({ error: 'Failed to refresh banners', loading: false });
        }
    },

    // Fetch home banners specifically
    fetchHomeBanners: async () => {
        set({ loading: true, error: null });

        try {
            const response = await bannerService.getHomeBanners();
            set({
                homeBanners: response,
                loading: false,
                error: null,
            });

            // Save to storage
            await storage.set(STORAGE_KEYS.HOME_BANNERS, response);
        } catch (error: any) {
            set({
                error: error.message || 'Failed to fetch home banners',
                loading: false,
            });
        }
    },
}));

// Basic selectors
export const useBannersMap = () => useBannerStore(state => state.bannersMap);
export const useHomeBanners = () => useBannerStore(state => state.homeBanners);
export const useBannerLoading = () => useBannerStore(state => state.loading);
export const useBannerError = () => useBannerStore(state => state.error);
export const useBannerInitialized = () => useBannerStore(state => state.initialized);
export const useBannerHydrated = () => useBannerStore(state => state.hydrated);
export const useTotalBanners = () => useBannerStore(state => state.total);

// Custom selectors
export const useBannerSelectors = () => {
    const store = useBannerStore();

    return {
    };
};
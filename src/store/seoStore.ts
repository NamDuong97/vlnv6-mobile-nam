import { seoService } from '@/api/services/seoService';
import { SeoJobHome } from '@/types/seo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

const zustandStorageAdapter: StateStorage = {
    getItem: (key) => AsyncStorage.getItem(key),
    setItem: (key, value) => AsyncStorage.setItem(key, value),
    removeItem: (key) => AsyncStorage.removeItem(key),
};

// Types
export interface GetSeoParams {
    id?: number;
    url?: string;
    refresh?: boolean;
}

interface SeoState {
    // Current SEO data
    currentSeoJobHome: SeoJobHome | null;
    // Cached SEO data by key (id hoặc url)
    cachedSeo: Map<string, SeoJobHome>;
    // UI states
    loading: boolean;
    error: string | null;
    lastFetched: number | null;

    // Actions
    setcurrentSeoJobHome: (seo: SeoJobHome) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setLastFetched: (date: number | null) => void;

    fetchSeoJobHome: (params?: GetSeoParams) => Promise<void>;
    getCachedSeo: (key: string) => SeoJobHome | undefined;
    clearCache: () => void;
    clearcurrentSeoJobHome: () => void;

    // Utility methods
    getSeoByKey: (key: string) => SeoJobHome | null;
}

// Storage configuration
const STORAGE_KEY = 'SEO_CACHE';
const MAX_CACHE_SIZE = 50;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export const useSeoStore = create<SeoState>()(
    persist(
        (set, get) => ({
            // Initial states
            currentSeoJobHome: null,
            cachedSeo: new Map(),
            loading: false,
            error: null,
            lastFetched: null,

            // Setters
            setcurrentSeoJobHome: (seo) => {
                const { cachedSeo } = get();
                const newCachedSeo = new Map(cachedSeo);

                // Cache by ID
                if (seo.id) {
                    const key = `job-home:${seo.id}`;
                    newCachedSeo.set(key, seo);

                    // Maintain cache size
                    if (newCachedSeo.size > MAX_CACHE_SIZE) {
                        const firstKey = newCachedSeo.keys().next().value;
                        newCachedSeo.delete(firstKey ?? '');
                    }
                }

                set({
                    currentSeoJobHome: seo,
                    cachedSeo: newCachedSeo,
                    lastFetched: Date.now(),
                });
            },

            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),
            setLastFetched: (date) => set({ lastFetched: date }),

            // Actions
            fetchSeoJobHome: async (params?: GetSeoParams) => {
                const { cachedSeo } = get();
                const cacheKey = params?.id ? `job-home:${params.id}` : 'job-home:default';

                // Check cache
                if (!params?.refresh) {
                    const cached = cachedSeo.get(cacheKey);
                    if (cached) {
                        const now = Date.now();
                        const cachedTime = get().lastFetched;

                        if (cachedTime && (now - cachedTime < CACHE_TTL)) {
                            set({ currentSeoJobHome: cached });
                            return;
                        }
                    }
                }

                set({ loading: true, error: null });

                try {
                    // Truyền ID vào service nếu có
                    const seoData = await seoService.getSeoJobHome();
                    // Cache với đúng key
                    const newCache = new Map(cachedSeo);
                    newCache.set(cacheKey, seoData);

                    set({
                        currentSeoJobHome: seoData,
                        cachedSeo: newCache,
                        lastFetched: Date.now(),
                        loading: false,
                        error: null
                    });

                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to fetch SEO data',
                        loading: false,
                    });
                }
            },

            getCachedSeo: (key: string) => {
                const { cachedSeo, lastFetched } = get();
                if (!lastFetched) return undefined;

                const expired = Date.now() - lastFetched > CACHE_TTL;

                if (expired) {
                    get().clearCache();
                    return undefined;
                }

                return cachedSeo.get(key);
            },

            clearCache: () => {
                set({
                    cachedSeo: new Map(),
                    currentSeoJobHome: null,
                    lastFetched: null,
                });
            },

            clearcurrentSeoJobHome: () => {
                set({ currentSeoJobHome: null });
            },

            // Utility methods
            getSeoByKey: (key: string) => {
                const seo = get().cachedSeo.get(key);
                return seo || null;
            }
        }),
        {
            name: STORAGE_KEY,
            storage: createJSONStorage(() => zustandStorageAdapter),
            partialize: (state) => ({
                cachedSeo: Array.from(state.cachedSeo.entries()),
                lastFetched: state.lastFetched,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    // Convert arrays back to Maps after rehydration
                    state.cachedSeo = new Map(state.cachedSeo as unknown as [string, SeoJobHome][]);
                }
            },
        }
    )
);

// Selectors
export const usecurrentSeoJobHome = () => useSeoStore(state => state.currentSeoJobHome);
export const useSeoLoading = () => useSeoStore(state => state.loading);
export const useSeoError = () => useSeoStore(state => state.error);
export const useSeoLastFetched = () => useSeoStore(state => state.lastFetched);

// Custom selectors
export const useSeoSelectors = () => {
    const store = useSeoStore();

    return {
        // Get keywords as array
        getKeywordsArray: () => {
            const keywords = store.currentSeoJobHome?.keyword;
            return keywords ? keywords.split('\n').filter(k => k.trim()) : [];
        },

        // Get footer without HTML tags (plain text)
        getPlainFooter: () => {
            const footer = store.currentSeoJobHome?.footer || '';
            return footer.replace(/<[^>]*>/g, '');
        },

        // Get title with fallback
        getTitle: () => {
            return store.currentSeoJobHome?.title || store.currentSeoJobHome?.head_title || '';
        },

        // Check if can view more
        canViewMore: () => {
            return store.currentSeoJobHome?.is_view_more || false;
        },

        // Get all cached keys
        getCachedKeys: () => {
            return Array.from(store.cachedSeo.keys());
        },

        // Get total cached items
        getCacheSize: () => {
            return store.cachedSeo.size;
        },
    };
};
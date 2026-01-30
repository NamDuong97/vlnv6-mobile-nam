import { commonService } from '@/api/services/commonService';
import { FooterLink, FooterLinks } from '@/types/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

const zustandStorageAdapter: StateStorage = {
    getItem: (key) => AsyncStorage.getItem(key),
    setItem: (key, value) => AsyncStorage.setItem(key, value),
    removeItem: (key) => AsyncStorage.removeItem(key),
};

// Types
export interface GetFooterParams {
    refresh?: boolean;
}

interface CommonState {
    // Footer data
    footerData: FooterLinks | null;

    // UI states
    loading: boolean;
    error: string | null;
    lastFetched: number | null;

    // Actions
    setFooterData: (data: FooterLinks) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setLastFetched: (date: number | null) => void;

    // API actions
    fetchFooter: (params?: GetFooterParams) => Promise<void>;
    clearFooterData: () => void;
    clearCache: () => void;

    // Utility methods
    getSectionLinks: (section: keyof FooterLinks) => FooterLink[];
    hasData: () => boolean;
}

// Storage configuration
const STORAGE_KEY = 'COMMON_CACHE';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export const useCommonStore = create<CommonState>()(
    persist(
        (set, get) => ({
            // Initial states
            footerData: null,
            loading: false,
            error: null,
            lastFetched: null,

            // Setters
            setFooterData: (data) => set({
                footerData: data,
                lastFetched: Date.now(),
                error: null
            }),

            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),
            setLastFetched: (date) => set({ lastFetched: date }),

            // Actions
            fetchFooter: async (params?: GetFooterParams) => {
                const { footerData, lastFetched } = get();

                // Check cache and TTL
                if (!params?.refresh && footerData && lastFetched) {
                    const now = Date.now();
                    if (now - lastFetched < CACHE_TTL) {
                        return;
                    }
                }

                set({ loading: true, error: null });

                try {
                    const response = await commonService.getFooter();

                    set({
                        footerData: response,
                        lastFetched: Date.now(),
                        loading: false,
                        error: null
                    });

                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to fetch footer data',
                        loading: false,
                    });
                }
            },

            clearFooterData: () => {
                set({ footerData: null, lastFetched: null });
            },

            clearCache: () => {
                set({
                    footerData: null,
                    lastFetched: null,
                    error: null
                });
            },

            getSectionLinks: (section: keyof FooterLinks) => {
                const { footerData } = get();
                return footerData?.[section] || [];
            },

            hasData: () => {
                const { footerData } = get();
                return footerData !== null;
            }
        }),
        {
            name: STORAGE_KEY,
            storage: createJSONStorage(() => zustandStorageAdapter),
            partialize: (state) => ({
                footerData: state.footerData,
                lastFetched: state.lastFetched,
            }),
        }
    )
);

// Selectors
export const useFooterData = () => useCommonStore(state => state.footerData);
export const useCommonLoading = () => useCommonStore(state => state.loading);
export const useCommonError = () => useCommonStore(state => state.error);
export const useCommonLastFetched = () => useCommonStore(state => state.lastFetched);

// Custom selectors
export const useCommonSelectors = () => {
    const store = useCommonStore();

    return {
        getAboutLinks: () => store.getSectionLinks('about'),
        getCandidateLinks: () => store.getSectionLinks('candidate'),
        getEmployerLinks: () => store.getSectionLinks('employer'),
        getInfoLinks: () => store.getSectionLinks('info'),
        getPublishedLinks: (section: keyof FooterLinks) => {
            const links = store.getSectionLinks(section);
            return links.filter(link => link.publish);
        },
        isLoading: () => store.loading,
        hasError: () => store.error !== null,
        isStale: () => {
            const lastFetched = store.lastFetched;
            if (!lastFetched) return true;
            return Date.now() - lastFetched > CACHE_TTL;
        }
    };
};
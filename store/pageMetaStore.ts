// stores/pageMeta.store.ts
import { GetPageMetaParams, pageMetaService } from '@/api/services/pageMetaService';
import { PageMetaResponse } from '@/types/pageMeta';
import { storage } from '@/utils/storage';
import { create } from 'zustand';

interface PageMetaState {
  // Current page meta
  currentMeta: PageMetaResponse | null;

  // Cached metas by key (url hoặc category id)
  cachedMetas: Map<string, PageMetaResponse>;

  // UI states
  loading: boolean;
  error: string | null;

  // Actions
  setCurrentMeta: (meta: PageMetaResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  fetchPageMeta: (params?: GetPageMetaParams) => Promise<void>;
  clearCache: () => void;

  // Storage
  pageMetaHydrate: () => Promise<void>;
  pageMetaRefresh: () => Promise<void>;
}

const STORAGE_KEY = 'PAGE_META_CACHE';

export const usePageMetaStore = create<PageMetaState>((set, get) => ({
  // Initial states
  currentMeta: null,
  cachedMetas: new Map(),
  loading: false,
  error: null,

  // Setters
  setCurrentMeta: (meta) => {
    // Cache by key
    const key = meta.key || meta.url;
    const newCachedMetas = new Map(get().cachedMetas);
    if (key) {
      newCachedMetas.set(key, meta);
    }

    set({
      currentMeta: meta,
      cachedMetas: newCachedMetas
    });
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Actions
  fetchPageMeta: async (params?: GetPageMetaParams) => {
    set({ loading: true, error: null });

    try {
      const meta = await pageMetaService.getJobPageMeta(params);
      get().setCurrentMeta(meta);

      set({
        loading: false,
        error: null
      });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch page meta',
        loading: false
      });
    }
  },

  clearCache: () => {
    set({
      cachedMetas: new Map(),
      currentMeta: null
    });
    storage.remove(STORAGE_KEY);
  },

  // Storage
  pageMetaHydrate: async () => {
    const cached = await storage.get<PageMetaResponse>(STORAGE_KEY);
    if (cached) {
      get().setCurrentMeta(cached);
    }
  },

  pageMetaRefresh: async () => {
    try {
      const { currentMeta } = get();
      if (!currentMeta) return;

      // Refresh với params hiện tại
      const params: GetPageMetaParams = {
        url: currentMeta.url,
        category_id: currentMeta.filters?.category_id?.id
      };

      await get().fetchPageMeta(params);

      // Lưu cache
      if (currentMeta.key) {
        await storage.set(STORAGE_KEY, currentMeta);
      }
    } catch (e) {
      console.warn('Refresh page meta failed', e);
    }
  },
}));

// Selectors Basic
export const useCurrentPageMeta = () => usePageMetaStore(state => state.currentMeta);
export const usePageMetaLoading = () => usePageMetaStore(state => state.loading);
export const usePageMetaError = () => usePageMetaStore(state => state.error);

// Custom selectors
export const usePageMetaSelectors = () => {
  const store = usePageMetaStore();

  return {
    // Get active filter
    getActiveFilter: () => store.currentMeta?.filters?.category_id,

    // Get breadcrumbs
    getBreadcrumbs: () => store.currentMeta?.breadcrumbs || [],

    // Get SEO data
    getSEOData: () => store.currentMeta?.seo,
  };
};
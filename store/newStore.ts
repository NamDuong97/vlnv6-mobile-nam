import { newsService } from '@/api/services/newServices';
import { create } from 'zustand';
import { Category, News, NewsFilters, NewsFormData } from '../types/news';

interface NewsState {
    news: News[];
    categories: Category[];
    selectedCategory: string | null;
    loading: boolean;
    error: string | null;
    total: number;

    // Actions
    setNews: (news: News[]) => void;
    addNews: (newsItem: News) => void;
    setCategories: (categories: Category[]) => void;
    setSelectedCategory: (category: string | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    fetchNews: (params: NewsFilters) => Promise<void>;
    createNews: (newsData: NewsFormData) => Promise<News | null>;
}

export const useNewsStore = create<NewsState>((set, get) => ({
    news: [],
    categories: [
        { id: '1', name: 'Tất cả', slug: 'all', icon: '📰' },
        { id: '2', name: 'Công nghệ', slug: 'technology', icon: '💻' },
        { id: '3', name: 'Kinh doanh', slug: 'business', icon: '💼' },
        { id: '4', name: 'Giải trí', slug: 'entertainment', icon: '🎬' },
        { id: '5', name: 'Thể thao', slug: 'sports', icon: '⚽' },
    ],
    selectedCategory: null,
    loading: false,
    error: null,
    total: 0,

    setNews: (news) => set({ news }),

    addNews: (newsItem) => set((state) => ({
        news: [newsItem, ...state.news]
    })),

    setCategories: (categories) => set({ categories }),

    setSelectedCategory: (category) => set({ selectedCategory: category }),

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),

    fetchNews: async (params) => {
        set({ loading: true, error: null });
        try {
            // Sử dụng service để call api lưu vào store
            const newNews = await newsService.getLatestNews(params);
            set({ news: newNews, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch news', loading: false });
        }
    },

    createNews: async (newsData: NewsFormData) => {
        set({ loading: true, error: null });

        try {
            const newNews = await newsService.createNews(newsData);

            // Thêm vào đầu danh sách
            set((state) => ({
                news: [newNews, ...state.news],
                total: state.total + 1,
                loading: false,
            }));

            return newNews;
        } catch (error: any) {
            set({
                error: error.message || 'Không thể tạo tin mới',
                loading: false
            });
            return null;
        }
    },
}));





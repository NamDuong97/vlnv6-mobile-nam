import { create } from 'zustand';
import { Category, News } from '../types/news';

interface NewsState {
    news: News[];
    categories: Category[];
    selectedCategory: string | null;
    loading: boolean;
    error: string | null;

    // Actions
    setNews: (news: News[]) => void;
    addNews: (newsItem: News) => void;
    setCategories: (categories: Category[]) => void;
    setSelectedCategory: (category: string | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    fetchNews: () => Promise<void>;
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

    setNews: (news) => set({ news }),

    addNews: (newsItem) => set((state) => ({
        news: [newsItem, ...state.news]
    })),

    setCategories: (categories) => set({ categories }),

    setSelectedCategory: (category) => set({ selectedCategory: category }),

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),

    fetchNews: async () => {
        set({ loading: true, error: null });
        try {
            // Giả lập API call
            const response = await fetch('https://api.example.com/news');
            const data = await response.json();
            set({ news: data, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch news', loading: false });
        }
    },
}));
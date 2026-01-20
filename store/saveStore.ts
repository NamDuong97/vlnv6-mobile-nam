import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { News } from '../types/news';

interface SavedState {
    savedNews: News[];
    toggleSave: (news: News) => void;
    isSaved: (id: string) => boolean;
    clearAll: () => void;
}

export const useSavedStore = create<SavedState>()(
    persist(
        (set, get) => ({
            savedNews: [],

            toggleSave: (news) => {
                const { savedNews } = get();
                const exists = savedNews.find(item => item.id === news.id);

                if (exists) {
                    set({ savedNews: savedNews.filter(item => item.id !== news.id) });
                } else {
                    set({ savedNews: [...savedNews, { ...news, saved: true }] });
                }
            },

            isSaved: (id) => {
                return get().savedNews.some(item => item.id === id);
            },

            clearAll: () => set({ savedNews: [] }),
        }),
        {
            name: 'saved-news-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
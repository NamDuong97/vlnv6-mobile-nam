import { News, NewsFilters, NewsFormData } from '@/types/news';
import { API_ENDPOINTS } from '../config/apiConstants';
import { apiGet, apiPost } from '../config/axiosClient';

const API_URL = 'https://newsapi.org/v2'; // Hoặc API của bạn
const API_KEY = 'a32ea7d27f7c48058fc92779f1f340cb';

export const newsService = {
    // Lấy tin tức mới nhất
    getLatestNews: async (params: NewsFilters = {}): Promise<News[]> => {
        try {
            return await apiGet<News[]>(API_ENDPOINTS.NEWS_LIST, params);
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error;
        }
    },

    // Ứng tuyển công việc
    createNews: async (newData: Partial<NewsFormData>): Promise<News> => {
        try {
            return apiPost<News>(API_ENDPOINTS.NEW_CREATE, newData);
        } catch (error) {
            console.error('Error create news:', error);
            throw error;
        }
    },
};



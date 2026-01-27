import { News, NewsFilters, NewsFormData } from '@/types/classified';
import { API_ENDPOINTS } from '../config/apiConstants';
import { apiGet, apiPost } from '../config/axiosClient';

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



import axios from 'axios';
import { News } from '../types/news';

const API_URL = 'https://newsapi.org/v2'; // Hoặc API của bạn
const API_KEY = 'a32ea7d27f7c48058fc92779f1f340cb';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const newsService = {
    // Lấy tin tức mới nhất
    getLatestNews: async (category?: string): Promise<News[]> => {
        try {
            const response = await api.get('/top-headlines', {
                params: {
                    country: 'us',
                    category: 'business',
                    apiKey: API_KEY,
                },
            });
            console.log(response.data.articles[0]);
            return response.data.articles.map((article: any) => ({
                id: article.url,
                title: article.title,
                description: article.description,
                content: article.content,
                category: category || 'general',
                imageUrl: article.urlToImage,
                author: article.author || 'Unknown',
                publishedAt: article.publishedAt,
                source: article.source.name,
                url: article.url,
            }));
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error;
        }
    },

    // Tìm kiếm tin tức
    searchNews: async (query: string): Promise<News[]> => {
        try {
            const response = await api.get('/everything', {
                params: {
                    q: query,
                    language: 'vi',
                    sortBy: 'publishedAt',
                    apiKey: API_KEY,
                },
            });
            return response.data.articles;
        } catch (error) {
            console.error('Error searching news:', error);
            throw error;
        }
    },
};



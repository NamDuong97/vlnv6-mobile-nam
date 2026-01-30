// api/services/pageMetaService.ts
import { API_ENDPOINTS } from '@/api/config/apiConstants';
import { apiGet } from '@/api/config/axiosClient';
import { SeoJobHome } from '@/types/seo';

export const seoService = {
    // Lấy seo
    getSeoJobHome: async (): Promise<SeoJobHome> => {
        const response = await apiGet<SeoJobHome>(API_ENDPOINTS.SEO_JOB_HOME);
        return response;
    },
};


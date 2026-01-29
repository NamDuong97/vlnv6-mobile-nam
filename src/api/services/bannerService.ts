// api/services/bannerService.ts
import { API_ENDPOINTS } from '@/api/config/apiConstants';
import { apiGet } from '@/api/config/axiosClient';
import { Banner } from '@/types/banner';

export interface GetBannerParams {
    offset?: number;
    limit?: number;
    position?: string;
}

export const bannerService = {
    // Lấy banner home (nếu có endpoint riêng)
    getHomeBanners: async (): Promise<Banner[]> => {
        return apiGet<Banner[]>(API_ENDPOINTS.BANNERS_HOME);
    },
};
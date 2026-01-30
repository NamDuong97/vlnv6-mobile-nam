// api/services/commonService.ts
import { API_ENDPOINTS } from '@/api/config/apiConstants';
import { apiGet } from '@/api/config/axiosClient';
import { FooterLinks } from '@/types/common';

export const commonService = {
    // Lấy footer links
    getFooter: async (): Promise<FooterLinks> => {
        const response = await apiGet<FooterLinks>(API_ENDPOINTS.COMMON_FOOTER);
        return response;
    },
};
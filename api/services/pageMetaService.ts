// api/services/pageMetaService.ts
import { API_ENDPOINTS } from '@/api/config/apiConstants';
import { apiGet } from '@/api/config/axiosClient';
import { GetPageMetaParams, PageMetaResponse } from '@/types/pageMeta';

export const pageMetaService = {
  // Lấy page meta cho trang tuyển dụng
  getJobPageMeta: async (params?: GetPageMetaParams): Promise<PageMetaResponse> => {
    const response = await apiGet<PageMetaResponse>(API_ENDPOINTS.GETPAGEMETA);
    return response;
  },
};

export { GetPageMetaParams };


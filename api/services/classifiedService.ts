// api/services/classifiedService.ts
import { API_ENDPOINTS } from '@/api/config/apiConstants';
import { apiGet, withErrorHandling } from '@/api/config/axiosClient';
import { ClassifiedItem, ClassifiedListResponse, GetClassifiedsParams, JobByCompanyListResponse, LatestJobListResponse } from '@/types/classified';

export const classifiedService = {
    // Việc làm nổi bật
    getFeaturedJobs: async (params?: GetClassifiedsParams): Promise<ClassifiedListResponse> => {
        const response = await apiGet<ClassifiedListResponse>(
            API_ENDPOINTS.CLASSIFIED_FEATURED,
            params
        );
        return response;
    },

    // Việc làm mới nhất
    getLatestJobs: async (params?: GetClassifiedsParams): Promise<LatestJobListResponse> => {
        const response = await apiGet<LatestJobListResponse>(
            API_ENDPOINTS.CLASSIFIED_LATEST,
            params
        );
        return response;
    },

    // Việc làm từ doanh nghiệp
    getCompanyJobs: async (params?: GetClassifiedsParams): Promise<JobByCompanyListResponse> => {
        const response = await apiGet<JobByCompanyListResponse>(
            API_ENDPOINTS.CLASSIFIED_COMPANY,
            params
        );
        return response;
    },

    // Chi tiết công việc
    getJobDetail: async (id: number): Promise<ClassifiedItem> => {
        const response = await apiGet<ClassifiedItem>(
            `/job/v1/jobs/${id}`
        );
        return response;
    },

    // Tìm kiếm việc làm
    searchJobs: async (query: string, params?: GetClassifiedsParams): Promise<ClassifiedListResponse> => {
        const response = await apiGet<ClassifiedListResponse>(
            '/job/v1/jobs/search',
            { ...params, q: query }
        );
        return response;
    },

    // ========== SAFE METHODS ==========

    getFeaturedJobsSafe: async (
        params?: GetClassifiedsParams,
        onError?: (error: any) => void
    ): Promise<ClassifiedListResponse | null> => {
        const result = await withErrorHandling<ClassifiedListResponse>(
            () => classifiedService.getFeaturedJobs(params),
            onError
        );
        return result;
    },

    getLatestJobsSafe: async (
        params?: GetClassifiedsParams,
        onError?: (error: any) => void
    ): Promise<LatestJobListResponse | null> => {
        const result = await withErrorHandling<LatestJobListResponse>(
            () => classifiedService.getLatestJobs(params),
            onError
        );
        return result;
    },

    getCompanyJobsSafe: async (
        params?: GetClassifiedsParams,
        onError?: (error: any) => void
    ): Promise<JobByCompanyListResponse | null> => {
        const result = await withErrorHandling<JobByCompanyListResponse>(
            () => classifiedService.getCompanyJobs(params),
            onError
        );
        return result;
    },
};
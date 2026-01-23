import { API_ENDPOINTS } from '@/api/config/apiConstants';
import { apiDelete, apiGet, apiPost, withErrorHandling } from '@/api/config/axiosClient';
import { JobApplication, PaginationParams } from '@/types';
import { ApplyJobResponse, JobDetailResponse, JobFilters, JobsResponse } from '@/types/jobs';

// Job service
export const jobService = {
    // Lấy danh sách công việc
    getJobs: async (params: JobFilters = {}): Promise<JobsResponse> => {
        return apiGet<JobsResponse>(API_ENDPOINTS.JOBS_LIST, params);
    },

    // Lấy chi tiết công việc
    getJobDetail: async (id: string | number): Promise<JobDetailResponse> => {
        return apiGet<JobDetailResponse>(API_ENDPOINTS.JOB_DETAIL(id));
    },

    // Tìm kiếm công việc
    searchJobs: async (
        keyword: string,
        filters: Partial<JobFilters> = {}
    ): Promise<JobsResponse> => {
        return apiGet<JobsResponse>(API_ENDPOINTS.SEARCH_JOBS, { keyword, ...filters });
    },

    // Ứng tuyển công việc
    applyJob: async (
        jobId: string | number,
        applicationData: Partial<JobApplication>
    ): Promise<ApplyJobResponse> => {
        return apiPost<ApplyJobResponse>(API_ENDPOINTS.APPLY_JOB(jobId), applicationData);
    },

    // Lưu công việc yêu thích
    saveJob: async (jobId: string | number): Promise<{ success: boolean; message: string }> => {
        return apiPost<{ success: boolean; message: string }>(API_ENDPOINTS.SAVE_JOB(jobId));
    },

    // Bỏ lưu công việc
    unsaveJob: async (jobId: string | number): Promise<{ success: boolean; message: string }> => {
        return apiDelete<{ success: boolean; message: string }>(API_ENDPOINTS.SAVE_JOB(jobId));
    },

    // Lấy danh sách công việc đã lưu
    getSavedJobs: async (params: PaginationParams = {}): Promise<JobsResponse> => {
        return apiGet<JobsResponse>(API_ENDPOINTS.SAVED_JOBS, params);
    },

    // Lấy danh sách công việc đã ứng tuyển
    getAppliedJobs: async (params: PaginationParams = {}): Promise<JobsResponse> => {
        return apiGet<JobsResponse>(API_ENDPOINTS.APPLIED_JOBS, params);
    },

    // Lấy công việc đề xuất
    getRecommendedJobs: async (params: PaginationParams = {}): Promise<JobsResponse> => {
        return apiGet<JobsResponse>(API_ENDPOINTS.RECOMMENDED_JOBS, params);
    },

    // Lấy công việc hot
    getHotJobs: async (params: PaginationParams = {}): Promise<JobsResponse> => {
        return apiGet<JobsResponse>(API_ENDPOINTS.HOT_JOBS, params);
    },

    // Safe methods với error handling
    getJobsSafe: async (
        params: JobFilters = {},
        onError?: (error: any) => void
    ): Promise<JobsResponse | null> => {
        return withErrorHandling(() => jobService.getJobs(params), onError);
    },

    getJobDetailSafe: async (
        id: string | number,
        onError?: (error: any) => void
    ): Promise<JobDetailResponse | null> => {
        return withErrorHandling(() => jobService.getJobDetail(id), onError);
    },
};
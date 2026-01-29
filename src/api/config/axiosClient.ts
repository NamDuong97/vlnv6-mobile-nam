import { API_BASE_URL, API_TIMEOUT } from '@/api/config/apiConstants';
import { setupInterceptors } from '@/api/config/interceptors';
import { ApiError, ApiResponse } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Extend AxiosRequestConfig với custom config
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
    skipAuth?: boolean;
}

// Tạo instance axios chính
const axiosClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Thiết lập interceptors
setupInterceptors(axiosClient);

// Helper function để lấy token
export const getAuthToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem('access_token');
        return token;
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};

// Helper function để set token cho request
export const setAuthHeader = async (config: CustomAxiosRequestConfig): Promise<CustomAxiosRequestConfig> => {
    // Skip auth nếu config yêu cầu
    if (config.skipAuth) {
        return config;
    }

    const token = await getAuthToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

// Generic API methods với TypeScript
export const apiGet = async <T = any>(
    url: string,
    params?: Record<string, any>,
    config: CustomAxiosRequestConfig = {}
): Promise<T> => {
    const finalConfig = await setAuthHeader(config);
    const response = await axiosClient.get(url, {
        params,
        ...finalConfig
    });
    return response.data;
};

// Raw axios methods (trả về full response)
export const rawApiGet = async <T = any>(
    url: string,
    params?: Record<string, any>,
    config: CustomAxiosRequestConfig = {}
): Promise<AxiosResponse<ApiResponse<T>>> => {
    const finalConfig = await setAuthHeader(config);
    return axiosClient.get(url, { params, ...finalConfig });
};

export const apiPost = async <T = any, D = any>(
    url: string,
    data?: D,
    config: CustomAxiosRequestConfig = {}
): Promise<T> => {
    const finalConfig = await setAuthHeader(config);
    const response: AxiosResponse<ApiResponse<T>> = await axiosClient.post(url, data, finalConfig);
    return response.data.data;
};

export const apiPut = async <T = any, D = any>(
    url: string,
    data?: D,
    config: CustomAxiosRequestConfig = {}
): Promise<T> => {
    const finalConfig = await setAuthHeader(config);
    const response: AxiosResponse<ApiResponse<T>> = await axiosClient.put(url, data, finalConfig);
    return response.data.data;
};

export const apiPatch = async <T = any, D = any>(
    url: string,
    data?: D,
    config: CustomAxiosRequestConfig = {}
): Promise<T> => {
    const finalConfig = await setAuthHeader(config);
    const response: AxiosResponse<ApiResponse<T>> = await axiosClient.patch(url, data, finalConfig);
    return response.data.data;
};

export const apiDelete = async <T = any>(
    url: string,
    config: CustomAxiosRequestConfig = {}
): Promise<T> => {
    const finalConfig = await setAuthHeader(config);
    const response: AxiosResponse<ApiResponse<T>> = await axiosClient.delete(url, finalConfig);
    return response.data.data;
};

// Upload file type
export interface UploadFile {
    uri: string;
    type?: string;
    name?: string;
}

// Upload file method
export const apiUpload = async <T = any>(
    url: string,
    file: UploadFile,
    fieldName: string = 'file',
    config: CustomAxiosRequestConfig = {}
): Promise<T> => {
    const formData = new FormData();
    formData.append(fieldName, {
        uri: file.uri,
        type: file.type || 'image/jpeg',
        name: file.name || 'photo.jpg',
    } as any);

    const finalConfig = await setAuthHeader({
        ...config,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    const response: AxiosResponse<ApiResponse<T>> = await axiosClient.post(url, formData, finalConfig);
    return response.data.data;
};

export const rawApiPost = async <T = any, D = any>(
    url: string,
    data?: D,
    config: CustomAxiosRequestConfig = {}
): Promise<AxiosResponse<ApiResponse<T>>> => {
    const finalConfig = await setAuthHeader(config);
    return axiosClient.post(url, data, finalConfig);
};

// Error handling wrapper
export const withErrorHandling = async <T>(
    apiCall: () => Promise<T>,
    onError?: (error: ApiError) => void
): Promise<T | null> => {
    try {
        return await apiCall();
    } catch (error) {
        const apiError = error as ApiError;

        if (onError) {
            onError(apiError);
        } else {
            console.error('API Error:', apiError);
        }

        return null;
    }
};

export default axiosClient;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_ENDPOINTS } from './apiConstants';
import { getAuthToken } from './axiosClient';

// Types
interface FailedQueueItem {
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
}

interface RefreshTokenResponse {
    access_token: string;
    refresh_token?: string;
}

interface ErrorResponseData {
    message?: string;
    errors?: any;
    [key: string]: any;
}

// Global variables
let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: any, token: string | null = null): void => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Helper function để lấy refresh token
export const getRefreshToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem('refresh_token');
        return token;
    } catch (error) {
        console.error('Error getting refresh token:', error);
        return null;
    }
};

// Main interceptors setup function
export const setupInterceptors = (axiosInstance: AxiosInstance): void => {
    // REQUEST INTERCEPTOR
    axiosInstance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            // Thêm timestamp để tránh cache
            if (config.method?.toLowerCase() === 'get' && config.params) {
                config.params = {
                    ...config.params,
                    _t: Date.now(),
                };
            }

            // Thêm authorization token
            const token = await getAuthToken();
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            // Log request (chỉ trong dev)
            // if (__DEV__) {
            //     console.log('API Request:', {
            //         url: config.url,
            //         method: config.method,
            //         params: config.params,
            //         data: config.data,
            //     });
            // }

            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    // RESPONSE INTERCEPTOR
    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            // Log response (chỉ trong dev)
            // if (__DEV__) {
            //     console.log('API Response:', {
            //         url: response.config.url,
            //         status: response.status,
            //         data: response.data,
            //     });
            // }

            return response;
        },
        async (error: AxiosError<ErrorResponseData>) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
            // Log error (chỉ trong dev)
            // if (__DEV__) {
            //     console.error('API Error:', {
            //         url: originalRequest?.url,
            //         status: error.response?.status,
            //         message: error.message,
            //         data: error.response?.data,
            //     });
            // }

            // Xử lý token hết hạn (401)
            if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
                if (isRefreshing) {
                    // Nếu đang refresh token, đợi
                    return new Promise<any>((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        // Nếu promise thành công thì thực hiện then, thất bại thực hiện catch
                        .then((token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return axiosInstance(originalRequest);
                        })
                        .catch(err => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    // Lấy refresh token
                    const refreshToken = await getRefreshToken();

                    if (!refreshToken) {
                        throw new Error('No refresh token available');
                    }

                    // Gọi API refresh token
                    const response = await axiosInstance.post<RefreshTokenResponse>(
                        API_ENDPOINTS.REFRESH_TOKEN,
                        { refresh_token: refreshToken }
                    );

                    const { access_token, refresh_token: newRefreshToken } = response.data;

                    // Lưu token mới
                    await AsyncStorage.setItem('access_token', access_token);
                    if (newRefreshToken) {
                        await AsyncStorage.setItem('refresh_token', newRefreshToken);
                    }

                    // Cập nhật header
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${access_token}`;
                    }

                    // Process queue
                    processQueue(null, access_token);

                    // Thử lại request gốc
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    // Nếu refresh thất bại, logout user
                    processQueue(refreshError, null);

                    // Xóa token
                    await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user_data']);

                    // Navigate về login (cần tích hợp navigation)
                    // Ví dụ: navigationRef.navigate('Auth', { screen: 'Login' });

                    // Tạo error object
                    const apiError = {
                        message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
                        code: 401,
                        originalError: refreshError,
                    };

                    return Promise.reject(apiError);
                } finally {
                    isRefreshing = false;
                }
            }

            // Xử lý các lỗi khác
            const errorData = error.response?.data;

            // Tạo error object chuẩn
            const apiError = {
                message: errorData?.message || error.message || 'Đã có lỗi xảy ra',
                code: error.response?.status || 0,
                data: errorData?.errors || errorData,
                originalError: error,
            };

            // Hiển thị thông báo lỗi (tuỳ chọn)
            if (error.response?.status !== 401) {
                // showToast(apiError.message, 'error');
            }

            return Promise.reject(apiError);
        }
    );
};
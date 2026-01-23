// Base URLs
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.yourdomain.com/api/v1';
export const API_TIMEOUT = 30000; // 30 seconds

// API Endpoints
export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/auth/sign-in',
    REGISTER: '/auth/sign-up',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_OTP: '/auth/verify-otp',

    // User
    USER_PROFILE: '/users/profile',
    USER_UPDATE: '/users/update',
    USER_CHANGE_PASSWORD: '/users/change-password',

    // Jobs
    JOBS_LIST: '/jobs',
    JOB_DETAIL: (id: string | number) => `/jobs/${id}`,
    APPLY_JOB: (id: string | number) => `/jobs/${id}/apply`,
    SAVE_JOB: (id: string | number) => `/jobs/${id}/save`,
    SEARCH_JOBS: '/jobs/search',
    SAVED_JOBS: '/jobs/saved',
    APPLIED_JOBS: '/jobs/applied',
    RECOMMENDED_JOBS: '/jobs/recommended',
    HOT_JOBS: '/jobs/hot',

    // Companies
    COMPANIES_LIST: '/companies',
    COMPANY_DETAIL: (id: string | number) => `/companies/${id}`,

    // Upload
    UPLOAD: '/upload',

    // News
    NEWS_LIST: '/news',
    NEW_CREATE: '/new/create'
} as const;


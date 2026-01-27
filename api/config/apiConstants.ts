// Base URLs
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL2
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

    // Organization
    ORG_LIST: '/job/v1/organizations/listing',
    ORG_OUTSTANDING: '/job/v1/organizations/outstanding',

    // Upload
    UPLOAD: '/upload',

    // Classified
    CLASSIFIED_FEATURED: '/listing/v1/jobclassifieds/topads?site_id=3&category_id=3&limit=6&offset=0&page_type=home',
    CLASSIFIED_LATEST: '/job/v1/classifieds/latest?limit=9&offset=0',
    CLASSIFIED_COMPANY: '/job/v1/classifieds/enterprise?limit=9&offset=0',

    //Citys
    CITIES: '/job/v1/cities/config',
} as const;


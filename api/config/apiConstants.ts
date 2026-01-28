// Base URLs
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL2
export const API_TIMEOUT = 30000; // 30 seconds

export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/auth/sign-in',
    REGISTER: '/auth/sign-up',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_OTP: '/auth/verify-otp',

    // Organization
    ORG_LIST: '/job/v1/organizations/listing',
    ORG_OUTSTANDING: '/job/v1/organizations/outstanding',

    // Classified
    CLASSIFIED_FEATURED: '/listing/v1/jobclassifieds/topads?site_id=3&category_id=3&limit=6&offset=0&page_type=home',
    CLASSIFIED_LATEST: '/job/v1/classifieds/latest?limit=9&offset=0',
    CLASSIFIED_COMPANY: '/job/v1/classifieds/enterprise?limit=9&offset=0',

    //Citys
    CITIES: '/job/v1/cities/config',

    // PageMeta
    GETPAGEMETA: '/listing/v1/jobfilters/values?category_id=2&subcategory_id=3'
} as const;


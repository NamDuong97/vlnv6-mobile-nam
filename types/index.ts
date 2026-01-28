// types/index.ts - type chung cho toàn dự án
export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  jobCount: number;
  isVerified?: boolean;
}

export interface Tag {
  id: string;
  name: string;
  icon?: string;
}

// Types cho API response
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

// HTTP Status Codes
export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// Error types
export interface ApiError {
  message: string;
  code: number;
  data?: any;
  originalError?: any;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  phone?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export interface JobApplication {
  jobId: string;
  resume?: string;
  coverLetter?: string;
  additionalInfo?: string;
}
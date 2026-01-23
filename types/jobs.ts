import { IconKey, PaginationParams } from ".";

export interface JobCategory {
    id: string;
    name: string;
    icon: IconKey;
    jobCount?: number;
    color?: string;
    isHot?: boolean;
}

export interface Job {
    id: string;
    title: string;
    company: string;
    companyLogo?: string;
    salary: string;
    location: string;
    timePosted: string;
    isHot?: boolean;
    isUrgent?: boolean;
    jobCount?: number;
}

export interface JobsResponse {
    jobs: Job[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface JobDetailResponse {
    job: Job;
    similarJobs: Job[];
    isSaved: boolean;
    isApplied: boolean;
}

export interface ApplyJobResponse {
    success: boolean;
    applicationId: string;
    message: string;
}

export interface JobFilters extends PaginationParams {
    keyword?: string;
    location?: string;
    category?: string;
    salaryMin?: number;
    salaryMax?: number;
    employmentType?: string[];
    experienceLevel?: string[];
}
// types/classified.ts

import { PaginationParams } from ".";

export interface JobOrg {
  id: number;
  name?: string; // Có thể không có name
  logo?: string; // Có thể không có logo
  is_partner: boolean;
  org_level: number;
}

// Interface cho việc làm nổi bật
export interface ClassifiedItem {
  site_id: number;
  id: number;
  user_id: number;
  city_id: number;
  district_id: number;
  category_id: number;
  subcategory_id: number;
  category_ids: number[];
  job_types: number[];
  title: string;
  covers: string[];
  total_images: number;
  price: number;
  price_display: string;
  url: string;
  service_id: number;
  service_end: string;
  publish_at: string;
  publish_display: string;
  location: string;
  is_company: boolean;
  org: JobOrg;
  sort: number;
  job_sort: number;
  is_expired: boolean;
}

// Interface cho response từ API
export interface ClassifiedListResponse {
  has_next: boolean;
  total: number;
  next_total: number;
  items: ClassifiedItem[];
}

export interface GetClassifiedsParams extends PaginationParams {
  page?: number;
  category_id?: number;
  city_id?: number;
  district_id?: number;
  q?: string;
  job_type?: number;
  is_company?: boolean;
  org_id?: number;
}

// type cho việc làm của công ty
export interface JobByCompanyItem {
  id: number;
  user_id: number;
  city_id: number;
  district_id: number;
  category_id: number;
  subcategory_id: number;
  category_ids: number[];
  job_types: number[];
  title: string;
  covers?: string[]; // Optional
  total_images: number;
  price: number;
  price_display: string;
  url: string;
  service_id: number;
  service_ids: number[];
  publish_at: string;
  publish_display: string;
  service_end: string;
  location: string;
  company_name: string;
  company_image?: string; // Optional
  is_partner: boolean;
  org_id: number;
  org_level: number;
  experience: number; // ID của kinh nghiệm
  sort: number;
  job_sort: number;
  is_expired: boolean;
  is_company: boolean;
}

// Interface cho response từ API
export interface JobByCompanyListResponse {
  total: number;
  items: JobByCompanyItem[];
}

// type cho việc làm mới nhất
export interface LatestJobItem {
  id: number;
  user_id: number;
  city_id: number;
  district_id: number;
  category_id: number;
  subcategory_id: number;
  category_ids: number[];
  is_company: boolean;
  job_types: number[];
  title: string;
  covers?: string[];
  total_images: number;
  price: number;
  price_display: string;
  url: string;
  service_id: number;
  service_ids: number[];
  publish_at: string;
  publish_display: string;
  service_end: string;
  location: string;
  is_partner: boolean;
  org_id: number;
  org_level: number;
  experience: number;
  sort: number;
  job_sort: number;
  is_expired: boolean;
  // Optional fields
  site_id?: number;
  org?: {
    id: number;
    name?: string;
    logo?: string;
    is_partner: boolean;
    org_level: number;
  };
  company_name?: string;
  company_image?: string;
}

// Interface cho response từ API
export interface LatestJobListResponse {
  total: number;
  items: LatestJobItem[];
}

// type sài chung 
export interface UnifiedJobItem {
  // Core information
  id: number;
  title: string;
  price: number;
  price_display: string;
  location: string;
  url: string;

  // Company information
  company_name: string;
  company_logo?: string;
  is_company: boolean;
  is_partner: boolean;
  org_level: number;
  org_id: number;

  // Job details
  category_id: number;
  subcategory_id: number;
  category_ids: number[];
  job_types: number[];
  experience: number;

  // Media
  covers: string[];
  total_images: number;
  has_images: boolean;
  first_image?: string;

  // Timing
  publish_at: string;
  publish_display: string;
  service_end: string;
  is_recent: boolean;
  is_expired: boolean;

  // Location
  city_id: number;
  district_id: number;

  // User
  user_id: number;

  // Service
  service_id: number;
  service_ids: number[];

  // Sorting
  sort: number;
  job_sort: number;

  // Optional original fields
  site_id?: number;

  // Helper fields
  display_price: string;
  display_experience: string;
  display_job_type: string;
  is_featured: boolean;
  is_latest: boolean;
  is_company_job: boolean;
}
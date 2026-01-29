// types/pageMeta.ts
export interface GetPageMetaParams {
  url?: string;
  category_id?: number;
  subcategory_id?: number;
  [key: string]: any;
}

// Category item type 
export interface CategoryItem {
    id: number;
    name: string;
    url: string;
    bc: number;
    icon_pos: {
        x: string;
        y: string;
    };
    hot?: boolean;
    is_hot?: boolean;
    total?: number; // Optional - số lượng job trong category
}

// Filter type
export interface FilterItem {
    id: number;
    value: string;
}

export interface Filters {
    subcategory_id: FilterItem;
    category_id: FilterItem;
    // Có thể có thêm filters khác
    [key: string]: FilterItem;
}

// Breadcrumb type
export interface BreadcrumbItem {
    url: string;
    name: string;
}

// SEO type
export interface SEOData {
    id: number;
    hash: number;
    key: string;
}

// Main page meta type
export interface PageMetaResponse {
    url: string;
    sub_url: string;
    query: string;
    key: string;
    key_query: string;
    key_breadcrumb: string;
    filters: Filters;
    breadcrumbs: BreadcrumbItem[];
    links: CategoryItem[];
    seo: SEOData;
    version: string;
}

// Type cho phân trang (nếu có)
export interface PaginationMeta {
    current_page?: number;
    total_pages?: number;
    total_items?: number;
    per_page?: number;
}

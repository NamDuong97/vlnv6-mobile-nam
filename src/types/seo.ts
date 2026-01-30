// types/seo.ts

export interface SeoJobHome {
    id: number;
    title: string;
    head_title: string;
    keyword: string;
    description: string;
    footer: string; // HTML content
    canonical: string;
    is_view_more: boolean;
    message: string; // e.g., "0 ms"
    keywords_array?: string[]; // Từ keyword string
}
// types/banner.ts

export interface Banner {
    id: number;
    code: string; // Có thể là literal type nếu biết các giá trị cụ thể
    name: string;
    title: string;
    url: string;
    ga_category: '' | string; // Empty string hoặc string
    ga_action: '' | string;
    no_follow: boolean;
    target_blank: boolean;
    media_type: 'image' | 'video' | 'html' | 'script';
    media_url: string;
    media_tablet_url: string;
    media_mobile_url: string;
    width: number;
    height: number;
    src: string;
    src_set: string;
}

// Type cho response API
export interface BannerListResponse {
    data: Banner[];
}
export interface News {
    id: string;
    title: string;
    description: string;
    content: string;
    category: string;
    imageUrl: string;
    author: string;
    publishedAt: string;
    source: string;
    url: string;
    saved?: boolean;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    icon: string;
}

export interface NewsFormData {
    title: string;
    content: string;
    category: string;
    imageUrl?: string;
    tags?: string[];
    isFeatured?: boolean;
    isHot?: boolean;
}

export interface NewsFilters {

}
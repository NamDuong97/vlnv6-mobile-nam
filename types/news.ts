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
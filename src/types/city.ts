export type CitiesResponse = {
    [key: string]: City; // key là string id (ví dụ: "0", "30", "363")
};

export interface City {
    id: number;
    parent: number;
    name: string;
    childs: number[];
    code?: string;
    slug?: string;
    type?: 'province' | 'district' | 'ward';
    level?: 1 | 2 | 3;
    order?: number;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface CityFilters {
    parent?: number;
    type?: City['type'];
    is_active?: boolean;
    search?: string;
    page?: number;
    limit?: number;
}
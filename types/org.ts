export interface OrganizationItem {
    cache_expired: string;
    id: number;
    tax_code: string;
    name: string;
    logo: string;
    industries: string;
    jobs: number;
    is_partner: boolean;
    org_level: number;
}

export interface OrganizationListResponse {
    total: number;
    items: OrganizationItem[];
}

export interface GetOrganizationParams {
    offset?: number;
    limit?: number;
}
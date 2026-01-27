// api/services/cityService.ts
import { API_ENDPOINTS } from '@/api/config/apiConstants';
import { apiGet } from '@/api/config/axiosClient';
import { GetOrganizationParams, OrganizationListResponse } from '@/types/org';


export const orgService = {

    //Lấy organizations outstanding với cache
    getOrganizationsOutstanding: async (params: GetOrganizationParams = { offset: 0, limit: 18 }): Promise<OrganizationListResponse> => {
        return apiGet<OrganizationListResponse>(API_ENDPOINTS.ORG_OUTSTANDING, params);
    },

    //Lấy danh sách organizations
    getOrganizationList: async (params: GetOrganizationParams = {}): Promise<OrganizationListResponse> => {
        return apiGet<OrganizationListResponse>(API_ENDPOINTS.ORG_LIST, params);
    },
}
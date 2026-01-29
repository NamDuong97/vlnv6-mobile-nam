// api/services/cityService.ts
import { API_ENDPOINTS } from '@/api/config/apiConstants';
import { apiGet, withErrorHandling } from '@/api/config/axiosClient';
import { CitiesResponse } from '@/types/city';

export const cityService = {
    // Lấy tất cả cities 
    getAllCities: async (): Promise<CitiesResponse> => {
        return apiGet<CitiesResponse>(API_ENDPOINTS.CITIES);
    },

    // Safe method
    getAllCitiesSafe: async (
        onError?: (error: any) => void
    ): Promise<CitiesResponse | null> => {
        return withErrorHandling(() => cityService.getAllCities(), onError);
    },
};
// stores/org.store.ts
import { orgService } from '@/api/services/orgService';
import { OrganizationItem, OrganizationListResponse } from '@/types/org';
import { storage } from '@/utils/storage';
import { create } from 'zustand';

interface OrgState {
    orgsMap: { [id: number]: OrganizationItem };
    orgsList: OrganizationItem[];
    orgsOutstanding: OrganizationItem[];
    selectedOrgId: number | null;
    loading: boolean;
    error: string | null;
    initialized: boolean;
    hydrated: boolean;
    total: number;

    setOrgsMap: (response: OrganizationListResponse) => void;
    setSelectedOrgId: (orgId: number | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setInitialized: (initialized: boolean) => void;
    getOrgById: (id: number) => OrganizationItem | undefined;
    getSelectedOrg: () => OrganizationItem | undefined;
    orgHydrate: () => Promise<void>;
    orgRefresh: () => Promise<void>;
    fetchOrganizationOutstanding: (param?: any) => Promise<void>;
}

const STORAGE_KEY = 'ORG_OUTSTANDING';

export const useOrgStore = create<OrgState>((set, get) => ({
    orgsMap: {},
    orgsList: [],
    orgsOutstanding: [],
    selectedOrgId: null,
    loading: false,
    error: null,
    initialized: false,
    hydrated: false,
    total: 0,

    setOrgsMap: (response: OrganizationListResponse) => {
        const orgsMap: { [id: number]: OrganizationItem } = {};

        response.items.forEach(org => {
            orgsMap[org.id] = org;
        });

        set({
            orgsMap,
            orgsList: response.items,
            total: response.total
        });
    },

    setSelectedOrgId: (orgId) => set({ selectedOrgId: orgId }),

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),

    setInitialized: (initialized) => set({ initialized }),

    getOrgById: (id: number) => {
        return get().orgsMap[id];
    },

    getSelectedOrg: () => {
        const { selectedOrgId, orgsMap } = get();
        return selectedOrgId !== null ? orgsMap[selectedOrgId] : undefined;
    },

    orgHydrate: async () => {
        const response = await storage.get<OrganizationListResponse>(STORAGE_KEY);
        const orgsOutstanding = response?.items;
        if (orgsOutstanding) {
            set({ orgsOutstanding: orgsOutstanding })
        }
        set({ hydrated: true });
    },

    orgRefresh: async () => {
        try {
            const response = await orgService.getOrganizationsOutstanding();
            const orgsOutstanding = response?.items;
            if (orgsOutstanding) {
                set({ orgsOutstanding: orgsOutstanding, loading: false, error: null })
            }
            await storage.set(STORAGE_KEY, orgsOutstanding);
        } catch (e) {
            console.warn('Fetch organizations failed', e);
        }
    },

    fetchOrganizationOutstanding: async (param: any) => {
        set({ loading: true, error: null });

        try {
            const response = await orgService.getOrganizationsOutstanding(param);
            const org = response.items;
            if (org) {
                set({
                    orgsOutstanding: org,
                    loading: false,
                    error: null
                });
            }
        } catch (error: any) {
            set({
                error: error.message || 'Failed to fetch organization outstanding',
                loading: false
            });
        }
    },
}));

// Selectors Basic
export const useOrgsMap = () => useOrgStore(state => state.orgsMap);
export const useOrgsList = () => useOrgStore(state => state.orgsList);
export const useOrgsOutstanding = () => useOrgStore(state => state.orgsOutstanding);
export const useSelectedOrgId = () => useOrgStore(state => state.selectedOrgId);
export const useOrgLoading = () => useOrgStore(state => state.loading);
export const useOrgError = () => useOrgStore(state => state.error);
export const useOrgInitialized = () => useOrgStore(state => state.initialized);
export const useOrgHydrated = () => useOrgStore(state => state.hydrated);
export const useTotalOrgs = () => useOrgStore(state => state.total);

// Custom selectors
export const useOrgSelectors = () => {
    const store = useOrgStore();

    return {
        // Get org by ID
        getOrgById: (id: number) => store.getOrgById(id),

        // Get selected org
        getSelectedOrg: () => store.getSelectedOrg(),

        // Filter orgs by industry
        getOrgsByIndustry: (industry: string) =>
            store.orgsList.filter(org => org.industries.includes(industry)),

        // Get partner orgs
        getPartnerOrgs: () =>
            store.orgsList.filter(org => org.is_partner),

        // Search orgs locally
        searchOrgs: (query: string) =>
            store.orgsList.filter(org =>
                org.name.toLowerCase().includes(query.toLowerCase())
            ),

        // Get orgs with jobs
        getOrgsWithJobs: () =>
            store.orgsList.filter(org => org.jobs > 0),

        // Check if org exists
        orgExists: (id: number) => !!store.getOrgById(id),

        // Get orgs by org level
        getOrgsByLevel: (level: number) =>
            store.orgsList.filter(org => org.org_level === level),
    };
};
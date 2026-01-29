// stores/classified.store.ts
import { classifiedService } from '@/api/services/classifiedService';
import { ClassifiedItem, UnifiedJobItem } from '@/types/classified';
import { mapClassifiedToUnified, mapJobByCompanyToUnified, mapLatestJobToUnified } from '@/utils/mappingType';
import { storage } from '@/utils/storage';
import { create } from 'zustand';

interface ClassifiedState {
    // Data states
    featuredJobs: UnifiedJobItem[];
    latestJobs: UnifiedJobItem[];
    companyJobs: UnifiedJobItem[];
    jobsMap: { [id: number]: any };

    // UI states
    loading: boolean;
    error: string | null;
    initialized: boolean;
    hydrated: boolean;
    totalFeaturedJobs: number;
    totalLatestJobs: number;
    totalCompanyJobs: number;

    // Setters
    setFeaturedJobs: (jobs: UnifiedJobItem[]) => void;
    setLatestJobs: (jobs: UnifiedJobItem[]) => void;
    setCompanyJobs: (jobs: UnifiedJobItem[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setInitialized: (initialized: boolean) => void;

    // Actions
    fetchFeaturedJobs: () => Promise<void>;
    fetchLatestJobs: () => Promise<void>;
    fetchCompanyJobs: () => Promise<void>;

    // Utilities
    getJobById: (id: number) => ClassifiedItem | undefined;
    hasCompany: (job: ClassifiedItem) => boolean;

    // Storage
    classifiedHydrate: () => Promise<void>;
    classifiedRefresh: () => Promise<void>;
}

const STORAGE_KEYS = {
    FEATURED: 'CLASSIFIED_FEATURED',
    LATEST: 'CLASSIFIED_LATEST',
    COMPANY: 'CLASSIFIED_COMPANY'
};

export const useClassifiedStore = create<ClassifiedState>((set, get) => ({
    // Initial states
    featuredJobs: [],
    latestJobs: [],
    companyJobs: [],
    jobsMap: {},
    loading: false,
    error: null,
    initialized: false,
    hydrated: false,
    totalFeaturedJobs: 0,
    totalLatestJobs: 0,
    totalCompanyJobs: 0,

    // Setters
    setFeaturedJobs: (jobs) => {
        // Update jobsMap
        const newJobsMap = { ...get().jobsMap };
        jobs.forEach(job => {
            newJobsMap[job.id] = job;
        });

        set({
            featuredJobs: jobs,
            jobsMap: newJobsMap
        });
    },

    setLatestJobs: (jobs) => {
        const newJobsMap = { ...get().jobsMap };
        jobs.forEach(job => {
            newJobsMap[job.id] = job;
        });

        set({
            latestJobs: jobs,
            jobsMap: newJobsMap
        });
    },

    setCompanyJobs: (jobs) => {
        const newJobsMap = { ...get().jobsMap };
        jobs.forEach(job => {
            newJobsMap[job.id] = job;
        });

        set({
            companyJobs: jobs,
            jobsMap: newJobsMap
        });
    },

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setInitialized: (initialized) => set({ initialized }),

    // Actions - Fetch data from API
    fetchFeaturedJobs: async () => {
        set({ loading: true, error: null });

        try {
            const response = await classifiedService.getFeaturedJobs();
            const data = response.items.map(item => mapClassifiedToUnified(item))
            get().setFeaturedJobs(data);
            set({
                loading: false,
                error: null,
                totalFeaturedJobs: response.total
            });
        } catch (error: any) {
            set({
                error: error.message || 'Failed to fetch featured jobs',
                loading: false
            });
        }
    },

    fetchLatestJobs: async () => {
        set({ loading: true, error: null });

        try {
            const response = await classifiedService.getLatestJobs();
            const data = response.items.map(item => mapLatestJobToUnified(item))
            get().setLatestJobs(data);
            set({
                loading: false,
                error: null,
                totalLatestJobs: response.total
            });
        } catch (error: any) {
            set({
                error: error.message || 'Failed to fetch latest jobs',
                loading: false
            });
        }
    },

    fetchCompanyJobs: async () => {
        set({ loading: true, error: null });

        try {
            const response = await classifiedService.getCompanyJobs();
            const data = response.items.map(item => mapJobByCompanyToUnified(item))
            get().setCompanyJobs(data);
            set({
                loading: false,
                error: null,
                totalCompanyJobs: response.total
            });
        } catch (error: any) {
            set({
                error: error.message || 'Failed to fetch company jobs',
                loading: false
            });
        }
    },

    // Utilities
    getJobById: (id: number) => {
        return get().jobsMap[id];
    },

    hasCompany: (job: ClassifiedItem) => {
        return job.is_company && job.org.id > 0;
    },

    // Storage - Hydrate từ local storage
    classifiedHydrate: async () => {
        const [featured, latest, company] = await Promise.all([
            storage.get<UnifiedJobItem[]>(STORAGE_KEYS.FEATURED),
            storage.get<UnifiedJobItem[]>(STORAGE_KEYS.LATEST),
            storage.get<UnifiedJobItem[]>(STORAGE_KEYS.COMPANY)
        ]);

        if (featured) {
            get().setFeaturedJobs(featured);
        }
        if (latest) {
            get().setLatestJobs(latest);
        }
        if (company) {
            get().setCompanyJobs(company);
        }

        set({ hydrated: true });
    },

    // Storage - Refresh từ API và lưu vào local storage
    classifiedRefresh: async () => {
        try {
            // Fetch all data in parallel
            const [featuredResponse, latestResponse, companyResponse] = await Promise.all([
                classifiedService.getFeaturedJobs(),
                classifiedService.getLatestJobs(),
                classifiedService.getCompanyJobs()
            ]);

            const data1 = featuredResponse.items.map(item => mapClassifiedToUnified(item))
            const data2 = latestResponse.items.map(item => mapLatestJobToUnified(item))
            const data3 = companyResponse.items.map(item => mapJobByCompanyToUnified(item))

            // Update state
            get().setFeaturedJobs(data1);
            get().setLatestJobs(data2);
            get().setCompanyJobs(data3);

            // Save to storage
            await Promise.all([
                storage.set(STORAGE_KEYS.FEATURED, data1),
                storage.set(STORAGE_KEYS.LATEST, data2),
                storage.set(STORAGE_KEYS.COMPANY, data3)
            ]);

            set({
                loading: false,
                error: null,
                totalFeaturedJobs: featuredResponse.total,
                totalLatestJobs: latestResponse.total,
                totalCompanyJobs: companyResponse.total
            });
        } catch (e) {
            console.warn('Fetch classifieds failed', e);
            set({
                error: 'Failed to refresh jobs',
                loading: false
            });
        }
    },
}));

// Selectors Basic
export const useFeaturedJobs = () => useClassifiedStore(state => state.featuredJobs);
export const useLatestJobs = () => useClassifiedStore(state => state.latestJobs);
export const useCompanyJobs = () => useClassifiedStore(state => state.companyJobs);
export const useJobsMap = () => useClassifiedStore(state => state.jobsMap);
export const useClassifiedLoading = () => useClassifiedStore(state => state.loading);
export const useClassifiedError = () => useClassifiedStore(state => state.error);
export const useClassifiedHydrated = () => useClassifiedStore(state => state.hydrated);
export const useTotalFeaturedJobs = () => useClassifiedStore(state => state.totalFeaturedJobs);
export const useTotalLatestJobs = () => useClassifiedStore(state => state.totalLatestJobs);
export const useTotalCompanyJobs = () => useClassifiedStore(state => state.totalCompanyJobs);

// Custom selectors
export const useClassifiedSelectors = () => {
    const store = useClassifiedStore();

    return {
        // Get job by ID
        getJobById: (id: number) => store.getJobById(id),

        // Filter jobs
        getJobsByCity: (cityId: number) =>
            [...store.featuredJobs, ...store.latestJobs, ...store.companyJobs]
                .filter(job => job.city_id === cityId),

        getJobsByCategory: (categoryId: number) =>
            [...store.featuredJobs, ...store.latestJobs, ...store.companyJobs]
                .filter(job => job.category_id === categoryId),

        // Search jobs locally
        searchJobs: (query: string) =>
            [...store.featuredJobs, ...store.latestJobs, ...store.companyJobs]
                .filter(job =>
                    job.title.toLowerCase().includes(query.toLowerCase()) ||
                    job.location.toLowerCase().includes(query.toLowerCase())
                ),

        // Check if job exists
        jobExists: (id: number) => !!store.getJobById(id),

        // Get all jobs (combined)
        getAllJobs: () => [
            ...store.featuredJobs,
            ...store.latestJobs,
            ...store.companyJobs
        ],

        // Get jobs sorted by date (newest first)
        getJobsSortedByDate: () => {
            const allJobs = [
                ...store.featuredJobs,
                ...store.latestJobs,
                ...store.companyJobs
            ];
            return allJobs.sort((a, b) =>
                new Date(b.publish_at).getTime() - new Date(a.publish_at).getTime()
            );
        },
    };
};
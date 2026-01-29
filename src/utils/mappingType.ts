import { ClassifiedItem, JobByCompanyItem, LatestJobItem, UnifiedJobItem } from "@/types/classified";

// Mapping từ ClassifiedItem (việc làm nổi bật)
export const mapClassifiedToUnified = (item: ClassifiedItem): UnifiedJobItem => {
    const isRecent = isRecentJob(item.publish_display);

    return {
        // Core
        id: item.id,
        title: item.title,
        price: item.price,
        price_display: item.price_display,
        location: item.location,
        url: item.url,

        // Company
        company_name: item.org.name || 'Cá nhân',
        company_logo: item.org.logo,
        is_company: item.is_company,
        is_partner: item.org.is_partner,
        org_level: item.org.org_level,
        org_id: item.org.id,

        // Job details
        category_id: item.category_id,
        subcategory_id: item.subcategory_id,
        category_ids: item.category_ids,
        job_types: item.job_types,
        experience: 0, // ClassifiedItem không có experience

        // Media
        covers: item.covers || [],
        total_images: item.total_images,
        has_images: (item.covers?.length || 0) > 0,
        first_image: item.covers?.[0],

        // Timing
        publish_at: item.publish_at,
        publish_display: item.publish_display,
        service_end: item.service_end,
        is_recent: isRecent,
        is_expired: item.is_expired,

        // Location
        city_id: item.city_id,
        district_id: item.district_id,

        // User
        user_id: item.user_id,

        // Service
        service_id: item.service_id,
        service_ids: item.service_id ? [item.service_id] : [],

        // Sorting
        sort: item.sort,
        job_sort: item.job_sort,

        // Original fields
        site_id: item.site_id,

        // Helper fields
        display_price: item.price_display,
        display_experience: "Không yêu cầu",
        display_job_type: getJobTypeText(item.job_types[0]),
        is_featured: true,
        is_latest: false,
        is_company_job: item.is_company && item.org.id > 0,
    };
};

// Mapping từ JobByCompanyItem (việc làm từ doanh nghiệp)
export const mapJobByCompanyToUnified = (item: JobByCompanyItem): UnifiedJobItem => {
    const isRecent = isRecentJob(item.publish_display);

    return {
        // Core
        id: item.id,
        title: item.title,
        price: item.price,
        price_display: item.price_display || (item.price > 0 ? `${(item.price / 1000000).toFixed(1)} triệu` : 'Thỏa thuận'),
        location: item.location,
        url: item.url,

        // Company
        company_name: item.company_name || 'Cá nhân',
        company_logo: item.company_image,
        is_company: item.is_company,
        is_partner: item.is_partner,
        org_level: item.org_level,
        org_id: item.org_id,

        // Job details
        category_id: item.category_id,
        subcategory_id: item.subcategory_id,
        category_ids: item.category_ids,
        job_types: item.job_types,
        experience: item.experience,

        // Media
        covers: item.covers || [],
        total_images: item.total_images,
        has_images: (item.covers?.length || 0) > 0,
        first_image: item.covers?.[0],

        // Timing
        publish_at: item.publish_at,
        publish_display: item.publish_display,
        service_end: item.service_end,
        is_recent: isRecent,
        is_expired: item.is_expired,

        // Location
        city_id: item.city_id,
        district_id: item.district_id,

        // User
        user_id: item.user_id,

        // Service
        service_id: item.service_id,
        service_ids: item.service_ids || [],

        // Sorting
        sort: item.sort,
        job_sort: item.job_sort,

        // Helper fields
        display_price: item.price_display || (item.price > 0 ? `${(item.price / 1000000).toFixed(1)} triệu` : 'Thỏa thuận'),
        display_experience: getExperienceText(item.experience),
        display_job_type: getJobTypeText(item.job_types[0]),
        is_featured: false,
        is_latest: false,
        is_company_job: true,
    };
};

// Mapping từ LatestJobItem (việc làm mới nhất)
export const mapLatestJobToUnified = (item: LatestJobItem): UnifiedJobItem => {
    const isRecent = isRecentJob(item.publish_display);
    const companyName = item.company_name || item.org?.name || 'Cá nhân';
    const companyLogo = item.company_image || item.org?.logo;
    const isCompany = item.is_company || (item.org?.id || 0) > 0;
    const orgId = item.org_id || item.org?.id || 0;
    const orgLevel = item.org_level || item.org?.org_level || 0;
    const isPartner = item.is_partner || item.org?.is_partner || false;

    return {
        // Core
        id: item.id,
        title: item.title,
        price: item.price,
        price_display: item.price_display,
        location: item.location,
        url: item.url,

        // Company
        company_name: companyName,
        company_logo: companyLogo,
        is_company: isCompany,
        is_partner: isPartner,
        org_level: orgLevel,
        org_id: orgId,

        // Job details
        category_id: item.category_id,
        subcategory_id: item.subcategory_id,
        category_ids: item.category_ids,
        job_types: item.job_types,
        experience: item.experience,

        // Media
        covers: item.covers || [],
        total_images: item.total_images,
        has_images: (item.covers?.length || 0) > 0,
        first_image: item.covers?.[0],

        // Timing
        publish_at: item.publish_at,
        publish_display: item.publish_display,
        service_end: item.service_end,
        is_recent: isRecent,
        is_expired: item.is_expired,

        // Location
        city_id: item.city_id,
        district_id: item.district_id,

        // User
        user_id: item.user_id,

        // Service
        service_id: item.service_id,
        service_ids: item.service_ids || [],

        // Sorting
        sort: item.sort,
        job_sort: item.job_sort,

        // Original fields
        site_id: item.site_id,

        // Helper fields
        display_price: item.price_display,
        display_experience: getExperienceText(item.experience),
        display_job_type: getJobTypeText(item.job_types[0]),
        is_featured: false,
        is_latest: true,
        is_company_job: isCompany && orgId > 0,
    };
};

// Helper function để get job type text
export const getJobTypeText = (jobTypeId: number): string => {
    const map: Record<number, string> = {
        5: "Kế toán",
        11: "Kinh doanh",
        179: "Đóng gói",
        180: "Lao động phổ thông",
        4009: "Buồng phòng",
        3076: "Kho vận",
    };
    return map[jobTypeId] || "Khác";
};

export const getExperienceText = (experienceId: number): string => {
    const map: Record<number, string> = {
        601: "Không yêu cầu",
        602: "Dưới 1 năm",
        603: "1 năm",
        604: "2 năm",
        605: "3 năm",
        606: "4 năm",
        607: "5 năm",
        608: "Trên 5 năm",
    };
    return map[experienceId] || "Không yêu cầu";
};

export const isRecentJob = (publishDisplay: string): boolean => {
    return publishDisplay.includes('phút') ||
        publishDisplay.includes('giờ') ||
        publishDisplay.includes('Hôm nay');
};
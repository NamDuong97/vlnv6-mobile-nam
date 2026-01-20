export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  salary: string;
  location: string;
  timePosted: string;
  isHot?: boolean;
  isUrgent?: boolean;
  jobCount?: number;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  jobCount: number;
  isVerified?: boolean;
}

export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  jobCount?: number;
  color?: string;
  isHot?: boolean;
}

export interface Tag {
  id: string;
  name: string;
  icon?: string;
}

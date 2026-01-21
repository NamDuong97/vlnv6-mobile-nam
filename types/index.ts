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


export interface Tag {
  id: string;
  name: string;
  icon?: string;
}

// Định nghĩa các key hợp lệ
export type IconKey =
  | 'job-tet'
  | 'ban-hang-tai-quay'
  | 'tai-xe-lai-xe'
  | 'giao-cho-hang'
  | 'giup-viec-tap-vu'
  | 'tat-ca-nganh';


export interface JobCategory {
  id: string;
  name: string;
  icon: IconKey;
  jobCount?: number;
  color?: string;
  isHot?: boolean;
}
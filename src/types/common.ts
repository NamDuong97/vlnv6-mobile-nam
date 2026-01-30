export type FooterLink = {
    id: number;
    parent_id: number;
    link_type_id: number;
    code: string;
    name: string;
    url: string;
    ga_category: string;
    ga_action: string;
    publish: boolean;
    no_follow: boolean;
    target_blank: boolean;
    sort: number;
    updated: string; // ISO 8601 date string
};

export type FooterLinks = {
    about: FooterLink[];
    candidate: FooterLink[];
    employer: FooterLink[];
    info: FooterLink[];
};
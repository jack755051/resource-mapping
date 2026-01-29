import { contentProps } from "../common";

export type ResourceType = 'PDF' | 'ZIP' | 'Article' | 'EXE';
export type CategoryId = 'all' | 'manual' | 'firmware' | 'software' | 'faq';

// ======== 支援資源 ========
export interface SupportResource {
    id: number;
    title: string;
    category: CategoryId;
    date: string;
    type: ResourceType;
    size: string;
}

export interface SupportResourceClasses {
    container?: string;
    title?: string;
    category?: string;
    date?: string;
    type?: string;
    size?: string;
}

export interface SupportResourceProps extends contentProps<
    SupportResource,
    SupportResourceClasses
> { }

// ======== 支援分類 ========
export interface SupportCategory {
    id: CategoryId;
    label: string;
}

export interface SupportCategoryClasses {
    container?: string;
    active?: string;
    inactive?: string;
}

export interface SupportCategoryProps extends contentProps<
    SupportCategory,
    SupportCategoryClasses
> { }

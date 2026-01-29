// type/page/support.ts

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
    id: number;
    title: string;
    category: CategoryId;
    date: string;
    type: ResourceType;
    size: number;
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
    id: CategoryId;
    label: string;
}

export interface SupportCategoryProps extends contentProps<
    SupportCategory,
    SupportCategoryClasses
> { }
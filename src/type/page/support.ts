import { CommonFilter, contentProps } from "../common";
import { LocalizedString } from "../i18n";

export type ResourceType = 'PDF' | 'ZIP' | 'Article' | 'EXE';
export type CategoryId = 'all' | 'manual' | 'manuals' | 'firmware' | 'software' | 'faq';  // 🔥 支持複數形式

// ======== 支援資源 (單項) ========
export interface SupportResource {
    id: number;
    title: string;
    category: CategoryId;
    date: string;
    type: ResourceType;
    size: number;
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

// ======== 支援分類 (選單) ========
export interface SupportCategory extends CommonFilter { }

export interface SupportCategoryClasses {
    container?: string;
    active?: string;
    inactive?: string;
}

export interface SupportCategoryProps extends contentProps<
    SupportCategory[],
    SupportCategoryClasses
> { }

// ======== 支援列表回傳 (API 回傳經 Mapper 轉出的 Domain Model) ========
// 這就是你原本寫在 Service 裡面的那個介面，搬到這裡最合適
export interface PaginatedSupportResource {
    data: SupportResource[];
    total: number;
    page: number;
    limit: number;
}

// ======== 支援列表 (組件用) ========
export interface SupportListData {
    data: SupportResource[];
    currentPage: number;
    totalPages: number;
}

export interface SupportListClasses {
    container?: string;
    listWrapper?: string;
    item?: string;
    itemIcon?: string;
    itemTitle?: string;
    itemMeta?: string;
    emptyState?: string;
    pagination?: string;
}

export interface SupportListProps extends contentProps<
    SupportListData,
    SupportListClasses
> {
    setCurrentPage: (page: number | ((prev: number) => number)) => void;
}
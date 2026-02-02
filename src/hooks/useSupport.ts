'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useSystemParams } from '@/provider/system-params-provider';
import type { SupportResource } from '@/type/page/support';
import { SupportService } from '@/api/services/support.service';

// 定義 FilterCategory (UI 顯示用)
export interface FilterCategory {
    id: string;
    label: string;
}

interface UseSupportOptions {
    itemsPerPage?: number;
}

export function useSupport({ itemsPerPage = 5 }: UseSupportOptions = {}) {
    const { t, language } = useTranslation();

    // 🔥 從 SystemParamsProvider 獲取分類數據（系統級參數）
    // ⚠️ SystemParamsProvider 會在語系切換時自動重新請求，後端返回翻譯後的字符串
    const { supportCategories: rawCategories, isSupportCategoriesLoading: isLoadingCats } = useSystemParams();

    // 狀態
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // 資料狀態
    const [resources, setResources] = useState<SupportResource[]>([]);

    // Loading 狀態
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [totalItems, setTotalItems] = useState(0);

    // 🔥 取得列表（API 失敗顯示空資料）
    useEffect(() => {
        const fetchList = async () => {
            setIsLoadingList(true);
            try {
                // 呼叫 API
                const result = await SupportService.handleGetSupportList({
                    category: activeCategory === 'all' ? undefined : activeCategory,
                    keyword: searchQuery || undefined,
                    page: currentPage,
                    limit: itemsPerPage,
                }, language || 'zh');

                setResources(result.data);
                setTotalItems(result.total);
            } catch (error) {
                // 錯誤處理：清空資料，顯示 "沒有資料"
                console.error('[Support] List API Failed:', error);
                setResources([]);
                setTotalItems(0);
            } finally {
                setIsLoadingList(false);
            }
        };

        const timer = setTimeout(fetchList, 300);
        return () => clearTimeout(timer);

    }, [activeCategory, searchQuery, currentPage, itemsPerPage]);

    // 3. UI 分類轉換
    const uiCategories: FilterCategory[] = useMemo(() => {
        const allOption: FilterCategory = { id: 'all', label: t('support.category.all') };
        // ✅ 後端已根據語系返回翻譯後的 label，直接使用即可
        const apiOptions: FilterCategory[] = rawCategories.map(cat => ({
            id: cat.id,
            label: cat.label as string  // 後端 I18nInterceptor 已翻譯，保證是字符串
        }));
        return [allOption, ...apiOptions];
    }, [rawCategories, t]);  // 🔥 不需要依賴 currentLang，因為後端已翻譯

    const handleCategoryChange = (id: string) => {
        setActiveCategory(id);
        setCurrentPage(1);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return {
        categories: uiCategories,
        currentData: resources,
        totalCount: totalItems,
        totalPages: Math.ceil(totalItems / itemsPerPage),
        activeCategory,
        searchQuery,
        currentPage,
        isLoading: isLoadingList || isLoadingCats,
        setActiveCategory: handleCategoryChange,
        setSearchQuery: handleSearchChange,
        setCurrentPage,
    };
}
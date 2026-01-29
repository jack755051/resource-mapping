'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import type { SupportResource, SupportCategory } from '@/type/page/support';
import { SupportService } from '@/api/services/support.service';

// 只引入分類的 Mock (因為你只說列表不要假資料，分類若要拔掉也可以順便說)
import { MOCK_SUPPORT_CATEGORIES } from '@/mock/support';
import { SupportMapper } from '@/api/mapper/support.mapper';

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
    const currentLang = (language?.startsWith('zh') ? 'zh' : 'en') as 'zh' | 'en';

    // 狀態
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // 資料狀態
    const [resources, setResources] = useState<SupportResource[]>([]);
    const [rawCategories, setRawCategories] = useState<SupportCategory[]>([]);

    // Loading 狀態
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [isLoadingCats, setIsLoadingCats] = useState(false);
    const [totalItems, setTotalItems] = useState(0);

    // 1. 取得分類 (維持原案，若分類 API 掛掉還有選單可以用)
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoadingCats(true);
            try {
                const data = await SupportService.handleGetSupportCategories();
                setRawCategories(data);
            } catch (error) {
                console.warn('[Support] Category API Failed, using Mock Data.');
                setRawCategories(SupportMapper.toDomainCategoryList(MOCK_SUPPORT_CATEGORIES));
            } finally {
                setIsLoadingCats(false);
            }
        };
        fetchCategories();
    }, []);

    // 2. 取得列表 (修正：API 失敗就是沒有資料，不Fallback)
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
                });

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
        const apiOptions = rawCategories.map(cat => ({
            id: cat.id,
            label: cat.label[currentLang] || cat.label.en
        }));
        return [allOption, ...apiOptions];
    }, [rawCategories, currentLang, t]);

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
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { SupportResource, CategoryId } from '@/type/page/support';
import { SupportService } from '@/api/services/support.service';

interface UseSupportOptions {
    mode?: 'static' | 'api'; // 靜態數據或 API 模式
    items?: SupportResource[]; // 靜態模式使用
    itemsPerPage?: number;
}

export function useSupport(options: UseSupportOptions = {}) {
    const {
        mode = 'static',
        items = [],
        itemsPerPage = 5
    } = options;

    const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // API 模式專用狀態
    const [apiData, setApiData] = useState<SupportResource[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);

    // 處理分類


    // 處理重置分頁的 helper
    const handleResetPagination = () => setCurrentPage(1);

    const handleCategoryChange = (id: CategoryId) => {
        setActiveCategory(id);
        handleResetPagination();
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        handleResetPagination();
    };

    // API 模式：從後端獲取數據
    useEffect(() => {
        if (mode !== 'api') return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const result = await SupportService.handleGetSupportList({
                    category: activeCategory === 'all' ? undefined : activeCategory,
                    keyword: searchQuery || undefined,
                    page: currentPage,
                    limit: itemsPerPage,
                });

                setApiData(result.data);
                setTotalItems(result.total);
            } catch (error) {
                console.error('Failed to fetch support resources:', error);
                setApiData([]);
                setTotalItems(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [mode, activeCategory, searchQuery, currentPage, itemsPerPage]);

    // 決定使用哪個數據源
    const sourceData = mode === 'api' ? apiData : items;

    // 靜態模式：客戶端過濾
    const filteredData = useMemo(() => {
        if (mode === 'api') {
            // API 模式：後端已經過濾，直接返回
            return sourceData;
        }

        // 靜態模式：客戶端過濾
        return sourceData.filter((item) => {
            const matchCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchSearch;
        });
    }, [mode, sourceData, activeCategory, searchQuery]);

    // 計算總頁數
    const totalPages = useMemo(() => {
        if (mode === 'api') {
            return Math.ceil(totalItems / itemsPerPage);
        }
        return Math.ceil(filteredData.length / itemsPerPage);
    }, [mode, totalItems, filteredData.length, itemsPerPage]);

    // 當前頁面數據
    const currentData = useMemo(() => {
        if (mode === 'api') {
            // API 模式：後端已分頁
            return filteredData;
        }

        // 靜態模式：客戶端分頁
        return filteredData.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }, [mode, filteredData, currentPage, itemsPerPage]);

    return {
        // 狀態
        activeCategory,
        searchQuery,
        currentPage,
        totalPages,
        currentData, // 已經切分好的當前頁面資料
        totalCount: mode === 'api' ? totalItems : filteredData.length,
        isLoading, // API 模式的載入狀態

        // 動作
        setActiveCategory: handleCategoryChange, // 包裝過的 setter
        setSearchQuery: handleSearchChange,      // 包裝過的 setter
        setCurrentPage,
    };
}
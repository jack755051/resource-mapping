'use client';

import { useState, useMemo } from 'react';
import type { SupportResource, CategoryId } from '@/type/page/support';

export function useSupport(items: SupportResource[], itemsPerPage = 5) {
    const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

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

    // 使用 useMemo 優化效能，避免每次 render 都重新計算
    const filteredData = useMemo(() => {
        return items.filter((item) => {
            const matchCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchSearch;
        });
    }, [items, activeCategory, searchQuery]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const currentData = useMemo(() => {
        return filteredData.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }, [filteredData, currentPage, itemsPerPage]);

    return {
        // 狀態
        activeCategory,
        searchQuery,
        currentPage,
        totalPages,
        currentData, // 已經切分好的當前頁面資料
        totalCount: filteredData.length,

        // 動作
        setActiveCategory: handleCategoryChange, // 包裝過的 setter
        setSearchQuery: handleSearchChange,      // 包裝過的 setter
        setCurrentPage,
    };
}
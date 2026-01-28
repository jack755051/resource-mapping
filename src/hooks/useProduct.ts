// src/hooks/useProduct.ts
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from './useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setCategory, setPage } from '@/store/slices/product.slice';
import { AppDispatch, RootState } from '@/store';

// 為了讓 UI 仍能顯示分類 Tabs，我們可以把靜態資料保留在這裡，或移到常數檔
export const CATEGORIES = [
    { id: 'all', name: '全系列 All' },
    { id: 'underwater', name: '水下攝影機' },
    { id: '5mp', name: '500萬畫素' },
    { id: 'ip-cam', name: 'IP 網路攝影機' },
    { id: 'license', name: '車牌辨識系統' },
    { id: 'speed', name: '高速球系列' },
    { id: 'dvr', name: 'DVR/NVR 主機' },
];

export function useProduct() {
    const dispatch = useDispatch<AppDispatch>();
    const { language } = useTranslation();

    // 1. 從 Redux 選取資料
    const { list, loading, pagination, queryParams } = useSelector((state: RootState) => state.product);

    // 2. 當 查詢條件(queryParams) 或 語言(language) 改變時，自動發送請求
    useEffect(() => {
        dispatch(fetchProducts(language));
    }, [dispatch, queryParams, language]);

    // 3. 封裝 Actions (讓 UI 只要呼叫 function，不用懂 dispatch)
    const handleSetCategory = (categoryId: string) => {
        dispatch(setCategory(categoryId));
    };

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
    };

    // 4. 計算當前分類名稱 (UI 顯示用)
    // 這裡的 activeCategory 邏輯是：如果 queryParams.category 是 undefined，就是 'all'
    const activeCategory = queryParams.category || 'all';

    const currentCategoryName = useMemo(() => {
        return CATEGORIES.find(c => c.id === activeCategory)?.name;
    }, [activeCategory]);

    // 5. 回傳給 UI 的介面 (保持乾淨)
    return {
        // 資料
        categories: CATEGORIES,
        products: list,
        totalCount: pagination?.total || 0,
        pagination,
        loading,

        // 狀態
        activeCategory,
        currentCategoryName,

        // 操作方法
        setActiveCategory: handleSetCategory,
        setPage: handlePageChange,
    };
}
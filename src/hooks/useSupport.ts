'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppSelector } from '@/store/hooks';
import {
  selectSupportCategories,
  selectSystemIsLoading,
} from '@/store/slices/system.slice';
import type { SupportResource } from '@/type/page/support';
import { SupportService } from '@/api/services/support.service';

// 定义 FilterCategory (UI 显示用)
export interface FilterCategory {
  id: string;
  label: string;
  sort?: number; // 用于排序
}

interface UseSupportOptions {
  itemsPerPage?: number;
}

export function useSupport({ itemsPerPage = 5 }: UseSupportOptions = {}) {
  const { t, language } = useTranslation();

  // 🔥 从 Redux 获取分类数据（系统级参数）
  // ⚠️ system.slice 会在语系切换时自动重新请求，后端返回翻译后的字符串
  const rawCategories = useAppSelector(selectSupportCategories);
  const isSystemLoading = useAppSelector(selectSystemIsLoading);

  // 狀態
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 資料狀態
  const [supportList, setSupportList] = useState<SupportResource[]>([]);

  // Loading 狀態
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  // 🔥 取得列表（API 失敗顯示空資料）
  useEffect(() => {
    const fetchList = async () => {
      setIsLoadingList(true);
      try {
        // 呼叫 API
        const result = await SupportService.handleGetSupportList(
          {
            category: activeCategory === 'all' ? undefined : activeCategory,
            keyword: searchQuery || undefined,
            page: currentPage,
            limit: itemsPerPage,
          },
          language || 'zh'
        );

        setSupportList(result.data);
        setTotalItems(result.total);
      } catch (error) {
        // 錯誤處理：清空資料，顯示 "沒有資料"
        console.error('[Support] List API Failed:', error);
        setSupportList([]);
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
    // 🔥 後端已經返回了 "all" 選項（value: "all", sort: 0），不需要前端再添加
    // ✅ 直接使用後端返回的數據，並按 sort 排序（升序）
    return rawCategories
      .map(cat => ({
        id: cat.id,
        label: cat.label as string, // 後端 I18nInterceptor 已翻譯，保證是字符串
        sort: cat.sort,
      }))
      .sort((a, b) => (a.sort ?? 999) - (b.sort ?? 999)); // 按 sort 升序排序
  }, [rawCategories]); // 🔥 不需要依賴 t 或 currentLang，因為後端已翻譯

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
    currentData: supportList,
    totalCount: totalItems,
    totalPages: Math.ceil(totalItems / itemsPerPage),
    activeCategory,
    searchQuery,
    currentPage,
    isLoading: isLoadingList || isSystemLoading,
    setActiveCategory: handleCategoryChange,
    setSearchQuery: handleSearchChange,
    setCurrentPage,
  };
}

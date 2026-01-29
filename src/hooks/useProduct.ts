// src/hooks/useProduct.ts
import { useMemo, useEffect } from 'react';
import { useTranslation } from './useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  fetchProducts,
  setCategory,
  setPage,
} from '@/store/slices/product.slice';
import { AppDispatch, RootState } from '@/store';

export function useProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { language, t } = useTranslation();

  // 1. 從 Redux 選取資料 (包含 categories)
  const { list, categories, loading, pagination, queryParams } = useSelector(
    (state: RootState) => state.product
  );

  // 2. 初始化：掛載時抓取分類 & 產品
  useEffect(() => {
    // 抓取產品列表
    dispatch(fetchProducts(language));

    // 🔥 抓取分類列表 (如果分類是空的才抓，避免每次切換頁面都重抓)
    if (categories.length === 0) {
      dispatch(fetchCategories(language));
    }
  }, [dispatch, queryParams, language]);

  // 3. 🔥 組合 UI 用的分類列表
  // API 回傳的分類通常沒有 "All"，前端要自己補上去
  const uiCategories = useMemo(() => {
    const allOption = {
      id: 'all',
      name: language === 'zh' ? '全系列 All' : 'All Products',
    };
    return [allOption, ...categories];
  }, [categories, language]);

  // 4. 計算當前分類名稱
  const activeCategory = queryParams.category || 'all';

  const currentCategoryName = useMemo(() => {
    return uiCategories.find(c => c.id === activeCategory)?.name;
  }, [activeCategory, uiCategories]);

  // Action 封裝
  const handleSetCategory = (categoryId: string) =>
    dispatch(setCategory(categoryId));
  const handlePageChange = (page: number) => dispatch(setPage(page));

  return {
    // 🔥 回傳組合過後的分類列表
    categories: uiCategories,

    products: list,
    totalCount: pagination?.total || 0,
    pagination,
    loading,
    activeCategory,
    currentCategoryName,
    setActiveCategory: handleSetCategory,
    setPage: handlePageChange,
  };
}

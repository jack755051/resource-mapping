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
import { ProductCategory } from '@/type/page/product'; // 引入新 Type
import { getLocalizedContent } from '@/type/i18n'; // 引入語系解析工具

export function useProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { language } = useTranslation();

  // 1. 從 Redux 選取資料
  const { list, categories, loading, pagination, queryParams } = useSelector(
    (state: RootState) => state.product
  );

  // 2. 初始化 (維持不變)
  useEffect(() => {
    dispatch(fetchProducts(language));
    if (categories.length === 0) {
      dispatch(fetchCategories(language));
    }
  }, [dispatch, queryParams, language, categories.length]);

  // 3. 🔥 重點修正：組合 UI 用的分類列表
  // 這裡必須回傳 ProductCategory[] (包含 label: LocalizedString)
  const uiCategories: ProductCategory[] = useMemo(() => {
    // 1. 定義 "全部" 選項 (這本身就是 ProductCategory 格式)
    const allOption: ProductCategory = {
      id: 'all',
      label: {
        zh: '全系列',
        en: 'All Products',
      },
      slug: 'all' // 如果你有加 slug 屬性
    };

    // 2. 🔥 關鍵修正：將後端的 DTO 轉換 (Map) 成前端的 ProductCategory 格式
    const mappedCategories: ProductCategory[] = categories.map((cat) => ({
      id: cat.id,

      // 轉換邏輯：
      // 由於你的 fetchCategories(language) 已經根據語系抓回對應的 name
      // 但 UI 強制需要 LocalizedString { zh, en }
      // 所以我們先將目前的 name 同時填入 zh 和 en (或者根據你的 DTO 結構調整)
      label: {
        zh: cat.name, // 假設 DTO 裡有 name
        en: cat.name, // 暫時填入相同值，這樣 getLocalizedContent 取哪一個都有值
      },

      // 如果 DTO 裡原本沒有 slug，可以用 id 代替，避免 UI 報錯
      slug: (cat as any).slug || cat.id
    }));

    return [allOption, ...mappedCategories];
  }, [categories]);

  // 4. 計算當前分類名稱 (這裡解析成 string 給列表標題用)
  const activeCategory = queryParams.category || 'all';

  const currentCategoryName = useMemo(() => {
    const current = uiCategories.find(c => c.id === activeCategory);
    // 使用 helper 解析出當前語言的名稱
    return current ? getLocalizedContent(current.label, language) : '';
  }, [activeCategory, uiCategories, language]);

  // Action 封裝
  const handleSetCategory = (categoryId: string) => {
    // 切換分類時，通常也會重置到第一頁
    dispatch(setCategory(categoryId));
    dispatch(setPage(1));
  };

  const handlePageChange = (page: number) => dispatch(setPage(page));

  return {
    categories: uiCategories, // 現在這是正確的 ProductCategory[]
    products: list,
    totalCount: pagination?.total || 0,
    pagination,
    loading,
    activeCategory,
    currentCategoryName, // 這是解析過的 string (例如 "全系列" 或 "All Products")
    setActiveCategory: handleSetCategory,
    setPage: handlePageChange,
  };
}
// src/hooks/useProduct.ts
import { useMemo, useEffect } from 'react';
import { useTranslation } from './useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  setCategory,
  setPage,
} from '@/store/slices/product.slice';
import { selectProductCategories } from '@/store/slices/system.slice';
import { AppDispatch, RootState } from '@/store';
import { ProductCategory } from '@/type/page/product';

export function useProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { language } = useTranslation();

  // 🔥 从 Redux 获取分类数据（系统级参数）
  // ⚠️ system.slice 会在语系切换时自动重新请求，后端返回翻译后的字符串
  const rawCategories = useSelector(selectProductCategories);

  // 1. 從 Redux 選取產品列表資料（分類改從 SystemParams 獲取）
  const { list, loading, pagination, queryParams } = useSelector(
    (state: RootState) => state.product
  );

  // 2. 初始化產品列表
  // ✅ 使用具體的查詢參數作為依賴，而非整個對象
  useEffect(() => {
    dispatch(fetchProducts(language));
  }, [
    dispatch,
    queryParams.categoryId,
    queryParams.page,
    queryParams.limit,
    queryParams.sort,
    language,
  ]);

  // 3. UI 分類轉換
  const uiCategories: ProductCategory[] = useMemo(() => {
    // 🔥 後端已經返回了 "all" 選項（如果有的話），或者可以在這裡添加
    // ✅ 直接使用後端返回的數據，並按 sort 排序（升序）
    return rawCategories
      .map(cat => ({
        id: cat.id,
        label: typeof cat.label === 'string' ? cat.label : cat.label, // 後端已翻譯
        slug: cat.slug,
        sort: cat.sort,
      }))
      .sort((a, b) => (a.sort ?? 999) - (b.sort ?? 999)); // 按 sort 升序排序
  }, [rawCategories]);

  // 4. 計算當前分類名稱
  // ✅ 當 categoryId 為 undefined 時，自動選擇「全系列」分類（通常是 sort: 0 或 slug: 'all'）
  const activeCategory = useMemo(() => {
    if (queryParams.categoryId) {
      return queryParams.categoryId;
    }
    // 找到「全系列」分類：優先使用 slug === 'all'，其次使用 sort === 0 的第一個
    const allCategory =
      uiCategories.find(c => c.slug === 'all') ||
      uiCategories.find(c => c.sort === 0) ||
      uiCategories[0]; // 兜底：使用第一個分類
    return allCategory?.id || 'all';
  }, [queryParams.categoryId, uiCategories]);

  const currentCategoryName = useMemo(() => {
    const current = uiCategories.find(c => c.id === activeCategory);
    // ✅ label 已經是翻譯後的字符串，直接使用
    return (current?.label as string) || '';
  }, [activeCategory, uiCategories]);

  // Action 封裝
  const handleSetCategory = (categoryId: string) => {
    // 找到對應的分類
    const category = uiCategories.find(c => c.id === categoryId);

    // ✅ 如果是「全系列」(slug === 'all')，傳遞 undefined，讓 API 不帶 categoryId
    const finalCategoryId = category?.slug === 'all' ? undefined : categoryId;

    console.log(
      `🔄 切換分類: categoryId=${categoryId}, slug=${category?.slug}, 實際傳遞=${finalCategoryId || '(undefined - 不傳參數)'}`
    );

    // 切換分類時，通常也會重置到第一頁
    dispatch(setCategory(finalCategoryId)); // ✅ 全系列傳 undefined，其他傳 UUID
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

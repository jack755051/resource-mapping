'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './language-provider';
import { SupportService } from '@/api/services/support.service';
import { ConstantsService } from '@/api/services/constants.service';
import { SupportMapper } from '@/api/mapper/support.mapper';
import { ProductMapper } from '@/api/mapper/product.mapper';
import { SupportCategory } from '@/type/page/support';
import { ProductCategory } from '@/type/page/product';
import { MOCK_SUPPORT_CATEGORIES } from '@/mock/support';

/**
 * SystemParams Context Type
 *
 * 系統參數管理：
 * - 在系統初始化時載入所有參數
 * - 監聽語系變化並自動重新載入
 * - 提供統一的數據源給各個頁面使用
 */
interface SystemParamsContextType {
  // Support 相關
  supportCategories: SupportCategory[];
  isSupportCategoriesLoading: boolean;
  refetchSupportCategories: () => Promise<void>;

  // Product 相關
  productCategories: ProductCategory[];
  isProductCategoriesLoading: boolean;
  refetchProductCategories: () => Promise<void>;

  // 未來可擴充：
  // officeCategories: OfficeCategory[];
}

const SystemParamsContext = createContext<SystemParamsContextType | undefined>(
  undefined
);

/**
 * SystemParamsProvider
 *
 * 職責：
 * 1. 系統啟動時載入所有參數
 * 2. 監聽語系變化，自動重新載入參數
 * 3. 提供 Loading 狀態
 * 4. 錯誤處理（Fallback 到 Mock 數據）
 */
export function SystemParamsProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  // Support Categories 狀態
  const [supportCategories, setSupportCategories] = useState<SupportCategory[]>([]);
  const [isSupportCategoriesLoading, setIsSupportCategoriesLoading] = useState(true);

  // Product Categories 狀態
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [isProductCategoriesLoading, setIsProductCategoriesLoading] = useState(true);

  /**
   * 載入 Support Categories
   * 會在以下情況觸發：
   * 1. 系統初始化
   * 2. 語系切換
   */
  const fetchSupportCategories = async () => {
    setIsSupportCategoriesLoading(true);
    try {
      console.log('[SystemParams] Fetching SupportCategories, language:', language);
      const data = await SupportService.handleGetSupportCategories(language);
      setSupportCategories(data);
      console.log('[SystemParams] SupportCategories loaded:', data.length);
    } catch (error) {
      console.warn('[SystemParams] SupportCategories API Failed, using Mock Data.', error);
      // Fallback to Mock Data
      setSupportCategories(SupportMapper.toDomainCategoryList(MOCK_SUPPORT_CATEGORIES));
    } finally {
      setIsSupportCategoriesLoading(false);
    }
  };

  /**
   * 載入 Product Categories
   * 會在以下情況觸發：
   * 1. 系統初始化
   * 2. 語系切換
   */
  const fetchProductCategories = async () => {
    setIsProductCategoriesLoading(true);
    try {
      console.log('[SystemParams] Fetching ProductCategories, language:', language);
      const data = await ConstantsService.handleGetProductsCategories(language);
      const mappedData = ProductMapper.toDomainCategoryList(data);
      setProductCategories(mappedData);
      console.log('[SystemParams] ProductCategories loaded:', mappedData.length);
    } catch (error) {
      console.warn('[SystemParams] ProductCategories API Failed.', error);
      // 錯誤時設置空數組
      setProductCategories([]);
    } finally {
      setIsProductCategoriesLoading(false);
    }
  };

  // 🔥 核心：監聽語系變化，自動重新載入參數
  useEffect(() => {
    // 並行載入所有參數
    Promise.all([
      fetchSupportCategories(),
      fetchProductCategories(),
    ]);
  }, [language]); // 依賴 language，語系切換時自動重新執行

  const value: SystemParamsContextType = {
    supportCategories,
    isSupportCategoriesLoading,
    refetchSupportCategories: fetchSupportCategories,
    productCategories,
    isProductCategoriesLoading,
    refetchProductCategories: fetchProductCategories,
  };

  return (
    <SystemParamsContext.Provider value={value}>
      {children}
    </SystemParamsContext.Provider>
  );
}

/**
 * useSystemParams Hook
 *
 * 使用方式：
 * ```tsx
 * const { supportCategories, isSupportCategoriesLoading } = useSystemParams();
 * ```
 */
export function useSystemParams() {
  const context = useContext(SystemParamsContext);
  if (!context) {
    throw new Error('useSystemParams must be used within a SystemParamsProvider');
  }
  return context;
}

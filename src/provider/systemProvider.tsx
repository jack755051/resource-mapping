'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './language-provider';
import { SupportService } from '@/api/services/support.service';
import { ProductService } from '@/api/services/product.service';
import { ContactService } from '@/api/services/contact.service';
import { SupportCategory } from '@/type/page/support';
import { ProductCategory } from '@/type/page/product';
import { OfficeLocation } from '@/type/page/contact';
import { MOCK_SUPPORT_CATEGORIES } from '@/mock/support';
import { MOCK_CONTACT_API_RESPONSE } from '@/mock/contact';
import { SupportMapper } from '@/api/mapper/support.mapper';
import { ContactMapper } from '@/api/mapper/contact.mapper';

// 1. 定義系統設定 (Config) - 通常不隨語系頻繁變動
interface SystemConfig {
  maintenanceMode: boolean;
  supportPhone: string;
  copyrightYear: string;
}

// 2. 定義系統資源 (Resources) - 會隨語系變動
interface SystemResources {
  supportCategories: SupportCategory[];
  productCategories: ProductCategory[];
  locations: OfficeLocation[];
}

// 3. Context 介面
interface SystemContextType {
  config: SystemConfig | null;
  resources: SystemResources;
  isLoading: boolean; // 整體載入狀態
  error: Error | null;

  // 供手動重新整理用
  refreshResources: () => Promise<void>;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  // --- State ---
  const [config, setConfig] = useState<SystemConfig | null>(null);
  const [supportCategories, setSupportCategories] = useState<SupportCategory[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [locations, setLocations] = useState<OfficeLocation[]>([]);

  // 狀態旗標
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);
  const [isResourcesLoaded, setIsResourcesLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // --- 1. 初始化 Config (只在 App 啟動時跑一次) ---
  useEffect(() => {
    const initConfig = async () => {
      try {
        // 模擬 API: /api/system/config
        // const data = await ofetch<SystemConfig>('/api/system/config'); 

        // 這裡先寫死範例，實際上你要打 API
        const data = { maintenanceMode: false, supportPhone: '0800-000-000', copyrightYear: '2026' };
        setConfig(data);
      } catch (e) {
        console.error('System config failed', e);
      } finally {
        setIsConfigLoaded(true);
      }
    };
    initConfig();
  }, []);

  // --- 2. 載入 Resources (語系變動時觸發) ---
  const fetchResources = async () => {
    setIsResourcesLoaded(false);
    try {
      console.log('[System] Fetching resources for:', language);

      // 使用 Promise.allSettled 平行載入多個資源，即使某些失敗也不影響其他
      const results = await Promise.allSettled([
        SupportService.handleGetSupportCategories(language),
        ProductService.handleGetProductCategories(language),
        ContactService.handleGetLocations(language),
      ]);

      // 處理 Support Categories
      if (results[0].status === 'fulfilled') {
        setSupportCategories(results[0].value);
      } else {
        console.warn('[System] SupportCategories API Failed, using Mock Data.', results[0].reason);
        setSupportCategories(SupportMapper.toDomainCategoryList(MOCK_SUPPORT_CATEGORIES));
      }

      // 處理 Product Categories
      if (results[1].status === 'fulfilled') {
        setProductCategories(results[1].value);
      } else {
        console.warn('[System] ProductCategories API Failed, using empty array.', results[1].reason);
        setProductCategories([]);
      }

      // 處理 Locations
      if (results[2].status === 'fulfilled') {
        setLocations(results[2].value);
      } else {
        console.warn('[System] Locations API Failed, using Mock Data.', results[2].reason);
        setLocations(ContactMapper.toDomainList(MOCK_CONTACT_API_RESPONSE));
      }
    } catch (e: any) {
      console.error('[System] Resource fetch failed', e);
      setError(e);
    } finally {
      setIsResourcesLoaded(true);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [language]);

  // --- 3. 組合 Value ---
  const value: SystemContextType = {
    config,
    resources: {
      supportCategories,
      productCategories,
      locations,
    },
    // 只有當 Config 和 Resources 都載入完，isLoading 才變 false
    isLoading: !isConfigLoaded || !isResourcesLoaded,
    error,
    refreshResources: fetchResources,
  };

  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
}
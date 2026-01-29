'use client';

import { SupportHero } from '@/components/sections/support/hero';
import { SupportFilters } from '@/components/sections/support/filters';
import { SupportList } from '@/components/sections/support/list';

// 資料源建議移到獨立檔案或 API
import { resources } from '@/mock/support';
import { useSupport } from '@/hooks/useSupport';

export default function SupportPage() {
  // 可以選擇使用靜態數據或 API 模式
  // 靜態模式（現在的方式）：
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    currentData,
    isLoading
  } = useSupport({
    mode: 'static', // 使用靜態數據
    items: resources,
    itemsPerPage: 5
  });

  // API 模式（當後端 API 準備好時）：
  // const { ... } = useSupport({ mode: 'api', itemsPerPage: 5 });

  return (
    <div className="min-h-screen bg-background pb-20">
      <SupportHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      // onSearch 不用傳了，因為 hook 內部的 setSearchQuery 已經包含重置分頁邏輯
      />

      <SupportFilters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <SupportList
        props={{
          data: currentData,
          currentPage,
          totalPages
        }}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
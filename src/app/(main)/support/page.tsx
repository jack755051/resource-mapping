'use client';

import { SupportHero } from '@/components/sections/support/hero';
import { SupportFilters } from '@/components/sections/support/filters';
import { SupportList } from '@/components/sections/support/list';

// 資料源建議移到獨立檔案或 API
import { resources } from '@/mock/support';
import { useSupport } from '@/hooks/useSupport';

export default function SupportPage() {
  // 一行搞定所有邏輯
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    currentData
  } = useSupport(resources);

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
        data={currentData}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
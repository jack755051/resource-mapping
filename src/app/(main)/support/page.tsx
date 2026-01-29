'use client';

import { SupportHero } from '@/components/sections/support/hero';
import { SupportFilters } from '@/components/sections/support/filters';
import { SupportList } from '@/components/sections/support/list';
import { useSupport } from '@/hooks/useSupport';

export default function SupportPage() {
  const {
    // Data
    categories,
    currentData,
    totalPages,

    // State
    activeCategory,
    searchQuery,
    currentPage,
    isLoading,

    // Actions
    setActiveCategory,
    setSearchQuery,
    setCurrentPage,
  } = useSupport({
    itemsPerPage: 5
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <SupportHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <SupportFilters
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* 修正：配合 contentProps 結構，將資料包在 props={{...}} 裡 */}
      <SupportList
        props={{
          data: currentData,
          currentPage: currentPage,
          totalPages: totalPages
        }}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
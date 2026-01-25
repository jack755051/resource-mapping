'use client';

import { ProductFilterSection } from '@/components/sections/product/filter';
import { ProductHeroSection } from '@/components/sections/product/hero';
import { ProductListSection } from '@/components/sections/product/product-list';
import { useProduct } from '@/hooks/useProduct';

export default function ProductsPage() {
  // 1. 透過 Hook 取得所有資料與邏輯
  const {
    categories,
    products,
    activeCategory,
    setActiveCategory,
    totalCount,
    currentCategoryName
  } = useProduct();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 2. 英雄區塊 (純展示) */}
      <ProductHeroSection />

      {/* 3. 過濾器 (傳入控制函式) */}
      <ProductFilterSection
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* 4. 產品列表 (傳入計算後的資料) */}
      <ProductListSection
        products={products}
        categoryName={currentCategoryName}
        totalCount={totalCount}
        activeCategoryKey={activeCategory}
      />
    </div>
  );
}
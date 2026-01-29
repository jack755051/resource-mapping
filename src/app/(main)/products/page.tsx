'use client';

import { ProductFilterSection } from '@/components/sections/product/filter';
import { ProductHeroSection } from '@/components/sections/product/hero';
import { ProductListSection } from '@/components/sections/product/product-list';
import { useProduct } from '@/hooks/useProduct';

export default function ProductsPage() {
  const {
    categories,
    products,
    activeCategory,
    setActiveCategory,
    totalCount,
    currentCategoryName,
    // 🔥 從 Hook 取出這兩個
    pagination,
    setPage,
    loading,
  } = useProduct();

  return (
    <div className="min-h-screen bg-background pb-20">
      <ProductHeroSection />

      <ProductFilterSection
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* 4. 產品列表 (傳入分頁 props) */}
      <ProductListSection
        products={products}
        categoryName={currentCategoryName}
        totalCount={totalCount}
        activeCategoryKey={activeCategory}
        // 👇 傳入這些
        pagination={pagination}
        onPageChange={setPage}
        loading={loading}
      />
    </div>
  );
}

'use client';

import { Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryList } from './category-list';
import { ProductSearch } from './product-search';
import { useProduct } from '@/hooks/useProduct';

export function ProductFilterSection() {
  // =========================================================================
  // 🔥 統一數據源：從 useProduct hook 獲取所有數據
  // =========================================================================
  const { categories, activeCategory, setActiveCategory } = useProduct();

  const hasData = categories && categories.length > 0;

  // 邏輯：
  // 1. 如果外部傳入 activeCategory，優先使用。
  // 2. 如果外部傳入空字串，且有分類資料，預設選中第一個 (通常是 "All")。
  // 3. 確保子組件永遠拿到一個有效的 ID (除非完全沒資料)。
  const currentActiveId = activeCategory || (hasData ? categories[0].id : '');

  // 安全保護：如果完全沒資料，可以選擇不渲染或渲染 Skeleton
  if (!hasData) return null;

  return (
    <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">

          {/* 左側：分類列表 */}
          <CategoryList
            categories={categories}
            // 使用計算後的有效 ID
            activeCategory={currentActiveId}
            onCategoryChange={setActiveCategory}
          />

          {/* 右側：工具列 */}
          <div className="hidden md:flex items-center gap-2 border-l border-border pl-4 ml-2">

            {/* 搜尋功能 */}
            <ProductSearch
              categories={categories}
              onCategorySelect={setActiveCategory}
            />

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Grid3X3 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
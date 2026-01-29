'use client';

import { Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryList } from './category-list';
import { ProductSearch } from './product-search';

interface FilterSectionProps {
  categories: { id: string; name: string }[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export function ProductFilterSection({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterSectionProps) {
  return (
    <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* 左側：分類列表 (獨立組件) */}
          <CategoryList
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
          />

          {/* 右側：工具列 */}
          <div className="hidden md:flex items-center gap-2 border-l border-border pl-4 ml-2">
            {/* 搜尋功能 (獨立組件) */}
            <ProductSearch
              categories={categories}
              onCategorySelect={onCategoryChange}
            />

            {/* 其他視圖切換按鈕 */}
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

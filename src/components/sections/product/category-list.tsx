'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProductCategory } from '@/type/page/product';
import { useTranslation } from '@/hooks/useTranslation';
import { getLocalizedContent } from '@/type/i18n';

interface CategoryListProps {
  categories: ProductCategory[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export function CategoryList({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryListProps) {
  const { language } = useTranslation();

  return (
    <div className="flex-1 overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
      <div className="flex items-center gap-1">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          // 解析多語系名稱
          const localizedName = getLocalizedContent(cat.label, language);

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                'relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300',
                isActive
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/25"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  style={{ borderRadius: 9999 }}
                />
              )}
              {/* 顯示解析後的名稱 */}
              <span className="relative z-10">{localizedName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

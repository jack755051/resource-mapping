'use client';

import { PaginationControl } from '@/components/sections/product/pagination-control';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductCard } from '@/components/layout/site-product-card';
import { ProductSkeletonCard } from '@/components/layout/skeleton/product-skeleton-card';
import { SlidersHorizontal } from 'lucide-react';
import { useProduct } from '@/hooks/useProduct';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface ProductListSectionProps {
  className?: string;
  classNames?: {
    container?: string;
    header?: string;
    grid?: string;
    emptyState?: string;
    pagination?: string;
  };
}

export function ProductListSection({
  className,
  classNames,
}: ProductListSectionProps = {}) {
  const { t } = useTranslation();
  // =========================================================================
  // 🔥 統一數據源：從 useProduct hook 獲取所有數據
  // =========================================================================
  const {
    products,
    currentCategoryName,
    totalCount,
    activeCategory,
    pagination,
    setPage,
    loading,
  } = useProduct();

  const categoryName = currentCategoryName;
  const activeCategoryKey = activeCategory;
  // 1. 移除最上面的 if (loading) return...
  // 2. 移除最上面的 if (products.length === 0) return...
  // 我們要把它們整合到下面的 render 裡，這樣 AnimatePresence 才能運作

  return (
    // min-h-[80vh] 是防止抖動的關鍵
    <section
      className={cn(
        'section-container section-y-sm min-h-[60vh] sm:min-h-[80vh]',
        className,
        classNames?.container
      )}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          // -------------------------------------------
          // 狀態 A: 載入中 (顯示骨架屏)
          // -------------------------------------------
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 標題也要給骨架，避免高度跳動 */}
            <div className="mb-8 flex items-baseline gap-4">
              <div className="h-8 w-32 bg-muted/50 rounded animate-pulse" />
              <div className="h-4 w-20 bg-muted/50 rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeletonCard key={i} />
              ))}
            </div>
          </motion.div>
        ) : products.length === 0 ? (
          // -------------------------------------------
          // 狀態 B: 無資料 (Empty State)
          // -------------------------------------------
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              'py-32 flex flex-col items-center justify-center text-center border-2 border-dashed border-border/50 rounded-3xl',
              classNames?.emptyState
            )}
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">
              {t('products.list.empty.title')}
            </h3>
            <p className="text-muted-foreground mt-2">
              {t('products.list.empty.desc', { category: categoryName })}
            </p>
          </motion.div>
        ) : (
          // -------------------------------------------
          // 狀態 C: 正常顯示產品
          // -------------------------------------------
          // 關鍵修正：這裡必須包一個 motion.div 作為唯一的父節點
          <motion.div
            key={activeCategoryKey} // 用 categoryKey 觸發切換動畫
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* 標題與計數 */}
            <div
              className={cn(
                'mb-8 flex items-baseline gap-4',
                classNames?.header
              )}
            >
              <h2 className="text-2xl font-bold">{categoryName}</h2>
              <span className="text-muted-foreground text-sm">
                {t('products.list.count', { count: totalCount })}
              </span>
            </div>

            {/* 產品網格 */}
            <div
              className={cn(
                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8',
                classNames?.grid
              )}
            >
              {products.map(product => (
                <ProductCard key={product.id} props={product} />
              ))}
            </div>

            {/* 分頁控制器 - 添加分隔線和更好的間距 */}
            {pagination && pagination.totalPages > 1 && (
              <div
                className={cn(
                  'mt-16 pt-8 border-t border-border/50',
                  classNames?.pagination
                )}
              >
                <PaginationControl
                  pagination={pagination}
                  onPageChange={setPage}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

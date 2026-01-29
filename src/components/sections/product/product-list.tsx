'use client';

import { ProductCardData } from '@/type/page/product';
import { Pagination } from '@/type/common';
import { PaginationControl } from '@/components/sections/product/pagination-control';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductCard } from '@/components/layout/site-product-card';
import { ProductSkeletonCard } from '@/components/layout/skeleton/product-skeleton-card';
import { SlidersHorizontal } from 'lucide-react'; // 建議加個 icon 讓空狀態好看點

interface ProductListSectionProps {
  products: ProductCardData[];
  categoryName?: string;
  totalCount: number;
  activeCategoryKey: string;
  pagination: Pagination | null;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export function ProductListSection({
  products,
  categoryName,
  totalCount,
  activeCategoryKey,
  pagination,
  onPageChange,
  loading,
}: ProductListSectionProps) {
  // 1. 移除最上面的 if (loading) return...
  // 2. 移除最上面的 if (products.length === 0) return...
  // 我們要把它們整合到下面的 render 裡，這樣 AnimatePresence 才能運作

  return (
    // min-h-[80vh] 是防止抖動的關鍵
    <section className="container mx-auto px-6 py-12 min-h-[80vh]">
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
            className="py-32 flex flex-col items-center justify-center text-center border-2 border-dashed border-border/50 rounded-3xl"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">目前尚無產品</h3>
            <p className="text-muted-foreground mt-2">
              分類「{categoryName}」目前沒有相關資料。
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
            <div className="mb-8 flex items-baseline gap-4">
              <h2 className="text-2xl font-bold">{categoryName}</h2>
              <span className="text-muted-foreground text-sm">
                共 {totalCount} 項產品
              </span>
            </div>

            {/* 產品網格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>

            {/* 分頁控制器 */}
            <div className="mt-12">
              <PaginationControl
                pagination={pagination}
                onPageChange={onPageChange}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; // 假設你有這個
import { cn } from '@/lib/utils';
import { Pagination } from '@/type/common';
import { useTranslation } from '@/hooks/useTranslation';

interface PaginationControlProps {
  pagination: Pagination | null;
  onPageChange: (page: number) => void;
}

export function PaginationControl({
  pagination,
  onPageChange,
}: PaginationControlProps) {
  const { t } = useTranslation();
  if (!pagination || pagination.totalPages <= 1) return null;

  const { current, totalPages } = pagination;

  // 產生頁碼陣列 (簡單版：只顯示前後)
  // 如果想要像 Google 那種 1 ... 5 6 7 ... 10 的邏輯會更複雜一點
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 分頁控制按鈕 */}
      <div className="flex items-center justify-center gap-2">
        {/* 上一頁 */}
        <Button
          variant="outline"
          size="icon"
          disabled={current === 1}
          onClick={() => onPageChange(current - 1)}
          className={cn(
            'h-10 w-10 transition-colors',
            current === 1 && 'opacity-50 cursor-not-allowed'
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">{t('common.pagination.previous')}</span>
        </Button>

        {/* 頁碼按鈕 (手機版可以隱藏中間，只留當前頁) */}
        <div className="hidden sm:flex gap-2">
          {pages.map(page => {
            // 這裡做個簡單優化：只顯示當前頁面 附近 的頁碼
            // 例如：只顯示 [1] ... [4] [5] [6] ... [10]
            if (
              page === 1 ||
              page === totalPages ||
              (page >= current - 1 && page <= current + 1)
            ) {
              return (
                <Button
                  key={page}
                  variant={current === page ? 'default' : 'outline'}
                  onClick={() => onPageChange(page)}
                  className={cn(
                    'h-10 w-10 transition-all',
                    current === page && 'pointer-events-none shadow-lg'
                  )}
                >
                  {page}
                </Button>
              );
            }
            // 顯示省略號的邏輯 (簡化處理)
            if (page === current - 2 || page === current + 2) {
              return (
                <span
                  key={page}
                  className="px-1 py-2 text-muted-foreground text-sm"
                >
                  ...
                </span>
              );
            }
            return null;
          })}
        </div>

        {/* 手機版只顯示當前頁碼文字 */}
        <div className="sm:hidden flex items-center gap-2 px-4">
          <span className="text-sm font-medium">{current}</span>
          <span className="text-sm text-muted-foreground">/ {totalPages}</span>
        </div>

        {/* 下一頁 */}
        <Button
          variant="outline"
          size="icon"
          disabled={current === totalPages}
          onClick={() => onPageChange(current + 1)}
          className={cn(
            'h-10 w-10 transition-colors',
            current === totalPages && 'opacity-50 cursor-not-allowed'
          )}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">{t('common.pagination.next')}</span>
        </Button>
      </div>

      {/* 頁面資訊提示 - 桌面版 */}
      <div className="hidden sm:block text-sm text-muted-foreground">
        {t('common.pagination.pageInfo', {
          current,
          total: totalPages,
        })}
      </div>
    </div>
  );
}

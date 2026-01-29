'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; // 假設你有這個
import { cn } from '@/lib/utils';
import { Pagination } from '@/type/common';

interface PaginationControlProps {
  pagination: Pagination | null;
  onPageChange: (page: number) => void;
}

export function PaginationControl({
  pagination,
  onPageChange,
}: PaginationControlProps) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { current, totalPages } = pagination;

  // 產生頁碼陣列 (簡單版：只顯示前後)
  // 如果想要像 Google 那種 1 ... 5 6 7 ... 10 的邏輯會更複雜一點
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* 上一頁 */}
      <Button
        variant="outline"
        size="icon"
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
        className="h-10 w-10"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous Page</span>
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
                  'h-10 w-10',
                  current === page && 'pointer-events-none'
                )}
              >
                {page}
              </Button>
            );
          }
          // 顯示省略號的邏輯 (簡化處理)
          if (page === current - 2 || page === current + 2) {
            return (
              <span key={page} className="px-1 py-2 text-muted-foreground">
                ...
              </span>
            );
          }
          return null;
        })}
      </div>

      {/* 手機版只顯示當前頁碼文字 */}
      <span className="sm:hidden text-sm text-muted-foreground">
        Page {current} of {totalPages}
      </span>

      {/* 下一頁 */}
      <Button
        variant="outline"
        size="icon"
        disabled={current === totalPages}
        onClick={() => onPageChange(current + 1)}
        className="h-10 w-10"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next Page</span>
      </Button>
    </div>
  );
}

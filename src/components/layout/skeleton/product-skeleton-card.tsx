// components/layout/product-skeleton-card.tsx

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductSkeletonCard() {
  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-[1.5rem] border border-border/40 bg-card">
      {/* 1. 圖片區塊模擬 */}
      {/* 保持 aspect-[4/3] 確保高度跟真的一樣 */}
      <div className="relative aspect-[4/3] w-full p-6">
        <Skeleton className="h-full w-full rounded-xl bg-muted/50" />

        {/* 模擬左上角的 Badge */}
        <div className="absolute top-4 left-4">
          <Skeleton className="h-5 w-16 rounded-full opacity-50" />
        </div>
      </div>

      {/* 2. 標題區塊模擬 */}
      <div className="flex flex-col p-6 pb-0 space-y-3">
        {/* 模擬標題文字 (長度隨機感) */}
        <Skeleton className="h-6 w-3/4 rounded-md" />
        {/* 模擬標題下方的裝飾線 */}
        <Skeleton className="h-1 w-8 rounded-full" />
      </div>

      {/* 3. 規格區塊模擬 (Grid) */}
      <CardContent className="p-6 py-4 flex-1">
        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
          {/* 產生 4 個假的規格項目 */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5">
              {/* 模擬圓形 Icon */}
              <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
              <div className="space-y-1">
                {/* 模擬數值 */}
                <Skeleton className="h-3 w-12 rounded-sm" />
                {/* 模擬 Label */}
                <Skeleton className="h-2 w-8 rounded-sm opacity-60" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* 4. 底部按鈕區塊模擬 */}
      <CardFooter className="p-6 pt-2 mt-auto border-t border-border/30 bg-muted/5">
        <div className="w-full flex items-center justify-between">
          {/* 模擬 "View Details" 文字 */}
          <Skeleton className="h-4 w-20 rounded-sm" />
          {/* 模擬圓形箭頭按鈕 */}
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardFooter>
    </Card>
  );
}

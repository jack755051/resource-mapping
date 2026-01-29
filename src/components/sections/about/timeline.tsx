'use client';

import { ArrowRight } from 'lucide-react';
import { useAbout } from '@/hooks/useAbout';
import { cn } from '@/lib/utils'; // 用於合併 class

export function TimelineSection() {
  // 從 Hook 取得資料 (可能是 API 的，也可能是預設的)
  const { timelineData } = useAbout();
  const { header, items } = timelineData;

  return (
    <section className="border-t border-border/40 py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* 左側：標題區 (資料來自 Header) */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              {header.title}
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              {header.description}
            </p>
            <a
              href={header.ctaLink || '/contact'}
              className="inline-flex items-center text-primary font-medium hover:underline group cursor-pointer"
            >
              {header.ctaText}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* 右側：時間軸主體 (動態渲染 Items) */}
          <div className="lg:w-2/3 ml-4 lg:ml-0">
            <div className="relative border-l-2 border-border/60 space-y-12 pl-8 md:pl-12">
              {items.map((item, index) => (
                <div key={index} className="relative group">
                  {/* 圓點裝飾：根據 isActive 判斷樣式 */}
                  <div className="absolute -left-[41px] md:-left-[57px] top-1 flex h-6 w-6 items-center justify-center">
                    {item.isActive ? (
                      /* Active / Future 狀態 (閃爍動畫) */
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-6 w-6 border-4 border-background bg-primary ring-4 ring-background"></span>
                      </>
                    ) : (
                      /* 一般狀態 (靜態灰點) */
                      <span className="h-6 w-6 rounded-full border-4 border-background bg-muted-foreground/30 ring-4 ring-background transition-colors group-hover:bg-primary/50"></span>
                    )}
                  </div>

                  {/* 文字內容區塊 */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                    <span
                      className={cn(
                        'text-xl font-bold',
                        item.isActive ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {item.year}
                    </span>
                    <span
                      className={cn(
                        'text-sm font-mono uppercase tracking-wider',
                        item.isActive
                          ? 'text-primary/80'
                          : 'text-muted-foreground'
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                  <h4
                    className={cn(
                      'text-lg font-bold',
                      item.isActive ? 'text-foreground' : ''
                    )}
                  >
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

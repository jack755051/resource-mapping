'use client';

import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { QualityCarousel } from './quality-carousel';

export function SolutionsQuality() {
  const { t } = useTranslation();
  const listItems = [1, 2, 3, 4];

  return (
    <section className="section-container section-y-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* 左側：文字描述 + 2x2 特點網格 (維持不變) */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/10 text-accent-orange text-xs font-bold tracking-wider uppercase">
              {t('solutions.quality.badge')}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
              {t('solutions.quality.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('solutions.quality.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {listItems.map(index => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 sm:p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-card hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium text-foreground pt-0.5">
                  {t(`solutions.quality.list.${index}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 右側：垂直輪播展示區 */}
        <QualityCarousel />
      </div>
    </section>
  );
}

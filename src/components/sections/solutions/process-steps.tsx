'use client';

import { ClipboardCheck, PenTool, HardHat, Settings } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export function SolutionsProcessSteps() {
  const { t } = useTranslation();

  const steps = [
    { icon: ClipboardCheck, keyIndex: 1, label: '01' },
    { icon: PenTool, keyIndex: 2, label: '02' },
    { icon: HardHat, keyIndex: 3, label: '03' },
    { icon: Settings, keyIndex: 4, label: '04' },
  ];

  return (
    <section className="py-20 bg-muted/30 border-y border-border/40 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">{t('solutions.process.title')}</h2>
          <p className="text-muted-foreground mt-2">{t('solutions.process.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* 裝飾線：僅在桌面版顯示，串聯各步驟 */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.keyIndex}
                className="group relative bg-background border border-border/50 p-6 rounded-3xl hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* 1. Icon 懸浮球 */}
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>

                {/* 2. 背景浮水印數字 (視覺層級最低，增加豐富度) */}
                <div className="absolute top-4 right-4 text-6xl font-black text-muted/10 select-none group-hover:text-primary/5 transition-colors">
                  {step.label}
                </div>

                {/* 3. 文字內容 */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {t(`solutions.steps.${step.keyIndex}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`solutions.steps.${step.keyIndex}.desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

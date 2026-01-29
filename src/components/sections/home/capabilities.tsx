'use client';

import {
  Activity,
  Eye,
  Wrench,
  HomeIcon,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export function CapabilitySection() {
  const { t } = useTranslation();

  // 定義統一的 Tag 基礎樣式 (減少重複代碼，確保統一)
  const baseTagClass =
    'px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase w-fit';

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-16 md:text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          {t('home.capabilities.title')}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          {t('home.capabilities.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
        {/* 1. Visual Management (大格) - Primary 色系 */}
        <div className="md:col-span-2 md:row-span-2 rounded-[2rem] border border-border bg-card p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/50 group">
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Activity className="w-7 h-7" />
              </div>
              {/* Tag 1: Primary */}
              <span className={cn(baseTagClass, 'bg-primary/10 text-primary')}>
                {t('home.capabilities.visual.tag')}
              </span>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t('home.capabilities.visual.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {t('home.capabilities.visual.desc')}
              </p>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
        </div>

        {/* 2. Extreme Tech (小格) - Cyan 色系 */}
        <div className="md:col-span-1 rounded-[2rem] border border-border bg-card p-6 flex flex-col justify-between transition-all duration-300 hover:bg-cyan-500/5 hover:border-cyan-500/50 hover:shadow-lg hover:-translate-y-1 group">
          <div className="flex justify-between items-start mb-4">
            <Eye className="w-8 h-8 text-cyan-500" />
            <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            {/* Tag 2: Cyan (已修正：加上背景色與圓角) */}
            <span
              className={cn(baseTagClass, 'bg-cyan-500/10 text-cyan-600 mb-3')}
            >
              {t('home.capabilities.extreme.tag')}
            </span>
            <h3 className="text-lg font-bold text-foreground">
              {t('home.capabilities.extreme.title')}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {t('home.capabilities.extreme.desc')}
            </p>
          </div>
        </div>

        {/* 3. Installation (小格) - Orange 色系 */}
        <div className="md:col-span-1 rounded-[2rem] border border-border bg-card p-6 flex flex-col justify-between transition-all duration-300 hover:bg-orange-500/5 hover:border-orange-500/50 hover:shadow-lg hover:-translate-y-1 group">
          <div className="flex justify-between items-start mb-4">
            <Wrench className="w-8 h-8 text-orange-500" />
            <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            {/* Tag 3: Orange (已修正：加上背景色與圓角) */}
            <span
              className={cn(
                baseTagClass,
                'bg-orange-500/10 text-orange-600 mb-3'
              )}
            >
              {t('home.capabilities.install.tag')}
            </span>
            <h3 className="text-lg font-bold text-foreground">
              {t('home.capabilities.install.title')}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {t('home.capabilities.install.desc')}
            </p>
          </div>
        </div>

        {/* 4. Home (寬格) - Green 色系 */}
        <div className="md:col-span-2 rounded-[2rem] border border-border bg-card p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden transition-all duration-300 hover:border-green-500/50 hover:shadow-lg hover:bg-green-50/50 dark:hover:bg-green-900/10">
          <div className="space-y-3 relative z-10 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <HomeIcon className="w-6 h-6 text-green-500" />
              {/* Tag 4: Green (已修正：樣式統一) */}
              <span
                className={cn(baseTagClass, 'bg-green-500/10 text-green-600')}
              >
                {t('home.capabilities.home.tag')}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              {t('home.capabilities.home.title')}
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              {t('home.capabilities.home.desc')}
            </p>
          </div>

          <div className="hidden md:block relative w-32 h-32 opacity-10 rotate-12">
            <ShieldCheck className="w-full h-full text-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}

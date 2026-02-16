'use client';

import { Factory, Store, Anchor, ArrowUpRight } from 'lucide-react'; // 新增 ArrowUpRight
import { useTranslation } from '@/hooks/useTranslation';

export function ClientSection() {
  const { t } = useTranslation();

  return (
    <section className="section-y border-b border-border/40 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Label 稍微加大間距，讓它更像一個 Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-primary uppercase tracking-widest">
            {t('home.clients.label')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1. Manufacturing */}
          <div className="group flex flex-col items-start gap-4 p-6 sm:p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
            <div className="flex justify-between w-full">
              <div className="p-3.5 rounded-2xl bg-accent-blue/10 text-accent-blue group-hover:scale-110 transition-transform duration-300">
                <Factory className="w-6 h-6" />
              </div>
              {/* 裝飾性箭頭，hover 時顯現 */}
              <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </div>

            <div className="relative z-10">
              <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                {t('home.clients.factory.title')}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('home.clients.factory.desc')}
              </p>
            </div>
            {/* 背景裝飾光暈 */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl group-hover:bg-accent-blue/10 transition-colors" />
          </div>

          {/* 2. Retail */}
          <div className="group flex flex-col items-start gap-4 p-6 sm:p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
            <div className="flex justify-between w-full">
              <div className="p-3.5 rounded-2xl bg-accent-orange/10 text-accent-orange group-hover:scale-110 transition-transform duration-300">
                <Store className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </div>

            <div className="relative z-10">
              <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                {t('home.clients.retail.title')}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('home.clients.retail.desc')}
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent-orange/5 rounded-full blur-3xl group-hover:bg-accent-orange/10 transition-colors" />
          </div>

          {/* 3. Special */}
          <div className="group flex flex-col items-start gap-4 p-6 sm:p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
            <div className="flex justify-between w-full">
              <div className="p-3.5 rounded-2xl bg-accent-cyan/10 text-accent-cyan group-hover:scale-110 transition-transform duration-300">
                <Anchor className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </div>

            <div className="relative z-10">
              <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                {t('home.clients.special.title')}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('home.clients.special.desc')}
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent-cyan/5 rounded-full blur-3xl group-hover:bg-accent-cyan/10 transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
}

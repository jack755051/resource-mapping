'use client';

import { Factory, Store, Anchor } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function ClientSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 border-b border-border/40 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-10">
          {t('home.clients.label')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1. Manufacturing */}
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <Factory className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {t('home.clients.factory.title')}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t('home.clients.factory.desc')}
              </p>
            </div>
          </div>

          {/* 2. Retail */}
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
            <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {t('home.clients.retail.title')}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t('home.clients.retail.desc')}
              </p>
            </div>
          </div>

          {/* 3. Special */}
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
            <div className="p-3 rounded-xl bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400">
              <Anchor className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {t('home.clients.special.title')}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t('home.clients.special.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

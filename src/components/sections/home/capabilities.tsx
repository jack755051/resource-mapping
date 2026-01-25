'use client';

import { Activity, Eye, Wrench, HomeIcon, ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function CapabilitySection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-12 md:text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">
          {t('home.capabilities.title')}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          {t('home.capabilities.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
        {/* Visual Management */}
        <div className="md:col-span-2 md:row-span-2 rounded-[2rem] border border-border bg-card p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50 group">
          <div className="relative z-10 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
              <Activity className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              {t('home.capabilities.visual.title')}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {t('home.capabilities.visual.desc')}
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
        </div>

        {/* Extreme Tech */}
        <div className="md:col-span-1 rounded-[2rem] border border-border bg-card p-6 flex flex-col justify-between transition-all duration-300 hover:bg-cyan-500/5 hover:border-cyan-500/50 hover:shadow-lg hover:-translate-y-1">
          <Eye className="w-8 h-8 text-cyan-500 mb-4" />
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {t('home.capabilities.extreme.title')}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {t('home.capabilities.extreme.desc')}
            </p>
          </div>
        </div>

        {/* Installation */}
        <div className="md:col-span-1 rounded-[2rem] border border-border bg-card p-6 flex flex-col justify-between transition-all duration-300 hover:bg-orange-500/5 hover:border-orange-500/50 hover:shadow-lg hover:-translate-y-1">
          <Wrench className="w-8 h-8 text-orange-500 mb-4" />
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {t('home.capabilities.install.title')}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {t('home.capabilities.install.desc')}
            </p>
          </div>
        </div>

        {/* Home */}
        <div className="md:col-span-2 rounded-[2rem] border border-border bg-card p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden transition-all duration-300 hover:border-green-500/50 hover:shadow-lg hover:bg-green-50/50 dark:hover:bg-green-900/10">
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <HomeIcon className="w-6 h-6 text-green-500" />
              <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {t('home.capabilities.home.tag')}
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {t('home.capabilities.home.title')}
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              {t('home.capabilities.home.desc')}
            </p>
          </div>

          <div className="hidden md:block relative w-24 h-24 opacity-10">
            <ShieldCheck className="w-full h-full text-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}

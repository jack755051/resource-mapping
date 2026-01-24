'use client'; // <--- 關鍵：必須加上這行才能用 useTranslation

import {
  ArrowRight,
  Factory,
  Store,
  Anchor,
  ShieldCheck,
  Activity,
  Eye,
  Wrench,
  HomeIcon
} from 'lucide-react';
import Link from 'next/link';

// 引入翻譯 Hook
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* -----------------------------------------------------------------
          SECTION A: HERO
      ----------------------------------------------------------------- */}
      <section className="relative w-full py-24 md:py-32 lg:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/40">

        {/* 1. 背景層 */}
        <div className="absolute inset-0 z-0">
          {/* 漸層遮罩 (保持文字可讀性) */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background z-10" />

          {/* 圖片層 - 建議換成這張現代工廠圖，更有「資產管理」的感覺 */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 contrast-125 grayscale mix-blend-multiply" />

          {/* --- 新增：HUD 監控介面裝飾 (關鍵！) --- */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
            {/* 四個角落的瞄準框 (Corners) */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary"></div>
            <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary"></div>

            {/* 中央十字準心 (選擇性) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-primary/20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[1px] bg-primary/20"></div>

            {/* 模擬錄影中的 REC 紅點 (右上角) */}
            <div className="absolute top-12 right-12 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-xs font-mono text-primary/80 tracking-widest">REC 00:04:23:12</span>
            </div>

            {/* 模擬數據跑馬燈 (左下角) */}
            <div className="absolute bottom-12 left-12 font-mono text-[10px] text-primary/40 leading-tight hidden md:block">
              SYS: ONLINE<br />
              CAM_ID: 08-AX<br />
              NET: 1GB/S<br />
              AI_DETECT: ACTIVE
            </div>
          </div>
          {/* --- HUD 結束 --- */}

          {/* 原有的網格背景 (保留科技感) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] z-10" />
        </div>

        {/* 2. 內容層 */}
        <div className="relative z-30 text-center px-4 max-w-5xl mx-auto space-y-8">

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium animate-in fade-in zoom-in duration-1000">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            {t('home.hero.badge')}
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
            {t('home.hero.title.prefix')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              {t('home.hero.title.highlight')}
            </span>
          </h1>

          {/* Sub Headline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/enterprise"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              {t('home.hero.cta.business')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>

            <Link
              href="/special-solutions"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border bg-background/60 backdrop-blur hover:bg-muted font-medium transition-colors"
            >
              {t('home.hero.cta.special')}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full" />
      </section>

      {/* -----------------------------------------------------------------
          SECTION B: CLIENT TYPES
      ----------------------------------------------------------------- */}
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
                <h3 className="font-bold text-lg">{t('home.clients.factory.title')}</h3>
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
                <h3 className="font-bold text-lg">{t('home.clients.retail.title')}</h3>
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
                <h3 className="font-bold text-lg">{t('home.clients.special.title')}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('home.clients.special.desc')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION C: CAPABILITIES
      ----------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-12 md:text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">{t('home.capabilities.title')}</h2>
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
              <h3 className="text-2xl font-bold text-foreground">{t('home.capabilities.visual.title')}</h3>
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
              <h3 className="text-lg font-bold text-foreground">{t('home.capabilities.extreme.title')}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t('home.capabilities.extreme.desc')}
              </p>
            </div>
          </div>

          {/* Installation */}
          <div className="md:col-span-1 rounded-[2rem] border border-border bg-card p-6 flex flex-col justify-between transition-all duration-300 hover:bg-orange-500/5 hover:border-orange-500/50 hover:shadow-lg hover:-translate-y-1">
            <Wrench className="w-8 h-8 text-orange-500 mb-4" />
            <div>
              <h3 className="text-lg font-bold text-foreground">{t('home.capabilities.install.title')}</h3>
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
              <h3 className="text-xl font-bold text-foreground">{t('home.capabilities.home.title')}</h3>
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

      {/* -----------------------------------------------------------------
          SECTION D: CTA
      ----------------------------------------------------------------- */}
      <section className="py-24 px-6 text-center bg-muted/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t('home.cta.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl">
              {t('home.cta.button')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
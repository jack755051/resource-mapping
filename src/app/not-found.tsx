'use client';

import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* 1. 背景裝飾 (延續 Hero 風格) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

        {/* HUD 邊框裝飾 */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-muted-foreground/20"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-muted-foreground/20"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-muted-foreground/20"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-muted-foreground/20"></div>

        {/* 狀態代碼 */}
        <div className="absolute top-12 right-12 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-orange animate-pulse"></div>
          <span className="text-xs font-mono text-accent-orange/80 tracking-widest uppercase">
            {t('common.not_found.status')}
          </span>
        </div>
      </div>

      {/* 2. 主內容 */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-muted/30 border border-border/50 mb-8 backdrop-blur-sm">
          <FileQuestion className="w-10 h-10 text-muted-foreground" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-4">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {t('common.not_found.title')}
        </h2>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
          {t('common.not_found.desc')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <Home className="mr-2 w-4 h-4" />
            {t('common.action.back_home')}
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border bg-background/60 backdrop-blur hover:bg-muted font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            {t('common.action.go_back')}
          </button>
        </div>
      </div>

      {/* 底部裝飾 */}
      <div className="absolute bottom-12 left-0 w-full text-center">
        <p className="font-mono text-[10px] text-muted-foreground/40 tracking-[0.2em]">
          {t('common.not_found.footer')}
        </p>
      </div>
    </div>
  );
}

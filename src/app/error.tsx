'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, LifeBuoy } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    // 可以在這裡將錯誤記錄到 Log 服務 (如 Sentry)
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* 1. 背景裝飾 (紅色警示風格) */}
      <div className="absolute inset-0 z-0">
        {/* 雜訊背景 (模擬干擾) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444408_1px,transparent_1px),linear-gradient(to_bottom,#ef444408_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* 紅色光暈 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-destructive/5 rounded-full blur-[100px]" />

        {/* HUD 邊框 */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-destructive/20"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-destructive/20"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-destructive/20"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-destructive/20"></div>

        {/* 狀態代碼 */}
        <div className="absolute top-12 right-12 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive animate-ping"></div>
          <span className="text-xs font-mono text-destructive/80 tracking-widest uppercase">
            SYSTEM ERROR
          </span>
        </div>
      </div>

      {/* 2. 主內容 */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-destructive/10 border border-destructive/20 mb-8 backdrop-blur-sm animate-in zoom-in duration-500">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          {t('common.error.title') || '系統發生預期外的錯誤'}
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {t('common.error.desc') ||
            '我們的監控系統偵測到異常。請嘗試重新整理，若問題持續發生，請聯繫技術支援。'}
        </p>

        {/* 錯誤代碼 (僅在開發環境或有 digest 時顯示，增加科技感) */}
        {error.digest && (
          <div className="mb-8 p-3 bg-muted/50 rounded-lg border border-border/50 inline-block">
            <code className="text-xs font-mono text-muted-foreground">
              Digest: {error.digest}
            </code>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-destructive text-destructive-foreground font-medium transition-all hover:bg-destructive/90 shadow-lg shadow-destructive/20 hover:shadow-destructive/40 hover:-translate-y-0.5"
          >
            <RotateCcw className="mr-2 w-4 h-4" />
            {t('common.action.retry') || '重新載入'}
          </button>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border bg-background/60 backdrop-blur hover:bg-muted font-medium transition-colors"
          >
            <LifeBuoy className="mr-2 w-4 h-4" />
            {t('common.action.contact_support') || '聯繫支援'}
          </Link>
        </div>
      </div>

      {/* 底部裝飾 */}
      <div className="absolute bottom-12 left-0 w-full text-center">
        <p className="font-mono text-[10px] text-destructive/40 tracking-[0.2em]">
          STATUS: CRITICAL_FAILURE // ACTION_REQUIRED
        </p>
      </div>
    </div>
  );
}

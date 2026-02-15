'use client';

import { SignalZero } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function MonitorErrorState() {
  const { t } = useTranslation();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 overflow-hidden">
      {/* 背景雜訊線動畫 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />

      {/* 大大的 ERROR 背景字 */}
      <div className="text-red-900/50 font-mono text-4xl font-bold absolute select-none animate-pulse">
        {t('liveView.error.title')}
      </div>

      {/* 前景圖示 */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <SignalZero className="w-8 h-8 text-gray-700" />
        <div className="text-gray-500 font-mono text-xs tracking-widest bg-black/50 px-2 py-1 rounded">
          {t('liveView.error.signalLost')}
        </div>
      </div>
    </div>
  );
}

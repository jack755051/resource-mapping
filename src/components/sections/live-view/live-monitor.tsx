'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { EmptyLiveMonitor } from './empty-live-monitor';
import { SingleMonitorFrame } from './single-monitor-frame';
import {
  Radio,
  Grid2X2,
  Square,
  LayoutGrid,
  SignalHigh,
  SignalZero,
} from 'lucide-react';
import { LIVE_CHANNELS } from '@/config/live-channels';
import { cn } from '@/lib/utils';

type LayoutMode = 'single' | 'grid-4' | 'grid-9';

export function LiveMonitor() {
  const { t } = useTranslation();

  // 狀態管理
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('single');
  const [activeChannelId, setActiveChannelId] = useState<string>(
    LIVE_CHANNELS[0]?.id
  );

  // 🛡️ 如果完全沒頻道配置，直接顯示大空狀態
  if (LIVE_CHANNELS.length === 0) {
    return <EmptyLiveMonitor />;
  }

  // 計算可見頻道
  const getVisibleChannels = () => {
    if (layoutMode === 'single') {
      return LIVE_CHANNELS.filter(c => c.id === activeChannelId);
    }
    const limit = layoutMode === 'grid-4' ? 4 : 9;
    return LIVE_CHANNELS.slice(0, limit);
  };

  const visibleChannels = getVisibleChannels();

  return (
    <section className="py-12 bg-black/95 text-white overflow-hidden border-y border-white/10">
      <div className="container mx-auto px-6">
        {/* --- Header & Controls --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 border-b border-white/20 pb-4 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-widest uppercase text-primary">
              {t('liveView.live.title')}
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-1">
              {t('liveView.live.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* 視圖切換器 */}
            <div className="flex bg-gray-900 rounded-lg p-1 border border-white/10">
              <ViewModeButton
                mode="single"
                current={layoutMode}
                onClick={setLayoutMode}
                icon={Square}
              />
              <ViewModeButton
                mode="grid-4"
                current={layoutMode}
                onClick={setLayoutMode}
                icon={Grid2X2}
              />
              <ViewModeButton
                mode="grid-9"
                current={layoutMode}
                onClick={setLayoutMode}
                icon={LayoutGrid}
              />
            </div>

            {/* LIVE Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-red-900/30 border border-red-500/50 text-red-500 text-xs font-bold animate-pulse">
              <Radio className="w-3 h-3" />
              <span>{t('liveView.live.badge')}</span>
            </div>
          </div>
        </div>

        {/* --- 單一視圖的頻道選擇器 --- */}
        {layoutMode === 'single' && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-thin scrollbar-thumb-primary/20">
            {LIVE_CHANNELS.map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannelId(channel.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded border text-xs font-mono whitespace-nowrap transition-all',
                  activeChannelId === channel.id
                    ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]'
                    : 'bg-gray-900 border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                )}
              >
                {channel.isOffline ? (
                  <SignalZero className="w-3 h-3 text-red-500" />
                ) : (
                  <SignalHigh className="w-3 h-3 text-green-500" />
                )}
                {channel.name}
              </button>
            ))}
          </div>
        )}

        {/* --- Grid 容器 --- */}
        <div
          className={cn(
            'grid gap-4 transition-all duration-500 ease-in-out',
            layoutMode === 'single' && 'grid-cols-1',
            layoutMode === 'grid-4' &&
              'grid-cols-1 md:grid-cols-2 aspect-[16/9] md:aspect-auto',
            layoutMode === 'grid-9' &&
              'grid-cols-1 md:grid-cols-3 aspect-[16/9] md:aspect-auto'
          )}
        >
          {visibleChannels.map(channel => (
            <SingleMonitorFrame key={channel.id} channel={channel} />
          ))}

          {/* 填充空格 (如果需要維持網格形狀) */}
          {layoutMode !== 'single' &&
            Array.from({
              length:
                (layoutMode === 'grid-4' ? 4 : 9) - visibleChannels.length,
            }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="bg-gray-950/50 border border-white/5 rounded-lg flex items-center justify-center min-h-[200px]"
              >
                <span className="text-gray-800 font-mono text-xs">
                  {t('liveView.live.noSource')}
                </span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

// 輔助組件：按鈕 (減少重複代碼)
function ViewModeButton({
  mode,
  current,
  onClick,
  icon: Icon,
}: {
  mode: LayoutMode;
  current: LayoutMode;
  onClick: (m: LayoutMode) => void;
  icon: any;
}) {
  return (
    <button
      onClick={() => onClick(mode)}
      className={cn(
        'p-2 rounded transition-all',
        current === mode
          ? 'bg-primary text-primary-foreground shadow-lg'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      )}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

'use client';

import { cn } from '@/lib/utils';
import { LiveChannel } from '@/config/live-channels';
import { MonitorErrorState } from './monitor-error-state';
import { useTranslation } from '@/hooks/useTranslation';

interface SingleMonitorFrameProps {
  channel: LiveChannel;
}

export function SingleMonitorFrame({ channel }: SingleMonitorFrameProps) {
  const { t } = useTranslation();

  // --- 1. 核心來源判斷邏輯 ---
  const getSource = () => {
    // A. 如果是 WebRTC 模式 (優先使用 streamUrl)
    if (channel.provider === 'webrtc' && channel.streamUrl) {
      return channel.streamUrl;
    }

    // B. 如果是 YouTube 模式 (保留原本邏輯作為備援)
    if (channel.provider === 'youtube') {
      if (channel.youtubeChannelId) {
        return `https://www.youtube.com/embed/live_stream?channel=${channel.youtubeChannelId}&autoplay=1&mute=1&controls=0&modestbranding=1`;
      }
      if (channel.youtubeVideoId) {
        return `https://www.youtube.com/embed/${channel.youtubeVideoId}?autoplay=1&mute=1&controls=0&modestbranding=1`;
      }
    }

    return null;
  };

  const src = getSource();
  const isOffline = channel.isOffline || !src;

  return (
    <div className="relative aspect-video w-full bg-hud-panel rounded-lg overflow-hidden border border-hud-line/10 shadow-[0_0_20px_rgba(0,0,0,0.3)] group hover:border-primary/50 transition-colors">
      {/* 視覺裝飾：四角鎖定框 */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-primary/30 z-20 pointer-events-none"></div>
      <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-primary/30 z-20 pointer-events-none"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-primary/30 z-20 pointer-events-none"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-primary/30 z-20 pointer-events-none"></div>

      {/* 頻道標籤 HUD */}
      <div className="absolute top-3 left-4 z-20 bg-hud-bg/60 backdrop-blur px-2 py-0.5 rounded text-[10px] font-mono text-primary/80 border border-primary/20 shadow-sm flex items-center gap-2">
        <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
        {t('liveView.monitor.cam')}: {channel.name}
      </div>

      {/* 內容區域 */}
      {isOffline ? (
        <MonitorErrorState />
      ) : (
        <iframe
          src={src!}
          title={`${t('liveView.monitor.liveFeed')} ${channel.name}`}
          className="absolute inset-0 w-full h-full object-cover border-0"
          // 注意：WebRTC 模式下，通常不需要 pointer-events-none，除非你完全不想讓用戶點擊
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}

      {/* 狀態燈 (右下角) */}
      <div
        className={cn(
          'absolute bottom-3 right-4 z-20 w-2 h-2 rounded-full shadow-lg border border-black/50',
          isOffline ? 'bg-hud-danger' : 'bg-hud-success animate-pulse'
        )}
      />

      {/* 額外提示：如果是 WebRTC 模式顯示提示 (選配) */}
      {!isOffline && channel.provider === 'webrtc' && (
        <div className="absolute bottom-3 left-4 z-20 text-[8px] font-mono text-hud-muted uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
          Protocol: WebRTC | Latency: Ultra-Low
        </div>
      )}
    </div>
  );
}

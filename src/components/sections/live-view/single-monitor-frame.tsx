'use client';

import { cn } from '@/lib/utils';
import { LiveChannel } from '@/config/live-channels';
import { MonitorErrorState } from './monitor-error-state';

interface SingleMonitorFrameProps {
  channel: LiveChannel;
}

export function SingleMonitorFrame({ channel }: SingleMonitorFrameProps) {
  // 判斷來源 URL
  const src = channel.youtubeChannelId
    ? `https://www.youtube.com/embed/live_stream?channel=${channel.youtubeChannelId}&autoplay=1&mute=1&controls=0&modestbranding=1`
    : channel.youtubeVideoId
      ? `https://www.youtube.com/embed/${channel.youtubeVideoId}?autoplay=1&mute=1&controls=0&modestbranding=1`
      : null;

  const isOffline = channel.isOffline || !src;

  return (
    <div className="relative aspect-video w-full bg-gray-900 rounded-lg overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)] group hover:border-primary/50 transition-colors">
      {/* 裝飾：四角鎖定框 (純視覺) */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-primary/30 z-20 pointer-events-none"></div>
      <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-primary/30 z-20 pointer-events-none"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-primary/30 z-20 pointer-events-none"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-primary/30 z-20 pointer-events-none"></div>

      {/* 頻道標籤 HUD */}
      <div className="absolute top-3 left-4 z-20 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] font-mono text-primary/80 border border-primary/20 shadow-sm">
        CAM: {channel.name}
      </div>

      {/* 內容區域：離線 vs 直播 */}
      {isOffline ? (
        <MonitorErrorState />
      ) : (
        <iframe
          src={src!}
          title={`Live Feed ${channel.name}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" // pointer-events-none 防止 iframe 搶滑鼠事件
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      {/* 狀態燈 (右下角) */}
      <div
        className={cn(
          'absolute bottom-3 right-4 z-20 w-2 h-2 rounded-full shadow-lg border border-black/50',
          isOffline ? 'bg-red-500' : 'bg-green-500 animate-pulse'
        )}
      />
    </div>
  );
}

import { useTranslation } from '@/hooks/useTranslation';
import { EmptyLiveMonitor } from '@/components/sections/live-view/empty-live-monitor';
import { Radio } from 'lucide-react';

export function LiveMonitor() {
  const { t } = useTranslation();
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

  if (!channelId) {
    return <EmptyLiveMonitor />;
  }

  return (
    <section className="py-12 bg-black/95 text-white overflow-hidden border-y border-white/10">
      <div className="container mx-auto px-6">
        {/* Header HUD */}
        <div className="flex justify-between items-end mb-6 border-b border-white/20 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-widest uppercase text-primary">
              Live Surveillance
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-1">
              DATA_CENTER_GRADE // REAL_TIME_FEED
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-red-900/30 border border-red-500/50 text-red-500 text-xs font-bold animate-pulse">
              <Radio className="w-3 h-3" />
              <span>LIVE</span>
            </div>
            <div className="font-mono text-xs text-primary">1080P / 60FPS</div>
          </div>
        </div>

        {/* 監控螢幕外框 */}
        <div className="relative aspect-video w-full bg-gray-900 rounded-lg overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
          {/* 裝飾：四角鎖定框 */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50 z-20 pointer-events-none"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50 z-20 pointer-events-none"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50 z-20 pointer-events-none"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50 z-20 pointer-events-none"></div>

          {/* YouTube Iframe */}
          {/* 注意：embed/live_stream?channel=ID 是關鍵 */}
          <iframe
            src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&mute=1&controls=1`}
            title="San Ring Tech Live Feed"
            className="absolute inset-0 w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* 離線遮罩 (如果是透過 API 檢測到離線，可以顯示這個，目前先透過 CSS 處理) */}
          {/* 實際上 YouTube 會自己顯示離線畫面，這裡我們只做裝飾 */}
        </div>
      </div>
    </section>
  );
}
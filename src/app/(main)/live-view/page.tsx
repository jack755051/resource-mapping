'use client';

import { LiveMonitor } from '@/components/sections/live-view/live-monitor';
import { FootageGallery } from '@/components/sections/live-view/footage-gallery';

export default function LiveViewPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* LiveMonitor 會自己判斷：
         1. 如果完全沒設定頻道 -> 顯示 EmptyLiveMonitor
         2. 如果有頻道 -> 顯示監控牆 (可切換 單一/4/9 分割)
      */}
      <LiveMonitor />

      <FootageGallery />
    </div>
  );
}

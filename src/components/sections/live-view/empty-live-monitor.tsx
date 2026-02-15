'use client';

import { WifiOff, VideoOff, AlertTriangle } from 'lucide-react';

export function EmptyLiveMonitor() {
  return (
    <section className="py-12 bg-black/95 text-white overflow-hidden border-y border-white/10">
      <div className="container mx-auto px-6">
        {/* Header HUD - Modified for Offline State */}
        <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-widest uppercase text-muted-foreground">
              Surveillance System
            </h2>
            <p className="text-xs text-gray-600 font-mono mt-1">
              SYSTEM_ID: NULL // FEED_TERMINATED
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Offline Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-gray-800 border border-gray-600 text-gray-400 text-xs font-bold">
              <WifiOff className="w-3 h-3" />
              <span>OFFLINE</span>
            </div>
            <div className="font-mono text-xs text-gray-600">-- / --</div>
          </div>
        </div>

        {/* 監控螢幕外框 - 空狀態 */}
        <div className="relative aspect-video w-full bg-gray-950 rounded-lg overflow-hidden border border-white/5 shadow-inner group">
          {/* 1. 背景裝飾：動態掃描線與網格 */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />

          {/* 2. 四角鎖定框 (保留一致性，但顏色變暗) */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gray-700 z-20 opacity-50"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gray-700 z-20 opacity-50"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gray-700 z-20 opacity-50"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gray-700 z-20 opacity-50"></div>

          {/* 3. 中央內容：訊號丟失提示 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            {/* 圖示光暈動畫 */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center">
                <VideoOff className="w-8 h-8 text-gray-500" />
              </div>
            </div>

            <h3 className="text-xl md:text-3xl font-bold tracking-widest text-gray-400 mb-2 uppercase">
              No Signal Input
            </h3>
            <p className="text-gray-600 font-mono text-xs md:text-sm tracking-wide">
              ERR_CONNECTION_REFUSED // CHECK_SOURCE_CONFIG
            </p>

            {/* 底部技術細節裝飾 */}
            <div className="mt-8 flex gap-4 text-[10px] font-mono text-gray-700 uppercase tracking-widest">
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Source_Not_Found
              </span>
              <span>|</span>
              <span>Retrying...</span>
            </div>
          </div>

          {/* 4. 隨機雜訊掃描線 (可選，增加氛圍) */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5 animate-[scan_3s_linear_infinite]" />
        </div>
      </div>

      {/* Tailwind 自定義動畫 (如果 tailwind.config.ts 沒設定，可以直接寫 style) */}
      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}

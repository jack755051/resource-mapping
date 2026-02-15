// src/config/live-channels.ts

export interface LiveChannel {
  id: string;
  name: string;
  youtubeChannelId?: string; // 方案A: 透過頻道ID (適合24h直播)
  youtubeVideoId?: string; // 方案B: 透過影片ID (適合特定活動)
  isOffline?: boolean; // 強制設定為離線 (測試用)
}

export const LIVE_CHANNELS: LiveChannel[] = [
  {
    id: 'cam-01',
    name: 'MAIN_ENTRANCE', // 正門
    youtubeChannelId: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID, // 預設使用 env
  },
  {
    id: 'cam-02',
    name: 'SERVER_ROOM_A', // 機房 A
    youtubeVideoId: 'dQw4w9WgXcQ', // (範例ID，實際請換成真的直播ID)
    isOffline: true, // 模擬訊號中斷
  },
  {
    id: 'cam-03',
    name: 'PRODUCTION_LINE', // 產線
    youtubeChannelId: 'UCxxxxxxxx',
  },
  {
    id: 'cam-04',
    name: 'WAREHOUSE_ZOOM', // 倉庫
    youtubeChannelId: 'UCyyyyyyyy',
  },
  // ... 您可以繼續新增測試 9 分割
];

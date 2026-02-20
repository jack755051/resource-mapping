// src/config/live-channels.ts

/**
 * LiveChannel 介面
 *
 * 說明：
 * - 所有欄位現在都由後端 API 提供
 * - YouTube 來源在後端資料庫中管理
 */
export interface LiveChannel {
  id: string;
  name: string;
  youtubeChannelId?: string;
  youtubeVideoId?: string;
  streamUrl?: string; // 新增
  provider: 'webrtc' | 'youtube'; // 新增
  isOffline?: boolean;
}

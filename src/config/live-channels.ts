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
  youtubeChannelId?: string; // 方案A: 透過頻道ID (適合24h直播)
  youtubeVideoId?: string; // 方案B: 透過影片ID (適合特定活動)
  isOffline?: boolean; // 強制設定為離線 (測試用)
}

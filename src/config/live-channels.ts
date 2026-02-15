// src/config/live-channels.ts

/**
 * LiveChannel 介面
 *
 * 說明：
 * - id 和 name 由後端 API 提供
 * - youtubeChannelId 和 youtubeVideoId 需要在前端配置
 * - 可以透過環境變數或靜態配置管理 YouTube 來源
 */
export interface LiveChannel {
  id: string;
  name: string;
  youtubeChannelId?: string; // 方案A: 透過頻道ID (適合24h直播)
  youtubeVideoId?: string; // 方案B: 透過影片ID (適合特定活動)
  isOffline?: boolean; // 強制設定為離線 (測試用)
}

/**
 * YouTube 頻道映射配置
 *
 * 說明：根據後端返回的頻道 ID，映射到對應的 YouTube 來源
 * 可以根據實際需求調整配置
 */
export const YOUTUBE_CHANNEL_MAPPING: Record<
  string,
  { youtubeChannelId?: string; youtubeVideoId?: string }
> = {
  'cam-01': {
    youtubeChannelId: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID,
  },
  'cam-02': {
    youtubeVideoId: 'dQw4w9WgXcQ', // 範例ID
  },
  'cam-03': {
    youtubeChannelId: 'UCxxxxxxxx',
  },
  'cam-04': {
    youtubeChannelId: 'UCyyyyyyyy',
  },
};

/**
 * 合併 API 數據與 YouTube 配置
 *
 * @param channels - 從 API 獲取的頻道列表
 * @returns 包含 YouTube 來源的完整頻道列表
 */
export function mergeChannelsWithYouTube(
  channels: Pick<LiveChannel, 'id' | 'name'>[]
): LiveChannel[] {
  return channels.map(channel => ({
    ...channel,
    ...(YOUTUBE_CHANNEL_MAPPING[channel.id] || {}),
  }));
}

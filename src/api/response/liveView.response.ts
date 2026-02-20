/** 取得頻道 ID 列表 **/
export interface LiveViewListResDto {
  id: string;
  name: string;
  description?: string;
  youtubeChannelId?: string;
  youtubeVideoId?: string;
  // --- 新增欄位 ---
  streamUrl?: string; // WebRTC 串流網址
  provider?: string; // 'webrtc' | 'youtube'
  // ----------------
  sort: number;
  isActive: boolean;
}

export interface LiveViewResDto {
  id: string;
  name: string;
  description?: string;
  youtubeChannelId?: string;
  youtubeVideoId?: string;
  sort: number;
  isActive: boolean;
}

export interface LiveViewGalleryResDto {
  id: string;
  main_image: string;
  image_url: string[];
  title: string;
  subtitle: string;
  tag: string;
}

import { LiveChannel } from '@/config/live-channels';
import {
  LiveViewListResDto,
  LiveViewGalleryResDto,
} from '../response/liveView.response';

/**
 * 前端畫廊數據模型
 * 用於 FootageGallery 組件
 */
export interface FootageGalleryData {
  id: number;
  cover: string;
  images: string[];
  titleKey: string;
  metaKey: string;
  tagKey: string;
}

export class LiveViewMapper {
  // ==========================================
  // Live Monitor Channel 轉換
  // ==========================================

  /**
   * 單一轉換：將 API 頻道 DTO 轉為 LiveChannel
   *
   * 後端字段映射：
   * - dto.id → id (頻道唯一識別碼)
   * - dto.name → name (頻道名稱)
   * - dto.youtubeChannelId → youtubeChannelId (YouTube 頻道 ID)
   * - dto.youtubeVideoId → youtubeVideoId (YouTube 影片 ID)
   *
   * ⚠️ 注意：
   * - YouTube 來源現在由後端管理，不再需要前端配置
   */
  static toDomainChannel(dto: LiveViewListResDto): LiveChannel {
    return {
      id: dto.id,
      name: dto.name,
      youtubeChannelId: dto.youtubeChannelId,
      youtubeVideoId: dto.youtubeVideoId,
    };
  }

  /**
   * 批次轉換：頻道列表
   *
   * 後端字段映射：
   * - dto.id → id (頻道唯一識別碼)
   * - dto.name → name (頻道名稱)
   * - dto.youtubeChannelId → youtubeChannelId
   * - dto.youtubeVideoId → youtubeVideoId
   *
   * ⚠️ 重要：
   * - YouTube 來源由後端直接提供，前端直接使用
   * - 不再需要合併前端配置
   *
   * @param dtos - 後端返回的頻道列表 DTO
   * @returns 完整頻道列表
   */
  static toDomainChannelList(dtos: LiveViewListResDto[]): LiveChannel[] {
    // 🛡️ 防禦性檢查：確保輸入是陣列
    if (!Array.isArray(dtos)) {
      console.warn('LiveViewMapper.toDomainChannelList: 輸入不是陣列', dtos);
      return [];
    }

    // 🛡️ 處理空陣列
    if (dtos.length === 0) {
      console.log('LiveViewMapper.toDomainChannelList: 頻道列表為空');
      return [];
    }

    try {
      // 直接轉換，不再合併前端配置
      const channels = dtos.map(dto => this.toDomainChannel(dto));

      console.log(
        `✅ LiveViewMapper: 成功轉換 ${channels.length} 個頻道`
      );

      return channels;
    } catch (error) {
      console.error('LiveViewMapper.toDomainChannelList: 轉換失敗', error);
      return [];
    }
  }

  // ==========================================
  // Footage Gallery 轉換
  // ==========================================

  /**
   * 單一轉換：將 API 畫廊 DTO 轉為 UI 用的 FootageGalleryData
   *
   * 後端字段映射：
   * - dto.id → id (轉為數字 ID)
   * - dto.main_image → cover (封面圖 URL)
   * - dto.image_url → images (圖片陣列)
   * - dto.title → titleKey (標題翻譯 key，如 'liveView.footage.1.title')
   * - dto.subtitle → metaKey (規格翻譯 key，如 'liveView.footage.1.meta')
   * - dto.tag → tagKey (標籤翻譯 key，如 'liveView.footage.1.tag')
   *
   * ⚠️ 注意：
   * - 後端應該返回翻譯 key 而不是翻譯後的文字
   * - 前端會使用 t() 函數根據當前語言渲染對應文字
   *
   * @param dto - 後端返回的畫廊項目 DTO
   * @returns 前端畫廊數據模型
   */
  static toDomainGalleryItem(dto: LiveViewGalleryResDto): FootageGalleryData {
    return {
      id: parseInt(dto.id, 10), // 確保轉為數字
      cover: dto.main_image,
      images: Array.isArray(dto.image_url) ? dto.image_url : [], // 防禦性處理
      titleKey: dto.title,
      metaKey: dto.subtitle,
      tagKey: dto.tag,
    };
  }

  /**
   * 批次轉換：畫廊列表
   *
   * @param dtos - 後端返回的畫廊列表 DTO
   * @returns 前端畫廊數據列表
   */
  static toDomainGalleryList(
    dtos: LiveViewGalleryResDto[]
  ): FootageGalleryData[] {
    // 🛡️ 防禦性檢查：確保輸入是陣列
    if (!Array.isArray(dtos)) {
      console.warn('LiveViewMapper.toDomainGalleryList: 輸入不是陣列', dtos);
      return [];
    }

    // 🛡️ 處理空陣列
    if (dtos.length === 0) {
      console.log('LiveViewMapper.toDomainGalleryList: 畫廊列表為空');
      return [];
    }

    try {
      const galleryList = dtos.map(dto => this.toDomainGalleryItem(dto));

      console.log(
        `✅ LiveViewMapper: 成功轉換 ${galleryList.length} 個畫廊項目`
      );

      return galleryList;
    } catch (error) {
      console.error('LiveViewMapper.toDomainGalleryList: 轉換失敗', error);
      return [];
    }
  }
}

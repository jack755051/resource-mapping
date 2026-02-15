import {
  LiveChannel,
  mergeChannelsWithYouTube,
} from '@/config/live-channels';
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
   * 單一轉換：將 API 頻道 DTO 轉為基本頻道數據
   *
   * 後端字段映射：
   * - dto.id → id (頻道唯一識別碼)
   * - dto.name → name (頻道名稱)
   *
   * ⚠️ 注意：
   * - 此方法只轉換基本數據，不包含 YouTube 來源
   * - YouTube 來源由 toDomainChannelList 統一處理
   */
  static toDomainChannel(
    dto: LiveViewListResDto
  ): Pick<LiveChannel, 'id' | 'name'> {
    return {
      id: dto.id,
      name: dto.name,
    };
  }

  /**
   * 批次轉換：頻道列表 + YouTube 來源合併
   *
   * 後端字段映射：
   * - dto.id → id (頻道唯一識別碼)
   * - dto.name → name (頻道名稱)
   *
   * ⚠️ 重要：
   * 1. 先將所有 DTO 轉換為基本格式
   * 2. 使用 mergeChannelsWithYouTube 合併 YouTube 配置
   * 3. YouTube 來源由前端配置檔 (live-channels.ts) 管理
   *
   * @param dtos - 後端返回的頻道列表 DTO
   * @returns 包含 YouTube 來源的完整頻道列表
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
      // 步驟 1: 轉換基本數據
      const basicChannels = dtos.map(dto => this.toDomainChannel(dto));

      // 步驟 2: 合併 YouTube 配置
      const channelsWithYouTube = mergeChannelsWithYouTube(basicChannels);

      console.log(
        `✅ LiveViewMapper: 成功轉換 ${channelsWithYouTube.length} 個頻道`
      );

      return channelsWithYouTube;
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

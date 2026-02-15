// src/hooks/useLiveView.ts
import { useState, useEffect } from 'react';
import { LiveViewService } from '@/api/services/liveView.service';
import { useTranslation } from '@/hooks/useTranslation';
import {
  LiveViewMapper,
  FootageGalleryData,
} from '@/api/mapper/liveView.mapper';
import { LiveChannel } from '@/config/live-channels';

export function useLiveView() {
  // 1. 取得當前語系
  const { t, language } = useTranslation();

  const [channels, setChannels] = useState<LiveChannel[]>([]);
  const [galleryData, setGalleryData] = useState<FootageGalleryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(true);

  // 2. 定義預設畫廊資料 (Fallback Data)
  const defaultGalleryData: FootageGalleryData[] = [
    {
      id: 1,
      cover: '/images/demo-night-vision.jpg',
      images: [
        '/images/demo-night-vision.jpg',
        '/images/demo-night-vision-zoom.jpg',
        '/images/demo-night-vision-off.jpg',
      ],
      titleKey: 'liveView.footage.1.title',
      metaKey: 'liveView.footage.1.meta',
      tagKey: 'liveView.footage.1.tag',
    },
    {
      id: 2,
      cover: '/images/demo-lpr.jpg',
      images: [
        '/images/demo-lpr.jpg',
        '/images/demo-lpr-night.jpg',
        '/images/demo-lpr-rain.jpg',
      ],
      titleKey: 'liveView.footage.2.title',
      metaKey: 'liveView.footage.2.meta',
      tagKey: 'liveView.footage.2.tag',
    },
    {
      id: 3,
      cover: '/images/demo-wide.jpg',
      images: ['/images/demo-wide.jpg', '/images/demo-wide-dewarped.jpg'],
      titleKey: 'liveView.footage.3.title',
      metaKey: 'liveView.footage.3.meta',
      tagKey: 'liveView.footage.3.tag',
    },
  ];

  // 3. 獲取即時監控頻道列表
  const fetchChannels = async () => {
    try {
      setLoading(true);
      const data = await LiveViewService.handleGetLiveViewIdList(language);
      const mappedData = LiveViewMapper.toDomainChannelList(data);
      setChannels(mappedData);
    } catch (error) {
      console.warn('取得即時監控頻道列表失敗，使用空陣列:', error);
      setChannels([]);
    } finally {
      setLoading(false);
    }
  };

  // 4. 獲取畫廊資料
  const fetchGallery = async () => {
    try {
      setGalleryLoading(true);
      const data = await LiveViewService.handleGetLiveViewGallery(language);
      const mappedData = LiveViewMapper.toDomainGalleryList(data);
      setGalleryData(mappedData.length > 0 ? mappedData : defaultGalleryData);
    } catch (error) {
      console.warn('取得畫廊資料失敗，使用預設資料:', error);
      setGalleryData(defaultGalleryData);
    } finally {
      setGalleryLoading(false);
    }
  };

  // 5. 初始化時自動抓取
  useEffect(() => {
    fetchChannels();
    fetchGallery();
  }, [language]);

  return {
    // 即時監控相關
    channels,
    channelsLoading: loading,
    refetchChannels: fetchChannels,

    // 畫廊相關
    galleryData,
    galleryLoading,
    refetchGallery: fetchGallery,
  };
}

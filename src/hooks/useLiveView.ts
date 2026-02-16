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
  const { language } = useTranslation();

  const [channels, setChannels] = useState<LiveChannel[]>([]);
  const [galleryData, setGalleryData] = useState<FootageGalleryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(true);

  // 獲取即時監控頻道列表
  const fetchChannels = async () => {
    try {
      setLoading(true);
      const data = await LiveViewService.handleGetLiveViewIdList(language);
      const mappedData = LiveViewMapper.toDomainChannelList(data);
      setChannels(mappedData);
    } catch (error) {
      console.error('取得即時監控頻道列表失敗:', error);
      setChannels([]);
    } finally {
      setLoading(false);
    }
  };

  // 獲取畫廊資料
  const fetchGallery = async () => {
    try {
      setGalleryLoading(true);
      const data = await LiveViewService.handleGetLiveViewGallery(language);
      const mappedData = LiveViewMapper.toDomainGalleryList(data);
      setGalleryData(mappedData);
    } catch (error) {
      console.error('取得畫廊資料失敗:', error);
      setGalleryData([]);
    } finally {
      setGalleryLoading(false);
    }
  };

  // 初始化時自動抓取
  useEffect(() => {
    fetchChannels();
    fetchGallery();
  }, [language]);

  return {
    channels,
    channelsLoading: loading,
    refetchChannels: fetchChannels,
    galleryData,
    galleryLoading,
    refetchGallery: fetchGallery,
  };
}

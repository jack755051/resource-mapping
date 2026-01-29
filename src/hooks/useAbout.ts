// src/hooks/useAbout.ts
import { useState, useEffect } from 'react';
import { AboutService } from '@/api/services/about.service';
import { useTranslation } from '@/hooks/useTranslation';
import { AboutMapper } from '@/api/mapper/about.mapper';
import { TimelineSection } from '@/type/page/about';

export function useAbout() {
  // 1. 取得當前語系 language
  const { t, language } = useTranslation();

  const [timelineData, setTimelineData] = useState<TimelineSection | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // 2. 定義預設資料 (Fallback Data)
  // 這樣就算後端 API 還沒好，或者掛掉了，頁面依然能顯示原本寫在翻譯檔裡的內容
  const defaultData: TimelineSection = {
    header: {
      title: t('about.timeline.header.title'),
      description: t('about.timeline.header.desc'),
      ctaText: t('about.timeline.header.cta'),
      ctaLink: '/contact',
    },
    items: [
      {
        year: t('about.timeline.2004.year'),
        label: t('about.timeline.2004.label'),
        title: t('about.timeline.2004.title'),
        description: t('about.timeline.2004.desc'),
        isActive: false,
      },
      {
        year: t('about.timeline.2015.year'),
        label: t('about.timeline.2015.label'),
        title: t('about.timeline.2015.title'),
        description: t('about.timeline.2015.desc'),
        isActive: false,
      },
      {
        year: t('about.timeline.2022.year'),
        label: t('about.timeline.2022.label'),
        title: t('about.timeline.2022.title'),
        description: t('about.timeline.2022.desc'),
        isActive: false,
      },
      {
        year: t('about.timeline.future.year'),
        label: t('about.timeline.future.label'),
        title: t('about.timeline.future.title'),
        description: t('about.timeline.future.desc'),
        isActive: true, // 設定 Future 為活躍狀態
      },
    ],
  };

  const handleGetTimeline = async () => {
    try {
      setLoading(true);
      // 嘗試呼叫 API
      const data = await AboutService.handleGetTimeline(language);
      // 轉換資料
      const mappedData = AboutMapper.toAboutTimelineSection(data);
      setTimelineData(mappedData);
    } catch (error) {
      console.warn('取得時間軸 API 失敗，使用預設資料渲染:', error);
      // 失敗時不需要做什麼，因為 timelineData 為 null 時，下方我們會回傳 defaultData
    } finally {
      setLoading(false);
    }
  };

  // 初始化時自動抓取
  useEffect(() => {
    handleGetTimeline();
  }, [language]);

  // 2. 決定回傳什麼：如果有 API 資料就用 API 的，否則用預設的
  return {
    timelineData: timelineData || defaultData,
    loading,
    refetch: handleGetTimeline,
  };
}

import { apiClient } from '../client';
import { CommonUrl } from '../url';
import { ITimelineItem, ITimelineSection } from '../response/about.response';

export const AboutService = {

  /**
   * 取得關於我時間軸
   * @param lang - 當前語系代碼 (e.g., 'zh', 'en')
   *
   * ✅ apiClient 已自動解包 APIResponse，直接獲得 data 內容
   */
  handleGetTimeline: async (lang?: string): Promise<ITimelineSection> => {
    const items = await apiClient<ITimelineItem[]>(
      CommonUrl.ABOUT_HISTORY,
      {
        method: 'GET',
        headers: {
          'Accept-Language': lang ?? 'zh',
        },
      }
    );

    console.log('✅ 時間軸列表（已解包）', items);

    return { items };
  },
};

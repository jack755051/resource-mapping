import { apiClient } from '../client';
import { CommonUrl } from '../url';
import { ITimelineItem, ITimelineSection } from '../response/about.response';

export const AboutService = {

  /**
   * 取得關於我時間軸
   * @param lang - 當前語系代碼 (e.g., 'zh', 'en')
   */
  handleGetTimeline: async (lang?: string): Promise<ITimelineSection> => {
    const response = await apiClient<{ data: ITimelineItem[] }>(
      CommonUrl.ABOUT_HISTORY,
      {
        method: 'GET',
        headers: {
          'Accept-Language': lang ?? 'zh',
        },
      }
    );
    return { items: response.data };
  },
};

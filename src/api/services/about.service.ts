import { CommonUrl } from '../url';
import { ofetch } from 'ofetch';
import { ITimelineItem, ITimelineSection } from '../response/about.response';

export const AboutService = {

  /**
   * 取得關於我時間軸
   * @param lang - 當前語系代碼 (e.g., 'zh', 'en')
   */
  handleGetTimeline: async (lang?: string): Promise<ITimelineSection> => {
    const baseURL = '/api/v1';

    const response = await ofetch<{ data: ITimelineItem[] }>(
      CommonUrl.ABOUT_HISTORY,
      {
        method: 'GET',
        baseURL,
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': lang ?? 'zh',
        },
      }
    );
    return { items: response.data };
  },
};

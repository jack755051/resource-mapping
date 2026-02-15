import {
  LiveViewGalleryResDto,
  LiveViewListResDto,
} from '@/api/response/liveView.response';
import { apiClient } from '@/api/client';
import { CommonUrl } from '@/api/url';

export const LiveViewService = {
  /** 取得即時畫面的ID列表 **/
  handleGetLiveViewIdList: async (
    lang: string
  ): Promise<LiveViewListResDto[]> => {
    const response = await apiClient<LiveViewListResDto[]>(
      CommonUrl.LIVE_MONITOR_LIST,
      {
        method: 'GET',
        //告訴後端語言
        headers: {
          'Accept-Language': lang,
        },
      }
    );
    return response;
  },

  handleGetLiveViewGallery: async (
    lang: string
  ): Promise<LiveViewGalleryResDto[]> => {
    const response = await apiClient<LiveViewGalleryResDto[]>(
      CommonUrl.GALLERY_LIST,
      {
        method: 'GET',
        headers: {
          'Accept-Language': lang,
        },
      }
    );
    return response;
  },
};

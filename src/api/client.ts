import { ofetch } from 'ofetch';
import { APIResponse } from './response/common.response';

/**
 * 统一的 API 客户端
 * 确保所有 API 请求都带有正确的 baseURL
 *
 * 🔥 自動處理後端的 APIResponse 包裝層
 * 後端返回：{ success, code, message, data: {...} }
 * 自動提取：{...} (data 內容)
 */
export const apiClient = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1',

  // ✅ 響應攔截器：自動提取 APIResponse 的 data 字段
  async onResponse({ response }) {
    // 如果響應符合 APIResponse 結構，自動提取 data
    if (
      response._data &&
      typeof response._data === 'object' &&
      'data' in response._data
    ) {
      const apiResponse = response._data as APIResponse<any>;

      // 檢查是否成功
      if (!apiResponse.success) {
        console.error('[API Error]', {
          code: apiResponse.code,
          message: apiResponse.message,
        });
        // 可以在這裡拋出錯誤或處理業務異常
      }

      // 自動提取並替換響應為 data 內容
      response._data = apiResponse.data;
    }
  },

  // 錯誤處理
  onResponseError({ response }) {
    console.error('[API Error]', {
      url: response.url,
      status: response.status,
      statusText: response.statusText,
    });
  },
});

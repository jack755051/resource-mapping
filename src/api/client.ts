import { ofetch } from 'ofetch';

/**
 * 统一的 API 客户端
 * 确保所有 API 请求都带有正确的 baseURL
 */
export const apiClient = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1',

  // 错误处理
  onResponseError({ response }) {
    console.error('[API Error]', {
      url: response.url,
      status: response.status,
      statusText: response.statusText,
    });
  },
});

import { ofetch } from 'ofetch';
import type { FetchOptions } from 'ofetch';
import { APIResponse } from './response/common.response';

export type ApiErrorType =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'API_FAILED'
  | 'NETWORK'
  | 'TIMEOUT'
  | 'UNKNOWN';

export class ApiClientError extends Error {
  type: ApiErrorType;
  status?: number;
  code?: number | string;
  data?: unknown;

  constructor(
    message: string,
    {
      type,
      status,
      code,
      data,
    }: {
      type: ApiErrorType;
      status?: number;
      code?: number | string;
      data?: unknown;
    }
  ) {
    super(message);
    this.name = 'ApiClientError';
    this.type = type;
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

const DEFAULT_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';
const DEV_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

function getAuthToken() {
  if (authToken) return authToken;
  if (typeof window === 'undefined') return DEV_TOKEN || null;
  return (
    sessionStorage.getItem('accessToken') ||
    localStorage.getItem('accessToken') ||
    DEV_TOKEN ||
    null
  );
}

function isBinaryResponse(options?: FetchOptions) {
  const responseType = options?.responseType;
  return responseType === 'blob' || responseType === 'arrayBuffer';
}

/**
 * 统一的 API 客户端
 * 确保所有 API 请求都带有正确的 baseURL
 *
 * 🔥 自動處理後端的 APIResponse 包裝層
 * 後端返回：{ success, code, message, data: {...} }
 * 自動提取：{...} (data 內容)
 */
export const apiClient = ofetch.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,

  // ✅ 響應攔截器：自動提取 APIResponse 的 data 字段
  async onResponse({ response, options }) {
    if (isBinaryResponse(options)) return;

    // 如果響應符合 APIResponse 結構，自動提取 data
    if (
      response._data &&
      typeof response._data === 'object' &&
      'data' in response._data
    ) {
      const apiResponse = response._data as APIResponse<any>;

      // 檢查是否成功
      if (!apiResponse.success) {
        throw new ApiClientError(apiResponse.message || 'API request failed', {
          type: 'API_FAILED',
          status: response.status,
          code: apiResponse.code,
          data: apiResponse,
        });
      }

      // 自動提取並替換響應為 data 內容
      response._data = apiResponse.data;
    }
  },

  // 錯誤處理
  onResponseError({ response, error }) {
    if (error instanceof ApiClientError) {
      throw error;
    }
    if (!response) {
      const isTimeout =
        error?.name === 'AbortError' ||
        String(error?.message || '').toLowerCase().includes('timeout');
      throw new ApiClientError(error?.message || 'Network error', {
        type: isTimeout ? 'TIMEOUT' : 'NETWORK',
      });
    }

    const status = response.status;
    const type =
      status === 401
        ? 'UNAUTHORIZED'
        : status === 403
          ? 'FORBIDDEN'
          : 'UNKNOWN';

    throw new ApiClientError(response.statusText || 'Request failed', {
      type,
      status,
      data: response._data,
    });
  },

  onRequest({ options }) {
    const token = getAuthToken();
    if (!token) return;
    const existingHeaders = new Headers(options.headers || {});
    if (!existingHeaders.has('Authorization')) {
      existingHeaders.set('Authorization', `Bearer ${token}`);
    }
    options.headers = existingHeaders;
  },
});

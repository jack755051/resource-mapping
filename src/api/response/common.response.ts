// 後端統一的響應包裝結構
export interface APIResponse<T> {
  success: boolean;
  message: string;
  code: number;
  data: T;
}

// 分頁元數據 (匹配後端實際返回)
export interface PaginationMetaDto {
  total: number;      // ✅ 後端返回 total
  page: number;       // ✅ 後端返回 page
  limit: number;      // ✅ 後端返回 limit
  lastPage: number;   // ✅ 後端返回 lastPage
}

// 分頁列表響應結構 (匹配後端實際返回)
export interface PaginatedResDto<T> {
  items: T[];         // ✅ 後端返回 items 不是 data
  meta: PaginationMetaDto; // ✅ 後端直接返回 meta，沒有 pagination 包裝
}

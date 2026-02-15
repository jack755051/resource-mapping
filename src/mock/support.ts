import {
  SupportCategoryResDto,
  SupportListResDto,
} from '@/api/response/support.response';
import { PaginatedResDto } from '@/api/response/common.response';

// 1. 分類 API 的備用假資料
// ⚠️ 注意：這裡模擬後端 I18nInterceptor 的行為，返回翻譯後的字符串（中文版本）
export const MOCK_SUPPORT_CATEGORIES: SupportCategoryResDto[] = [
  // { id: 'uuid-all', name: '所有資源', value: 'all', sort: 0, icon: null },
  // { id: 'uuid-manual', name: '使用手冊', value: 'manual', sort: 1, icon: null },
  // { id: 'uuid-firmware', name: '韌體更新', value: 'firmware', sort: 2, icon: null },
  // { id: 'uuid-software', name: '軟體下載', value: 'software', sort: 3, icon: null },
  // { id: 'uuid-faq', name: '常見問題', value: 'faq', sort: 4, icon: null },
];

// 2. 列表 API 的備用假資料
// ✅ 匹配後端實際返回的分頁結構
export const MOCK_SUPPORT_LIST_RESPONSE: PaginatedResDto<SupportListResDto> = {
  items: [
    // ✅ 使用 items 而非 data
    {
      id: 1,
      title: '[Mock] GC-IP50 使用手冊',
      category: 'manual',
      date: '2025-01-01',
      type: 'PDF',
      size: 2048576,
    },
    {
      id: 2,
      title: '[Mock] 韌體 v2.0 (備用資料)',
      category: 'firmware',
      date: '2025-02-01',
      type: 'ZIP',
      size: 4096000,
    },
    // ... 你可以多塞幾筆
  ],
  meta: {
    // ✅ 直接在 meta 中，沒有 pagination 包裝
    page: 1, // ✅ 使用 page
    lastPage: 1, // ✅ 使用 lastPage
    total: 2, // ✅ 使用 total
    limit: 10, // ✅ 使用 limit
  },
};

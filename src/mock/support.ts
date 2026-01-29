import { SupportCategoryResDto, SupportListResDto } from '@/api/response/support.response';
import { PaginatedResDto } from '@/api/response/common.response';

// 1. 分類 API 的備用假資料
export const MOCK_SUPPORT_CATEGORIES: SupportCategoryResDto[] = [
    { id: 'manual', name: { zh: '使用手冊', en: 'Manual' } },
    { id: 'firmware', name: { zh: '韌體更新', en: 'Firmware' } },
    { id: 'software', name: { zh: '軟體下載', en: 'Software' } },
    { id: 'faq', name: { zh: '常見問題', en: 'FAQ' } },
];

// 2. 列表 API 的備用假資料
export const MOCK_SUPPORT_LIST_RESPONSE: PaginatedResDto<SupportListResDto> = {
    data: [
        {
            id: 1,
            title: '[Mock] GC-IP50 使用手冊',
            category: 'manual',
            date: '2025-01-01',
            type: 'PDF',
            size: 2048576
        },
        {
            id: 2,
            title: '[Mock] 韌體 v2.0 (備用資料)',
            category: 'firmware',
            date: '2025-02-01',
            type: 'ZIP',
            size: 4096000
        },
        // ... 你可以多塞幾筆
    ],
    meta: {
        pagination: {
            current_page: 1,
            total_pages: 1,
            total_items: 2,
            items_per_page: 10
        }
    }
};
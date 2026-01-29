import type { SupportResource } from '@/type/page/support';

// 模擬資料 (保留在 Page 層級作為資料源)
export const resources: SupportResource[] = [
    {
        id: 1,
        title: 'GC-IP50 系列 - 使用者操作手冊',
        category: 'manual',
        date: '2025-10-15',
        type: 'PDF',
        size: 2621440, // 2.5 MB
    },
    {
        id: 2,
        title: 'Smart Eye X1 韌體更新 v2.0.4',
        category: 'firmware',
        date: '2026-01-10',
        type: 'ZIP',
        size: 47185920, // 45 MB
    },
    {
        id: 3,
        title: '如何設定 RTSP 串流？',
        category: 'faq',
        date: '2025-12-05',
        type: 'Article',
        size: 0, // 文章沒有檔案大小
    },
    {
        id: 4,
        title: 'CMS 電腦版監控軟體 (Windows)',
        category: 'software',
        date: '2025-11-20',
        type: 'EXE',
        size: 125829120, // 120 MB
    },
    {
        id: 5,
        title: '防水攝影機安裝注意事項',
        category: 'faq',
        date: '2025-09-01',
        type: 'Article',
        size: 0,
    },
    {
        id: 6,
        title: '5MP 系列鏡頭規格書',
        category: 'manual',
        date: '2025-08-30',
        type: 'PDF',
        size: 1258291, // 1.2 MB
    },
    {
        id: 7,
        title: '忘記 NVR 管理員密碼怎麼辦？',
        category: 'faq',
        date: '2025-12-22',
        type: 'Article',
        size: 0,
    },
    {
        id: 8,
        title: 'GC-30450 快速安裝指南',
        category: 'manual',
        date: '2025-07-11',
        type: 'PDF',
        size: 838861, // 0.8 MB
    },
];

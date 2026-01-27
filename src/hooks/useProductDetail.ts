import { useState, useEffect } from 'react';
import type { ProductCardData } from '@/type/page/product';

// 定義詳細頁面專屬的資料型別 (繼承卡片資料，但多了詳細資訊)
export interface ProductDetailData extends ProductCardData {
    model: string;
    description: string;
    features: string[];
    images: string[]; // 畫廊圖片陣列
    downloads: {
        title: string;
        type: 'PDF' | 'Driver' | 'Firmware' | 'Software';
        size: string;
        date: string;
        url: string;
    }[];
}

// 模擬資料庫
const MOCK_DB: Record<string, ProductDetailData> = {
    // 假設 slug 是 'gc-ip50-w288'
    'gc-ip50-w288': {
        id: '1',
        slug: 'gc-ip50-w288',
        title: 'GC-IP50-W288 深海旗艦款',
        category: '水下攝影機',
        image: '/images/product-placeholder-1.png', // 主圖
        href: '/products/gc-ip50-w288',
        model: 'GC-IP50-W288',
        tags: ['AI', 'IP68'],
        specs: [
            { label: '畫素', value: '5MP' },
            { label: '變焦', value: '電動' },
            { label: '防水', value: 'IP68' },
            { label: '材質', value: 'SUS316L' }
        ],
        description: '專為極端環境設計的水下攝影機，採用 SUS316L 醫療級不鏽鋼打造，具備 IP68 最高防水等級。內建 AI 影像增強算法，能在混濁水域中自動調節對比度與色彩，提供清晰的監控畫面。適用於深海養殖、水利工程及船舶監控。',
        features: [
            'IP68 永久防水等級，可承受水下 100 米壓力',
            'SUS316L 抗腐蝕不鏽鋼外殼，耐鹽鹼',
            'AI 水下除霧與色彩還原技術',
            '內建 2.8-12mm 電動變焦鏡頭',
            '支援 POE 供電，施工更簡便'
        ],
        images: [
            '/images/product-placeholder-1.png', // 主圖
            '/images/demo-side.png',             // 側面圖 (請確保這些圖存在或用 placeholder)
            '/images/demo-back.png',             // 背面圖
            '/images/demo-scenario.png'          // 情境圖
        ],
        downloads: [
            { title: 'GC-IP50 系列規格書', type: 'PDF', size: '1.2 MB', date: '2025-10-15', url: '#' },
            { title: '快速安裝指南', type: 'PDF', size: '0.8 MB', date: '2025-10-15', url: '#' },
            { title: 'IP Search Tool (Win)', type: 'Software', size: '45 MB', date: '2025-12-01', url: '#' }
        ]
    },
    // 你可以複製上面的結構增加更多模擬資料...
};

// 模擬相關產品 (隨機或固定)
const MOCK_RELATED: ProductCardData[] = [
    {
        id: '2',
        slug: 'smart-eye-x1',
        title: 'Smart Eye X1 車牌辨識',
        category: '車牌辨識',
        image: '/images/product-placeholder-2.png',
        href: '/products/smart-eye-x1',
        tags: ['AI'],
        specs: [{ label: '辨識率', value: '99%' }, { label: '快門', value: '全域' }]
    },
    {
        id: '3',
        slug: 'speed-dome-z30',
        title: 'Speed Dome Z30 高速球',
        category: '高速球系列',
        image: '/images/product-placeholder-3.png',
        href: '/products/speed-dome-z30',
        tags: ['PTZ'],
        specs: [{ label: '倍率', value: '30x' }, { label: '夜視', value: '200M' }]
    },
    {
        id: '4',
        slug: 'nvr-pro-64ch',
        title: 'NVR Pro 64CH',
        category: 'DVR/NVR 主機',
        image: '/images/product-placeholder-4.png',
        href: '/products/nvr-pro-64ch',
        tags: ['4K'],
        specs: [{ label: '頻道', value: '64CH' }, { label: '硬碟', value: '8 Bay' }]
    }
];

export function useProductDetail(slug: string) {
    const [product, setProduct] = useState<ProductDetailData | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<ProductCardData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 模擬 API 請求
        setIsLoading(true);

        const timer = setTimeout(() => {
            // 1. 根據 slug 找產品 (這裡先做簡單的模擬，如果找不到就回傳預設的第一筆，方便測試)
            // 在真實專案中，找不到應該 return null 或 redirect 到 404
            const foundProduct = MOCK_DB[slug] || MOCK_DB['gc-ip50-w288'];

            setProduct(foundProduct);

            // 2. 設定相關產品 (過濾掉自己)
            const related = MOCK_RELATED.filter(p => p.slug !== slug);
            setRelatedProducts(related);

            setIsLoading(false);
        }, 800); // 模擬 800ms 延遲

        return () => clearTimeout(timer);
    }, [slug]);

    return {
        product,
        relatedProducts,
        isLoading
    };
}
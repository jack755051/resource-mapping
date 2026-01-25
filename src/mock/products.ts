// src/mock/products.ts
import { ProductCardData } from '@/type/page/product';

export const CATEGORIES = [
    { id: 'all', name: '全系列 All' },
    { id: 'underwater', name: '水下攝影機' },
    { id: '5mp', name: '500萬畫素' },
    { id: 'ip-cam', name: 'IP 網路攝影機' },
    { id: 'license', name: '車牌辨識系統' },
    { id: 'speed', name: '高速球系列' },
    { id: 'dvr', name: 'DVR/NVR 主機' },
];

export const MOCK_PRODUCTS: ProductCardData[] = [
    {
        title: 'GC-IP50-W288 深海旗艦款',
        category: '水下攝影機',
        image: '/images/product-placeholder-1.png',
        href: '/products/gc-ip50-w288',
        tags: ['AI', 'IP68'],
        specs: [{ label: '畫素', value: '5MP' }, { label: '變焦', value: '電動' }]
    },
    {
        title: 'Smart Eye X1 車牌辨識',
        category: '車牌辨識',
        image: '/images/product-placeholder-2.png',
        href: '/products/smart-eye-x1',
        tags: ['AI'],
        specs: [{ label: '辨識率', value: '99%' }, { label: '快門', value: '全域' }]
    },
    // ... 您可以繼續新增更多
];
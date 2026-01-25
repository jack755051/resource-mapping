// src/hooks/useProduct.ts
import { useState, useMemo } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from '@/mock/products';

export function useProduct() {
    const [activeCategory, setActiveCategory] = useState('all');

    // 使用 useMemo 優化效能，只有當 category 改變時才重新計算
    const filteredProducts = useMemo(() => {
        if (activeCategory === 'all') return MOCK_PRODUCTS;

        // 找出當前分類的名稱 (例如 'underwater' -> '水下攝影機')
        const currentCategoryName = CATEGORIES.find(c => c.id === activeCategory)?.name;

        if (!currentCategoryName) return [];

        return MOCK_PRODUCTS.filter(p => currentCategoryName.includes(p.category));
    }, [activeCategory]);

    return {
        categories: CATEGORIES,
        products: filteredProducts,
        activeCategory,
        setActiveCategory,
        totalCount: filteredProducts.length,
        currentCategoryName: CATEGORIES.find(c => c.id === activeCategory)?.name
    };
}
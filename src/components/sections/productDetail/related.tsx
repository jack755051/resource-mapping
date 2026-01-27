'use client';

import { ProductCard } from '@/components/layout/site-product-card';
import type { ProductCardData } from '@/type/page/product';

interface RelatedProductsProps {
    products: ProductCardData[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
    if (!products || products.length === 0) return null;

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">相關產品推薦</h2>
                <a href="/products" className="text-sm font-medium text-primary hover:underline">
                    查看全系列
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, idx) => (
                    // 修正點：直接傳入 data 屬性，而不是將屬性展開
                    <ProductCard
                        key={idx}
                        data={product}
                    />
                ))}
            </div>
        </div>
    );
}
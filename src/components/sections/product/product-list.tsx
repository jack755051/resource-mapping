'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/layout/site-product-card';
import { ProductCardData } from '@/type/page/product';

interface ProductListSectionProps {
    products: ProductCardData[];
    categoryName?: string;
    totalCount: number;
    activeCategoryKey: string; // 用來觸發動畫重繪
}

export function ProductListSection({ products, categoryName, totalCount, activeCategoryKey }: ProductListSectionProps) {
    return (
        <div className="container mx-auto px-6 py-12">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={activeCategoryKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Header */}
                    <div className="flex items-end justify-between mb-8">
                        <h2 className="text-2xl font-bold tracking-tight">{categoryName}</h2>
                        <span className="text-sm text-muted-foreground font-mono">{totalCount} PRODUCTS</span>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <ProductCard key={index} data={product} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {products.length === 0 && (
                        <div className="py-32 flex flex-col items-center justify-center text-center border-2 border-dashed border-border/50 rounded-3xl">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                                <SlidersHorizontal className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">尚無相關產品</h3>
                            <p className="text-muted-foreground mt-2">請切換其他分類或稍後再來查看。</p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
// 移除 useTranslation，因為 labels 已經在 Hook 翻譯好傳進來了
// import { useTranslation } from '@/hooks/useTranslation'; 
// 移除 CategoryId，改用 string 以支援動態分類
// import type { CategoryId } from '@/type/page/support'; 

// 定義單一分類的形狀
export interface FilterCategory {
    id: string;
    label: string;
}

interface SupportFiltersProps {
    categories: FilterCategory[]; // <--- 1. 新增這個 prop 接收資料
    activeCategory: string;       // <--- 2. 放寬型別為 string
    setActiveCategory: (id: string) => void; // <--- 3. 放寬型別為 string
    onCategoryChange?: () => void;
}

export function SupportFilters({
    categories, // <--- 接收外部傳入的分類列表
    activeCategory,
    setActiveCategory,
    onCategoryChange
}: SupportFiltersProps) {

    return (
        <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-6">
                <div className="flex items-center h-16 overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                    <div className="flex items-center gap-1">
                        {/* 直接使用傳入的 categories 進行 map */}
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setActiveCategory(cat.id);
                                        onCategoryChange?.();
                                    }}
                                    className={cn(
                                        'relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300',
                                        isActive
                                            ? 'text-primary-foreground'
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeSupportTab"
                                            className="absolute inset-0 bg-primary rounded-full shadow-md shadow-primary/25"
                                            transition={{
                                                type: 'spring',
                                                bounce: 0.2,
                                                duration: 0.6,
                                            }}
                                            style={{ borderRadius: 9999 }}
                                        />
                                    )}
                                    <span className="relative z-10">{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
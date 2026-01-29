'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import type { CategoryId } from '@/type/page/support';

interface SupportFiltersProps {
    activeCategory: CategoryId;
    setActiveCategory: (id: CategoryId) => void;
    onCategoryChange?: () => void;
}

export function SupportFilters({ activeCategory, setActiveCategory, onCategoryChange }: SupportFiltersProps) {
    const { t } = useTranslation();

    // 定義分類 (移入組件內以支援多語系)
    const categories: Array<{ id: CategoryId; label: string }> = [
        { id: 'all', label: t('support.category.all') },
        { id: 'manual', label: t('support.category.manual') },
        { id: 'firmware', label: t('support.category.firmware') },
        { id: 'software', label: t('support.category.software') },
        { id: 'faq', label: t('support.category.faq') },
    ];

    return (
        <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-6">
                <div className="flex items-center h-16 overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                    <div className="flex items-center gap-1">
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
'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Search, Grid3X3 } from 'lucide-react';

interface FilterSectionProps {
    categories: { id: string; name: string }[];
    activeCategory: string;
    onCategoryChange: (id: string) => void;
}

export function ProductFilterSection({ categories, activeCategory, onCategoryChange }: FilterSectionProps) {
    return (
        <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16 md:h-20 gap-4">
                    {/* 左側：分類按鈕 */}
                    <div className="flex-1 overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                        <div className="flex items-center gap-1">
                            {categories.map((cat) => {
                                const isActive = activeCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => onCategoryChange(cat.id)}
                                        className={cn(
                                            "relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                                            isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeCategoryPill"
                                                className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/25"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                style={{ borderRadius: 9999 }}
                                            />
                                        )}
                                        <span className="relative z-10">{cat.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 右側工具列 */}
                    <div className="hidden md:flex items-center gap-2 border-l border-border pl-4 ml-2">
                        <button className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                            <Grid3X3 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
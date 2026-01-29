'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface SupportHeroProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    onSearch?: () => void;
}

export function SupportHero({ searchQuery, setSearchQuery, onSearch }: SupportHeroProps) {
    const { t } = useTranslation();

    // 抽取出處理搜尋的函式，避免重複寫
    const handleTriggerSearch = () => {
        onSearch?.();
    };

    return (
        <div className="relative bg-muted/20 border-b border-border/40 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-5" />

            <div className="container mx-auto px-6 py-20 md:py-28 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                            {t('support.hero.title')}
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            {t('support.hero.desc')}
                        </p>
                    </motion.div>

                    {/* 搜尋框區塊 */}
                    <motion.div
                        className="relative max-w-xl mx-auto"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                            <div className="relative flex items-center bg-background rounded-full border border-border/50 shadow-lg overflow-hidden">
                                <Search className="ml-4 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder={t('support.hero.search.placeholder')}
                                    className="border-0 bg-transparent h-14 pl-3 pr-4 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        // 這裡其實可以不用 onSearch?.()，因為 Hook 會監聽 searchQuery 變化自動搜尋
                                        // 但如果你想保留即時重置分頁的功能，可以留著
                                        onSearch?.();
                                    }}
                                    // 1. 新增：支援 Enter 鍵搜尋
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleTriggerSearch();
                                        }
                                    }}
                                />
                                <Button
                                    className="mr-1 rounded-full px-6"
                                    size="lg"
                                    // 2. 新增：點擊按鈕觸發搜尋
                                    onClick={handleTriggerSearch}
                                >
                                    {t('support.hero.search.button')}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
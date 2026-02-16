'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useSupport } from '@/hooks/useSupport';

export function SupportHero() {
  const { t } = useTranslation();
  const { searchQuery, setSearchQuery } = useSupport();

  const handleTriggerSearch = () => {
    // 可以在這裡添加額外的搜尋邏輯
  };

  return (
    <div className="relative bg-muted/20 border-b border-border/40 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-5" />

      <div className="section-container section-y relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {t('support.hero.title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('support.hero.desc')}
            </p>
          </motion.div>

          {/* 搜尋框區塊 - 優化版 */}
          <motion.div
            className="relative max-w-xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative group w-full">
              {/* 背景光暈效果 */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent-blue/30 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

              {/* 主要容器：增加 h-14 或 h-16 定高，並設定 flex 佈局 */}
              <div className="relative flex items-center w-full bg-background rounded-full border border-border/50 shadow-xl transition-all duration-300 focus-within:shadow-2xl focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                {/* 搜尋圖示 */}
                <div className="pl-5 text-muted-foreground shrink-0">
                  <Search className="w-5 h-5" />
                </div>

                {/* 輸入框：flex-1 佔滿空間，移除預設 focus ring 改由父層控制 */}
                <Input
                  type="text"
                  placeholder={t('support.hero.search.placeholder')}
                  className="flex-1 border-0 bg-transparent h-12 sm:h-14 px-4 text-base md:text-lg placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleTriggerSearch();
                    }
                  }}
                />

                {/* 按鈕：增加外層 padding 讓它看起來懸浮在內 */}
                <div className="pr-1.5 py-1.5 shrink-0">
                  <Button
                    className="h-10 sm:h-11 rounded-full px-6 text-base font-medium shadow-sm transition-transform active:scale-95"
                    size="lg"
                    onClick={handleTriggerSearch}
                  >
                    {t('support.hero.search.button')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

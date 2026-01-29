'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FileText,
  Download,
  HelpCircle,
  ChevronRight,
  FileCode,
  Wrench,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

// 1. 模擬資料：支援項目
const resources = [
  {
    id: 1,
    title: 'GC-IP50 系列 - 使用者操作手冊',
    category: 'manual',
    date: '2025-10-15',
    type: 'PDF',
    size: '2.5 MB',
  },
  {
    id: 2,
    title: 'Smart Eye X1 韌體更新 v2.0.4',
    category: 'firmware',
    date: '2026-01-10',
    type: 'ZIP',
    size: '45 MB',
  },
  {
    id: 3,
    title: '如何設定 RTSP 串流？',
    category: 'faq',
    date: '2025-12-05',
    type: 'Article',
    size: '',
  },
  {
    id: 4,
    title: 'CMS 電腦版監控軟體 (Windows)',
    category: 'software',
    date: '2025-11-20',
    type: 'EXE',
    size: '120 MB',
  },
  {
    id: 5,
    title: '防水攝影機安裝注意事項',
    category: 'faq',
    date: '2025-09-01',
    type: 'Article',
    size: '',
  },
  {
    id: 6,
    title: '5MP 系列鏡頭規格書',
    category: 'manual',
    date: '2025-08-30',
    type: 'PDF',
    size: '1.2 MB',
  },
  {
    id: 7,
    title: '忘記 NVR 管理員密碼怎麼辦？',
    category: 'faq',
    date: '2025-12-22',
    type: 'Article',
    size: '',
  },
  {
    id: 8,
    title: 'GC-30450 快速安裝指南',
    category: 'manual',
    date: '2025-07-11',
    type: 'PDF',
    size: '0.8 MB',
  },
  // ... 更多資料以測試分頁
];

// 2. 分類定義
const categories = [
  { id: 'all', label: '所有資源 All' },
  { id: 'manual', label: '使用手冊' },
  { id: 'firmware', label: '韌體下載' },
  { id: 'software', label: '應用軟體' },
  { id: 'faq', label: '常見問題 FAQ' },
];

// 3. Helper: 根據類型回傳 Icon
const getIcon = (type: string, category: string) => {
  if (category === 'firmware' || category === 'software')
    return <FileCode className="w-5 h-5 text-blue-600" />;
  if (category === 'faq')
    return <HelpCircle className="w-5 h-5 text-orange-500" />;
  if (category === 'manual')
    return <FileText className="w-5 h-5 text-primary" />;
  return <Wrench className="w-5 h-5 text-muted-foreground" />;
};

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 4. 篩選邏輯
  const filteredData = resources.filter(item => {
    const matchCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // 5. 分頁邏輯
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* -----------------------------------------------------------------
          SECTION 1: SEARCH HERO (支援中心的靈魂)
          設計：置中大標 + 巨大搜尋框
      ----------------------------------------------------------------- */}
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
                技術支援中心
              </h1>
              <p className="text-muted-foreground text-lg">
                搜尋文件、下載驅動程式，或尋找常見問題的解答。
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
                {/* 背景光暈效果 */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative flex items-center bg-background rounded-full border border-border/50 shadow-lg overflow-hidden">
                  <Search className="ml-4 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="輸入關鍵字，例如：IP50, 韌體更新..."
                    className="border-0 bg-transparent h-14 pl-3 pr-4 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1); // 搜尋時重置回第一頁
                    }}
                  />
                  <Button className="mr-1 rounded-full px-6" size="lg">
                    搜尋
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          SECTION 2: FILTERS (Tabs)
          設計：延續產品頁的「滑動膠囊」風格
      ----------------------------------------------------------------- */}
      <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-16 overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex items-center gap-1">
              {categories.map(cat => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setCurrentPage(1);
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

      {/* -----------------------------------------------------------------
          SECTION 3: CONTENT LIST & PAGINATION
      ----------------------------------------------------------------- */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* 列表內容 */}
        <div className="space-y-4 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative flex items-center gap-4 p-5 rounded-2xl border border-border/40 bg-card hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Icon Box */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                      'bg-muted/50 group-hover:bg-primary/5'
                    )}
                  >
                    {getIcon(item.type, item.category)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 h-5 border-border/50 text-muted-foreground"
                      >
                        {item.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Action */}
                  <div className="shrink-0 flex items-center gap-3">
                    {item.size && (
                      <span className="hidden md:block text-sm text-muted-foreground font-mono">
                        {item.size}
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                    >
                      {item.category === 'faq' ? (
                        <ChevronRight className="w-5 h-5" />
                      ) : (
                        <Download className="w-5 h-5" />
                      )}
                    </Button>
                  </div>

                  {/* 隱形連結 */}
                  <a
                    href="#"
                    className="absolute inset-0"
                    aria-label="View Item"
                  ></a>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold">找不到相關資源</h3>
                <p className="text-muted-foreground">
                  請嘗試其他關鍵字或切換分類。
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* 分頁器 (Shadcn Pagination) */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(prev => prev - 1);
                    }}
                    className={
                      currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i + 1}
                      onClick={e => {
                        e.preventDefault();
                        setCurrentPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(prev => prev + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}

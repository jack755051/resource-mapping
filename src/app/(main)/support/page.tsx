'use client';

import { useState } from 'react';
import { SupportHero } from '@/components/sections/support/hero';
import { SupportFilters } from '@/components/sections/support/filters';
import { SupportList } from '@/components/sections/support/list';

// 模擬資料 (保留在 Page 層級作為資料源)
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
];

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 篩選邏輯
  const filteredData = resources.filter((item) => {
    const matchCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // 分頁邏輯
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResetPagination = () => setCurrentPage(1);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 1. Hero */}
      <SupportHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleResetPagination}
      />

      {/* 2. Filters */}
      <SupportFilters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onCategoryChange={handleResetPagination}
      />

      {/* 3. List & Pagination */}
      <SupportList
        data={currentData}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
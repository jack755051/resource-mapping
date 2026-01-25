'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/layout/site-product-card'; // 假設您把上面的組件存在這
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { SlidersHorizontal } from 'lucide-react';

// 模擬資料
const categories = [
  { id: 'all', name: '全部商品' },
  { id: 'underwater', name: '水下攝影機系列' },
  { id: '5mp', name: '500萬畫素系列' },
  { id: 'ip-cam', name: 'IP 網路攝影機' },
  { id: 'license', name: '車牌辨識系統' },
  { id: 'speed', name: '高速球系列' },
  { id: 'dvr', name: 'DVR/NVR 主機' },
];

const products = [
  {
    id: 1,
    title: 'GC-IP50-W288 深海旗艦款',
    category: '水下攝影機',
    image: '/images/product-placeholder-1.png', // 請換成您的圖片
    tags: ['AI', 'IP68'],
    specs: [{ label: '畫素', value: '5MP' }, { label: '變焦', value: '電動' }]
  },
  {
    id: 2,
    title: 'Smart Eye X1 車牌辨識',
    category: '車牌辨識',
    image: '/images/product-placeholder-2.png',
    tags: ['AI'],
    specs: [{ label: '辨識率', value: '99%' }, { label: '快門', value: '全域' }]
  },
  // ... 更多產品
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="min-h-screen bg-background pb-20">

      {/* Page Header: 簡單大氣的標題區 */}
      <div className="bg-muted/30 border-b border-border/40">
        <div className="container mx-auto px-6 py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">監控產品系列</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            從深海作業到智慧城市，我們提供全方位的視覺解決方案。
            嚴選硬體，在地整合。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* SIDEBAR (Desktop): 現代化的 Sticky 側邊欄 */}
          {/* 在手機版隱藏，改用上方 Scroll 或 Drawer (這裡示範 Desktop 邏輯) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wider uppercase">
                <SlidersHorizontal className="w-4 h-4" />
                Product Categories
              </div>

              <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                <div className="flex flex-col space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "text-left px-4 py-3 rounded-xl text-sm transition-all duration-200",
                        activeCategory === cat.id
                          ? "bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </aside>

          {/* MAIN CONTENT: 產品網格 */}
          <main className="flex-1">
            {/* 手機版導航 (橫向捲動) */}
            <div className="lg:hidden mb-8 overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "whitespace-nowrap px-4 py-2 rounded-full text-sm border transition-colors",
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border text-muted-foreground"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 產品列表 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  category={product.category}
                  image={product.image}
                  specs={product.specs}
                  tags={product.tags}
                />
              ))}
            </div>

            {/* Empty State (如果該分類沒東西) */}
            {products.length === 0 && (
              <div className="py-20 text-center text-muted-foreground">
                目前該分類尚無產品
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
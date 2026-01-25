'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/layout/site-product-card';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion'; // 建議安裝 framer-motion 增加現代感 (npm i framer-motion)
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';

// 模擬資料 (維持不變)
const categories = [
  { id: 'all', name: '全系列 All' },
  { id: 'underwater', name: '水下攝影機' },
  { id: '5mp', name: '500萬畫素' },
  { id: 'ip-cam', name: 'IP 網路攝影機' },
  { id: 'license', name: '車牌辨識系統' },
  { id: 'speed', name: '高速球系列' },
  { id: 'dvr', name: 'DVR/NVR 主機' },
];

const products = [
  // ... (維持你的資料)
  {
    id: 1,
    title: 'GC-IP50-W288 深海旗艦款',
    category: '水下攝影機',
    image: '/images/product-placeholder-1.png',
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
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  // 過濾邏輯
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => categories.find(c => c.id === activeCategory)?.name.includes(p.category));

  return (
    <div className="min-h-screen bg-background pb-20">

      {/* 1. Page Header: Split Hero (左文右圖) */}
      <div className="relative bg-muted/20 border-b border-border/40 overflow-hidden">
        {/* 背景裝飾：科技網格 */}
        <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-5" />

        {/* 背景光暈 (Spotlight) */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-3xl rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">

            {/* 左側：文字區 (加上 framer-motion 進場) */}
            <motion.div
              className="flex-1 text-center md:text-left space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-wider uppercase">
                San Ring Tech
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                Vision <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Redefined.
                </span>
              </h1>

              <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
                從深海作業到智慧城市，我們提供全方位的視覺解決方案。
                <span className="text-foreground font-medium">嚴選硬體，在地化深度整合。</span>
              </p>
            </motion.div>

            {/* 右側：Hero Image (產品特寫) */}
            {/* 這種單張大圖比輪播更有質感 */}
            <motion.div
              className="flex-1 relative w-full max-w-lg aspect-square md:aspect-[4/3]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* 這裡放一張稍微去背、或很有質感的產品圖 */}
              {/* 例如：一顆高品質的鏡頭，或是一個監控攝像頭的特寫 */}
              <div className="relative w-full h-full">
                <img
                  src="/images/hero-camera.png" // 建議找一張去背圖 (png)
                  alt="Flagship Camera"
                  className="object-contain w-full h-full drop-shadow-2xl"
                />

                {/* 裝飾：浮動的標籤 (Floating Badge) */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-card/80 backdrop-blur border border-white/20 p-4 rounded-2xl shadow-xl hidden md:block"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      AI
                    </div>
                    <div>
                      <div className="text-sm font-bold">Smart Detection</div>
                      <div className="text-xs text-muted-foreground">99.9% Accuracy</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* 2. 升級版 Sticky Navigation: 滑動膠囊效果 */}
      <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">

            {/* 左側：水平滾動分類 */}
            <div className="flex-1 overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
              <div className="flex items-center gap-1">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                        isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      {/* 關鍵魔法：Active 時渲染一個 motion.div 作為背景，並加上 layoutId */}
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryPill"
                          className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/25"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          style={{ borderRadius: 9999 }} // 確保圓角
                        />
                      )}

                      {/* 文字層級要在背景之上 */}
                      <span className="relative z-10">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 右側工具列 (維持不變) */}
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

      {/* 3. Main Content: 全寬網格 */}
      <div className="container mx-auto px-6 py-12">

        {/* 動畫容器：讓切換分類時有順暢的過渡 */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeCategory} // 關鍵：key 改變時觸發動畫
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* 標題與結果數 */}
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                {categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <span className="text-sm text-muted-foreground font-mono">
                {filteredProducts.length} PRODUCTS
              </span>
            </div>

            {/* 產品網格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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

            {/* Empty State */}
            {filteredProducts.length === 0 && (
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
    </div>
  );
}
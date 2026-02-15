'use client';

import Image from 'next/image';
import { ZoomIn } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

// 模擬資料 (未來可從 DB 讀取)
const FOOTAGE_DATA = [
  {
    id: 1,
    src: '/images/demo-night-vision.jpg', // 需準備夜視圖
    title: '極低照度測試',
    meta: 'ISO 12800 | 0.001 Lux',
    tag: 'Night Vision',
  },
  {
    id: 2,
    src: '/images/demo-lpr.jpg', // 需準備車牌辨識圖
    title: '高速車牌辨識',
    meta: '120 km/h | 99.9% Accuracy',
    tag: 'AI LPR',
  },
  {
    id: 3,
    src: '/images/demo-wide.jpg', // 需準備廣角圖
    title: '180° 全景監控',
    meta: '4K Resolution | Fisheye',
    tag: 'Panorama',
  },
];

export function FootageGallery() {
  // const { t } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">實拍畫質展示</h2>
          <p className="text-muted-foreground">
            眼見為憑。我們提供未經修飾的原始輸出畫面。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FOOTAGE_DATA.map(item => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted border border-border/50 cursor-zoom-in"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* 覆蓋層 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* 資訊 */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-primary text-xs font-bold tracking-wider uppercase mb-1">
                      {item.tag}
                    </div>
                    <h3 className="text-white text-lg font-bold">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs font-mono mt-1">
                      {item.meta}
                    </p>
                  </div>
                  <ZoomIn className="text-white w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

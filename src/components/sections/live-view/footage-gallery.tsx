// components/sections/live-view/footage-gallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Layers, ZoomIn } from 'lucide-react'; // 使用 Layers Icon 代表多圖層
import { useTranslation } from '@/hooks/useTranslation';
import { ImageModal } from './image-modal'; // 引入剛剛做的 Modal

export function FootageGallery() {
  const { t } = useTranslation();

  // Modal 狀態控制
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<number>(0);

  // 模擬資料 (升級為多圖結構)
  const FOOTAGE_DATA = [
    {
      id: 1,
      // 封面圖
      cover: '/images/demo-night-vision.jpg',
      // 點開後的所有圖片 (包含封面與其他細節圖)
      images: [
        '/images/demo-night-vision.jpg',
        '/images/demo-night-vision-zoom.jpg', // 假設有細節圖
        '/images/demo-night-vision-off.jpg', // 對照組
      ],
      titleKey: 'liveView.footage.1.title',
      metaKey: 'liveView.footage.1.meta',
      tagKey: 'liveView.footage.1.tag',
    },
    {
      id: 2,
      cover: '/images/demo-lpr.jpg',
      images: [
        '/images/demo-lpr.jpg',
        '/images/demo-lpr-night.jpg',
        '/images/demo-lpr-rain.jpg',
      ],
      titleKey: 'liveView.footage.2.title',
      metaKey: 'liveView.footage.2.meta',
      tagKey: 'liveView.footage.2.tag',
    },
    {
      id: 3,
      cover: '/images/demo-wide.jpg',
      images: [
        '/images/demo-wide.jpg',
        '/images/demo-wide-dewarped.jpg', // 魚眼校正後
      ],
      titleKey: 'liveView.footage.3.title',
      metaKey: 'liveView.footage.3.meta',
      tagKey: 'liveView.footage.3.tag',
    },
  ];

  const handleOpenModal = (index: number) => {
    setSelectedGallery(index);
    setModalOpen(true);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">
            {t('liveView.gallery.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('liveView.gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FOOTAGE_DATA.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenModal(index)} // 點擊觸發
              className="group relative aspect-[4/3] rounded-2xl bg-muted border border-border/50 cursor-pointer"
            >
              {/* 視覺優化：堆疊效果 (Stack Effect)
                 在主圖下面墊一張稍微歪一點的圖，暗示這是一個「相簿」
              */}
              <div className="absolute inset-0 bg-gray-800 rounded-2xl rotate-3 scale-[0.98] translate-y-2 opacity-50 group-hover:rotate-6 group-hover:translate-y-3 transition-transform duration-500" />

              <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={item.cover}
                  alt={t(item.titleKey)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* 覆蓋層 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* 右上角：圖片數量標籤 */}
                {item.images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-mono text-white flex items-center gap-1 border border-white/20">
                    <Layers className="w-3 h-3" />
                    <span>+{item.images.length - 1}</span>
                  </div>
                )}

                {/* 資訊 */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-primary text-xs font-bold tracking-wider uppercase mb-1">
                        {t(item.tagKey)}
                      </div>
                      <h3 className="text-white text-lg font-bold">
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-gray-400 text-xs font-mono mt-1">
                        {t(item.metaKey)}
                      </p>
                    </div>
                    {/* Icon 改成 Layers，更有「查看更多」的感覺 */}
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 燈箱 Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={FOOTAGE_DATA[selectedGallery]?.images || []}
        title={t(FOOTAGE_DATA[selectedGallery]?.titleKey)}
      />
    </section>
  );
}

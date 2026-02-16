'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProductGalleryProps } from '@/type/page/proudct-detail';
import { useTranslation } from '@/hooks/useTranslation';

export function ProductGallery({
  props,
  className,
  classNames,
}: ProductGalleryProps) {
  const { t } = useTranslation();
  const { images, activeIndex, onIndexChange, productName } = props;

  return (
    <div className={cn('space-y-4', className, classNames?.container)}>
      {/* 主圖顯示區 */}
      <div
        className={cn(
          'relative aspect-[4/3] w-full bg-muted/10 rounded-4xl border border-border/50 overflow-hidden',
          classNames?.imageWrapper
        )}
      >
        {/* 背景裝飾 */}
        <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-5" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full"
          >
            {images && images[activeIndex] && (
              <Image
                src={images[activeIndex]}
                alt={
                  productName
                    ? t('productDetail.gallery.imageWithName', {
                        name: productName,
                        index: activeIndex + 1,
                      })
                    : t('productDetail.gallery.image', {
                        index: activeIndex + 1,
                      })
                }
                fill
                // 這裡合併 classNames.image
                className={cn(
                  'object-contain p-6 sm:p-8 md:p-12 drop-shadow-2xl',
                  classNames?.image
                )}
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* 標籤 */}
        <div className={cn('absolute top-6 left-6', classNames?.badge)}>
          <span className="bg-background/80 backdrop-blur border border-border/50 px-3 py-1 rounded-full text-xs font-mono font-medium">
            {t('productDetail.gallery.view360')}
          </span>
        </div>
      </div>

      {/* 縮圖列表 (這裡對應到 classNames.footer) */}
      <div
        className={cn(
          'flex gap-4 overflow-x-auto pb-2 scrollbar-hide',
          classNames?.footer
        )}
      >
        {images?.map((img, idx) => (
          <button
            key={idx}
            onClick={() => onIndexChange(idx)}
            className={cn(
              'relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all bg-muted/10',
              activeIndex === idx
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-transparent hover:border-border'
            )}
            aria-label={t('productDetail.gallery.viewImage', {
              index: idx + 1,
            })}
          >
            <Image
              src={img}
              alt={
                productName
                  ? t('productDetail.gallery.thumbnailWithName', {
                      name: productName,
                      index: idx + 1,
                    })
                  : t('productDetail.gallery.thumbnail', {
                      index: idx + 1,
                    })
              }
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

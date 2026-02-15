// components/sections/live-view/image-modal.tsx
'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  title?: string;
}

export function ImageModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  title,
}: ImageModalProps) {
  // 狀態：目前顯示第幾張圖
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // 當 Modal 打開時，重置 Index
  useEffect(() => {
    if (isOpen) setCurrentIndex(initialIndex);
  }, [isOpen, initialIndex]);

  // 鍵盤控制 (Esc 關閉, 左右鍵切換)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const showNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  const showPrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
          onClick={onClose} // 點擊背景關閉
        >
          {/* 關閉按鈕 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 圖片容器 */}
          <div
            className="relative w-full h-full max-w-7xl max-h-[85vh] flex items-center justify-center"
            onClick={e => e.stopPropagation()} // 防止點擊圖片關閉
          >
            {/* 標題 (可選) */}
            {title && (
              <div className="absolute -top-12 left-0 text-white font-bold text-xl tracking-wider">
                {title}
                <span className="ml-4 text-sm font-normal text-gray-400">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
            )}

            <motion.div
              key={currentIndex} // Key 改變觸發動畫
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex}`}
                fill
                className="object-contain" // 保持比例完整顯示
                priority
              />
            </motion.div>

            {/* 左右導航按鈕 (只有多張圖時才顯示) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={showPrev}
                  className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-all border border-white/10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={showNext}
                  className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-all border border-white/10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* 底部縮圖預覽 (選用，增加專業感) */}
          {images.length > 1 && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4 py-2"
              onClick={e => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    'relative w-12 h-12 rounded overflow-hidden border-2 transition-all',
                    idx === currentIndex
                      ? 'border-primary scale-110'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  )}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 補上 useState import
import { useState } from 'react';

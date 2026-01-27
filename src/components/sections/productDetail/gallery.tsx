'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
    images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="space-y-4">
            {/* 主圖顯示區 */}
            <div className="relative aspect-[4/3] w-full bg-muted/10 rounded-[2rem] border border-border/50 overflow-hidden">
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
                        <Image
                            src={images[activeIndex]}
                            alt="Product Image"
                            fill
                            className="object-contain p-8 md:p-12 drop-shadow-2xl"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* 標籤 (可選) */}
                <div className="absolute top-6 left-6">
                    <span className="bg-background/80 backdrop-blur border border-border/50 px-3 py-1 rounded-full text-xs font-mono font-medium">
                        VIEW 360°
                    </span>
                </div>
            </div>

            {/* 縮圖列表 */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={cn(
                            "relative w-20 h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all bg-muted/10",
                            activeIndex === idx
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-transparent hover:border-border"
                        )}
                    >
                        <Image src={img} alt="" fill className="object-contain p-2" />
                    </button>
                ))}
            </div>
        </div>
    );
}
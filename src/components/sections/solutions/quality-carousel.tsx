'use client';

import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

import { useCarouselConfig } from '@/hooks/useCarouselConfig';
import { useSolution } from '@/hooks/useSolution';

export function QualityCarousel() {
    const { t } = useTranslation();
    const { plugin, config } = useCarouselConfig();
    const { slides } = useSolution();

    return (
        // 最外層容器，負責定義整體高度和 group hover 範圍
        <div className="relative group lg:mt-8 h-full min-h-[400px] md:min-h-[500px]">
            {/* 裝飾性背景框 (維持不變) */}
            <div className="absolute -inset-4 border-2 border-border/60 rounded-[2rem] -z-10 group-hover:border-primary/30 transition-colors duration-500" />

            {/* 🔥 修改點 1: 移除 Carousel 上的樣式 
               移除 rounded-2xl, overflow-hidden, shadow-2xl, bg-muted
               現在它只是一個乾淨的輪播功能容器
            */}
            <Carousel
                opts={config}
                plugins={[plugin]}
                orientation="vertical"
                className="w-full h-full"
            >
                <CarouselContent className="-mt-0 h-[400px] md:h-[500px]">
                    {slides.map((slide, index) => (
                        <CarouselItem key={index} className="pt-0 h-full basis-full">
                            {/* 🔥 修改點 2: 將樣式移到這裡
                               這個 div 緊緊包住圖片。
                               1. rounded-2xl, shadow-2xl: 確保圓角和陰影只應用在圖片卡片上，解決底部白條問題。
                               2. overflow-hidden: 關鍵！當內部的 Image scale-105 時，超出這個 div 的部分會被切掉，解決露出下一張圖的問題。
                            */}
                            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-muted">
                                <Image
                                    src={slide.src}
                                    alt={t(slide.caption)}
                                    fill
                                    // 這裡的 scale-105 現在會被外面的 div 裁切
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* 漸層與文字 (維持不變) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-2 text-white/90 mb-2">
                                        <ShieldCheck className="w-5 h-5 text-green-400" />
                                        <span className="font-bold text-sm tracking-widest uppercase">
                                            {t(slide.tag)}
                                        </span>
                                    </div>
                                    <p className="text-white text-lg font-medium">
                                        {t(slide.caption)}
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
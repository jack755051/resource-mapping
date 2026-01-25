'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Aperture, Maximize2, Zap, Layers } from 'lucide-react'; // 引入更多圖示
import { cn } from '@/lib/utils';

interface ProductCardProps {
    title: string;
    category: string;
    image: string;
    specs: { label: string; value: string }[];
    tags: string[];
}

export function ProductCard({ title, category, image, specs, tags }: ProductCardProps) {
    return (
        <Card className="group relative flex flex-col h-full overflow-hidden rounded-[1.5rem] border border-border/40 bg-card transition-all duration-500 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1">

            {/* 1. 圖片區塊：更加通透 */}
            {/* 使用 group-hover 讓圖片稍微放大 */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-muted/20 to-muted/5 p-6">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-xl"
                />

                {/* 左上角：分類標籤 (更簡約) */}
                <div className="absolute top-4 left-4 z-10">
                    <Badge variant="outline" className="bg-background/60 backdrop-blur border-border/50 text-xs font-medium tracking-wide text-muted-foreground">
                        {category}
                    </Badge>
                </div>

                {/* 右上角：AI 亮點 (保持醒目) */}
                {tags.includes('AI') && (
                    <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-white/90 text-primary hover:bg-white shadow-sm gap-1.5 border border-primary/10">
                            <Aperture className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold tracking-wider">AI CORE</span>
                        </Badge>
                    </div>
                )}
            </div>

            {/* 2. 標題區塊 */}
            <div className="flex flex-col flex-1 p-6 pb-0">
                <h3 className="text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {title}
                </h3>
                {/* 裝飾線條，Hover 時變長或變色 */}
                <div className="w-8 h-1 bg-border mt-3 mb-1 rounded-full group-hover:w-12 group-hover:bg-primary/50 transition-all duration-500" />
            </div>

            {/* 3. 規格區塊：去背化，改用 Icon 列表 */}
            <CardContent className="p-6 py-4 flex-1">
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    {specs.map((spec, index) => (
                        <div key={index} className="flex items-center gap-2.5 text-sm group/spec">
                            {/* 這裡可以做一個簡單的 Icon 映射，或者統一用一個通用的 tech icon */}
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                {/* 根據 label 決定 icon，或是隨機選一個，這裡示範簡單邏輯 */}
                                {index === 0 ? <Maximize2 className="w-3 h-3" /> :
                                    index === 1 ? <Zap className="w-3 h-3" /> :
                                        <Layers className="w-3 h-3" />}
                            </div>

                            <div className="flex flex-col leading-none">
                                <span className="font-bold text-foreground/90 text-[13px]">{spec.value}</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{spec.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>

            {/* 4. 底部按鈕：改為更低調的連結樣式 */}
            <CardFooter className="p-6 pt-2 border-t border-border/30 bg-muted/5 mt-auto">
                <div className="w-full flex items-center justify-between group/btn cursor-pointer">
                    <span className="text-sm font-medium text-muted-foreground group-hover/btn:text-foreground transition-colors">
                        View Details
                    </span>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full w-8 h-8 bg-transparent group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </CardFooter>

            {/* 全卡點擊的隱形連結 (UX 技巧) */}
            <a href={`/products/${title}`} className="absolute inset-0 z-0" aria-label={`View ${title}`}></a>
        </Card>
    );
}
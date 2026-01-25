'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Aperture, HardDrive, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
    title: string;
    category: string;
    image: string;
    specs: { label: string; value: string }[];
    tags: string[];
}

export function ProductCard({ title, category, image, specs, tags }: ProductCardProps) {
    return (
        <Card className="group overflow-hidden rounded-[1.5rem] border-border/50 bg-card transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
            {/* 圖片區塊：帶有輕微的背景色，突顯產品本身 */}
            <div className="relative aspect-[4/3] w-full bg-muted/30 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                />

                {/* 左上角分類標籤 */}
                <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur text-xs font-mono tracking-wider">
                        {category}
                    </Badge>
                </div>

                {/* 右上角狀態/亮點 */}
                {tags.includes('AI') && (
                    <div className="absolute top-4 right-4">
                        <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground gap-1">
                            <Aperture className="w-3 h-3" /> AI INSIDE
                        </Badge>
                    </div>
                )}
            </div>

            {/* 內容區塊 */}
            <CardHeader className="p-5 pb-2">
                <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                    {title}
                </h3>
                {/* 這裡可以放簡短描述，或省略 */}
            </CardHeader>

            <CardContent className="p-5 pt-2 space-y-4">
                {/* 規格圖示化：現代設計不喜歡純文字列表 */}
                <div className="grid grid-cols-2 gap-2">
                    {specs.map((spec, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-lg px-2 py-1.5">
                            {/* 這裡可以根據 spec 類型動態換 icon，暫時用通用的 */}
                            <div className="w-1 h-1 rounded-full bg-primary/50" />
                            <span className="truncate">
                                <span className="font-semibold text-foreground/80">{spec.value}</span> {spec.label}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="p-5 pt-0">
                <Button className="w-full rounded-xl gap-2 group-hover:bg-primary group-hover:text-primary-foreground" variant="outline">
                    查看規格
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
            </CardFooter>
        </Card>
    );
}